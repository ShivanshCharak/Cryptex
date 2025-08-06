import axios from "axios";
import { Depth, KLine, TDepth, Ticker, Trade } from "./types";
import { TTradeInfo } from "./types";

// const BASE_URL = "https://exchange-proxy.100xdevs.com/api/v1";
const BASE_URL = "http://localhost:3000/api/v1";

export async function getTicker(market: string): Promise<Ticker> {
    const tickers = await getTickers();
    console.log("tickjetrs",tickers)
    const ticker = tickers?.find(t => t.symbol === market.split('_')[0]);
    if (!ticker) {
        throw new Error(`No ticker found for ${market}`);
    }
    return ticker;
}

export async function getTickers(): Promise<Ticker[]> {
    console.log(`${BASE_URL}/tickers`)
    const response = await axios.get(`${BASE_URL}/tickers`);
    return response.data.data;
}


export async function getDepth(market: string): Promise<TDepth> {
    const response = await axios.get(`${BASE_URL}/depth?symbol=${market}`);
    return response.data;
}
export async function getTrades(market: string): Promise<Trade[]> {
    const response = await axios.get(`${BASE_URL}/trades?symbol=${market}`);
    return response.data;
}

export async function getKlines(market: string, interval: string, startTime: number, endTime: number): Promise<KLine[]> {
    // const response = await axios.get(`${BASE_URL}/klines?symbol=${market}&interval=${interval}&startTime=${Math.floor(new Date("2025-06-01T00:00:00Z").getTime() / 1000)}&endTime=${Math.floor(new Date("2025-06-30T23:59:59Z").getTime() / 1000)}`);
    let isoString = Date.now()
    console.log("iso",isoString,Date.now()-(1000*60*60*24*365))
     const response = await axios.get(`${BASE_URL}/klines?symbol=${market}&interval=${interval}&startTime=${Date.now()}&endTime=${Date.now()-(1000*60*60*24*365)}`);
    console.log("KlinesDta",response.data)                 
    const data: KLine[] = response.data;
    return data.sort((x, y) => (Number(x.end) < Number(y.end) ? -1 : 1));
}
