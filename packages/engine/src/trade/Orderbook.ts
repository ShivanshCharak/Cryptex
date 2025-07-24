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

    async addOrder(order: Order): Promise<{
        fills: Fill[]
        executedQty: number,
    
    }> {
        // console.log("order.side",order.side)
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
        let executedQty = 0;
        
        for (let i = 0; i < this.asks.length; i++) {
            if (this.asks[i].price <= order.price && executedQty < order.quantity) {
                
                let fillableQuantity = this.asks[i].quantity-this.asks[i].filled
                const filledQty = Math.min((order.quantity - executedQty), fillableQuantity);
                executedQty += filledQty;
                
                this.asks[i].filled += filledQty;
                fills.push({
                    price: this.asks[i].price,
                    quantity: this.asks[i].quantity,
                    tradeId: this.lastTradeId++,
                    otherUserId: this.asks[i].userId,
                    orderId: this.asks[i].orderId,
                    side:this.asks[i].side,
                    filled:this.asks[i].filled
                });
                // console.log("fills",fills)
            }
        }
        console.log(order.quantity,executedQty)
        if(order.quantity>executedQty){
            this.bids.push({...order,filled:executedQty})
            fills.push({
                ...order,
                filled:executedQty,
                otherUserId:order.userId,
                tradeId:this.lastTradeId++,
                
            })
            console.log("Partially filled bids updated ", this.bids)
        }
        else{
            console.log("COMPLETELY FILLED")
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
        //  console.log("asks",this.bids)
        const fills: Fill[] = [];
        let executedQty = 0;
        for (let i = 0; i < this.bids.length; i++) {
            if (this.bids[i].price >= order.price && executedQty < order.quantity) {

                let fillableQuantity = this.bids[i].quantity-this.bids[i].filled
                const filledQty = Math.min((order.quantity - executedQty), fillableQuantity);
                executedQty += filledQty;

                this.bids[i].filled += filledQty;
                fills.push({
                    price: this.bids[i].price,
                    quantity: this.bids[i].quantity,
                    tradeId: this.lastTradeId++,
                    otherUserId: this.bids[i].userId,
                    orderId: this.bids[i].orderId,
                    side:this.bids[i].side,
                    filled:this.bids[i].filled
                });
            }
        }
        if(order.quantity>executedQty){
            this.asks.push({...order,filled:executedQty})
            console.log("Partially filled bids updated ", this.bids)
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
