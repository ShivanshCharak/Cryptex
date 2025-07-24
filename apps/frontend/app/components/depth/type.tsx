export type TTradeInfo = {
    filled: number,
    market:string,
    orderId:string,
    price:number,
    quantity:number,
    side:string,
    userId:string,
}

export type TDepth= {
    bids:TTradeInfo[],
    asks:TTradeInfo[]
}

