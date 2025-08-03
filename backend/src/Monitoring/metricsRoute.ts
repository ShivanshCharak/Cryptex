import {  buisnessMetrics, memoryUsedGauge, redisPendingOrderGauge, register } from './metrics'
import { app } from '../app'
import { Request, Response, NextFunction,Router } from 'express'

import Redis from 'ioredis'
import { memoryUsage } from 'process'
let redisUrl = process.env.REDIS_URL

if (!redisUrl) {
  throw new Error("REDIS_URL environment variable is not set.");
}
const url = new URL(redisUrl); // Parse the URL explicitly

console.log('🔍 REDIS_URL =', process.env.REDIS_URL,url.hostname,url.port);
const redis = new Redis({
  host: url.hostname, 
  port: parseInt(url.port, 10), 
  
});

export const metricsRouter = Router()

async function updateMetrics(){
  let totalMemory= process.memoryUsage().heapTotal
  let totalUsed= process.memoryUsage().heapUsed
  let redisUnProccessedOrders = await redis.llen('messages')
  
  memoryUsedGauge.set(totalUsed)
  memoryUsedGauge.set(totalMemory)
  redisPendingOrderGauge.set(redisUnProccessedOrders)
}


metricsRouter.get("/", async (req: Request, res: Response) => {
  await updateMetrics()
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
