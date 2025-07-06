import React, { useState } from "react";
import {BarChart, LineChart} from './SVGPool'

const ranges = ["1D", "7D", "1M", "1Y"];

export default function RangeSwitcherBar({
  activeRange,
  onRangeChange,
  setChartType,
  chartType
}: {
  activeRange: string;
  onRangeChange: (range: string) => void;
  setChartType:(chartType:string)=>void
  chartType:String
}) 
{
  const [showMagnified, setShowMagnified] = useState(false)
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#0e0f14] text-white rounded-md space-x-2 overflow-x-auto max-w-[90%]">
      {/* Left Group */}
      <div className="flex space-x-2 items-center  py-1 px-2 border rounded-md border-transparent">
        <button className="px-3 py-1 rounded  text-white hover:bg-[#1b1e29] font-medium text-xs">Price</button>
        <button className="px-3 py-1 rounded hover:bg-[#1b1e29] text-xs">Market cap</button>
      </div>
      
      <div className=" py-1 px-2 border rounded-md border-transparent w-[100px] justify-between flex">
        <button onClick={()=>setChartType("barchart")} className={`p-2 rounded hover:bg-zinc-700 ${chartType==="barchart"?"bg-zinc-700":""}`}>
          <BarChart/>
          </button>
        <button onClick={()=>setChartType("linechart")}  className={`p-2 rounded hover:bg-zinc-700 ${chartType==="linechart"?"bg-zinc-700":""}`}>
          <LineChart/>
        </button>
      </div>

      {/* Center Group */}
      <div className="flex space-x-2 items-center">
        <button className="px-3 py-1 rounded hover:bg-[#1b1e29] text-sm border border-[#2a2d3a]" onClick={()=> setShowMagnified(true)}>TradingView</button>
        <div className="absolutr"></div>
        <select className="bg-[#1b1e29] text-white text-sm px-2 py-1 rounded outline-none">
          <option>Compare with</option>
          <option>BTC</option>
          <option>ETH</option>
        </select>
      </div>

      {/* Right Group */}
      <div className="flex space-x-2 items-center">
        {ranges.map((range) => (
          <button
            key={range}
            onClick={() => onRangeChange(range)}
            className={
                `px-2 py-1 text-sm rounded ${
                  activeRange === range
                    ? "bg-white text-black font-semibold"
                    : "hover:bg-[#1b1e29]"
                }`
              }
              
          >
            {range}
          </button>
        ))}
      </div>
    </div>
  );
}
