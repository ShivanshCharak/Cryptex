// contexts/OrdersContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

import { TDepth,TTradeInfo } from "../types";
import { KLine } from "../types";

interface OrdersContextType {
  latestOrders: number;
  setLatestOrders:(trade:number)=>void
  klines: KLine[]|undefined;
  setKlines: (klines: KLine[]) => void;

  depth: TDepth;
  setDepth: (depth: TDepth) => void;
  trades:TTradeInfo[];
  setTrades:Dispatch<SetStateAction<TTradeInfo[]>>
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [latestOrders, setLatestOrders] = useState<number>(0);
  const [klines, setKlines] = useState<KLine[]>([]);
  const [depth, setDepth] = useState<TDepth>({ bids: [], asks: [] });
  const [trades, setTrades] = useState<TTradeInfo[]>([])

  return (
    <OrdersContext.Provider value={{ latestOrders, setLatestOrders,klines, setKlines,depth, setDepth, trades, setTrades}}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider");
  }
  return context;
}