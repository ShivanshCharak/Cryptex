
import { RedisManager } from "../RedisManager";
import { AmountDepositScript, AmountLockingScript, OrderBuyScript } from "../utils/luaScript";
import { Orderbook } from "./Orderbook"
import { Order,Fill } from "../utils/type";
import fs from 'fs'
import prisma from 'postgres-prisma'
import { Depth,BASE_CURRENCY,UserBalance } from "../utils/type";


export const redis = new RedisManager()
export class Engine {
    private orderbooks: Partial<Orderbook[]> = []

    private DepthMap: Depth = {}

    constructor() {
        let snapshot = null
        this.orderbooks = [new Orderbook('SOL',[],[],0,0)]
    }

    async init(){
        if (process.env.WITH_SNAPSHOT) {
            const snapshot = fs.readFileSync("./snapshot.json");
            // parse snapshot here...
        } else {
            console.log("INIT CALLED")
            await this.loadOrdersToRedis();      // DB -> Redis
            await this.updateOrderBook();        // Redis -> this.orderbooks[]
            await this.loadUserBalancesToRedis();
            await this.loadCryptoToRedis();

        }
    }

    async process({ message, clientId }: { message: any, clientId: string }) {
        switch (message.type) {

            case "CREATE_ORDER": {
                try {
                    console.log("message",message)

                    const { executedQty, fills, bids, asks } = await this.createOrder(message.data.market, message.data.price, message.data.quantity, message.data.side, message.data.userId)
                    

                    RedisManager.getInstance().sendToApi(clientId, {
                        type: "ORDER_PLACED",
                        payload: {
                            executedQty,
                            fills
                        }
                    })


                } catch (error) {
                    console.error("Create order error", error)
                }
            }
            case "CANCEL_ORDER":
                try {
                    const orderId = message.data.orderId
                    const cancelMarket = message.data.market
                    const cancelOrder = this.orderbooks.find(o => o.ticker() === cancelMarket)

                } catch (error) {
                    console.error("Camcel_Order error", error)
                }
                break
            case "GET_DEPTH":
                try {
                

                    const market = message.data.market;
                    const orderbook = this.orderbooks.find(o => (o?.ticker() === market));

                    // console.log(await this.depthFilter())
                    if (!orderbook) {
                        throw new Error("No orderbook found");
                    }

                    RedisManager.getInstance().sendToApi(clientId, {
                        type: "DEPTH",
                        payload: { bids: orderbook.bids, asks: orderbook.asks }
                    });
                } catch (e) {
                    console.log(e);
                    RedisManager.getInstance().sendToApi(clientId, {
                        type: "DEPTH",
                        payload: {
                            bids: [],
                            asks: []
                        }
                    });
                }
                break;

        }
    }
    // Base asset:- TATA, Quote asset:- Inr
    async createOrder(market: string, price: string, quantity: number, side: "buy" | "sell", userId: string) {
        const orderbook = this.orderbooks.find(o => o.ticker() === market)
        const baseAsset = market.split('_')[0]
        const quoteAsset = market.split('_')[1]




        if (!orderbook) {
            throw new Error("No orderbook found")
        }

        const totalCost = Number(price) * quantity
        console.log("proceeding to lock funds")


        // if (!success || Number(success) === 0) {
        //     throw new Error("Insufficient funds");
        // }
        const order: Order = {
            price: Number(price),
            quantity: Number(quantity),
            orderId: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            filled: 0,
            side,
            userId,
        }

        const { fills, executedQty } = await orderbook.addOrder(order)
        console.log("fills",fills)
      
        await Promise.all(
            fills.map((fill) => (
                this.InitiateRedisTrades(fill.orderId, userId, fill.otherUserId, Number(fill.price), fill.qty, fill.side,fill?.filled)
            ))
        )
       
        // Till this code array and redis is syncing perfectly the trades is also great


    this.createDbTrades(fills, market, userId)
        await this.updateOrderBook()

        this.publisWsDepthUpdates(fills, price, side, market);
        // this.updateDbOrders(order, executedQty, fills, market)
        this.publishWsTrades(fills, userId, market);
        return { fills, executedQty }

    }


    async InitiateRedisTrades(
        orderId: string,
        buyerUserId: string,
        sellerUserId: string,
        price: number,
        fillAmount: number,
        side: 'buy' | 'sell',
        filled?:number
    ) {
        console.log("redis trades", orderId, buyerUserId, sellerUserId, price, fillAmount, side,filled)
        try {
            // Input validation
            if (isNaN(price) || isNaN(fillAmount)) {
                throw new Error('Invalid price or fill amount');
            }

            const result = await redis.evaluateTransaction(OrderBuyScript, {

                arguments: [
                    orderId,
                    buyerUserId,
                    sellerUserId,
                    price.toString(),
                    fillAmount.toString(),
                    side,
                    filled?.toString()
                ]
            });
            console.log(result)
            if (result?.err) {
                throw new Error(JSON.stringify(result.err));
            }
            return result;
        } catch (error) {
            console.error('Trade initiation failed:', error);
            throw error;
        }
    }




    createDbTrades(fills: Fill[], market: string, userId: string) {
        fills.forEach(fill => {
            RedisManager.getInstance().pushMessage({
                type: "TRADE_ADDED",
                data: {
                    market,
                    id: fill.tradeId.toString(),
                    isBuyerMaker: fill.otherUserId === userId,
                    price: fill.price,
                    quantity: fill.qty.toString(),
                    quoteQuantity: (fill.qty * Number(fill.price)).toString(),
                    timestamp: Date.now()
                }
            })
        })
    }

    updateDbOrders(order: Order, executedQty: number, fills: Fill[], market: string) {
        RedisManager.getInstance().pushMessage({
            type: "ORDER_UPDATE",
            data: {
                orderId: order.orderId,
                executedQty: executedQty,
                market: market,
                price: order.price.toString(),
                quantity: order.quantity.toString(),
                side: order.side
            }
        })
        fills.forEach(fill => {
            RedisManager.getInstance().pushMessage({
                type: "ORDER_UPDATE",
                data: {
                    orderId: fill.orderId,
                    executedQty: fill.qty
                }
            })
        })
    }

    publishWsTrades(fills: Fill[], userId: string, market: string) {
        fills.forEach(fill => {
            RedisManager.getInstance().publishMessage(`trade@${market}`, {
                stream: `trade@${market}`,
                data: {
                    e: "trade",
                    t: fill.tradeId,
                    m: fill.otherUserId === userId, // TODO: Is this right?
                    p: fill.price,
                    q: fill.qty.toString(),
                    s: market,
                }
            });
        });
    }
    publisWsDepthUpdates(
        fills: Fill[],
        price: string,
        side: "buy" | "sell",
        market: string,
    ) {
        console.log("publishing");
    
        const orderbook = this.orderbooks.find(o => o?.ticker() === market);
        if (!orderbook) return;
    
    
    
        const updatedAsk: Order[] = [];
        const updatedBid: Order[] = [];

        for( const fill of fills){
            const orderType = fill.side==="buy"?"bids":"asks"
            const updatedOrder:Order ={
                price:Number(fill.price),
                quantity:fill.qty-fill.filled,
                orderId:fill.orderId,
                side:fill.side,
                userId:fill.otherUserId
            }
            if(updatedOrder.quantity>=0){
               
                const foundOrder = orderbook[orderType].find((order)=>order.orderId===updatedOrder.orderId) 
                console.log("Founded order",foundOrder)
                if(foundOrder){
                    if(foundOrder.quantity!==updatedOrder.quantity){
                        foundOrder.quantity=updatedOrder.quantity
                        foundOrder.filled=0
                    }
                    console.log("Found order and after updating the order", foundOrder)
                }
                if(updatedOrder.quantity>0){
                    (orderType==="asks"?updatedAsk:updatedBid).push(updatedOrder)
                    }
                }
            }

    if (updatedAsk.length === 0 && updatedBid.length === 0) {
        console.log("No depth changes to publish");
        return;
    }

    // Send only the changes
    RedisManager.getInstance().publishMessage(`depth@${market}`, {
        stream: `depth@${market}`,
        data: {
            e: "depth",
            a: updatedAsk,
            b: updatedBid
        }
    });

    console.log("Updated Depth Sent:", { a: updatedAsk, b: updatedBid });
        }
    
    

    async loadUserBalancesToRedis() {

        const accounts = await prisma.accountBalance.findMany({});

        try {

            accounts.forEach((account) => {
                const redisKey = `balance:${account.userId}`
                const balanceData = {
                    available: account.amount.toString(),
                    locked: "0"
                }
                redis.batchLoad(redisKey, balanceData)
            })
            console.log("✅ Balance loaded to Redis successfully");
        } catch (error) {
            console.error("❌ Error occurred while saving balances to Redis", error);
        }
    }


    async loadCryptoToRedis() {
        const cryptos = await prisma.cryptoBalance.findMany()
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
                        accountId: crypto?.accountId?.toString(),
                       

                    })
                })

            )
            console.log(loaded, "Cryoti balance loaded")

        } catch (error) {
            console.log("Error occured while saving crypot balance", error)
        }
    }
    async loadOrdersToRedis() {
        const orders = await prisma.orders.findMany({})

        if (!orders) {
            console.log("No orders found in the redis")
            return
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
            console.log("Loaded order to redis")
        } catch (error) {
            console.log("Error occured while saving the orders", error)
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
            const keys = await redis.scanKeysStream()
            for (let key in keys) {
                const data = await redis.getAllHashFields(keys[key])
                console.log("Populate orderbook", data)
                if (data.market === "SOL") {
                    for (let order of this.orderbooks) {
                        if (order?.baseAsset === data.market) {
                            console.log(order.baseAsset)
                            if (data.side === 'buy') {
                                order.bids.push({
                                    price: Number(data.price),
                                    quantity: Number(data.quantity),
                                    orderId: data.orderId,
                                    filled: Number(data.filled),
                                    side: data.side,
                                    userId: data.userId

                                })
                            } else {
                                order.asks.push({
                                    price: Number(data.price),
                                    quantity: Number(data.quantity),
                                    orderId: data.orderId,
                                    filled: Number(data.filled),
                                    side: data.side,
                                    userId: data.userId

                                })
                            }
                        }
                    }
                }
            }
            console.log("Orderbook crafted")
        } catch (error) {
            console.log(error)
        }
    }


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