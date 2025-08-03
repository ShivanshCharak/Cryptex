import { TCryptoAssets } from "./types";
import { TDexScan } from "./types";
 export const cryptoAssets:TCryptoAssets = [
        { name: "Bitcoin", symbol: "BTC", image: '/1.png', price: "$67,000" },
        { name: "Ethereum", symbol: "ETH", image: "/eth.png", price: "$3,100" },
        { name: "Binance", symbol: "BNB", image: '/binance.png', price: "$600" },
        { name: "Dogecoin", symbol: "DOGE", image: "/dogecoin.png", price: "$0.15" },
        { name: "BNB", symbol: "BNB", image: "/bnb.png", price: "$600" },
      ];
      export const DexScan:TDexScan = [
        {
          symbol: "SKYAI/USDT",
          price: "$0.06473",
          image:'/SkyAi.png',
          changePercent:"+0.56%",
          isPositive:true
        },
        {
          symbol: "TRUMP/USDC",
          image:"/Trump.png",
          price: "$12.67",
          changePercent: "-0.52%",
          isPositive: false,
        },
        {
          symbol: "ITRUMP/Sol",
          image:"/cordano.png",
          price: "$0.052231",
          changePercent: "+996%",
          isPositive: true,
        },
        {
          symbol: "B/USD1",
          image:"/B.png",
          price: "$0.03392",
          changePercent: "+48.96%",
          isPositive: true,
        },
        {
          symbol: "Microsoft/WBNB",
          image:"/chainlink.png",
          price: "$387.27",
          changePercent: "+1565%",
          isPositive: true,
        },
      ];
      

export const FutureData = [
  { name: "Bitcoin", symbol: "BTC", pair: "BTC/USDC", price: 103832.5, volume24h: "11.1M", marketCap: "2.1T", change24h: "+4.30%", type: "spot" },
  { name: "Ethereum", symbol: "ETH", pair: "ETH/USDC", price: 2381.83, volume24h: "19.8M", marketCap: "286.8B", change24h: "+23.36%", type: "spot" },
  { name: "Solana", symbol: "SOL", pair: "SOL/USDC", price: 167.51, volume24h: "33.1M", marketCap: "86.2B", change24h: "+9.99%", type: "spot" },
  { name: "Sui", symbol: "SUI", pair: "SUI/USDC", price: 4.0188, volume24h: "1.4M", marketCap: "13.3B", change24h: "+10.17%", type: "spot" },
  { name: "Fartcoin", symbol: "FARTCOIN", pair: "FARTCOIN-PERP", price: 1.3459, volume: "4.1M", openInterest: "1.8M", change: 22.39, type: "perp" },
  { name: "Trump", symbol: "TRUMP", pair: "TRUMP/USDC", price: 14.14, volume24h: "454.9K", marketCap: "2.8B", change24h: "+16.86%", type: "spot" },
  { name: "LayerZero", symbol: "ZRO", pair: "ZRO/USDC", price: 2.8694, volume24h: "4.2K", marketCap: "327.7M", change24h: "+11.42%", type: "spot" },
  { name: "Act I The AI Prophecy", symbol: "ACT", pair: "ACT/USDC", price: 0.0681, volume24h: "3.2K", marketCap: "63.4M", change24h: "+28.25%", type: "spot" },
  { name: "MOODENG", symbol: "MOODENG", pair: "MOODENG/USDC", price: 0.12307, volume24h: "8.6K", marketCap: "113.4M", change24h: "+165.64%", type: "spot" },
  { name: "Aave", symbol: "AAVE", pair: "AAVE/USDC", price: 212.41, volume24h: "36.4K", marketCap: "3.2B", change24h: "+13.50%", type: "spot" }
];

export const LendData = [
  { name: "Ethereum", symbol: "ETH", price: 0, apy: "0.36%", apr: "1.56%", totalStaked: "3.2K", rewards: "879.6", stakersPercentage: "27.31%", type: "lend" },
  { name: "Solana", symbol: "SOL", price: 0, apy: "10.82%", apr: "1.40%", totalStaked: "152.2K", rewards: "37.4K", stakersPercentage: "24.54%", type: "lend" },
  { name: "USD Coin", symbol: "USDC", price: 0, apy: "1.36%", apr: "3.30%", totalStaked: "45.8M", rewards: "21M", stakersPercentage: "45.75%", type: "lend" },
  { name: "Sui", symbol: "SUI", price: 0, apy: "0.06%", apr: "1.18%", totalStaked: "108.1K", rewards: "6.7K", stakersPercentage: "6.18%", type: "lend" },
  { name: "USDT", symbol: "USDT", price: 0, apy: "1.88%", apr: "3.74%", totalStaked: "3.6M", rewards: "2M", stakersPercentage: "55.81%", type: "lend" },
  { name: "Bitcoin", symbol: "BTC", price: 0, apy: "0.73%", apr: "2.21%", totalStaked: "199.2", rewards: "77", stakersPercentage: "38.68%", type: "lend" }
];

  