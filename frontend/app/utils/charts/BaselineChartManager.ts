import { ISeriesApi } from "lightweight-charts";
import { BaseChartManager } from "./BaseChartManager";

export class BaselineChartManager extends BaseChartManager<"Baseline"> {
  protected addSeries(): ISeriesApi<"Baseline"> {
    return this.chart.addBaselineSeries({
      baseValue: { type: 'price', price: 25 },
      topLineColor: 'rgba( 38, 166, 154, 1)',
      topFillColor1: 'rgba( 38, 166, 154, 0.28)',
      topFillColor2: 'rgba( 38, 166, 154, 0.05)',
      bottomLineColor: 'rgba( 239, 83, 80, 1)',
      bottomFillColor1: 'rgba( 239, 83, 80, 0.05)',
      bottomFillColor2: 'rgba( 239, 83, 80, 0.28)',
      lineWidth: 2,
    
    });
  }
}
