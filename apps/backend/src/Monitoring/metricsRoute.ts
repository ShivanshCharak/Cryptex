import { activeConnections, buisnessMetrics, register } from './metrics'
import { app } from '../app'
import { Request, Response, NextFunction,Router } from 'express'
import prisma from 'postgres-prisma'
import Redis from 'ioredis'

const redis = new Redis();

export const metricsRouter = Router()
// metricsRouter.get("/health", async (req: Request, res: Response, next: NextFunction) => {
//   const health = {
//     status: "healthy",
//     server: "default",
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//     memory: process.memoryUsage(),
//     checks: {
//       postgres: 'unknown',
//       timescalePostgres: 'unknown',
//       redis: 'unknown',
//     },
//   }

//   try {
//     await prisma.$queryRaw`SELECT 1`;
//     health.checks.postgres = 'healthy';
//   } catch {
//     health.checks.postgres = 'unhealthy';
//     health.status = 'degraded';
//     buisnessMetrics.errorRate.inc({ error_name: 'database_prisma_write', server_id: 1 });
//   }

//   try {
    
//     await prisma.$queryRaw`SELECT 1`;
//     health.checks.timescalePostgres = 'healthy';
//   } catch {
//     health.checks.timescalePostgres = 'unhealthy';
//     health.status = 'degraded';
//     buisnessMetrics.errorRate.inc({ error_name: 'timescale_postgres_write', server_id: 1 });
//   }

//   try {
//     await redis.ping();
//     health.checks.redis = 'healthy';
//   } catch {
//     health.checks.redis = 'unhealthy';
//     health.status = 'degraded';
//     buisnessMetrics.errorRate.inc({ error_name: 'redis', server_id: 1 });
//   }

//   const statusCode = health.status === 'healthy' ? 200 : 503;
//   res.status(statusCode).json(health);
// });


metricsRouter.get("/", async (req: Request, res: Response) => {
  console.log("hello there")
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});
