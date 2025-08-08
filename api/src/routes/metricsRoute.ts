import {   memoryUsedGauge, sharedRegistry } from '@repo/prometheus/metrics'
import { Request, Response,Router } from 'express'



export const metricsRouter:Router = Router()

async function updateMetrics(){
  let totalMemory= process.memoryUsage().heapTotal
  let totalUsed= process.memoryUsage().heapUsed
  
  memoryUsedGauge.set(totalUsed)
  memoryUsedGauge.set(totalMemory)
}


metricsRouter.get("/", async (_: Request, res: Response) => {
  await updateMetrics()

  res.set('Content-Type', sharedRegistry.contentType);
  res.end(await sharedRegistry.metrics());
});
