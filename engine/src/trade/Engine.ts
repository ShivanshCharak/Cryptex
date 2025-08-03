import { RedisManager } from "../RedisManager";
import {

  OrderBuyScript,
} from "../utils/luaScript";
import {logger} from '../logger/logger'
import { Orderbook } from "./Orderbook";
import { Order, Fill } from "../utils/type";
import fs from "fs";

import prisma from "@repo/postgres-prisma";
import { Depth, BASE_CURRENCY, UserBalance } from "../utils/type";

export const redis = new RedisManager();
export class Engine {
  private orderbooks: Partial<Orderbook[]> = [];

  private DepthMap: Depth = {};

  constructor() {
    let snapshot = null;
    this.orderbooks = [new Orderbook("SOL", [], [], 0, 0)];
  }

  async init() {
    if (process.env.WITH_SNAPSHOT) {
      const snapshot = fs.readFileSync("./snapshot.json");
    } else {

      await this.loadOrdersToRedis();
      await this.updateOrderBook();
      await this.loadUserBalancesToRedis();
      await this.loadCryptoToRedis();
    }
  }

  async process({ message, clientId }: { message: {type:string, data:{market:string,price:number,quantity:number,side:"buy"|"sell",userId:string,}}; clientId: string }) {
    console.log(message,clientId)
    switch (message.type) {
      case "CREATE_ORDER": {
        try {
          const { executedQty, fills } = await this.createOrder(
            message.data.market,
            message.data.price,
            message.data.quantity,
            message.data.side,
            message.data.userId
          );

          RedisManager.getInstance().sendToApi(clientId, {
            type: "ORDER_PLACED",
            payload: {
              executedQty,
              fills,
            },
          });
          logger.info(`Order created for the ${message.data.userId} side: ${message.data.side} quantity:${message.data.quantity}`)
        } catch (error) {
          logger.error(`Error during create order ${error}`)
          console.error("Create order error", error);
        }
      }
      case "GET_DEPTH":
        try {
          const market = message.data.market;
          const orderbook = this.orderbooks.find((o) => o?.ticker() === market);

          if (!orderbook) {
            throw new Error("No orderbook found");
          }

          RedisManager.getInstance().sendToApi(clientId, {
            type: "DEPTH",
            payload: { bids: orderbook.bids, asks: orderbook.asks },
          });
          logger.info(`Sent deth succesfully for the userId ${message.data.userId}`)
        } catch (e) {
          logger.warn(`No depth found for ${message.data.userId}`)
          RedisManager.getInstance().sendToApi(clientId, {
            type: "DEPTH",
            payload: {
              bids: [],
              asks: [],
            },
          });
        }
        break;
    }
  }
  // Base asset:- TATA, Quote asset:- Inr
  async createOrder(
    market: string,
    price: number,
    quantity: number,
    side: "buy" | "sell",
    userId: string
  ) {
    const orderbook = this.orderbooks.find((o) => o?.ticker() === market);
    const baseAsset = market.split("_")[0];
    const quoteAsset = market.split("_")[1];

    if (!orderbook) {
      throw new Error("No orderbook found");
    }

    const totalCost = Number(price) * quantity;

    const order: Order = {
      price: Number(price),
      quantity: Number(quantity),
      orderId:
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15),
      filled: 0,
      side,
      userId,
    };

    const { fills, executedQty } = await orderbook.addOrder(order);
    logger.info(`Added order ${fills} and quantity ${executedQty}`)
    await Promise.all(
      fills.map((fill) =>{

       return this.InitiateRedisTrades(
          fill.orderId,
          userId,
          fill.otherUserId,
          Number(fill.price),
          fill.quantity,
          fill.side,
          fill?.filled
        )
      }
      )
    );


 
    this.publisWsDepthUpdates(fills, price, side, market);

    this.createDbTrades(fills, market, userId);

    this.publishWsTrades(fills, userId, market);
    return { fills, executedQty };
  }

  async InitiateRedisTrades(
    orderId: string,
    buyerUserId: string,
    sellerUserId: string,
    price: number,
    fillAmount: number,
    side: "buy" | "sell",
    filled: number
  ) {
    try {
      // Input validation
      if (isNaN(price) || isNaN(fillAmount)) {
        logger.error(`Invalid price and amount for ${orderId} or ${buyerUserId} While sending it to redis`)
        throw new Error("Invalid price or fill amount");
      }

      const result= await redis.evaluateTransaction(OrderBuyScript, {
        arguments: [
          orderId,
          buyerUserId,
          sellerUserId,
          price.toString(),
          fillAmount.toString(),
          side,
          filled?.toString(),
        ],
      }) as {
  ok:string,
  buyerUserId: string,
    sellerUserId:string,
  totalCost: string,
  filled: string,
  newfill: string,
  price: string
  }|{
     err:string,
    needed:string,
    available:string
  };      
      this.syncArraysWithRedisResult(result, orderId, price, side);


     if ('err' in result) {
  // result is of type: { err: string; needed: string; available: string; }
  logger.error(`redis transaction failed for ${orderId} ${buyerUserId}`,result.err)
  console.log('Error:', result.err);
} else {
  logger.info(`Redis transaction completed succesfully for ${orderId} ${buyerUserId}`)
  // result is of type: { ok: string; buyerUserId: string; ... }
  console.log('Success:', result.ok);
}
return result
    } catch (error) {
      logger.error(`Trade initiation failed: ${error}`)
      console.error("Trade initiation failed:", error);
      throw error;
    }
  }

  async syncArraysWithRedisResult(
    result: any,
    orderId: string,
    price: number,
    side: "buy" | "sell"
  ) {
    const orderbook = this.orderbooks[0];
    if (!orderbook){ logger.warn(`No orderbookfound while executing orderId ${orderId}` ); return;}

    if (result.ok === "ORDER_COMPLETE") {
      if (side === "buy") {
        orderbook.bids = orderbook.bids.filter(
          (order) => order.orderId !== orderId
        );
      } else {
        orderbook.asks = orderbook.asks.filter(
          (order) => order.orderId !== orderId
        );
      }
    
    } else if (result.ok === "PARTIAL_FILL") {
      logger.info(`PARTIALLY FILLED ${orderId}`)
      const orderArray = side === "buy" ? orderbook.bids : orderbook.asks;
      const orderIndex = orderArray.findIndex(
        (order) => order.orderId === orderId
      );

      if (orderIndex !== -1) {
        orderArray[orderIndex].filled = result.totalFilled || 0;
        orderArray[orderIndex].quantity =
          result.remaining || orderArray[orderIndex].quantity;
        console.log(
          `Updated order ${orderId} - filled: ${result.totalFilled}, remaining: ${result.remaining}`
        );
      }
    }

  }

  createDbTrades(fills: Fill[], market: string, userId: string) {
    logger.info("Databse trades started")
    fills.forEach((fill) => {
      RedisManager.getInstance().pushMessage({
        type: "TRADE_ADDED",
        data: {
          market,
          id: fill.tradeId.toString(),
          isBuyerMaker: fill.otherUserId === userId,
          price: fill.price.toString(),
          quantity: fill.quantity.toString(),
          quoteQuantity: (fill.quantity * Number(fill.price)).toString(),
          timestamp: Date.now(),
        },
      });
    });
  }

  updateDbOrders(
    order: Order,
    executedQty: number,
    fills: Fill[],
    market: string
  ) {
    logger.info("DB trades initiated")
    RedisManager.getInstance().pushMessage({
      type: "ORDER_UPDATE",
      data: {
        orderId: order.orderId,
        executedQty: executedQty,
        market: market,
        price: order.price.toString(),
        quantity: order.quantity.toString(),
        side: order.side,
      },
    });
    fills.forEach((fill) => {
      RedisManager.getInstance().pushMessage({
        type: "ORDER_UPDATE",
        data: {
          orderId: fill.orderId,
          executedQty: fill.quantity,
        },
      });
    });
  }

  publishWsTrades(fills: Fill[], userId: string, market: string) {
    fills.forEach((fill) => {
      RedisManager.getInstance().publishMessage(`trade@${market}`, {
        stream: `trade@${market}`,
        data: {
          e: "trade",
          t: fill.tradeId,
          m: fill.otherUserId === userId, 
          p: fill.price,
          q: fill.quantity.toString(),
          s: market,
        },
      });
    });
  }
  publisWsDepthUpdates(
    fills: Fill[],
    price: number,
    side: "buy" | "sell",
    market: string
  ) {
    
    const orderbook = this.orderbooks.find((o) => o?.ticker() === market);
    
    if (!orderbook) return;

    const updatedAsk: Order[] = [];
    const updatedBid: Order[] = [];
    
    
    for (const fill of fills) {
      const orderType = fill.side === "buy" ? "bids" : "asks";

     
    

      if (fill) {
        const updatedOrder: Order = {
          price: fill.price,
          quantity: fill.quantity,
          orderId: fill.orderId,
          side: fill.side,
          userId: fill.otherUserId,
          filled: fill.filled,
        };
    

        if (updatedOrder.quantity > 0) {
          (orderType === "asks" ? updatedAsk : updatedBid).push(updatedOrder);
        }
      }
    }

    if (updatedAsk.length === 0 && updatedBid.length === 0) {
      console.log("No depth changes to publish");
      return;
    }
    console.log(updatedAsk,updatedBid)

    RedisManager.getInstance().publishMessage(`depth@${market}`, {
      stream: `depth@${market}`,
      data: {
        e: "depth",
        a: updatedAsk,
        b: updatedBid,
      },
    });

    console.log("Updated Depth Sent:", { a: updatedAsk, b: updatedBid });
  }

  async loadUserBalancesToRedis() {
    const accounts = await prisma.accountBalance.findMany({});
    

    try {
      accounts.forEach((account) => {
        const redisKey = `balance:${account.userId}`;
        const balanceData = {
          available: account.amount.toString(),
          locked: "0",
        };
        redis.batchLoad(redisKey, balanceData);
      });
      
    } catch (error) {
      console.error("Error occurred while saving balances to Redis", error);
    }
  }

  async loadCryptoToRedis() {
    const cryptos = await prisma.cryptoBalance.findMany();
    if (!cryptos) {
    console.log(`No account found for user crypt`);
      return;
    }

    try {
      const loaded = await Promise.all(
        cryptos.map((crypto) => {
          redis.setHash(`crypto:${crypto.userId}`, {
            [`${crypto.asset}_available`]: crypto?.quantity.toString(),
            [`${crypto.asset}_locked`]: "0",
            asset: crypto?.asset.toString(),
            userId: crypto?.userId.toString(),
            accountId: crypto?.accountId?.toString() as string,
          });
        })
      );
    
    } catch (error) {
      console.log("Error occured while saving crypot balance", error);
    }
  }
  async loadOrdersToRedis() {
    const orders = await prisma.orders.findMany({});

    if (!orders) {
      console.log("No orders found in the redis");
      return;
    }
    try {
      for (const order of orders) {
        await redis.setHash(`order:${order.id}`, {
          market: order.market,
          side: order.side,
          price: order.price.toString(),
          quantity: order.quantity.toString(),
          filled: String(order.filled),
          orderId: order.id,
          userId: order.userId,
        });
      }
      console.log("Loaded order to redis");
    } catch (error) {
      console.log("Error occured while saving the orders", error);
    }
  }

  // Orderbook crafted just for SOL_USDC MARKET
  async updateOrderBook() {
    for (let orderbook of this.orderbooks) {
      if (orderbook?.baseAsset === "SOL") {
        orderbook.bids = [];
        orderbook.asks = [];
      }
    }

    try {
      const keys = await redis.scanKeysStream();
      for (let key in keys) {
        const data = await redis.getAllHashFields(keys[key]);
    
        if (data.market === "SOL") {
          for (let order of this.orderbooks) {
            if (order?.baseAsset === data.market) {
              if (data.side === "buy") {
                order.bids.push({
                  price: Number(data.price),
                  quantity: Number(data.quantity),
                  orderId: data.orderId,
                  filled: Number(data.filled),
                  side: data.side,
                  userId: data.userId,
                });
              } else {
                order.asks.push({
                  price: Number(data.price),
                  quantity: Number(data.quantity),
                  orderId: data.orderId,
                  filled: Number(data.filled),
                  side: data.side==="buy"?"buy":"sell",
                  userId: data.userId,
                });
              }
            }
          }
        }
      }
    
    } catch (error) {
      console.log(error);
    }
  }

  async syncOrderbookToDB() {}
  // setBaseBalances() {
  //     this.balances.set("1", {
  //         [BASE_CURRENCY]: {
  //             available: 10000000,
  //             locked: 0
  //         },
  //         "TATA": {
  //             available: 10000000,
  //             locked: 0
  //         }
  //     });

  //     this.balances.set("2", {
  //         [BASE_CURRENCY]: {
  //             available: 10000000,
  //             locked: 0
  //         },
  //         "TATA": {
  //             available: 10000000,
  //             locked: 0
  //         }
  //     });

  //     this.balances.set("5", {
  //         [BASE_CURRENCY]: {
  //             available: 10000000,
  //             locked: 0
  //         },
  //         "TATA": {
  //             available: 10000000,
  //             locked: 0
  //         }
  //     });
  // }
}

