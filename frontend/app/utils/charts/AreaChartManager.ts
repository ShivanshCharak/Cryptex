import {
  ColorType,
  createChart,
  IChartApi,
  ISeriesApi,
  LineData,
  UTCTimestamp,
} from "lightweight-charts";

export class AreaChartManager {
  private chart: IChartApi;
  private areaSeries: ISeriesApi<"Area">;

  constructor(
    ref: HTMLDivElement,
    data: { time: UTCTimestamp; value: number }[],
    layout: { background: string; color: string }
  ) {
    this.chart = createChart(ref, {
      autoSize: true,
      layout: {
        background: {
          type: ColorType.Solid,
          color: layout.background,
        },
        textColor: layout.color,
      },
      rightPriceScale: {
        visible: true,
        entireTextOnly: true,
        borderVisible: false,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: true, color: "#2c2d3c" },
      },
    });

    this.areaSeries = this.chart.addAreaSeries({
      // @ts-ignore
      baseValue: { type: 'price', price: 25 },
      topLineColor: 'rgba( 38, 166, 154, 1)',
      topFillColor1: 'rgba( 38, 166, 154, 0.28)',
      topFillColor2: 'rgba( 38, 166, 154, 0.05)',
      bottomLineColor: 'rgba( 239, 83, 80, 1)',
      bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
      bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',
      lineWidth: 2,
    });
    const sorted = data
  .sort((a, b) => a.time - b.time)
  .map((point) => ({
    value: point.value,
    time: point.time as UTCTimestamp,
  }));

this.areaSeries.setData(sorted);

    // this.areaSeries.setData(data);
    this.chart.timeScale().fitContent();
  }

  public destroy() {
    this.chart.remove();
  }
}
