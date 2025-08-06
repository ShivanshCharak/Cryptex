"use client"
import { useEffect, useRef } from "react";
import { ChartManager } from "../../utils/charts/ChartManager";
import { getKlines } from "../../utils/httpClient";
import { useOrders } from "@/app/utils/context/DepthContext";
import { KLine } from "../../utils/types";
import { ColorType } from "lightweight-charts";
import { Trades } from "./Trades";


function getStartTimestamp(range: string): number {
  const now = Date.now();
  switch (range) {
    case "1D": return now - 1000 * 60 * 60 * 24;
    case "1W": return now - 1000 * 60 * 60 * 24 * 7;
    case "1M": return now - 1000 * 60 * 60 * 24 * 30;
    case "1Y": return now - 1000 * 60 * 60 * 24 * 365;
    default: return now - 1000 * 60 * 60 * 24 * 7;
  }
}
// TRADEE VIEW CHANGE HERE IF ANY CHNAG

export function TradeView({
  market,
  range,
}: {
  market: string;
  range: "1D" | "1W" | "1M" | "1Y";
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<ChartManager | null>(null);
const tooltipRef = useRef<HTMLDivElement>(null);
const {setKlines, klines} = useOrders()



useEffect(() => {
  const init = async () => {
    
    let klineData: KLine[] = [];
    try {
      const to = Math.floor(Date.now() / 1000);
      const from = Math.floor(getStartTimestamp(range) / 1000);
      klineData = await getKlines(market, "1w", from, to);
      setKlines(klineData)
      } catch (e) {
        console.error("Failed to fetch klines", e);
      }

      if (chartRef.current) {
        chartManagerRef.current?.destroy();

        const chartManager = new ChartManager(
          chartRef.current,
          tooltipRef.current as HTMLDivElement,
          klineData
            .map((x) => ({
              close: parseFloat(x.close),
              high: parseFloat(x.high),
              low: parseFloat(x.low),
              open: parseFloat(x.open),
              timestamp: new Date(x.end),
            }))
            .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()),
            {
              background:ColorType.Solid,
              color:"#0e0f14",
            },
          
        );

        chartManagerRef.current = chartManager;
      }
    };

    init();


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(()=>{
    if(klines){

      chartManagerRef.current?.update(klines[klines?.length-1])
    }
  },[klines])

  return (
    <div style={{ position: "relative", height: "70%", width: "100%" }}>

     {klines &&klines.length>0 && <Trades market={"SOL_USDC" as string} />}
      <div
        ref={chartRef}
        className="tradechart"
        style={{ height: "100%", width: "100%", marginTop: 4 }}
      />
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          display: "none",
          backgroundColor: "green",
          padding: "10px 14px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
          color: "white",
          fontSize: "12px",
          zIndex: 1000,
          pointerEvents: "none",
          whiteSpace: "nowrap",
          minWidth: "200px",
        }}
      />
    </div>
  );
  
}
