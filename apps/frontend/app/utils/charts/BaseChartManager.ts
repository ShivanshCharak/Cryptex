import {
    ColorType,
    createChart,
    IChartApi,
    ISeriesApi,
    ChartOptions,
    UTCTimestamp,
  } from "lightweight-charts";
  
  export abstract class BaseChartManager<T extends string> {
    protected chart: IChartApi;
    protected series: ISeriesApi<T>;
    protected container: HTMLDivElement;
  
    constructor(
      container: HTMLDivElement,
      layout: { background: string; color: string },
      options?: Partial<ChartOptions>
    ) {
      this.container = container;
  
      this.chart = createChart(container, {
        autoSize: true,
        layout: {
          background: { type: ColorType.Solid, color: layout.background },
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
        ...options,
      });
  
      this.series = this.addSeries();
    }
  
    protected abstract addSeries(): ISeriesApi<T>;
  
    public setData(data: { time: UTCTimestamp; value: number }[]) {
      const sorted = data.sort((a, b) => a.time - b.time);
      this.series.setData(sorted);
      this.chart.timeScale().fitContent();
    }
  
    public destroy() {
      this.chart.remove();
    }
  }
  