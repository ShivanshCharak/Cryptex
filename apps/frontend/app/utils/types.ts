import { TTradeInfo } from "../components/depth/type";
import { JSX } from "react";
export interface KLine {
    close: string;
    end: string;
    high: string;
    low: string;
    open: string;
    quoteVolume: string;
    start: string;
    trades: string;
    volume: string;
}

export interface Trade {
    id: number,
    isBuyerMaker: boolean,
    price: number,
    quantity: number,
    quoteQuantity: number,
    timestamp: string
}

export interface Depth {
    bids: TTradeInfo[],
    asks: TTradeInfo[],
    lastUpdateId: string
}

export interface Ticker {
    firstPrice: number,
    high: number,
    lastPrice: number,
    low: number,
    change?: number,
    symbol: string,
    volume: number
    priceChangePercent:number
}

export type TDepthBids={
    price: string
    quantity: string
}
export type TUserInfo = {
  email: string;
  password: string;
  username?:string
};
export interface User {
  id: string;
  email: string;
  username: string;
}

export interface AuthResponse {
  message: string;
  accessToken: string;
  user: User;
}

export interface AuthError {
  error: string;
  details?: Array<{
    code: string;
    expected: any;
    received: any;
    path: string[];
    message: string;
  }>;
}

export interface UserContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export interface SignupData {
  email: string;
  password: string;
  username: string;
}

export interface LoginData {
  email: string;
  password: string;
}
export type TCryptoAssets = Array<{
  name:string,
  symbol:string,
  image:string,
  price:string
}>
export type TcardConfig=Array<{
    type:string
    data:TCryptoAssets|TDexScan,
    symbols:Array<JSX.Element>
}>

export type TDexScan=Array<{
   symbol: string,
          price: string,
          image:string,
            changePercent?: string,
          isPositive: boolean,
}>