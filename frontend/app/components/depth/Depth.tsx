"use client";

import { useEffect, useState } from "react";
import {
  getDepth,
  getTicker,
  getTrades,
} from "../../utils/httpClient";
import { BidTable } from "./BidTable";
import { AskTable } from "./AskTable";
import { SignalingManager } from "../../utils/SignalingManager";
import { TTradeInfo, TDepth } from "@/app/utils/types";
import { useOrders } from "@/app/utils/context/DepthContext";

export function Depth({ market }: { market: string }) {
  const [bids, setBids] = useState<Array<TTradeInfo>>([]);
  const [asks, setAsks] = useState<Array<TTradeInfo>>([]);
  const [price, setPrice] = useState<number>();
  const [DepthType, setDepthType] = useState<string>("Book");
  const { depth, setDepth, latestOrders, trades } = useOrders();

  useEffect(() => {
    console.log(bids);
    setDepth({
      bids: bids,
      asks: asks,
    });


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bids, asks]);
  useEffect(() => {

    SignalingManager.getInstance().registerCallback(
      "depth",
      (PostTradeDepth: TDepth) => {
        console.log(`[${Date.now()}] depth update`, PostTradeDepth);
        console.log("bids new",PostTradeDepth.bids)
        console.log("asks new",PostTradeDepth.asks)
        setBids((originalBids) => {
          
   const newBids: typeof originalBids = [] 

          const askMap = new Map(originalBids.map((bid) => [bid.orderId, bid])); 
          const updatedBid = PostTradeDepth.bids
          let deletedSet= new Set()
          for (let i:number = 0; i < updatedBid.length; i++) { //0(m)
            const staleBid = askMap.get(updatedBid[i].orderId) 
            const remainingQuantity =  updatedBid[i].quantity-updatedBid[i].filled
            if(remainingQuantity<=0){
              deletedSet.add(updatedBid[i].orderId)
            }
            if(remainingQuantity>0){
              if(staleBid){
                newBids.push({
                  ...staleBid,
                  quantity:remainingQuantity,
                  filled:0
                })
              }else{
            
                newBids.push(updatedBid[i])
            }
          }
        }
        const asksSet = new Set(newBids.map((bid)=>bid.orderId))
        let filteredSet = originalBids.filter((val,index)=> !asksSet.has(val.orderId))
        filteredSet = filteredSet.filter((val,index)=>!deletedSet.has(val.orderId))


        const newArr = newBids.concat(filteredSet)
          return newArr.sort((a, b) => Number(a.price) - Number(b.price));
        });

        // ***
        //  convert the bids and asks into maps
        // traverse the updated bids which is coming from the backend
        // and for any matched bid with its orderid update its quantity
        // and if the filled == quantity then eject that order
        // ***
        setAsks((originalAsks) => {
          // Converting ask into map for faster lookups
          const newAsks: typeof originalAsks = [] 

          const askMap = new Map(originalAsks.map((ask) => [ask.orderId, ask])); //o(n)
          // Traverse updated depth came from backend, askMap gonna have all the asks array
          const updatedAsk = PostTradeDepth.asks
          console.log("updatedasks",updatedAsk,updatedAsk.length)
          let deletedSet= new Set()
          for (let i:number = 0; i < updatedAsk.length; i++) { //0(m)
            console.log(i)
            const staleAsk = askMap.get(updatedAsk[i].orderId) // set and filter approach
            console.log(staleAsk)
            const remainingQuantity =  updatedAsk[i].quantity-updatedAsk[i].filled
            if(remainingQuantity<=0){
              deletedSet.add(updatedAsk[i].orderId)
            }
            if(remainingQuantity>0){
              if(staleAsk){
                newAsks.push({
                  ...staleAsk,
                  quantity:remainingQuantity,
                  filled:0
                })
              }else{
            
                newAsks.push(updatedAsk[i])
            }
          }
        }
        console.log("updating asks",newAsks)
        const asksSet = new Set(newAsks.map((asks)=>asks.orderId))
        let filteredSet = originalAsks.filter((val,index)=> !asksSet.has(val.orderId))
        filteredSet = filteredSet.filter((val,index)=>!deletedSet.has(val.orderId))


        const newArr = newAsks.concat(filteredSet)
        console.log(newArr)
          return newArr.sort((a, b) => Number(a.price) - Number(b.price));

        });
        console.log(bids);
      },
      `DEPTH-${market}`
    );
    console.log("bids asks", bids, asks);

    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`depth@${market}`],
    });
    getDepth(market).then((d) => {
    
      setBids(d.bids.reverse());
      setAsks(d.asks);
    });

    getTicker(market).then((t) => setPrice(t.lastPrice));
    getTrades(market).then((t) => setPrice(t[0].price));

    return () => {
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth@${market}`],
      });
      SignalingManager.getInstance().deRegisterCallback(
        "depth",
        `DEPTH-${market}`
      );
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="h-full">
      <div className="flex w-[150px] justify-between ml-7 mt-4">
        <button
          className={`text-[13px] font-bold bg-[#202127] p-2 px-4 rounded-lg duration-300 ${
            DepthType === "Book" ? "bg-[#202127]" : "bg-transparent"
          }`}
          onClick={() => setDepthType("Book")}
        >
          Book
        </button>
        <button
          className={`text-[13px] font-bold p-2 px-4 rounded-lg duration-300 ${
            DepthType === "Trades" ? "bg-[#202127]" : "bg-transparent"
          }`}
          onClick={() => setDepthType("Trades")}
        >
          Trades
        </button>
      </div>

      {/* Shimmer loading UI if depth not available */}
      {/* {!depth?.bids?.length || !depth?.asks?.length ? (
        <div className="p-4 space-y-3">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex justify-between animate-pulse">
              <div className="w-16 h-4 bg-slate-700 rounded"></div>
              <div className="w-16 h-4 bg-slate-700 rounded"></div>
              <div className="w-16 h-4 bg-slate-700 rounded"></div>
            </div>
          ))}
        </div>
      ) : DepthType === "Book" ? (
        <> */}
          <TableHeader />
         
          {asks && <AskTable asks={asks} />}
          {latestOrders && <div>{latestOrders}</div>}
          {bids && <BidTable bids={bids} />}
        {/* </>
      ) : (
        <>
          {trades.length > 0 ? (
            <>
              <TradeHeader />
              <Trades trade={trades} />
            </>
          ) : (
            <h1 className="text-slate-500 text-sm mt-4">No trades found</h1>
          )}
        </>
      )} */}
    </div>
  );
}

function TableHeader() {
  return (
    <div className="flex justify-between text-xs">
      <div className="text-white font-bold p-4 ">Price (USD)</div>
      <div className="text-slate-500 p-4 ">Size (SOL)</div>
      <div className="text-slate-500 p-4">Total (SOL)</div>
    </div>
  );
}

function Trades({ trade }: { trade: TTradeInfo[] }) {
  return (
    <>
      {console.log("tradeeee", trade)}
      {trade.map((item) => (
        <div
          key={item.orderId}
          className={`flex w-full justify-between items-center  py-2 hover:bg-gray-800 transition duration-200 rounded-md cursor-pointer`}
        >
          <div
            className={`w-1/3 text-sm font-medium text-center ${item.side === "buy" ? "text-green-500" : "text-red-500"}`}
          >
            {item.price}
          </div>
          <div className="w-1/3 text-sm font-semibold text-gray-300 text-center">
            {item.quantity}
          </div>
          <div className="w-1/3 text-sm text-center">{item.filled}</div>
        </div>
      ))}
    </>
  );
}
function TradeHeader() {
  return (
    <div className="flex w-full justify-between px-4 py-2 text-xs text-gray-400 font-medium">
      <div className="w-1/3 text-center">Price (USD)</div>
      <div className="w-1/3 text-center">Qty (BTC)</div>
      <div className="w-1/3 text-center">Filled</div>
    </div>
  );
}

function DepthLoading() {
  return <div className="bg-slate-700 w-full h-20"></div>;
}
