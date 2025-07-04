"use client";
import { useEffect, useState } from "react";
import { Ticker } from "../utils/types";
import { getTicker } from "../utils/httpClient";
import { SignalingManager } from "../utils/SignalingManager";

export const MarketBar = ({ market }: { market: string }) => {
  const [ticker, setTicker] = useState<Ticker | null>(null);

  useEffect(() => {
    getTicker(market).then(setTicker);

    const signaling = SignalingManager.getInstance();

    signaling.registerCallback(
      "ticker",
      (data: Partial<Ticker>) => {
        setTicker((prev) => ({
          firstPrice: data?.firstPrice ?? prev?.firstPrice ?? 0,
          high: data?.high ?? prev?.high ?? 0,
          lastPrice: data?.lastPrice ?? prev?.lastPrice ?? 0,
          low: data?.low ?? prev?.low ?? 0,
          change: data?.change ?? prev?.change ?? 0,
          symbol: data?.symbol ?? prev?.symbol ?? "",
          volume: data?.volume ?? prev?.volume ?? 0,
        }));
      },
      `TICKER-${market}`
    );

    signaling.sendMessage({
      method: "SUBSCRIBE",
      params: [`ticker.${market}`],
    });

    return () => {
      signaling.deRegisterCallback("ticker", `TICKER-${market}`);
      signaling.sendMessage({
        method: "UNSUBSCRIBE",
        params: [`ticker.${market}`],
      });
    };
  }, [market]);

  if (!ticker) return null;

  return (
    <div className="flex items-center flex-row relative w-full overflow-hidden border-b border-slate-800">
      <div className="flex items-center justify-between flex-row no-scrollbar overflow-auto pr-4">
        <MarketInfoLabel market={market} />
        
        <div className="flex items-center flex-row space-x-8 pl-4">
          <div className="flex flex-col h-full justify-center">
            <p className="font-medium tabular-nums text-green-500 text-md">
              ${ticker.firstPrice.toFixed(2)}
            </p>
            <p className="font-medium text-sm tabular-nums">
              ${ticker.lastPrice.toFixed(2)}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="font-medium text-xs text-slate-400">24H Change</p>
            <p
              className={`text-sm font-medium tabular-nums leading-5 ${
                ticker.change >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {ticker.change >= 0 ? "+" : ""}
              {ticker.change.toFixed(2)}%
            </p>
          </div>

          <div className="flex flex-col">
            <p className="font-medium text-xs text-slate-400">24H High</p>
            <p className="text-sm font-medium tabular-nums leading-5">
              ${ticker.high.toFixed(2)}
            </p>
          </div>

          <div className="flex flex-col">
            <p className="font-medium text-xs text-slate-400">24H Low</p>
            <p className="text-sm font-medium tabular-nums leading-5">
              ${ticker.low.toFixed(2)}
            </p>
          </div>

          <button
            type="button"
            className="font-medium transition-opacity hover:opacity-80 hover:cursor-pointer text-base text-left"
          >
            <div className="flex flex-col">
              <p className="font-medium text-xs text-slate-400">24H Volume</p>
              <p className="mt-1 text-sm font-medium tabular-nums leading-5">
                {ticker.volume.toLocaleString()}
              </p>
            </div>
          </button>
        </div>
      </div>
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
            className="z-10 rounded-full h-6 w-6 mt-4 outline-baseBackgroundL1"
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
  