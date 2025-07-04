"use client";
import { MarketBar } from "@/app/components/MarketBar";
import { SwapUI } from "@/app/components/SwapUI";
import { TradeView } from "@/app/components/charts/TradeView";
import { Depth } from "@/app/components/depth/Depth";
import { useState } from "react";
import { useParams } from "next/navigation";
import RangeSwitcherBar from "@/app/utils/RangeSwitcherBar";
import { AreaChartView } from "@/app/components/AreaChartView";
import { BaselineChartView } from "@/app/components/charts/BaselineChartView";

export default function Page() {
    const { market } = useParams();
    const [range, setRange] = useState<"1D" | "1W" | "1M" | "1Y">("1D");
    const [chartType, setChartType] = useState<String>("barcode")
    return <div className="flex flex-row flex-1">
        <div className="flex flex-col flex-1">
            <MarketBar market={market as string} />
            <div className="flex flex-row h-[920px] border-y border-slate-800">
                <div className="flex flex-col flex-1">
                    <RangeSwitcherBar activeRange={range} onRangeChange={setRange} setChartType={setChartType} chartType={chartType} />
                    {chartType === "barchart" ? <>  <TradeView market="SOL" range={range} /></> : <BaselineChartView market="SOL" range={range} />}

                </div>
                <div className="flex flex-col w-[250px] overflow-hidden">
                    <Depth market={market as string} />
                </div>
            </div>
        </div>
        <div className="w-[10px] flex-col border-slate-800 border-l"></div>
        <div>
            <div className="flex flex-col w-[250px]">
                <SwapUI market={market as string} />
            </div>
        </div>
    </div>
}