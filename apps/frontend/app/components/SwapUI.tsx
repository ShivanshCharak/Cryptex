"use client";
import { useEffect, useState } from "react";
import { useAmount } from "../utils/context/AmountContext";
import { useUserAuth } from "../utils/context/UserContext";


export function SwapUI({ market }: { market: string }) {
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
    const [type, setType] = useState<'limit' | 'market'>('limit');
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const {amount, setAmount} = useAmount() 
    const {user,setUser} = useUserAuth()


    useEffect(() => {
        setIsAuthenticated(localStorage.getItem('auth') !== "null")
    }, [])
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const order = {
            market,
            side: activeTab, // buy or sell
            type,
            price: parseFloat(price),
            quantity: parseFloat(quantity),
            userId:user?.user.id
        };

        try {
            const res = await fetch('http://localhost:3000/api/v1/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(order)
            });

            if (!res.ok) throw new Error(`Server Error: ${res.status}`);
            const data = await res.json();
            console.log("Order success:", data);
            
        } catch (err) {
            console.error("Order failed:", err);
            alert("Order failed!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-[250px]">
                {/* Tabs */}
                <div className="flex flex-row h-[60px]">
                    <BuyButton activeTab={activeTab} setActiveTab={setActiveTab} />
                    <SellButton activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                {/* Order Type */}
                <div className="flex flex-col gap-1 px-3">
                    <div className="flex flex-row gap-5">
                        <LimitButton type={type} setType={setType} />
                        <MarketButton type={type} setType={setType} />
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
                                    className="h-12 rounded-lg border-2  text-black text-2xl"
                                />
                                <div className="absolute right-1 top-1 p-2">
                                    <img src="/usdc.webp" className="w-6 h-6" />
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
                                    className="h-12 rounded-lg border-2  text-black text-2xl"
                                />
                                <div className="absolute right-1 top-1 p-2">
                                    <img src="/sol.webp" className="w-6 h-6" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <p className="text-xs text-baseTextMedEmphasis">≈ 0.00 USDC</p>
                            </div>

                            {/* Presets */}
                            <div className="flex justify-center gap-3 mt-2">
                                {["25%", "50%", "75%", "Max"].map(p => (
                                    <div
                                        key={p}
                                        className="px-4 py-1 text-xs rounded-full bg-baseBackgroundL2 hover:bg-baseBackgroundL3 cursor-pointer"
                                    >
                                        {p}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="font-semibold h-12 rounded-xl text-base px-4 py-2 my-4 bg-greenPrimaryButtonBackground text-greenPrimaryButtonText active:scale-98"
                        >
                            {activeTab === "buy" ? `${isAuthenticated ? "Sign up to" : ""} Buy` : `${isAuthenticated ? "Sign Up to" : ""} Sell`}
                        </button>
                        {/* Options */}
                        <div className="flex justify-between mt-1">
                            <div className="flex gap-2">
                                <label className="flex items-center text-xs">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 mr-2" />
                                    Post Only
                                </label>
                                <label className="flex items-center text-xs">
                                    <input type="checkbox" className="form-checkbox h-5 w-5 mr-2" />
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
function LimitButton({ type, setType }: { type: string, setType: any }) {
    return <div className="flex flex-col cursor-pointer justify-center py-2" onClick={() => setType('limit')}>
        <div className={`text-sm font-medium py-1 border-b-2 ${type === 'limit' ? "border-accentBlue text-baseTextHighEmphasis" : "border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"}`}>
            Limit
        </div>
    </div>
}

function MarketButton({ type, setType }: { type: string, setType: any }) {
    return <div className="flex flex-col cursor-pointer justify-center py-2" onClick={() => setType('market')}>
        <div className={`text-sm font-medium py-1 border-b-2 ${type === 'market' ? "border-accentBlue text-baseTextHighEmphasis" : "border-b-2 border-transparent text-baseTextMedEmphasis hover:border-baseTextHighEmphasis hover:text-baseTextHighEmphasis"} `}>
            Market
        </div>
    </div>
}

function BuyButton({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: any }) {
    return <div className={`flex flex-col mb-[-2px] ml-[-10px] flex-1 cursor-pointer justify-center border-b-2 p-4 ${activeTab === 'buy' ? 'border-b-greenBorder bg-greenBackgroundTransparent' : 'border-b-baseBorderMed hover:border-b-baseBorderFocus'}`} onClick={() => setActiveTab('buy')}>
        <p className="text-center text-sm font-semibold text-greenText">
            Buy
        </p>
    </div>
}

function SellButton({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: any }) {
    return <div className={`flex flex-col mb-[-2px] flex-1 cursor-pointer justify-center border-b-2 p-4 ${activeTab === 'sell' ? 'border-b-redBorder bg-redBackgroundTransparent' : 'border-b-baseBorderMed hover:border-b-baseBorderFocus'}`} onClick={() => setActiveTab('sell')}>
        <p className="text-center text-sm font-semibold text-redText">
            Sell
        </p>
    </div>
}