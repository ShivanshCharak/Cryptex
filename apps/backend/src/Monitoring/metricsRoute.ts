import {  buisnessMetrics, memoryUsedGauge, redisPendingOrderGauge, register } from './metrics'
import { app } from '../app'
import { Request, Response, NextFunction,Router } from 'express'

import Redis from 'ioredis'
import { memoryUsage } from 'process'

const redis = new Redis();

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
