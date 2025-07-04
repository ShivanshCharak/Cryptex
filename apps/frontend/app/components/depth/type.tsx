export type TTradeInfo = {
    filled: number,
    market:string,
    orderId:string,
    price:string,
    quantity:string,
    side:string,
    userId:string,
}

export type TDepth= {
    bids:TTradeInfo[],
    asks:TTradeInfo[]
}

