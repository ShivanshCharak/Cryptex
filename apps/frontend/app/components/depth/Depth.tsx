"use client";

import { useEffect, useState } from "react";
import {
  getDepth,
  getKlines,
  getTicker,
  getTrades,
} from "../../utils/httpClient";
import { BidTable } from "./BidTable";
import { AskTable } from "./AskTable";
import { SignalingManager } from "../../utils/SignalingManager";
import { TTradeInfo, TDepth } from "./type";
import { useRef } from "react";
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
    console.log("useffect", depth);
  }, [bids, asks]);
  useEffect(() => {
    SignalingManager.getInstance().registerCallback(
      "depth",
      (PostTradeDepth: TDepth) => {
        console.log(`[${Date.now()}] depth update`, PostTradeDepth);

        setBids((originalBids) => {
          const updatedBids: TTradeInfo[] = [];
          const depthMap = new Map(
            PostTradeDepth.bids.map((bid) => [bid.orderId, bid])
          );

          for (const bid of originalBids) {
            const depth = depthMap.get(bid.orderId);
            if (depth) {
              updatedBids.push({
                ...bid,
                quantity: depth.quantity,
                filled: 0,
              });
            } else {
              updatedBids.push({ ...bid });
            }
          }

          return updatedBids;
        });

        setAsks((originalAsks) => {
          console.log(
            "original ask",
            originalAsks,
            PostTradeDepth.asks,
            PostTradeDepth.bids
          );
          const askAfterUpdate: TTradeInfo[] = [];
          const updatedAsks: TTradeInfo[] = [];
          const depthMap = new Map(
            PostTradeDepth.asks.map((ask) => [ask.orderId, ask])
          );
          for (const ask of originalAsks) {
            const depth = depthMap.get(ask.orderId);
            if (depth) {
              updatedAsks.push({
                ...ask,
                quantity: depth.quantity,
                filled: 0,
              });
            } else {
              updatedAsks.push({ ...ask });
            }
          }

          // return askAfterUpdate.sort((a, b) => Number(a.price) - Number(b.price));
          return updatedAsks;
        });
        console.log(bids)
      },
      `DEPTH-${market}`
    );

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
      {!depth?.bids?.length || !depth?.asks?.length ? (
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
        <>
          <TableHeader />
          {asks && <AskTable asks={asks} />}
          {latestOrders && <div>{latestOrders}</div>}
          {bids && <BidTable bids={bids} />}
        </>
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
      )}
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
