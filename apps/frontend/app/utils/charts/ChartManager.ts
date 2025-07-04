import {
  ColorType,
  createChart as createLightWeightChart,
  CrosshairMode,
  ISeriesApi,
  UTCTimestamp,
} from "lightweight-charts";

export class ChartManager {
  private candleSeries: ISeriesApi<"Candlestick">;
  private maSeries: ISeriesApi<"Line">; // ✅ Added
  private lastUpdateTime: number = 0;
  private chart: any;

  private currentBar: {
    open: number | null;
    high: number | null;
    low: number | null;
    close: number | null;
  } = {
    open: null,
    high: null,
    low: null,
    close: null,
  };

  constructor(ref: any,tooltipel:HTMLDivElement,initialData: any[],layout: { background: ColorType.Solid; color: string }) {
    
    const chart = createLightWeightChart(ref, {
      autoSize: true,
      overlayPriceScales: {
        ticksVisible: true,
        borderVisible: true,
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        visible: true,
        ticksVisible: true,
        entireTextOnly: true,
      },
      grid: {
        horzLines: { visible: true, color:"#2c2d3c" },
        vertLines: { visible: false},
      },
      localization: {
        locale: "ja-JP",
        dateFormat: "dd MM 'yy",
      },
      layout: {
        background: {
          type: ColorType.Solid,
          color: layout.background,
        },
        textColor: "white",
      },
    });

    this.chart = chart;
    
    const transformedData = initialData.map((data) => ({
      ...data,
      time: (data.timestamp.getTime() / 1000) as UTCTimestamp,
    }));

    this.candleSeries = chart.addCandlestickSeries();
    this.candleSeries.setData(transformedData);
    
    this.maSeries = chart.addLineSeries({
      color: "#2962FF",
      lineWidth: 2,
      priceLineVisible:false,
    });
    this.candleSeries=chart.addCandlestickSeries({
      priceScaleId:''
    })
    
    
    this.subscribeToCrosshairMove(tooltipel);
  }
  


  public update(updatedPrice: any) {
    if (!this.lastUpdateTime) {
      this.lastUpdateTime = new Date().getTime();
    }

    this.candleSeries.update({
      time: (this.lastUpdateTime / 1000) as UTCTimestamp,
      close: updatedPrice.close,
      low: updatedPrice.low,
      high: updatedPrice.high,
      open: updatedPrice.open,
    });

    if (updatedPrice.newCandleInitiated) {
      this.lastUpdateTime = updatedPrice.time;
    }
  }

  public setLocale(locale: string) {
    this.chart.applyOptions({
      localization: {
        locale,
        dateFormat: locale === "ja-JP" ? "yyyy-MM-dd" : "dd MMM 'yy",
      },
    });
  }
      // Subscribe to crosshair and show tooltip
      private subscribeToCrosshairMove(tooltipEl: HTMLDivElement) {
        console.log("1")
        this.chart.subscribeCrosshairMove((param) => {
          const tooltip = tooltipEl;
          if (!tooltip || !param.time || param.seriesData.size === 0) {
            tooltip.style.display = "none";
            return;
          }
        
          const data = param.seriesData.values().next().value;
          if (!data) return;
        
          const { open, high, low, close } = data;
          const change = close - open;
          const changePercent = ((change / open) * 100).toFixed(2);
          const changeColor = change >= 0 ? "#00ff94" : "#ff5b5b";
        
          const timestamp = (param.time as UTCTimestamp) * 1000;
          const date = new Date(timestamp);
          const formattedDate = date.toLocaleDateString("en-US");
          const formattedTime = date.toLocaleTimeString("en-US");
        
          tooltip.innerHTML = `
            <div>${formattedDate} <span style="float:right">${formattedTime}</span></div>
            <div>Open: <b>$${open.toLocaleString()}</b></div>
            <div>High: <b>$${high.toLocaleString()}</b></div>
            <div>Low: <b>$${low.toLocaleString()}</b></div>
            <div>Close: <b>$${close.toLocaleString()}</b></div>
            <div>Change: <b style="color:${changeColor}">$${change.toFixed(2)} (${changePercent}%)</b></div>
          `;
        
          tooltip.style.display = "block";
          tooltip.style.left = `${param.point?.x ?? 0 + 20}px`;
          tooltip.style.top = `${param.point?.y ?? 0 - 100}px`;
        });
        
      }
      

  public destroy() {
    this.chart.remove();
  }
}
function formatVolume(vol: number): string {
  if (vol >= 1e12) return `$${(vol / 1e12).toFixed(2)}T`;
  if (vol >= 1e9) return `$${(vol / 1e9).toFixed(2)}B`;
  if (vol >= 1e6) return `$${(vol / 1e6).toFixed(2)}M`;
  if (vol >= 1e3) return `$${(vol / 1e3).toFixed(2)}K`;
  return `$${vol.toFixed(2)}`;
}

