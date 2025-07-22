"use client";
import { useEffect, useState } from "react";
import { Ticker } from "../utils/types";
import { useOrders } from "../utils/context/DepthContext";
import { TTradeInfo } from "./depth/type";

export const MarketBar = ({ market }: { market: string }) => {
  const [ticker, setTicker] = useState<Partial<Ticker> | null>(null);
  const [volume, setVolume] = useState<number>(0);
  const { latestOrders, depth } = useOrders();

useEffect(() => {
  if (!depth || !depth.bids.length || !depth.asks.length) return;

  const firstPrice = !isNaN(Number(latestOrders))
    ? latestOrders
    : Number(depth.bids[0]?.price ?? 0);
  const lastPrice = depth.bids.reduce((max, trade: Partial<TTradeInfo>) => {
    return Math.max(max, Number(trade.price ?? 0));
  }, 0);

  const newTicker: Partial<Ticker> = {
    firstPrice,
    lastPrice,
    high: depth.asks.reduce((max, trade: Partial<TTradeInfo>) => {
      return Math.max(max, Number(trade.price ?? 0));
    }, 0),
    low: depth.asks.reduce((min, trade: Partial<TTradeInfo>) => {
      return Math.min(min, Number(trade.price ?? Infinity));
    }, Infinity),
    volume: depth.asks.reduce((sum, ask) => {
      return sum + Number(ask.quantity ?? 0);
    }, 0),
    change: lastPrice && firstPrice ? ((lastPrice - firstPrice) / firstPrice) * 100 : 0, 
  };

  setTicker(newTicker);
}, [depth, latestOrders]);


  return (
    

    <div className="flex items-center flex-row relative w-full border-b border-slate-800 z-20">
      {ticker?<>
      <div className="flex items-center flex-row no-scrollbar overflow-auto pr-4 w-[70%]">
        <MarketInfoLabel market={market} />

        <div className="flex items-center justify-between w-[60%] flex-row space-x-8 pl-4">
          <div className="flex flex-col h-full justify-center overflow-visible">
            {/* First Price */}
            <div className="relative group w-fit">
              <p className="font-medium tabular-nums text-green-500 text-md cursor-help">
                ${ticker?.firstPrice}
              </p>
              <div className="absolute bottom-full left-1/2 translate-y-5 translate-x-[16px] whitespace-nowrap 
              bg-gray-700 text-white text-xs px-2 py-1 rounded 
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 z-50 pointer-events-none">
                Last trade
              </div>
            </div>

            {/* Last Price */}
            <div className="relative group w-fit mt-1">
              <p className="font-medium text-sm tabular-nums cursor-help">
                ${ticker?.lastPrice}
              </p>
              <div className="absolute bottom-full left-1/2 translate-y-5 translate-x-[18px] whitespace-nowrap 
              bg-gray-700 text-white text-xs px-2 py-1 rounded 
              opacity-0 group-hover:opacity-100 
              transition-opacity duration-300 z-50 pointer-events-none">
                Most Expensive Stock
              </div>
            </div>
          </div>

          {/* 24H Change */}
          <div className="flex flex-col w-fit">
            <div className="relative w-fit">
              <div className="group relative w-fit">
                <p className="font-medium text-xs text-slate-400 cursor-help">
                  24H Change
                </p>
                <div className="absolute bottom-full left-1/2 translate-y-10 w-[100px] translate-x-[39px] mb-1 
                  bg-gray-700 text-white text-xs px-2 py-1 rounded 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
                  Price change over 24h
                </div>
              </div>
            </div>
           <p
  className={`text-sm font-medium tabular-nums leading-5 ${
    ticker?.change && ticker.change  >= 0 ? "text-green-500" : "text-red-500"
  }`}
>
  {ticker?.change && ticker.change >= 0 ? "+" : ""}
  {ticker?.change && ticker?.change.toFixed(2)}%
</p>

          </div>

          {/* 24H High */}
          <div className="flex flex-col w-fit">
            <div className="relative w-fit">
              <div className="group relative w-fit">
                <p className="font-medium text-xs text-slate-400 cursor-help">
                  24H High
                </p>
                <div className="absolute bottom-full left-1/2 translate-y-[40px] w-[100px] translate-x-[29px] mb-1
                      bg-gray-700 text-white text-xs px-2 py-1 rounded
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 z-50 pointer-events-none">
                  Highest price in 24h
                </div>
              </div>
            </div>
            <p className="text-sm font-medium tabular-nums leading-5">
              ${ticker?.high}
            </p>
          </div>

          {/* 24H Low */}
          <div className="flex flex-col w-fit">
            <div className="relative w-fit">
              <div className="group relative w-fit">
                <p className="font-medium text-xs text-slate-400 cursor-help">
                  24H Low
                </p>
                <div className="absolute bottom-full left-1/2 translate-y-[40px] w-[100px] translate-x-[29px] mb-1 
                      bg-gray-700 text-white text-xs px-2 py-1 rounded
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 z-50 pointer-events-none">
                  Lowest price in 24h
                </div>
              </div>
            </div>
            <p className="text-sm font-medium tabular-nums leading-5">
              ${ticker?.low?.toFixed(2)}
            </p>
          </div>

          {/* 24H Volume */}
          <div className="flex flex-col w-fit">
            <div className="relative w-fit">
              <div className="group relative w-fit">
                <p className="font-medium text-xs text-slate-400 cursor-help">
                  24H Volume
                </p>
                <div className="absolute bottom-full left-1/2 translate-y-[40px] w-[100px] translate-x-[36px] mb-1 
                      bg-gray-700 text-white text-xs px-2 py-1 rounded
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300 z-50 pointer-events-none">
                  Total traded volume in 24h
                </div>
              </div>
            </div>
            <p
              className={`mt-1 text-sm font-medium tabular-nums leading-5 ${
                ticker.volume && volume > ticker?.volume ? "text-red-500" : "text-green-500"
              }`}
            >
              {ticker?.volume?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      </>:<TickerLoading/>}
    </div>
  );
};

function MarketInfoLabel({ market }: { market: string }) {
  return (
    <div className="flex h-[60px] shrink-0 space-x-4">
      <div className="flex flex-row relative ml-2 -mr-4">
        <img
          alt="Base Token Logo"
          loading="lazy"
          decoding="async"
          className="z-10 rounded-full h-6 w-6 mt-4"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVvBqZC_Q1TSYObZaMvK0DRFeHZDUtVMh08Q&s"
        />
        <img
          alt="Quote Token Logo"
          loading="lazy"
          decoding="async"
          className="h-6 w-6 -ml-2 mt-4 rounded-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVvBqZC_Q1TSYObZaMvK0DRFeHZDUtVMh08Q&s"
        />
      </div>
      <button type="button" className="react-aria-Button" data-rac="">
        <div className="flex items-center justify-between flex-row cursor-pointer rounded-lg p-3 hover:opacity-80">
          <div className="flex items-center flex-row gap-2">
            <div className="flex flex-row relative">
              <p className="font-medium text-sm">{market.replace("_", " / ")}</p>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
function TickerLoading(){
  return(<>

  
    <div className="flex items-center flex-row relative w-full border-b border-slate-800 z-20">
      <div className="flex items-center flex-row no-scrollbar overflow-auto pr-4 w-[70%]">
        <div className="flex h-[60px] shrink-0 space-x-4">
          <div className="flex flex-row relative ml-2 -mr-4">
            <div className="h-6 w-6 rounded-full bg-slate-700 animate-pulse mt-4" />
            <div className="h-6 w-6 -ml-2 rounded-full bg-slate-700 animate-pulse mt-4" />
          </div>
          <div className="h-6 w-24 rounded-md bg-slate-700 animate-pulse mt-4" />
        </div>

        <div className="flex items-center justify-between w-[60%] flex-row space-x-8 pl-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="flex flex-col space-y-2">
              <div className="h-3 w-16 bg-slate-700 rounded animate-pulse" />
              <div className="h-5 w-24 bg-slate-700 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  </>)
}