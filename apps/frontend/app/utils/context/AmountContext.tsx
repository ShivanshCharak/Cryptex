import {createContext, useContext} from 'react'

interface AmountContext{
    amount: string|null
    setAmount :(amount:string|null)=> void
}
export const AmountContext =createContext<AmountContext>({amount:"",setAmount:()=>{
    throw new Error("Set amount called outside context")
}})

export const useAmount =()=> useContext(AmountContext)