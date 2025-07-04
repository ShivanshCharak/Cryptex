export interface Order {
    price: number;
    quantity: number;
    orderId: string;
    filled: number;
    side: "buy" | "sell";
    userId: string;
}

export interface Fill {
    price: string;
    qty: number;
    tradeId: number;
    otherUserId: string;
    orderId: string;
    side:"buy"|"sell";
    filled:number
}


type PriceQty = {
    price: number,
    quantity:number,

}

export type Depth = {
    [market: string]: {
        bids: Map<string, PriceQty> 
        asks: Map<string, PriceQty>
    }
}

export const BASE_CURRENCY = "USDC";

export interface UserBalance {
    [key: string]: {
        available: number,
        locked: number
    }
}
