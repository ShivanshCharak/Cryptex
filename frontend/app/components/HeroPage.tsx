'use client'

import Globe from './Globe'
import Image from 'next/image'

export default function HeroPage() {
  return (
    <>
      {/* Header Text */}
      <div className="flex justify-evenly items-center bg-[#111111]/97 outline outline-1 outline-[#f8f8f8]/20 p-4 rounded-full text-sm font-semibold mb-10">
        Trade Ease With Cryptex
      </div>

      {/* Hero Heading */}
      <h1 className="text-[5rem] font-black text-white leading-tight">
        Fast, Secure & Simple Crypto Exchange
      </h1>

      {/* Background Glow */}
      <div className="w-[200px] h-[200px] bg-[#a4bac0] rounded-full blur-3xl absolute top-[-100px] right-[-100px]" />

      {/* Subtext */}
      <p className="text-white/45 mt-5 max-w-xl text-center">
        Experience next-gen digital assets management with Cryptex — the easiest way to buy, sell, and trade crypto.
      </p>

      {/* CTA Buttons */}
      <div className="mt-6 flex gap-4">
        <button className="px-6 py-2 bg-white text-black font-semibold rounded-lg">
          Start Trading
        </button>
        <button className="px-6 py-2 border border-white text-white rounded-lg">
          Discover More
        </button>
      </div>

      {/* Bitcoin Bubble */}
      <div className="absolute top-[520px] left-80">
        <div className="flex w-[90px] justify-between items-center">
          <div className="w-[5px] h-[5px] rounded-full bg-white" />
          <h6 className="font-bold text-white">Bitcoin</h6>
        </div>
        <span className="font-bold ml-4 text-white">$58,293</span>
      </div>

      <div className="absolute w-[500px] left-0 top-[150px] h-[500px]">
        <Image src="/lines.svg" alt="lines" width={500} height={500} className="absolute left-0" />
        <Image src="/bitcoin.svg" alt="bitcoin" width={50} height={50} className="absolute left-[220px] top-[-25px]" />
      </div>

      {/* Ethereum Bubble */}
      <div className="absolute top-[200px] left-32">
        <div className="flex w-[90px] justify-between items-center">
          <div className="w-[5px] h-[5px] rounded-full bg-white" />
          <h6 className="font-bold text-white">Ethereum</h6>
        </div>
        <span className="font-bold ml-4 text-white">$3,273</span>
      </div>

      <div className="absolute w-[500px] left-0 top-40 h-[500px]">
        <Image src="/lines.svg" alt="lines" width={500} height={500} className="absolute left-0 rotate-x-180" />
        <Image src="/eth.svg" alt="ethereum" width={50} height={50} className="absolute left-[20px] top-[90px]" />
      </div>

      {/* Binance Bubble */}
      <div className="absolute top-[640px] right-80">
        <div className="flex w-[90px] justify-between items-center">
          <div className="w-[5px] h-[5px] rounded-full bg-white" />
          <h6 className="font-bold text-white">Binance</h6>
        </div>
        <span className="font-bold ml-4 text-white">$504</span>
      </div>

      <div className="absolute w-[500px] right-0 top-[190px] h-[500px]">
        <Image src="/lines.svg" alt="lines" width={500} height={500} className="absolute rotate-y-180 left-0" />
        <Image src="/binance.svg" alt="binance" width={50} height={50} className="absolute left-[220px] top-[-25px]" />
      </div>

      {/* Solana Bubble */}
      <div className="absolute top-[360px] right-20">
        <div className="flex w-[90px] justify-between items-center">
          <div className="w-[5px] h-[5px] rounded-full bg-white" />
          <h6 className="font-bold text-white">Solana</h6>
        </div>
        <span className="font-bold ml-4 text-white">$58,293</span>
      </div>

      <div className="absolute w-[500px] right-0 top-80 h-[500px]">
        <Image src="/lines.svg" alt="lines" width={500} height={500} className="absolute rotate-z-180 left-0" />
        <Image src="/navbar(3).svg" alt="solana" width={50} height={50} className="absolute right-[20px] top-[95px]" />
      </div>

      {/* Bottom Glow */}
      <div className="w-[400px] h-[300px] bg-[#a4bac0] rounded-full blur-[200px] absolute bottom-[-50px] left-[-50px]" />

      {/* Globe Component */}
      <div className="relative z-10 mt-10">
        <Globe />
      </div>
    </>
  )
}
