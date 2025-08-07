import { useEffect } from "react";
import { SignalingManager } from "@/app/utils/SignalingManager";
import { useOrders } from "@/app/utils/context/DepthContext";
import { KLine } from "@/app/utils/types";

export function Trades({ market }: { market: string }) {
  const { klines, setKlines } = useOrders();

  if (!klines) {
    console.log("klines undefined", klines);
    return null;
  }

  console.log("Klines present", klines);

  useEffect(() => {
    const instance = SignalingManager.getInstance();

    instance.registerCallback(
      "trade",
      (trades: {
        o: number;
        c: number;
        h: number;
        v: number;
        interval: string;
        l: number;
      }) => {
        console.log("trades gottt",trades)
        setKlines((prev: KLine[]) => {
          const updated = [...prev];
          const klineMapper = new Map<string, number>();

          updated.forEach((val, index) => {
            klineMapper.set(val.end, index);
          });

          if (klineMapper.has(trades.interval)) {
            const index = klineMapper.get(trades.interval)!;
            const existing = updated[index];

            updated[index] = {
              ...existing,
              close: trades.c,
              high: Math.max(existing.high, trades.h),
              low: Math.min(existing.low, trades.l),
              volume: trades.v,
            };
          } else {
            updated.push({
              open: trades.o,
              close: trades.c,
              high: trades.h,
              low: trades.l,
              volume: trades.v,
              end: trades.interval,
            });
          }
          console.log("updated",updated)
          return updated;
        });
      },
      `Trade-${market}`
    );

    instance.sendMessage({
      method: "SUBSCRIBE",
      params: [`trade@${market}`],
    });

    return () => {
      instance.sendMessage({
        method: "UNSUBSCRIBE",
        params: [`trade@${market}`],
      });
      instance.deRegisterCallback("trade", `Trade-${market}`);
    };
  }, [market]);

  return <>yo</>;
}
