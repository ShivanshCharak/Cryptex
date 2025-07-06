"use client"
import CategoryMarket from "../components/CategoryMarket"
import CryptoTable from "../components/CryptoTable"
import MarketAltCard from "../components/MarketAltCard"
import Column from '../utils/Column'
import MarketCards from "../components/MarketCards"
import { cryptoAssets, DexScan } from "../utils/DataPool"
import {
    Trending,
    Clock_svg,
    Eye,
    Fire_SVG,
    NewAndTrending,
    Community_Votes
} from "../utils/SVGPool"
import MarketNews from "../components/MarketNews"

export default function Market() {
    const cardConfigs = [
        {
            type: "Trending Coins",
            data: cryptoAssets,
            symbols: [<Fire_SVG key="fire" />, <Clock_svg key="clock" />, <Eye key="eye" />],
        },
        {
            type: "Trending On DexScan",
            data: DexScan,
            symbols: [<Trending key="trending" />, <NewAndTrending key="new" />, <Community_Votes key="votes" />],
        }
    ]

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
                ))}</div>
        <MarketAltCard/>
        <MarketNews/>
        </div>
        <CategoryMarket/>
        <CryptoTable
        />
        
                </div>
    )
    
}
