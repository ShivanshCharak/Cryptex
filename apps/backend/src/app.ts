// src/app.ts
import express,{Express, RequestHandler} from 'express';
import dotenv from 'dotenv';
import prisma from 'postgres-prisma'
import cors from 'cors'
import auth from './routes/authRouter';

import moneyDeposit from './routes/moneyRouter'; 
import cryptoDeposit from './routes/cryptoRouter';
import orderDeposit from './routes/orderRouter'
import {register,postgres_connection_status,timescaleDb_connection_status} from './Monitoring/metrics'
import { authMiddleware } from './middleware/authMiddleware';
import { databaseConnections } from './premhelper';

import { metricsRouter } from './Monitoring/metricsRoute';
import {healthRouter} from './Monitoring/healthRouter'
import { incrementConnection,decrementConnection } from './Monitoring/healthRouter';
import  cookieParser from 'cookie-parser'
dotenv.config();

export const app:Express = express();

prisma.$connect()
.then(() => console.log("Prisma connected"))
.catch((e) => {
  console.error("Prisma connection failed:", e);
  process.exit(1);
});


app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: 'http://localhost:3002',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.on("connection",(socket)=>{
    incrementConnection()
    app.on("close",()=>{
        decrementConnection();
    })
})

app.use("/auth", auth);
app.use("/account" ,authMiddleware ,moneyDeposit); // ← attaches /account/deposit
app.use("/crypto",authMiddleware ,cryptoDeposit);
app.use("/order",authMiddleware ,orderDeposit);
app.use("/metrics",metricsRouter)
app.use("/health",healthRouter)





process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
