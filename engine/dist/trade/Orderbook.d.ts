import { Order, Fill } from "../utils/type";
export declare class Orderbook {
    bids: Order[];
    asks: Order[];
    baseAsset: string;
    quoteAsset: string;
    lastTradeId: number;
    currentPrice: number;
    constructor(baseAsset: string, bids: Order[], asks: Order[], lastTradeId: number, currentPrice: number);
    ticker(): string;
    getSnapshot(): {
        baseAsset: string;
        bids: Order[];
        asks: Order[];
        lastTradeId: number;
        currentPrice: number;
    };
    addOrder(order: Order): Promise<{
        fills: Fill[];
        executedQty: number;
    }>;
    matchBid(order: Order): {
        fills: Fill[];
        executedQty: number;
    };
    matchAsk(order: Order): {
        fills: Fill[];
        executedQty: number;
    };
}
