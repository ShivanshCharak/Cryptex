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
    // @ts-ignore
    protected series: ISeriesApi<T>;
    protected container: HTMLDivElement;
  
    constructor(
      container: HTMLDivElement,
      layout: { background: string; color: string },
      options?: Partial<ChartOptions>,
      tooltip?:HTMLDivElement
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
      
      this.subscribeToCrossHairMove(tooltip as HTMLDivElement)
      this.series = this.addSeries();
      
    }
    // @ts-ignore
    protected abstract addSeries(): ISeriesApi<T>;

    private subscribeToCrossHairMove(tooltip: HTMLDivElement) {
      this.chart.subscribeCrosshairMove((param) => {
        if (!tooltip || !param.time || param.seriesData.size === 0) {
          tooltip.style.display = "none";
          return;
        }
    
        const data = param.seriesData.values().next().value;
        if (!data) return;
    
        const timestamp = (param.time as UTCTimestamp) * 1000;
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString("en-US");
        const formattedTime = date.toLocaleTimeString("en-US");
        if('value' in data){
          
          tooltip.innerHTML = `
            <div>${formattedDate} <span style="float:right">${formattedTime}</span></div>
            <div>Price: <b>$${data.value.toFixed(2)}</b></div>
          `;
        }
    
        tooltip.style.display = "block";
        tooltip.style.left = `${param.point?.x ?? 0 + 20}px`;
        tooltip.style.top = `${param.point?.y ?? 0 - 100}px`;
      });
    }
    
    public setData(data: { time: UTCTimestamp; value: number }[]) {
      const sorted = data.sort((a, b) => a.time - b.time);
      // @ts-ignore
      this.series.setData(sorted);
      this.chart.timeScale().fitContent();
    }
  
    public destroy() {
      this.chart.remove();
    }
  }
  