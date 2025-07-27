"use client";
import { useEffect, useState } from "react";
import {toast} from 'react-toastify'
import { useUserAuth } from "../utils/context/UserProvider";
import { useRouter } from "next/navigation";
import { AuthInspector } from "../utils/AuthInspector";

export default function DepositMoney() {
  const {setIsAuth} = useUserAuth()
  const [amountToDeposit, setAmountToDeposit] = useState<number|undefined>();
  const router =  useRouter()
  useEffect(()=>{
    if(AuthInspector.isAuthenticated()){
      setIsAuth(true)
      console.log("user is authenticated")
    }else{
      router.push("/")
    }
  },[])
  const {setAmount}  = useUserAuth()  

  const handleDeposit = async () => {
    try {
      console.log(localStorage.getItem('cryptex-token'))
        if (!amountToDeposit || isNaN(Number(amountToDeposit))) {
          
          return;
        }
        const res  = await fetch("http://localhost:3003/account/deposit",{
            method:"POST",
            headers:{
              'content-type':"application/json",
              'authorization':`Bearer ${localStorage.getItem('cryptex-token')}`
            },
            body:JSON.stringify({amountToDeposit}),
            credentials:"include"
        })
        if(res.ok){
          console.log("YOOOOOOOOOOo")
          const data = await res.json()
          console.log("amoutn despo")

            setAmount(data.account.amount)
            console.log(data.message)
          toast.success(data.message)
          console.log(data)

        }
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e11] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1a1b1f] border border-[#2c2e33] rounded-xl p-6 shadow-lg text-white">
        <h2 className="text-2xl font-semibold mb-4 text-green-400">💸 Deposit Funds</h2>

        <label className="block mb-2 text-sm text-gray-300">amountToDeposit (USD)</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={amountToDeposit}
          onChange={(e) => setAmountToDeposit(Number(e.target.value))}
          className="w-full px-4 py-2 bg-[#111215] text-white border border-gray-600 rounded-md placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
        />
        

        <button
          onClick={handleDeposit}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md transition"
        >
          Deposit
        </button>
      </div>
    </div>
  );
}
