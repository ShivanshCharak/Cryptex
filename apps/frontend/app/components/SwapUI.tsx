"use client";

import { useEffect, useState } from "react";
import { useAmount } from "../utils/context/AmountContext";
import { useUserAuth } from "../utils/context/UserProvider";
import { useOrders } from "../utils/context/DepthContext";
import { TTradeInfo } from "./depth/type";

type OrderType = 'limit' | 'market';
type OrderSide = 'buy' | 'sell';

interface OrderButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
  activeColor: string;
  hoverColor: string;
}

const OrderButton = ({ active, label, onClick, activeColor, hoverColor }: OrderButtonProps) => (
  <div 
    className={`flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 p-4 ${
      active ? activeColor : 'border-b-baseBorderMed hover:border-b-baseBorderFocus'
    }`} 
    onClick={onClick}
  >
    <p className={`text-center text-sm font-semibold ${active ? activeColor.split(' ')[0] : ''}`}>
      {label}
    </p>
  </div>
);

interface TypeButtonProps {
  active: boolean;
  label: string;
  onClick: () => void;
}

const TypeButton = ({ active, label, onClick }: TypeButtonProps) => (
  <div className="flex flex-col cursor-pointer justify-center py-2" onClick={onClick}>
    <div className={`text-sm font-medium py-1 border-b-2 ${
      active 
        ? "border-accentBlue text-baseTextHighEmphasis" 
        : "border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"
    }`}>
      {label}
    </div>
  </div>
);

export function SwapUI({ market }: { market: string }) {
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [activeTab, setActiveTab] = useState<OrderSide>('buy');
    const [orderValue, setOrderValue] = useState<number>(0);
    const [type, setType] = useState<OrderType>('limit');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { amount } = useAmount();
    const { user } = useUserAuth();
    const {setLatestOrders,setTrades} = useOrders()
    const [isSubmitting, setIsSubmitting] = useState(false);


    useEffect(() => {
        const calculatedValue = parseFloat(quantity) * parseFloat(price);
        setOrderValue(isNaN(calculatedValue) ? 0 : calculatedValue);
    }, [quantity, price]);

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('token'));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const order = {
                market,
                side: activeTab,
                type,
                price: parseFloat(price),
                quantity: parseFloat(quantity),
                userId: user?.user.id
            };
    
            const res = await fetch('http://localhost:3000/api/v1/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            });
    
            if (!res.ok) throw new Error(`Server Error: ${res.status}`);
            const data = await res.json();
            console.log("Order success:", data);
    
            // Safely handle fills data
            if (data.fills && data.fills.length > 0) {
                // Update latest order price
                setLatestOrders(data.fills[0].price);
                
                // Update trades - single state update
                setTrades(prev => [...prev, ...data.fills]);
                
                
                // Alternative: If you need to process each fill individually
                // const newTrades = data.fills.map(fill => ({...fill}));
                // setTrades(prev => [...prev, ...newTrades]);
            } else {
                console.log("No fills data available");
            }
        } catch (err) {
            console.error("Order failed:", err);
            alert("Order failed!");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePercentageClick = (percentage: string) => {
        if (!amount) return;
        
        const amountNum = parseFloat(amount);
        if (isNaN(amountNum)) return;

        let availableAmount = amountNum;
        if (percentage === '25%') availableAmount *= 0.25;
        else if (percentage === '50%') availableAmount *= 0.5;
        else if (percentage === '75%') availableAmount *= 0.75;
        
        setQuantity(availableAmount.toFixed(2));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-[350px]">
                {/* Tabs */}
                <div className="flex flex-row h-[60px]">
                    <OrderButton
                        active={activeTab === 'buy'}
                        label="Buy"
                        onClick={() => setActiveTab('buy')}
                        activeColor="border-b-greenBorder bg-greenBackgroundTransparent"
                        hoverColor="text-green-400"
                    />
                    <OrderButton
                        active={activeTab === 'sell'}
                        label="Sell"
                        onClick={() => setActiveTab('sell')}
                        activeColor="border-b-redBorder bg-redBackgroundTransparent"
                        hoverColor="text-red-400"
                    />
                </div>

                {/* Order Type */}
                <div className="flex flex-col gap-1 px-3">
                    <div className="flex flex-row gap-5">
                        <TypeButton
                            active={type === 'limit'}
                            label="Limit"
                            onClick={() => setType('limit')}
                        />
                        <TypeButton
                            active={type === 'market'}
                            label="Market"
                            onClick={() => setType('market')}
                        />
                    </div>
                </div>

                {/* Input Fields */}
                <div className="flex flex-col px-3">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between">
                            <p className="text-xs text-baseTextMedEmphasis">Available Balance</p>
                            <p className="text-xs font-medium text-baseTextHighEmphasis">{amount} USDC</p>
                        </div>

                        {/* Price */}
                        <div className="flex flex-col gap-2">
                            <p className="text-xs text-baseTextMedEmphasis">Price</p>
                            <div className="relative">
                                <input
                                    step="0.01"
                                    placeholder="0"
                                    type="number"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                    className="h-12 rounded-lg text-white text-2xl bg-[#202127] border-none p-5 w-full focus:outline-none focus:ring-2 duration-300 focus:ring-blue-500"
                                    required
                                />
                                <div className="absolute right-1 top-1 p-2">
                                    <img 
                                        src="https://backpack.exchange/coins/usd.svg" 
                                        className="w-6 h-6" 
                                        alt="USD" 
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="flex flex-col gap-2">
                            <p className="text-xs text-baseTextMedEmphasis">Quantity</p>
                            <div className="relative">
                                <input
                                    step="0.01"
                                    placeholder="0"
                                    type="number"
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                    className="h-12 rounded-lg text-white text-2xl bg-[#202127] border-none p-5 w-full focus:outline-none focus:ring-2 duration-300 focus:ring-blue-500"
                                    required
                                />
                                <div className="absolute right-1 top-1 p-2">
                                    <img 
                                        src="https://backpack.exchange/_next/image?url=%2Fcoins%2Fbtc.png&w=48&q=95" 
                                        className="w-6 h-6" 
                                        alt="BTC" 
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <p className="text-xs text-baseTextMedEmphasis">
                                    ≈ {orderValue.toFixed(2)} USDC
                                </p>
                            </div>
                        </div>

                        {/* Order Value */}
                        <div className="flex flex-col gap-2">
                            <p className="text-xs text-baseTextMedEmphasis">Order Value</p>
                            <div className="relative">
                                <input
                                    readOnly
                                    placeholder="0"
                                    type="number"
                                    value={orderValue}
                                    className="h-12 rounded-lg text-white text-2xl bg-[#202127] border-none p-5 w-full focus:outline-none focus:ring-2 duration-300 focus:ring-blue-500"
                                />
                                <div className="absolute right-1 top-1 p-2">
                                    <img 
                                        src="https://backpack.exchange/coins/usd.svg" 
                                        className="w-6 h-6" 
                                        alt="USD" 
                                    />
                                </div>
                            </div>
                        </div>
                        
                        {/* Presets */}
                        <div className="flex justify-center gap-3 mt-2">
                            {["25%", "50%", "75%", "Max"].map(p => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => handlePercentageClick(p)}
                                    className="px-4 py-1 text-xs rounded-full bg-baseBackgroundL2 hover:bg-baseBackgroundL3 cursor-pointer"
                                >
                                    {p}
                                </button>
                            ))}
                        </div>

                        {/* Submit Button */}
                        <button
  type="submit"
  disabled={isSubmitting}
  className={`font-semibold h-12 rounded-xl text-base px-4 py-2 my-4 ${
    activeTab === 'buy' 
      ? 'bg-green-600 hover:bg-green-700' 
      : 'bg-red-600 hover:bg-red-700'
  } text-white active:scale-98 transition-transform duration-100 ${
    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
  }`}
>
  {isSubmitting ? (
    <span className="flex items-center justify-center">
      <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
      Processing...
    </span>
  ) : (
    `${isAuthenticated ? "" : "Sign up to"} Place Order`
  )}
</button>

                        {/* Options */}
                        <div className="flex justify-between mt-1">
                            <div className="flex gap-2">
                                <label className="flex items-center text-xs cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="form-checkbox h-4 w-4 mr-2 rounded bg-[#202127] border-gray-600 focus:ring-blue-500" 
                                    />
                                    Post Only
                                </label>
                                <label className="flex items-center text-xs cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        className="form-checkbox h-4 w-4 mr-2 rounded bg-[#202127] border-gray-600 focus:ring-blue-500" 
                                    />
                                    IOC
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}