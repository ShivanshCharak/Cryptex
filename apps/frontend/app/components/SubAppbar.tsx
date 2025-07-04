export default function SubAppbar() {
    return (<>
        <span className="text-xs max-w-[1000px] flex justify-between max-h-[300px] my-3 text-slate-500 ">
            <span >
                <span>Cryptos</span> <span className="font-semibold text-[#6188ff]">15.71M</span>
            </span>
            <span>
                <span>Exchanges</span> <span className="font-semibold text-[#6188ff]">818</span>

            </span>
            <span className=" flex justify-between w-[140px]">
                <span>Market Cap</span> <span className="font-semibold text-[#6188ff]">$3.31T</span><span className= "font-semibold text-green-500">1.12%</span>
            </span>
            <span>
                <span>24h Vol</span> <span>$135.75B</span> <span className= "font-semibold text-green-500">56.27%</span>

            </span>
            <span>
                <span>Dominance: </span> <span className="font-semibold text-[#6188ff]" >BTC:63.0%</span> <span className= "font-semibold text-[#6188ff]">ETH:8.8%</span>

            </span>
            <span>
                <span>ETH Gas</span> <span className="font-semibold text-[#6188ff]">0.37 Gwei</span>
                
            </span>
            <span>
            <span>Fear & green</span> <span className="font-semibold text-[#6188ff]">71/100</span>

            </span>
        </span>
        <div className="max-w-full border-b border-[0px]/50 border-slate-600"></div>
    </>)
}