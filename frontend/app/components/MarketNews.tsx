'use client'
import { useEffect, useState } from "react";
import Image from "next/image";

export default function MarketNews() {
    return (
        <>
            <div className="bg-[#222531] w-[55%] mr-[20px] h-[170px] my-2 rounded">
                <section className="flex w-full justify-between p-5">
                    <section className="flex items-center w-[180px] justify-between">
                        <Image width="20" height="20" className="w-[20px] h-[20px]" src="https://s3.coinmarketcap.com/static-gravity/image/6fbea0356edd48a4a68a4b877195443c.png" alt="" />
                        <span className="text-[14px] font-bold">Bitcoin</span>
                        <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" className="sc-65e7f566-0 kALOHD c-i icon-certified" >
                            <use href="#verified"><symbol id="verified" className="sc-65e7f566-0 eQBACe">
                                <path d="M12 2L15.3676 3.86986L19.0711 4.92893L20.1301 8.63239L22 12L20.1301 15.3676L19.0711 19.0711L15.3676 20.1301L12 22L8.63239 20.1301L4.92893 19.0711L3.86986 15.3676L2 12L3.86986 8.63239L4.92893 4.92893L8.63239 3.86986L12 2Z" fill="currentColor"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M16.6549 8.24434C17.0723 8.60605 17.1174 9.23761 16.7557 9.65496L11.5557 15.655C11.3657 15.8741 11.09 16 10.8 16C10.51 16 10.2343 15.8741 10.0443 15.655L7.24431 12.4242C6.8826 12.0068 6.92771 11.3753 7.34507 11.0136C7.76242 10.6519 8.39398 10.697 8.75569 11.1143L10.8 13.4732L15.2443 8.3451C15.606 7.92774 16.2376 7.88263 16.6549 8.24434Z" fill="white"></path>
                            </symbol></use>
                        </svg>
                        <span className="text-xs text-slate-400 font-semibold">2.8M Followers</span>
                    </section>
                    <section className="cursor-pointer hover:bg-[#3861fb] hover:text-white font-semibold duration-300 border border-[#3861fb] text-xs p-1 rounded text-blue-300">
                        Verified
                    </section>
                </section>

                {/* Community Sentiment Section */}
                <div className="-mt-7">
                    <CommunitySentiment />
                </div>
            </div>
        </>
    );
}


 function CommunitySentiment() {
    const [sentiment, setSentiment] = useState(82); // Bullish %
  
    useEffect(() => {
      const interval = setInterval(() => {
        const randomSentiment = parseFloat((Math.random() * 100).toFixed(2));
        setSentiment(randomSentiment);
      }, 3000); // Every 10s
  
      return () => clearInterval(interval);
    }, []);
  
    const bearish = parseFloat((100 - sentiment).toFixed(2));
  
    return (
      <div className="mt-5 text-white rounded-md px-4 w-full max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-2 text-sm text-gray-400">
          <span className="font-medium">Community sentiment</span>
          <span className="text-xs">4.2M votes</span>
        </div>
  
        {/* Percentage Labels */}
        <div className="flex justify-between text-sm font-semibold mb-2">
          <span className="text-green-400 flex items-center gap-1">
            <Gain  />
            {sentiment.toFixed(1)}%
          </span>
          <span className="text-red-400 flex items-center gap-1">
            <Loss  />
            {bearish.toFixed(1)}%
          </span>
        </div>
  
        {/* Progress Bar */}
        <div className="group relative flex h-3 bg-gray-700 rounded-full  mb-4">
          {/* Bullish Bar */}
          <div
            className="relative h-full transition-all duration-700 bg-green-500 hover:h-[170%] rounded-l-full cursor-help"
            style={{ width: `${sentiment}%` }}
          >
            <div className="absolute bottom-7 left-2 text-white bg-green-600 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {sentiment.toFixed(1)}% Bullish
            </div>
          </div>
  
          {/* Bearish Bar */}
          <div
            className="relative h-full transition-all duration-700 bg-red-500 hover:h-[170%] rounded-r-full cursor-help"
            style={{ width: `${bearish}%` }}
          >
            <div className="absolute bottom-7 right-2 text-white bg-red-600 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {bearish.toFixed(1)}% Bearish
            </div>
          </div>
        </div>
  
        {/* Summary Text */}
        <p className="text-slate-400 text-xs">
          Current sentiment split — {sentiment.toFixed(1)}% Bullish / {bearish.toFixed(1)}% Bearish
        </p>
      </div>
    );
  }
function Gain() {
    return (<>
        <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" className="sc-65e7f566-0 krKQPk c-i"><use href="#profit">
            <symbol id="profit" className="sc-65e7f566-0 eQBACe"><path d="M15 5.99976C14.45 5.99976 14 6.44976 14 6.99976C14 7.54976 14.45 7.99976 15 7.99976H18.59L13.01 13.5798L10.42 10.9998C9.63998 10.2198 8.36998 10.2198 7.58998 10.9998L2.29998 16.2898C1.90998 16.6798 1.90998 17.3098 2.29998 17.6998C2.49998 17.8998 2.74998 17.9898 3.00998 17.9898C3.26998 17.9898 3.51998 17.8898 3.71998 17.6998L9.00998 12.4098L11.6 14.9898C12.38 15.7698 13.65 15.7698 14.43 14.9898L20.01 9.40976V12.9998C20.01 13.5498 20.46 13.9998 21.01 13.9998C21.56 13.9998 22.01 13.5498 22.01 12.9998V7.99976C22.01 6.89976 21.11 5.99976 20.01 5.99976H15Z" fill="currentColor"></path></symbol>
        </use></svg>
    </>)
}
function Loss() {
    return (<>
        <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" height="1em" width="1em" className="sc-65e7f566-0 gTxzHY c-i" >
            <use href="#lost">
                <symbol id="lost" className="sc-65e7f566-0 eQBACe"><path d="M21 9.99977C20.45 9.99977 20 10.4498 20 10.9998V14.5898L14.42 9.00977C13.64 8.22977 12.37 8.22977 11.59 9.00977L9 11.5898L3.71 6.29977C3.51 6.09977 3.26 6.00977 3 6.00977C2.74 6.00977 2.49 6.10977 2.29 6.29977C1.9 6.68977 1.9 7.31977 2.29 7.70977L7.58 12.9998C8.36 13.7798 9.63 13.7798 10.41 12.9998L13 10.4198L18.58 15.9998H14.99C14.44 15.9998 13.99 16.4498 13.99 16.9998C13.99 17.5498 14.44 17.9998 14.99 17.9998H19.99C21.09 17.9998 21.99 17.0998 21.99 15.9998V10.9998C21.99 10.4498 21.54 9.99977 20.99 9.99977H21Z" fill="currentColor"></path></symbol>

            </use></svg>
    </>)
}