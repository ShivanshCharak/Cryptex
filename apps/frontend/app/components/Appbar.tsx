"use client";
import { FaRobot, FaBullhorn, FaExternalLinkAlt } from 'react-icons/fa';
import { MdOutlineWidgets, MdOutlineApi } from 'react-icons/md';
import { IoIosPaper, IoIosMail, IoMdRocket } from 'react-icons/io';
import { RiCalendarEventLine } from 'react-icons/ri';
import { BsFillBookFill, BsNewspaper } from 'react-icons/bs';
import { AiFillGift } from 'react-icons/ai';
import { PiVideoFill } from 'react-icons/pi';
import { BiSolidGraduation } from 'react-icons/bi';

import { usePathname } from "next/navigation";
import Link from 'next/link';
import { useState } from "react";
import Image from "next/image";
import { PrimaryButton, SuccessButton } from "./core/Button"
import { useRouter } from "next/navigation";
import { Burger, Search, Tag } from "../utils/SVGPool";
import { Portfolio_svg, Watchlist } from "../utils/SVGPool";
import MegaMenu from "../utils/MenuItems";
import { IconType } from 'react-icons';
import { BsRssFill } from 'react-icons/bs';
import { FaHashtag } from 'react-icons/fa';
import { FiActivity } from 'react-icons/fi';
import { PiArticleFill } from 'react-icons/pi';
import { MdSpeed } from 'react-icons/md';
import Signup from './auth/Signup';
import { useUserAuth } from '../utils/context/UserContext';

type DropDownItem ={
  label:string;
  icon: React.ReactNode;
  bg?:string;
}

type DropDownSection= {
  title:string;
  items:DropDownItem[]
}

export const Appbar = () => {
  const route = usePathname();
  const router = useRouter()
  const [showProfile, setShowProfile] = useState(false)
  const [showDexScan,setShowDexScan] = useState(false)
  const [showCommunity,setShowCommunity] = useState(false)
  const [showProducts,setShowProducts] = useState(false)
  const [showAuth,setShowAuth] = useState(false)
  const {user} = useUserAuth()



  return <div className="text-white border-b border-slate-800 py-3">
        <div className="flex justify-between items-center p-2">
            <span className="flex">
                <span className={`text-xl pl-4 flex flex-col justify-center cursor-pointer text-white`} onClick={() => router.push('/')}>
                    Exchange
                </span>
                <span className={`text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer ${route.startsWith('/markets') ? 'text-white' : 'text-slate-500'}`} onClick={() => router.push('/markets')}>
                    Markets
                </span>
                <span className={`text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer ${route.startsWith('/trade') ? 'text-white' : 'text-slate-500'}`} onClick={() => router.push('/trade/SOL_USDC')}>
                    Trade
                </span>
                <span  onMouseOver={()=>setShowDexScan(true)} onMouseLeave={()=>setShowDexScan(false)} className={` font-semibold hover:text-white relative text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer ${route.startsWith('/trade') ? 'text-white' : 'text-slate-500'}`} onClick={() => router.push('/trade/SOL_USDC')}>
                    DexScan
<MegaMenu showDexScan={showDexScan}/>
                </span>
                <span onMouseOver={()=>setShowCommunity(true)} onMouseLeave={()=>setShowCommunity(false)} className={` relative text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer ${route.startsWith('/trade') ? 'text-white' : 'text-slate-500'}`} onClick={() => router.push('/trade/SOL_USDC')}>
                    Community
                    <FeedsDropdown showCommunity={showCommunity}/>
                </span>
                <span onMouseOver={()=>setShowProducts(true)} onMouseLeave={()=>setShowProducts(false)} className={`relative text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer ${route.startsWith('/trade') ? 'text-white' : 'text-slate-500'}`} onClick={() => router.push('/trade/SOL_USDC')}>
                    Products
                    {showProducts && (
                      <div className="absolute left-0 top-full z-50 w-screen px-10">
      <ProductsDropdown />
    </div>
  )}
                </span>
                <span className={`text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer ${route.startsWith('/trade') ? 'text-white' : 'text-slate-500'}`} onClick={() => router.push('/trade/SOL_USDC')}>
                    CMC Launch
                </span>
            </span>
            <div className="flex  justify-between w-[700px]">
                <span className={`text-sm pt-1 flex justify-between items-center w-[100px] pl-8 cursor-pointer ${route.startsWith('/trade') ? 'text-white' : 'text-slate-500'}`} onClick={() => router.push('/trade/SOL_USDC')}>
                    <Portfolio_svg /> Portfolio
                </span>
                <span className=" text-sm pt-1 flex justify-between items-center w-[101px] pl-8 cursor-pointer text-slate-500">
                    <Watchlist /> Watchlist
                </span>
                <span className="flex items-center bg-[#323546] p-2 rounded-lg">
                    <Search /> <input type="text" className="bg-inherit text-sm outline-none ml-4" placeholder=" Search" />

                </span>
                <span className="cursor-pointer w-[35px] h-[35px] flex justify-center items-center bg-[#323546] rounded-md">
                    <Tag />
                </span>
                {user?.user.email?<><Link href={"/deposit"}><SuccessButton>Deposit</SuccessButton></Link></>:
                <button onClick={()=>{
                  setShowAuth((prev)=>!prev)         
                }} className=" text-sm font-semibold bg-blue-800 w-[80px] h-[35px] flex justify-center items-center rounded-md">
                    Login
                </button>
                }
       
                {showAuth&& <Signup setShowAuth={setShowAuth} />}
                <span onClick={()=>setShowProfile(prev=>!prev)} className=" relative cursor-pointer px-2 w-[70px] h-[35px] bg-[#323546] flex justify-between items-center rounded-lg">
                    <Burger />
                    <Image src={"/default-avatar.png"} alt="" width={24} height={24}/>
                    {showProfile&&(
                      <ProfileDropDown/>
                    )}
                </span>
            </div>
            {/* <span className="flex">
                <span className="p-2 mr-2">
                <SuccessButton>Deposit</SuccessButton>
                <PrimaryButton>Withdraw</PrimaryButton>
                </span>
                </span> */}
        </div>
    </div>

}


const items: DropDownItem[] = [
  { label: 'Feeds', icon: <BsRssFill className="text-white" /> , bg: 'bg-blue-500' },
  { label: 'Topics', icon: <FaHashtag className="text-white" />, bg: 'bg-green-500' },
  { label: 'Lives', icon: <FiActivity className="text-white" />, bg: 'bg-rose-400' },
  { label: 'Articles', icon: <PiArticleFill className="text-white" />, bg: 'bg-purple-500' },
  { label: 'Sentiment', icon: <MdSpeed className="text-white" />, bg: 'bg-indigo-500' },
];


function FeedsDropdown({showCommunity}) {
  return (
    <>
    
    {showCommunity && <>
   <div className="bg-[#1E1E2F] p-4 absolute top-10 rounded-xl shadow-xl w-52 space-y-4 ">
     {items.map((item) => (
       <div key={item.label} className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${item.bg}`}>
           {item.icon}
         </div>
         <span className="text-white font-medium">{item.label}</span>
       </div>
     ))}
     </div>
     </>
}
    </>
  );
}


const sections = [
  {
    title: 'Products',
    items: [
      { icon: <IoIosPaper />, label: 'Converter' },
      { icon: <IoIosMail />, label: 'Newsletter', external: true },
      { icon: <FaRobot />, label: 'CMC Labs', external: true },
      { icon: <FaRobot />, label: 'Telegram Bot', external: true },
      { icon: <FaBullhorn />, label: 'Advertise', external: true },
      { icon: <MdOutlineApi />, label: 'Crypto API' },
      { icon: <MdOutlineWidgets />, label: 'Site Widgets' },
    ],
  },
  {
    title: 'Campaigns',
    items: [
      { icon: <AiFillGift />, label: 'Airdrops' },
      { icon: <IoMdRocket />, label: 'Diamond Rewards' },
      { icon: <BiSolidGraduation />, label: 'Learn & Earn', external: true },
    ],
  },
  {
    title: 'Calendars',
    items: [
      { icon: <RiCalendarEventLine />, label: 'ICO Calendar' },
      { icon: <RiCalendarEventLine />, label: 'Events Calendar' },
    ],
  },
  {
    title: 'Learn',
    items: [
      { icon: <BsNewspaper />, label: 'News' },
      { icon: <BiSolidGraduation />, label: 'Academy', external: true },
      { icon: <BsFillBookFill />, label: 'Research' },
      { icon: <PiVideoFill />, label: 'Videos' },
      { icon: <BsFillBookFill />, label: 'Glossary', external: true },
    ],
  },
];
function ProductsDropdown() {
  return (
    <div className="bg-[#1E1E2F] absolute top-10 text-white p-6 rounded-xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
      {sections.map((section) => (
        <div key={section.title}>
          <h4 className="text-gray-400 text-sm mb-3 font-semibold">{section.title}</h4>
          <div className="space-y-3">
            {section.items.map(({ icon, label, external }) => (
              <div
              key={label}
              className="flex items-center justify-between cursor-pointer hover:opacity-80 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 bg-[#2A2A3C] rounded-full flex items-center justify-center text-lg">
                    {icon}
                  </div>
                  <span>{label}</span>
                </div>
                {external && <FaExternalLinkAlt className="text-gray-400 text-xs" />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
function ProfileDropDown(){
    const {user} = useUserAuth()
  return(<>
    <div className="z-[200] duration-200  absolute top-10 right-5 w-80 bg-[#1e1e2f] text-white rounded-xl p-4 space-y-4 font-sans">
  <div className="flex justify-between items-center">
    {user?.username?
      <span>{user?.id.substring(0,20)}....</span>:
<>
      <button className="border border-blue-600 text-blue-500 px-4 py-1.5 rounded-md text-sm font-medium">Sign Up</button>
      <button className="bg-blue-600 text-white px-4 py-1.5 rounded-md text-sm font-medium">Log In</button>
    </>
}

    <div className="text-cyan-300 text-xl">💎</div>
  </div>


  <div className="flex justify-between items-center text-sm">
    <span>Language</span>
    <span className="text-gray-300">English &gt;</span>
  </div>

  <div className="flex justify-between items-center text-sm">
    <span>Currency</span>
    <span className="text-gray-300 flex items-center gap-1">
      <span className="text-green-400">$</span> USD
    </span>
  </div>


  <div>
    <div className="text-sm mb-2">Theme</div>
    <div className="flex gap-2">
      <button className="bg-gray-700 text-gray-300 px-3 py-1.5 rounded-md text-sm">Light</button>
      <button className="bg-gray-700 text-gray-300 px-3 py-1.5 rounded-md text-sm">Dark</button>
      <button className="bg-gray-600 text-white px-3 py-1.5 rounded-md text-sm">System</button>
    </div>
  </div>

  <hr className="border-gray-600"/>


  <div className="flex gap-2">
    <button className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-md text-sm flex items-center justify-between">
      Get listed <span className="text-sm">▼</span>
    </button>
    <button className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-md text-sm">API</button>
  </div>
</div>

  </>)
}