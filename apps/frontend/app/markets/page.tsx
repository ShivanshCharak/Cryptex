"use client";
import CategoryMarket from "../components/CategoryMarket";
import CryptoTable from "../components/CryptoTable";
// import MarketAltCard from "../components/MarketAltCard

import MarketCards from "../components/MarketCards";
import { cryptoAssets, DexScan } from "../utils/DataPool";
import MarketNews from "../components/MarketNews";
import { useEffect } from "react";
import { AuthInspector } from "../utils/AuthInspector";
import { useRouter } from "next/navigation";
import {
  Trending,
  Clock_svg,
  Eye,
  Fire_SVG,
  NewAndTrending,
  Community_Votes,
} from "../utils/SVGPool";
import { TcardConfig } from "../utils/types";
import { useUserAuth } from "../utils/context/UserProvider";

export default function Market() {
  const router = useRouter();
  const {setIsAuth} = useUserAuth()
  const cardConfigs: TcardConfig = [
    {
      type: "Trending Coins",
      data: cryptoAssets,
      symbols: [
        <Fire_SVG key="fire" />,
        <Clock_svg key="clock" />,
        <Eye key="eye" />,
      ],
    },
    {
      type: "Trending On DexScan",
      data: DexScan,
      symbols: [
        <Trending key="trending" />,
        <NewAndTrending key="new" />,
        <Community_Votes key="votes" />,
      ],
    },
  ];
  useEffect(() => {

    async function Inspector(){
      if (await AuthInspector.isAuthenticated()) {
        setIsAuth(true)
      } else {
        setIsAuth(false)
        router.push("/");
        console.log("User is not authenticated");
      }
    }
  Inspector()
  
  }, []);
  return (
    <div>
      <div className="flex w-full justify-around">
        <div className="flex max-w-full">
          {cardConfigs.map((config, index) => (
            <MarketCards
              key={index}
              type={config.type}
              data={config.data}
              symbols={config.symbols}
            />
          ))}
        </div>
        {/* <MarketAltCard /> */}
        <MarketNews />
      </div>
      <CategoryMarket />
      <CryptoTable />
    </div>
  );
}
