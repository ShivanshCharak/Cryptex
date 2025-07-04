import { useEffect, useRef } from "react";
import { BaselineChartManager } from "../../utils/charts/BaselineChartManager";
import { getKlines } from "../../utils/httpClient";
import { KLine } from "../../utils/types";
import { UTCTimestamp } from "lightweight-charts";

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
  const chartManagerRef = useRef<BaselineChartManager | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let klineData: KLine[] = [];
      try {
        const to = Math.floor(Date.now() / 1000);
        const from = Math.floor(getStartTimestamp(range) / 1000);
        klineData = await getKlines(market, "1h", from, to);
      } catch (error) {
        console.error("Error fetching baseline chart data", error);
      }

      const baselineData = klineData.map((x) => ({
        value: parseFloat(x.close),
        time: Math.floor(new Date(x.end).getTime() / 1000) as UTCTimestamp,
      }));

      if (chartRef.current) {
        chartManagerRef.current?.destroy();
        chartManagerRef.current = new BaselineChartManager(chartRef.current, {
          background: "#0e0f14",
          color: "white",
        });
        chartManagerRef.current.setData(baselineData);
      }
    };

    fetchData();
  }, [market, range]);

  return <div className="baselinechart" ref={chartRef} style={{ height: "80%", width: "100%" }} />;
}
