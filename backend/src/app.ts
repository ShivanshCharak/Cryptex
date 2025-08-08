// src/app.ts
import express, { Express, Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import prisma from '@repo/postgres-prisma';
import cors from 'cors';
import cookieParser from 'cookie-parser';


import { 
  sharedRegistry, 
  httpTotalRequest, 
  httpRequestDurationSeconds, 
  httpConnections 
} from '@repo/prometheus/metrics';

import auth from './routes/authRouter';
import moneyDeposit from './routes/moneyRouter';
import orderDeposit from './routes/orderRouter';
import { authMiddleware } from './middleware/authMiddleware';
import { healthRouter } from './Monitoring/healthRouter';

dotenv.config();

export const app: Express = express();

prisma.$connect()
  .then(() => console.log("Prisma connected"))
  .catch((e: Error) => {
    console.error("Prisma connection failed:", e);
    process.exit(1);
  });

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3002',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Trace-ID']
}));

app.use((req: Request, res: Response, next: NextFunction) => {
  const startTime = performance.now();
  req.traceId = req.headers['x-trace-id'] as string || uuidv4();
  res.setHeader('X-Trace-ID', req.traceId);

  res.on('finish', () => {
    const duration = performance.now() - startTime;
    const route = req.originalUrl.split('?')[0];

    httpTotalRequest.inc({
      method: req.method,
      routes:route,
    });

    httpRequestDurationSeconds.observe({
      method: req.method,
      route,
      status_code: res.statusCode
    }, duration / 1000);
  });
  next();
});
let activeConnections = 0;
app.use((req, res, next) => {
  activeConnections += 1;
  httpConnections.set(activeConnections);
  res.on('finish', () => {
    activeConnections -= 1;
    httpConnections.set(activeConnections);
  });
  next();
});

// Define your routes
app.use("/auth", auth);
app.use("/account", authMiddleware, moneyDeposit);
app.use("/order", orderDeposit);
app.use("/health", healthRouter);

// The metrics endpoint uses the shared registry
app.get("/metrics", async (req, res) => {
    res.set('Content-Type', sharedRegistry.contentType);
    res.end(await sharedRegistry.metrics());
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});