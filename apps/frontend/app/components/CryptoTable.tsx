"use client";
import React, { useState, useEffect, useRef } from "react";
import { DynamicMiniChart } from "../utils/MiniChart";

import {
  ChevronDown,
  Eye,
  Flame,
  Filter,
  LayoutGrid,
  PlusCircle,
  Signal,
} from "lucide-react";
import Image from "next/image";
import FilterSidebar from "../utils/Forms/FilterForm";
import MetricsSelector from "../utils/Column";

export const cryptoData = [
  {
    rank: 1,
    name: "Bitcoin",
    symbol: "BTC",
    price: "$103,150.59",
    h1: "+0.21%",
    h24: "-0.77%",
    h7: "-1.15%",
    marketCap: "$2,049,116,558,654",
    volume: "$63,311,493,483",
    supply: "19.86M BTC",
    trend: "📈",
    image: "/bitcoin.svg",
  },
  {
    rank: 2,
    name: "Ethereum",
    symbol: "ETH",
    price: "$2,400.46",
    h1: "-0.23%",
    h24: "-5.00%",
    h7: "-6.05%",
    marketCap: "$289,802,306,865",
    volume: "$31,343,912,307",
    supply: "120.72M ETH",
    trend: "📉",
    image: "/eth.png",
  },
  {
    rank: 3,
    name: "Tether",
    symbol: "USDT",
    price: "$1.00",
    h1: "0.00%",
    h24: "+0.01%",
    h7: "0.00%",
    marketCap: "$151,374,374,876",
    volume: "$105,117,611,559",
    supply: "151.35B USDT",
    trend: "📈",
    image: "/tether.png",
  },
  {
    rank: 4,
    name: "BNB",
    symbol: "BNB",
    price: "$638.52",
    h1: "-0.04%",
    h24: "-1.38%",
    h7: "-3.45%",
    marketCap: "$89,961,185,155",
    volume: "$1,697,841,572",
    supply: "140.88M BNB",
    trend: "📉",
    image: "/bnb.png",
  },
  {
    rank: 5,
    name: "Cardano",
    symbol: "ADA",
    price: "$0.59",
    h1: "-0.20%",
    h24: "+1.90%",
    h7: "-2.60%",
    marketCap: "$21,000,000,000",
    volume: "$1,500,000,000",
    supply: "35.00B ADA",
    trend: "📈",
    image: "/cordano.png",
  },
  {
    rank: 6,
    name: "XRP",
    symbol: "XRP",
    price: "$2.29",
    h1: "-0.90%",
    h24: "-4.64%",
    h7: "-4.83%",
    marketCap: "$134,472,759,094",
    volume: "$3,953,804,863",
    supply: "58.62B XRP",
    trend: "📉",
    image: "/xrp.png",
  },
  {
    rank: 7,
    name: "USDC",
    symbol: "USDC",
    price: "$1.00",
    h1: "0.00%",
    h24: "+0.01%",
    h7: "0.00%",
    marketCap: "$30,000,000,000",
    volume: "$2,000,000,000",
    supply: "30.00B USDC",
    trend: "📈",
    image: "/usdc.png",
  },
  {
    rank: 8,
    name: "Tron",
    symbol: "TRX",
    price: "$0.095",
    h1: "+0.10%",
    h24: "-0.30%",
    h7: "+1.50%",
    marketCap: "$8,500,000,000",
    volume: "$500,000,000",
    supply: "90.00B TRX",
    trend: "📈",
    image: "/tron.png",
  },
  {
    rank: 9,
    name: "Dogecoin",
    symbol: "DOGE",
    price: "$0.075",
    h1: "-0.50%",
    h24: "+2.10%",
    h7: "-0.90%",
    marketCap: "$10,000,000,000",
    volume: "$800,000,000",
    supply: "132.00B DOGE",
    trend: "📈",
    image: "/dogecoin.png",
  },
  {
    rank: 10,
    name: "Chainlink",
    symbol: "LINK",
    price: "$15.32",
    h1: "+0.60%",
    h24: "-0.10%",
    h7: "+3.20%",
    marketCap: "$8,700,000,000",
    volume: "$350,000,000",
    supply: "600.00M LINK",
    trend: "📈",
    image: "/chainlink.png",
  },
];

const CryptoTable = () => {
  return (
    <div className="overflow-x-auto w-full bg-gray-900 p-4 rounded-xl text-white">
      <TopBar />

      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b border-gray-700 text-gray-400">
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>Market Cap</th>
            <th>Volume (24h)</th>
            <th>Circulating Supply</th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((coin) => (
            <tr
              key={coin.rank}
              className="border-b border-gray-800 cursor-pointer"
            >
              <td className="py-7 ">
                <span>{coin.rank}</span>
              </td>

              <td className="py-7 font-semibold flex w-[100px] justify-between">
                <Image
                  src={coin.image}
                  alt="alt"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                {coin.name} <span className="text-gray-500">{coin.symbol}</span>
              </td>
              <td className="py-2">{coin.price}</td>
              <td className="py-2 text-green-400">{coin.h1}</td>
              <td className="py-2 text-red-400">{coin.h24}</td>
              <td className="py-2 text-red-400">{coin.h7}</td>
              <td className="py-2">{coin.marketCap}</td>
              <td className="py-2">{coin.volume}</td>
              <td className="py-2">{coin.supply}</td>
              <DynamicMiniChart width={40} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;

const TopBar = () => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [showColumn, setShowColumn] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  const leftButtons = [
    {
      label: "Coins",
      icon: <LayoutGrid size={16} />,
      className: "bg-gray-800 text-white border border-blue-500",
    },
    {
      label: "DexScan",
      icon: <LayoutGrid size={16} />,
      className: "bg-gray-800 text-white",
    },
    { label: "📊 Top", icon: null, className: "bg-blue-700 text-white" },
    {
      label: "Trending",
      icon: <Flame size={16} />,
      className: "text-orange-400",
    },
    {
      label: "New",
      icon: <PlusCircle size={16} />,
      className: "text-purple-400",
    },
    {
      label: "Gainers",
      icon: <Signal size={16} />,
      className: "text-green-400",
    },
    {
      label: "Most Visited",
      icon: <Eye size={16} />,
      className: "text-blue-400",
    },
  ];

  const rightButtons = [
    {
      label: "Filters",
      icon: <Filter size={16} />,
      onClick: () => setShowFilter(true),
    },
    {
      label: "Columns",
      icon: <LayoutGrid size={16} />,
      onClick: () => setShowColumn(true),
    },
    { label: "Show 10", icon: <ChevronDown size={16} />, onClick: () => {} },
  ];
  {
    console.log(showFilter);
  }

  return (
    <div className="w-full flex flex-wrap items-center justify-between bg-gray-900 rounded-lg mb-4">
      {/* Left Buttons */}
      <div className="flex flex-wrap gap-3 items-center">
        {leftButtons.map((btn, i) => (
          <button
            key={i}
            className={`flex hover:bg-slate-700 items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium ${btn.className} ${clickedIndex === i ? "bg-blue-700" : ""}`}
            onClick={() => setClickedIndex(i)}
          >
            {btn.icon} {btn.label}
          </button>
        ))}
      </div>

      {/* Right Buttons */}
      <div className="flex gap-2 items-center">
        {rightButtons.map((btn, i) => (
          <button
            key={i}
            className="flex items-center gap-1 bg-gray-800 px-3 py-1.5 rounded-lg text-sm text-white"
            onClick={btn.onClick}
          >
            {btn.icon} {btn.label}
          </button>
        ))}
      </div>
      {showFilter && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"
            onClick={() => setShowFilter(false)}
          ></div>
          <FilterSidebar
            showFilter={showFilter}
            setShowFilter={setShowFilter}
          />
        </>
      )}
      {showColumn && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-10"
            onClick={() => setShowColumn(false)}
          ></div>
          <MetricsSelector
            showColumn={showColumn}
            setShowColumn={setShowColumn}
          />
        </>
      )}
    </div>
  );
};
