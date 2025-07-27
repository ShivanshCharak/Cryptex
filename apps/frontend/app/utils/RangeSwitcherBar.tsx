import React, { useState } from "react";
import { BarChart, LineChart } from './SVGPool';
import { ChartType } from "../types/ChartTypes";

const ranges = ["1D", "1W", "1M", "1Y"] as const;
type RangeType = typeof ranges[number];

export default function RangeSwitcherBar({
  activeRange,
  onRangeChange,
  setChartType,
  chartType
}: {
  activeRange: string;
  onRangeChange: (range: RangeType) => void;
  setChartType: (chartType: string) => void;
  chartType: String;
}) {
  const [showMagnified, setShowMagnified] = useState(false);

  // Map your existing chart types to the new Chart Factory types
  const mapToChartFactoryType = (type: string): ChartType => {
    switch (type) {
      case "barchart":
        return ChartType.CANDLESTICK;
      case "linechart":
        return ChartType.LINE;
      case "baseline":
        return ChartType.BASELINE;
      case "area":
        return ChartType.AREA;
      default:
        return ChartType.CANDLESTICK;
    }
  };

  // Handle chart type change and pass the mapped type
  const handleChartTypeChange = (type: string) => {
    setChartType(type);
    // You can also emit the mapped ChartType if needed elsewhere
    const mappedType = mapToChartFactoryType(type);
    console.log('Chart type changed to:', mappedType);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#0e0f14] text-white rounded-md space-x-2 overflow-x-auto max-w-[90%]">
      {/* Left Group */}
      <div className="flex space-x-2 items-center py-1 px-2 border rounded-md border-transparent">
        <button className="px-3 py-1 rounded text-white hover:bg-[#1b1e29] font-medium text-xs">
          Price
        </button>
        <button className="px-3 py-1 rounded hover:bg-[#1b1e29] text-xs">
          Market cap
        </button>
      </div>

      {/* Chart Type Selector - Enhanced with more options */}
      <div className="py-1 px-2 border rounded-md border-transparent min-w-[140px] justify-between flex">
        {/* Candlestick/Bar Chart */}
        <button
          onClick={() => handleChartTypeChange("barchart")}
          className={`p-2 rounded hover:bg-zinc-700 ${
            chartType === "barchart" ? "bg-zinc-700" : ""
          }`}
          title="Candlestick Chart"
        >
          <BarChart />
        </button>

        {/* Line Chart */}
        <button
          onClick={() => handleChartTypeChange("linechart")}
          className={`p-2 rounded hover:bg-zinc-700 ${
            chartType === "linechart" ? "bg-zinc-700" : ""
          }`}
          title="Line Chart"
        >
          <LineChart />
        </button>

        {/* Additional Chart Types - You can add SVG icons for these */}
        <button
          onClick={() => handleChartTypeChange("baseline")}
          className={`px-2 py-1 text-xs rounded hover:bg-zinc-700 ${
            chartType === "baseline" ? "bg-zinc-700" : ""
          }`}
          title="Baseline Chart"
        >
          B
        </button>

        <button
          onClick={() => handleChartTypeChange("area")}
          className={`px-2 py-1 text-xs rounded hover:bg-zinc-700 ${
            chartType === "area" ? "bg-zinc-700" : ""
          }`}
          title="Area Chart"
        >
          A
        </button>
      </div>

      {/* Center Group */}
      <div className="flex space-x-2 items-center">
        <button
          className="px-3 py-1 rounded hover:bg-[#1b1e29] text-sm border border-[#2a2d3a]"
          onClick={() => setShowMagnified(true)}
        >
          TradingView
        </button>
        <div className="absolute"></div>
        <select className="bg-[#1b1e29] text-white text-sm px-2 py-1 rounded outline-none">
          <option>Compare with</option>
          <option>BTC</option>
          <option>ETH</option>
        </select>
      </div>

      {/* Right Group - Time Ranges */}
      <div className="flex space-x-2 items-center">
        {ranges.map((range) => (
          <button
            key={range}
            onClick={() => onRangeChange(range)}
            className={`px-2 py-1 text-sm rounded ${
              activeRange === range
                ? "bg-white text-black font-semibold"
                : "hover:bg-[#1b1e29]"
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      {/* TradingView Modal/Magnified View */}
      {showMagnified && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-[#0e0f14] p-4 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-semibold">TradingView Chart</h3>
              <button
                onClick={() => setShowMagnified(false)}
                className="text-white hover:text-gray-300 text-xl font-bold"
              >
                ×
              </button>
            </div>
            {/* Enhanced chart view can go here */}
            <div className="h-96 bg-[#1b1e29] rounded flex items-center justify-center">
              <span className="text-gray-400">Enhanced chart view coming soon...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}