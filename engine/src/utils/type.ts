export interface Order {
    price: number;
    quantity: number;
    orderId: string;
    filled: number;
    side: "buy" | "sell";
    userId: string;
}

export interface Fill {
    price: number;
    quantity: number;
    tradeId: number;
    otherUserId: string;
    orderId: string;
    side:"buy"|"sell";
    filled:number
}
export type OrderData = {
  market: string;
  side: string;
  price: number;
  quantity: number;
  filled: number;
  orderId: string;
  userId: string;
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
