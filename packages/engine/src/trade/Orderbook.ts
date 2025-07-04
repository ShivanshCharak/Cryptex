import { BASE_CURRENCY,Order,Fill } from "../utils/type";
import { redis } from "./Engine";

export class Orderbook {
    bids: Order[];
    asks: Order[];
    baseAsset: string;
    quoteAsset: string = BASE_CURRENCY;
    lastTradeId: number;
    currentPrice: number;


    constructor(baseAsset: string, bids: Order[], asks: Order[], lastTradeId: number, currentPrice: number) {
        this.bids = bids;
        this.asks = asks;
        this.baseAsset = baseAsset;
        this.lastTradeId = lastTradeId || 0;
        this.currentPrice = currentPrice ||0;
    }

    ticker() {
        return `${this.baseAsset}_${this.quoteAsset}`;
    }

    getSnapshot() {
        return {
            baseAsset: this.baseAsset,
            bids: this.bids,
            asks: this.asks,
            lastTradeId: this.lastTradeId,
            currentPrice: this.currentPrice
        }
    }

    //TODO: Add self trade prevention
    async addOrder(order: Order): Promise<{
        fills: Fill[]
        executedQty: number,
    
    }> {
        console.log("order.side",order.side)
        if (order.side === "buy") {
            const {executedQty, fills} = this.matchBid(order); 

            order.filled = executedQty;
            if (order.filled === order.quantity) {
                return {
                    executedQty,
                    fills,
                }
            }
            this.bids.push(order)
            
            return {
              
                executedQty,
                fills
            }
        } else {
            const {executedQty, fills} = this.matchAsk(order);
            order.filled = executedQty;
            if (order.filled === order.quantity) {
                return {
                    executedQty,
                    fills
                }
            }
            this.asks.push(order);
            // console.log("fills and bids ", this.bids,order)
            return {
                
                executedQty,
                fills
            }
        }
    }

    //  sell = ask, bids=buy
    matchBid(order: Order): {fills: Fill[], executedQty: number} {
        const fills: Fill[] = [];
        // console.log("asks",this.asks.length,this.asks,this.bids.length,this.bids)
        let executedQty = 0;
        
        for (let i = 0; i < this.asks.length; i++) {
            if (this.asks[i].price <= order.price && executedQty < order.quantity) {
                
                let fillableQuantity = this.asks[i].quantity-this.asks[i].filled
                const filledQty = Math.min((order.quantity - executedQty), fillableQuantity);
                executedQty += filledQty;
                
                this.asks[i].filled += filledQty;
                // console.log("asks price",this.asks[i].orderId,"asks quantityt",this.asks[i].quantity,"filledQty" ,filledQty, "executedQty", executedQty)
                fills.push({
                    price: this.asks[i].price.toString(),
                    qty: this.asks[i].quantity,
                    tradeId: this.lastTradeId++,
                    otherUserId: this.asks[i].userId,
                    orderId: this.asks[i].orderId,
                    side:this.asks[i].side,
                    filled:this.asks[i].filled
                });
                console.log("fills",fills)
            }
        }
        for (let i = 0; i < this.asks.length; i++) {
            if (this.asks[i].filled === this.asks[i].quantity) {
                this.asks.splice(i, 1);
                i--;
            }
        }
        return {
           
            fills,
            executedQty
        };
    }

    matchAsk(order: Order): {fills: Fill[], executedQty: number} {
        console.log("MATCHASK")
        const fills: Fill[] = [];
        let executedQty = 0;
        for (let i = 0; i < this.bids.length; i++) {
            if (this.bids[i].price >= order.price && executedQty < order.quantity) {

                let fillableQuantity = this.bids[i].quantity-this.bids[i].filled
                const filledQty = Math.min((order.quantity - executedQty), fillableQuantity);
                executedQty += filledQty;

                this.bids[i].filled += filledQty;
                fills.push({
                    price: this.bids[i].price.toString(),
                    qty: this.bids[i].quantity,
                    tradeId: this.lastTradeId++,
                    otherUserId: this.bids[i].userId,
                    orderId: this.bids[i].orderId,
                    side:this.bids[i].side,
                    filled:this.bids[i].filled
                });
            }
        }
        for (let i = 0; i < this.bids.length; i++) {
            if (this.bids[i].filled === this.bids[i].quantity) {
                this.bids.splice(i, 1);
                i--;
            }
        }
        
        return {

            fills,
            executedQty
        };
    }

  
  
}
