import { UTCTimestamp } from "lightweight-charts";
import { ChartData } from '../../types/ChartTypes';

export class DataTransformers {
  static klineToChartData(klineData: any[]): ChartData[] {
    return klineData.map(kline => ({
      time: Math.floor(new Date(kline.end).getTime() / 1000) as UTCTimestamp,
      open: parseFloat(kline.open),
      high: parseFloat(kline.high),
      low: parseFloat(kline.low),
      close: parseFloat(kline.close),
      value: parseFloat(kline.close), // For area/baseline charts
    }));
  }

  static priceDataToChartData(priceData: any[]): ChartData[] {
    return priceData.map(price => ({
      time: (price.timestamp.getTime() / 1000) as UTCTimestamp,
      value: price.value,
    }));
  }

  static getTimeRange(range: string): { from: number; to: number } {
    const now = Date.now();
    let from: number;

    switch (range) {
      case "1D": from = now - 1000 * 60 * 60 * 24; break;
      case "1W": from = now - 1000 * 60 * 60 * 24 * 7; break;
      case "1M": from = now - 1000 * 60 * 60 * 24 * 30; break;
      case "1Y": from = now - 1000 * 60 * 60 * 24 * 365; break;
      default: from = now - 1000 * 60 * 60 * 24 * 7;
    }

    return {
      from: Math.floor(from / 1000),
      to: Math.floor(now / 1000)
    };
  }
}