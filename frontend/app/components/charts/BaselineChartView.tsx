import { useEffect, useRef } from "react";
import { BaselineChartManager } from "../../utils/charts/BaselineChartManager";
import { getKlines } from "../../utils/httpClient";
import { KLine } from "../../utils/types";
import { UTCTimestamp } from "lightweight-charts";
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

export function BaselineChartView({
  market,
  range,
}: {
  market: string;
  range: "1D" | "1W" | "1M" | "1Y";
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null); // ✅ Tooltip ref
  const chartManagerRef = useRef<BaselineChartManager | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let klineData: KLine[] = [];
      try {
        const to = Math.floor(Date.now() / 1000);
        const from = Math.floor(getStartTimestamp(range) / 1000);
        klineData = await getKlines(market, "1h", from, to);
        console.log(klineData)
      } catch (error) {
        console.error("Error fetching baseline chart data", error);
      }

      const baselineData = klineData.map((x) => ({
        value: parseFloat(x.close),
        time: Math.floor(new Date(x.end).getTime() / 1000) as UTCTimestamp,
      }));

      if (chartRef.current && tooltipRef.current) {
        chartManagerRef.current?.destroy();
        chartManagerRef.current = new BaselineChartManager(chartRef.current, {
          background: "#0e0f14",
          color: "white",
        }, undefined, tooltipRef.current); // ✅ Pass tooltip
        chartManagerRef.current.setData(baselineData);
      }
    };

    fetchData();
  }, [market, range]);

  return (
    <div style={{ position: "relative", height: "70%", width: "100%" }}>
      <div className="baselinechart" ref={chartRef} style={{ height: "100%", width: "100%" }} />
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          display: "none",
          backgroundColor: "#1e1e2f",
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
