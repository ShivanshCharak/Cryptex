import { useState, useRef, useEffect } from "react";

export default function CategoryMarket() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const itemRefs = useRef<(HTMLLIElement|null)[]>([]);

  const categories = [
    "All Crypto 🌐", "NFTs 🖼️", "Catgories 📂", "Token Unlocks 🔓",
    "Rehypo 🔁", "Binance Alpha 🧠", "Memes 😂", "SQL 🧮", "BNB 💰",
    "Internet Capitals Markets 🏦", "AI 🤖", "RWA 🏠", "Gaming 🎮",
    "DePIN 📡", "DeFAI 🧬", "AI Agents 👨‍💻",
  ];

  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (el) {
      setIndicatorStyle({
        width: el.offsetWidth-24 + "px",
        left: el.offsetLeft +12 + "px",
      });
    }
  }, [activeIndex]);

  return (
    <div className="relative overflow-x-auto">
      <ul className="relative flex max-w-full p-4 text-sm font-semibold text-slate-400 flex-wrap gap-4">
        {categories.map((cat, i) => (
          <li
            key={i}
            onClick={() => setActiveIndex(i)}
            ref={(el) => {itemRefs.current[i] = el}}
            className={`cursor-pointer relative px-3 z-10 transition-colors duration-300 ${
              activeIndex === i ? "text-white" : "text-gray-400"
            }`}
          >
            {cat}
          </li>
        ))}
        <span
          className="absolute bottom-0 h-1 bg-blue-700 rounded-lg transition-all duration-300 z-0"
          style={indicatorStyle}
        />
      </ul>
      <div className="max-w-full h-[1px] right-10 bg-slate-800"></div>
    </div>
  );
}
