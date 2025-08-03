import { buisnessMetrics,  } from './metrics'
import{ Router }from 'express'
import { Request, Response, NextFunction } from 'express'
import prisma from '@repo/postgres-prisma'
import dotenv from 'dotenv'


import Redis from 'ioredis'
dotenv.config()
export const healthRouter = Router()
let redisUrl = process.env.REDIS_URL

if (!redisUrl) {
  throw new Error("REDIS_URL environment variable is not set.");
}
const url = new URL(redisUrl); // Parse the URL explicitly
console.log('🔍 REDIS_URL =', process.env.REDIS_URL,url.hostname,url.port);
const redis = new Redis({
  host: url.hostname, // Should be 'redis'
  port: parseInt(url.port, 10), // Should be 6379
  // password: url.password, // Add if your Redis requires a password
});
let redisConnectedClients = 0
let tcpActiveConnections =0

export function  decrementConnection(){
  tcpActiveConnections++;
}

export function incrementConnection(){
  tcpActiveConnections--;
}

setInterval(async ()=>{
    try {
        const info = await redis.info("clients");
        const match = info.match('/connected_clients:(\d+)/')
        redisConnectedClients = match?parseInt(match[1] as string,10):0
    } catch (error) {
        redisConnectedClients=0
    }
},10000)


healthRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const health = {
    status: "healthy",
    server: "default",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    checks: {
      postgres: 'unknown',
      timescalePostgres: 'unknown',
      redis: 'unknown',
    },
    metrics: {
      tcpActiveConnections: tcpActiveConnections,
      redisActiveConnection:redisConnectedClients
    }
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    health.checks.postgres = 'healthy';
  } catch {
    health.checks.postgres = 'unhealthy';
    health.status = 'degraded';
    buisnessMetrics.errorRate.inc({ error_name: 'database_prisma_write', server_id: 1 });
  }

  try {
    
    await prisma.$queryRaw`SELECT 1`;
    health.checks.timescalePostgres = 'healthy';
  } catch {
    health.checks.timescalePostgres = 'unhealthy';
    health.status = 'degraded';
    buisnessMetrics.errorRate.inc({ error_name: 'timescale_postgres_write', server_id: 1 });
  }

  try {
    await redis.ping();
    health.checks.redis = 'healthy';
  } catch {
    health.checks.redis = 'unhealthy';
    health.status = 'degraded';
    buisnessMetrics.errorRate.inc({ error_name: 'redis', server_id: 1 });
  }

  const statusCode = health.status === 'healthy' ? 200 : 503;
  res.status(statusCode).json(health);
});
