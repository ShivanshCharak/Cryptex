import { useEffect, useRef } from "react";
import { AreaChartManager } from "../utils/charts/AreaChartManager";
import { getKlines } from "../utils/httpClient";
import { KLine } from "../utils/types";
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

export function AreaChartView({
  market,
  range,
}: {
  market: string;
  range: "1D" | "1W" | "1M" | "1Y";
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartManagerRef = useRef<AreaChartManager | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      let klineData: KLine[] = [];
      try {
        const to = Math.floor(Date.now() / 1000);
        const from = Math.floor(getStartTimestamp(range) / 1000);
        klineData = await getKlines(market, "1h", from, to);
        
      } catch (error) {
        console.error("Error fetching area chart data", error);
      }


      const areaData = klineData.map((x) => ({
        value: parseFloat(x.close),
        time: Math.floor(new Date(x.end).getTime() / 1000) as UTCTimestamp,
      }));
    


      if (chartRef.current) {
        chartManagerRef.current?.destroy();
        chartManagerRef.current = new AreaChartManager(chartRef.current, areaData, {
          background: "#0e0f14",
          color: "white",
        });
      }
    };

    fetchData();
  }, [market, range]);

  return <div className="areachart" ref={chartRef} style={{ height: "100%", width: "100%" }} />;
}
