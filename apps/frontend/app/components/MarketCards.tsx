import { DynamicMiniChart } from "../utils/MiniChart";
import { Trending, Clock_svg, Eye } from "../utils/SVGPool"
import Image from "next/image"

import { Fire_SVG } from "../utils/SVGPool"
import React, { useEffect, useState } from 'react';

export default function MarketCards({ type, data, symbols = [] }) {

  
    return (
        <div className="min-w-[500px] bg-[#222531] rounded-lg mt-3 ml-3 text-xs">
            <span className="flex max-w-full justify-between p-3">
                <span className="text-gray-300 font-semibold text-[14px]">{type}</span>
                <span className="flex w-[90px] justify-between bg-[#323546] p-1 rounded-lg">
                    {symbols.map((Icon, i) => (
                        <span key={i}>{Icon}</span>
                    ))}
                </span>
            </span>

            <ol>
                {data.map((val, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center p-3 hover:bg-slate-600 cursor-pointer transition-colors duration-500"
                    >
                        <div className="w-[200px] flex items-center">
                            <span className="mr-2 text-gray-300">{index + 1}</span>
                            <Image src={val.image} alt={val.symbol || "coin"} width={25} height={25} />
                            <span className="ml-3 uppercase">{val.symbol}</span>
                        </div>

                        {/* Price + MiniChart */}
                
                            <span className="mb-1">
                                ${parseFloat((Math.random() * 1000000).toFixed(2)).toLocaleString()}
                            </span>
                            
                           <DynamicMiniChart width={40}/>
                      
                    </li>
                ))}
            </ol>
        </div>
    )
}




