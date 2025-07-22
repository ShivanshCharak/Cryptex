"use client";
import { MarketBar } from "@/app/components/MarketBar";
import { SwapUI } from "@/app/components/SwapUI";
import { TradeView } from "@/app/components/charts/TradeView";
import { Depth } from "@/app/components/depth/Depth";
import { useState } from "react";
import { useParams } from "next/navigation";
import RangeSwitcherBar from "@/app/utils/RangeSwitcherBar";
import { AreaChartView } from "@/app/components/AreaChartView";
import { OrdersProvider } from "@/app/utils/context/DepthContext";
import { useEffect } from "react";
import { BaselineChartView } from "@/app/components/charts/BaselineChartView";
import { useOrders } from "@/app/utils/context/DepthContext";
import { ChartLoading } from "./loading";
import { AuthInspector } from "@/app/utils/AuthInspector";
import TopToolbar from "@/app/components/TopToolbar";
import { useRouter } from "next/navigation";


export default function Page() {
    const { market } = useParams();
    const router = useRouter()
    const [token, setToken] = useState<string>("")
    const [range, setRange] = useState<"1D" | "1W" | "1M" | "1Y">("1D");
    const [chartType, setChartType] = useState<String>("barchart")
    const {depth} = useOrders()
    


    return <div className="flex flex-row max:flex-col flex-1 over ">
        <div className="flex flex-col flex-1 ">
                <MarketBar market={market as string}/>
            <div className="flex flex-row h-[920px]  border-y border-slate-800">
                    <div className="w-[10px] flex-col border-slate-800 border-l"></div>
                <div className="flex flex-col flex-1 w-[500px]">
                    <RangeSwitcherBar activeRange={range} onRangeChange={setRange} setChartType={setChartType} chartType={chartType} />
                <div className="w-full  flex-col border-slate-800 border-t"></div>
                {depth.bids.length>0 || depth.asks.length>0?<>
                
                    {chartType === "barchart" ? <>  <TradeView market="SOL" range={range} /></> : <BaselineChartView market="SOL" range={range} />}
                </>
                    :<><ChartLoading/></>
                }
            <TopToolbar/>

                </div>
                <div className="w-[10px] flex-col border-slate-800 border-l"></div>
                <div className="flex flex-col w-[290px] overflow-hidden">
                    <Depth market={market as string} />
                </div>
            </div>
        </div>
        <div className="w-[10px] flex-col border-slate-800 border-l"></div>
        <div>
            <div className="flex flex-col w-[340px]">
                <SwapUI market={market as string} />
            </div>
        </div>
         
    </div>
} 