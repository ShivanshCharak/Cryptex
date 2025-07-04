import { ReactNode, useState } from "react";
import { AmountContext } from "./AmountContext";

interface Props{
    children: ReactNode
}

export function AmountProvider({children}:Props){
    const [amount,setAmount] = useState<string|null>(null)
    return(<>
        <AmountContext.Provider value={{amount,setAmount}}>
            {children}
        </AmountContext.Provider>
    </>)
}