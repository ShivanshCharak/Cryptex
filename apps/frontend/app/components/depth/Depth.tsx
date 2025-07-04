"use client";

import { useEffect, useState } from "react";
import { getDepth, getKlines, getTicker, getTrades } from "../../utils/httpClient";
import { BidTable } from "./BidTable";
import { AskTable } from "./AskTable";
import { SignalingManager } from "../../utils/SignalingManager";
import { TTradeInfo,TDepth } from "./type";
import { useRef } from "react";


export function Depth({ market }: { market: string }) {
    const [bids, setBids] = useState<Array<TTradeInfo>>([]);
    const [asks, setAsks] = useState<Array<TTradeInfo>>([]);;
    const [price, setPrice] = useState<string>();

    useEffect(()=>{
        console.log("useffect",bids,asks)
    },[bids,asks])
    useEffect(() => {
        SignalingManager.getInstance().registerCallback("depth", (PostTradeDepth:TDepth) => {

            console.log(`[${Date.now()}] depth update`, PostTradeDepth);

            setBids((originalBids)=>{
                const updatedBids: TTradeInfo[] = [];
                const depthMap = new Map(PostTradeDepth.bids.map(bid => [bid.orderId, bid]));
               

                for (const bid of originalBids) {
                    const depth = depthMap.get(bid.orderId);
                    if (depth) {
                        updatedBids.push({
                            ...bid,
                            quantity: depth.quantity,
                            filled: 0
                        });
                    } else {
                        updatedBids.push({ ...bid });
                    }
                }
            
                return updatedBids;
            })

            setAsks((originalAsks)=>{
                console.log("original ask",originalAsks,PostTradeDepth.asks,PostTradeDepth.bids)
                const askAfterUpdate:TTradeInfo[] = []
                const updatedAsks: TTradeInfo[] = [];
                const depthMap = new Map(PostTradeDepth.asks.map(ask => [ask.orderId, ask]));
                for(const ask of originalAsks){
                    const depth = depthMap.get(ask.orderId)
                    if(depth){
                        updatedAsks.push({
                            ...ask,
                            quantity:depth.quantity,
                            filled:0
                        })
                    }else{
                        updatedAsks.push({...ask})
                    }
                }
    
                // return askAfterUpdate.sort((a, b) => Number(a.price) - Number(b.price));
                return updatedAsks
            })
        }, `DEPTH-${market}`);

        SignalingManager.getInstance().sendMessage({ "method": "SUBSCRIBE", "params": [`depth@${market}`] });
        getDepth(market).then(d => {
            setBids(d.bids.reverse());
            setAsks(d.asks);
        });

        getTicker(market).then(t => setPrice(t.lastPrice));
        getTrades(market).then(t => setPrice(t[0].price));

        return () => {
            SignalingManager.getInstance().sendMessage({ "method": "UNSUBSCRIBE", "params": [`depth@${market}`] });
            SignalingManager.getInstance().deRegisterCallback("depth", `DEPTH-${market}`);
        }
    }, [])
    return <div>
       
        <TableHeader />

        {asks && <AskTable asks={asks} />}
        {price && <div>{price}</div>}
        {bids && <BidTable bids={bids} />}
    </div>
}

function TableHeader() {
    return <div className="flex justify-between text-xs">
        <div className="text-white">Price</div>
        <div className="text-slate-500">Size</div>
        <div className="text-slate-500">Total</div>
    </div>
} 

