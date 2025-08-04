"use client";
import { FaRobot, FaBullhorn, FaExternalLinkAlt,FaHashtag } from "react-icons/fa";
import { MdOutlineWidgets, MdOutlineApi } from "react-icons/md";
import { IoIosPaper, IoIosMail, IoMdRocket } from "react-icons/io";
import { RiCalendarEventLine } from "react-icons/ri";
import { BsFillBookFill, BsNewspaper } from "react-icons/bs";
import { AiFillGift } from "react-icons/ai";
import { PiVideoFill,PiArticleFill } from "react-icons/pi";
import { BiSolidGraduation } from "react-icons/bi";
import { BsRssFill } from "react-icons/bs";
import { FiActivity } from "react-icons/fi";


import { MdSpeed } from "react-icons/md";

import { usePathname } from "next/navigation";
import Cryptex  from "../../public/cryptex.png"
import { useState, useEffect, useContext } from "react";
import Image from "next/image";

import { Button } from "./core/Button";
import { useRouter } from "next/navigation";
import { Burger, Search, Tag } from "../utils/SVGPool";
import MegaMenu from "../utils/MenuItems";
import { useUserAuth } from "../utils/context/UserProvider";
import { AuthInspector } from "../utils/AuthInspector";
import AuthModal from "./auth/Auth";

// Type definitions
interface DropDownItem {
  label: string;
  icon: React.ReactNode;
  bg?: string;
  external?: boolean;
}

interface DropDownSection {
  title: string;
  items: DropDownItem[];
}

interface FeedsDropdownProps {
  showCommunity: boolean;
}

interface SignupProps {
  setShowAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
  token?: string;
  user: {
    email: string;
    username: string;
    id: string;
  };
}

interface UserAuthContext {
  user: User | null;
}

export function Appbar(){
  const route = usePathname();
  const router = useRouter();
  const [showDexScan, setShowDexScan] = useState<boolean>(false);
  const [showCommunity, setShowCommunity] = useState<boolean>(false);
  const [showProducts, setShowProducts] = useState<boolean>(false);
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const {isAuth,setIsAuth} = useUserAuth()
  useEffect(()=>{

    async function Inspector(){
     
     if (await AuthInspector.isAuthenticated()) {
       setIsAuth(true)
       console.log("User is authenticated")
     } else {
       setIsAuth(false)
       router.push("/");
       console.log("User is not authenticated");
     }
   }
 Inspector()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className="text-white border-b border-slate-800 py-3 z-10 w-full">
      <div className="flex justify-between items-center p-2">
        <span className="flex">
          <span
            className="text-xl pl-4 flex  justify-center cursor-pointer w-[200px] text-white items-center"
            onClick={() => router.push("/")}
          >
            <Image src={Cryptex} width={50} height={50} alt="C"/>  <span>Cryptex</span>
          </span>
          <span
            className={`text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer hover:text-white ${
              route.startsWith("/markets") ? "text-white" : "text-slate-500"
            }`}
            onClick={() => router.push("/markets")}
          >
            Markets
          </span>
          <span
            className={`text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer hover:text-white ${
              route.startsWith("/trade") ? "text-white" : "text-slate-500"
            }`}
            onClick={() => router.push("/trade/SOL_USDC")}
          >
            Trade
          </span>
          <span
            onMouseOver={() => setShowDexScan(true)}
            onMouseLeave={() => setShowDexScan(false)}
            className="font-semibold hover:text-white relative text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer text-slate-500"
            onClick={() => router.push("/trade/SOL_USDC")}
          >
            DexScan
            <div className="absolute left-0 top-full z-50 w-screen px-10">
              <MegaMenu showDexScan={showDexScan} />
            </div>
          </span>
          <span
            onMouseOver={() => setShowCommunity(true)}
            onMouseLeave={() => setShowCommunity(false)}
            className="hover:text-white relative text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer text-slate-500 font-semibold"
          >
            Community
            <div className="absolute left-0 top-full z-50 w-screen px-10">
              <FeedsDropdown showCommunity={showCommunity} />
            </div>
          </span>
          <span
            onMouseOver={() => setShowProducts(true)}
            onMouseLeave={() => setShowProducts(false)}
            className="hover:text-white relative text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer text-slate-500 font-semibold"
          >
            Products
            {showProducts && (
              <div className="absolute left-0 top-full z-50 w-screen px-10">
                <ProductsDropdown />
              </div>
            )}
          </span>
          <span className="text-sm pt-1 flex flex-col justify-center pl-8 cursor-pointer hover:text-white text-slate-500 font-semibold">
            CMC Launch
          </span>
        </span>

        <div className="flex justify-between ">
          {isAuth ? (
            <Button variant="Green" onClick={() => router.push("/deposit")}>
              Deposit
            </Button>
          ) : (

            <Button
              onClick={() => setShowAuth((prev) => !prev)}
              // className="text-sm font-semibold bg-blue-800 w-[80px] h-[35px] flex justify-center items-center rounded-md"
              variant="Login"
            >
              Login
            </Button>
          )}

          {showAuth && <AuthModal setShowAuth={setShowAuth} />}

          <span
            className="relative cursor-pointer px-2 w-[70px] h-[35px] bg-[#323546] flex justify-between items-center rounded-lg"
          >
            <Burger />
            <Image
              src="/default-avatar.png"
              alt="Avatar"
              width={24}
              height={24}
            />

          </span>
        </div>
      </div>
    </div>
  );
};

// Feed items with proper typing
const feedItems: DropDownItem[] = [
  {
    label: "Feeds",
    icon: <BsRssFill className="text-white" />,
    bg: "bg-blue-500",
  },
  {
    label: "Topics",
    icon: <FaHashtag className="text-white" />,
    bg: "bg-green-500",
  },
  {
    label: "Lives",
    icon: <FiActivity className="text-white" />,
    bg: "bg-rose-400",
  },
  {
    label: "Articles",
    icon: <PiArticleFill className="text-white" />,
    bg: "bg-purple-500",
  },
  {
    label: "Sentiment",
    icon: <MdSpeed className="text-white" />,
    bg: "bg-indigo-500",
  },
];

const FeedsDropdown: React.FC<FeedsDropdownProps> = ({ showCommunity }) => {
  if (!showCommunity) return null;

  return (
    <div className="bg-[#1E1E2F] p-4 absolute top-10 rounded-xl shadow-xl w-52 space-y-4">
      {feedItems.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${item.bg}`}
          >
            {item.icon}
          </div>
          <span className="text-white font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// Products dropdown sections with proper typing
const sections: DropDownSection[] = [
  {
    title: "Products",
    items: [
      { icon: <IoIosPaper />, label: "Converter" },
      { icon: <IoIosMail />, label: "Newsletter", external: true },
      { icon: <FaRobot />, label: "CMC Labs", external: true },
      { icon: <FaRobot />, label: "Telegram Bot", external: true },
      { icon: <FaBullhorn />, label: "Advertise", external: true },
      { icon: <MdOutlineApi />, label: "Crypto API" },
      { icon: <MdOutlineWidgets />, label: "Site Widgets" },
    ],
  },
  {
    title: "Campaigns",
    items: [
      { icon: <AiFillGift />, label: "Airdrops" },
      { icon: <IoMdRocket />, label: "Diamond Rewards" },
      { icon: <BiSolidGraduation />, label: "Learn & Earn", external: true },
    ],
  },
  {
    title: "Calendars",
    items: [
      { icon: <RiCalendarEventLine />, label: "ICO Calendar" },
      { icon: <RiCalendarEventLine />, label: "Events Calendar" },
    ],
  },
  {
    title: "Learn",
    items: [
      { icon: <BsNewspaper />, label: "News" },
      { icon: <BiSolidGraduation />, label: "Academy", external: true },
      { icon: <BsFillBookFill />, label: "Research" },
      { icon: <PiVideoFill />, label: "Videos" },
      { icon: <BsFillBookFill />, label: "Glossary", external: true },
    ],
  },
];

const ProductsDropdown: React.FC = () => {
  return (
    <div className="bg-[#1E1E2F] absolute top-10 text-white p-6 rounded-xl shadow-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl">
      {sections.map((section) => (
        <div key={section.title}>
          <h4 className="text-gray-400 text-sm mb-3 font-semibold">
            {section.title}
          </h4>
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
                {external && (
                  <FaExternalLinkAlt className="text-gray-400 text-xs" />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

