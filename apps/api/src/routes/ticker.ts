import { Router } from "express";

export const tickersRouter = Router();

let tickerData = [
  {
    symbol: "ETH",
    firstPrice: parseFloat(Math.random().toFixed(5)) * 1000,
    lastPrice: parseFloat(Math.random().toFixed(5)) * 1000,
    high: parseFloat(Math.random().toFixed(5)) * 100,
    low: parseFloat(Math.random().toFixed(5)) * 100,
    change: parseFloat(Math.random().toFixed(5)) * 10,
    volume: parseFloat(Math.random().toFixed(5)) * 10000,
  },
  {
    symbol: "SOL",
    firstPrice: parseFloat(Math.random().toFixed(5)) * 1000,
    lastPrice: parseFloat(Math.random().toFixed(5)) * 1000,
    high: parseFloat(Math.random().toFixed(5)) * 100,
    low: parseFloat(Math.random().toFixed(5)) * 100,
    change: parseFloat(Math.random().toFixed(5)) * 10,
    volume: parseFloat(Math.random().toFixed(5)) * 10000,
  },
  {
    symbol: "TATA",
    firstPrice: parseFloat(Math.random().toFixed(5)) * 1000,
    lastPrice: parseFloat(Math.random().toFixed(5)) * 1000,
    high: parseFloat(Math.random().toFixed(5)) * 100,
    low: parseFloat(Math.random().toFixed(5)) * 100,
    change: parseFloat(Math.random().toFixed(5)) * 10,
    volume: parseFloat(Math.random().toFixed(5)) * 10000,
  },
];

setInterval(() => {
  tickerData = tickerData.map((ticker) => ({
    ...ticker,
    high: parseFloat(Math.random().toFixed(5)) * 100,
    low: parseFloat(Math.random().toFixed(5)) * 100,
    change: parseFloat(Math.random().toFixed(5)) * 10,
    volume: parseFloat(Math.random().toFixed(5)) * 10000,
  }));
}, 3000);

tickersRouter.get("/", async (req, res) => {
  res.json({
    success: true,
    data: tickerData,
    timestamp: new Date().toISOString(),
  });
});
