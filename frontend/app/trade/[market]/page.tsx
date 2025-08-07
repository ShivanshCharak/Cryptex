"use client";
import { MarketBar } from "@/app/components/MarketBar";
import { SwapUI } from "@/app/components/SwapUI";
import { TradeView } from "@/app/components/charts/TradeView";
import { Depth } from "@/app/components/depth/Depth";
import { useState } from "react";
import { useParams, usePathname } from "next/navigation";
import RangeSwitcherBar from "@/app/utils/RangeSwitcherBar";
import { AreaChartView } from "@/app/components/AreaChartView";
import { OrdersProvider } from "@/app/utils/context/DepthContext";
import { useEffect } from "react";
import { BaselineChartView } from "@/app/components/charts/BaselineChartView";
import { useOrders } from "@/app/utils/context/DepthContext";
import { User } from "@/app/utils/context/UserProvider";
import { ChartLoading } from "./loading";
import { AuthInspector } from "@/app/utils/AuthInspector";
import TopToolbar from "@/app/components/TopToolbar";
import { useRouter } from "next/navigation";
import { useUserAuth } from "@/app/utils/context/UserProvider";



export default function Page() {
    const {setIsAuth,setUser} = useUserAuth()
    const { market } = useParams();
    console.log(market)
    const router = useRouter()
    const [range, setRange] = useState<"1D" | "1W" | "1M" | "1Y">("1D");
    const [chartType, setChartType] = useState<String>("barchart")
    const {depth} = useOrders()
  useEffect(() => {
 
     async function Inspector(){
       const user  =  await AuthInspector.isAuthenticated() as User
       if (user) {
         setUser(user)
         setIsAuth(true)
       } else {
         setIsAuth(false)
         router.push("/");
         console.log("User is not authenticated");
       }
     }
   Inspector()
   

  // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);


    return <div className="flex flex-row max:flex-col flex-1 over ">
        <div className="flex flex-col flex-1 ">
                <MarketBar market={market as string}/>
            <div className="flex flex-row h-[920px]  border-y border-slate-800">
                    <div className="w-[10px] flex-col border-slate-800 border-l"></div>
                <div className="flex flex-col flex-1 w-[500px]">
                    <RangeSwitcherBar activeRange={range} onRangeChange={setRange} setChartType={setChartType} chartType={chartType} />
                <div className="w-full  flex-col border-slate-800 border-t"></div>
                
                {depth.bids.length>0 || depth.asks.length>0?<>
                    {chartType === "barchart" ? <>  <TradeView market={market as string} range={range} /></> : <BaselineChartView market={market as string} range={range} />}
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