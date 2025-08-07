// src/app.ts
import {v4 as uuidv4} from 'uuid'
import { Request,Response,NextFunction } from 'express'
import { httpTotalRequest,httpRequestDurationSeconds } from './Monitoring/metrics'
import express,{Express, RequestHandler} from 'express';
import dotenv from 'dotenv';
import prisma from '@repo/postgres-prisma'
import cors from 'cors'

import auth from './routes/authRouter';

import moneyDeposit from './routes/moneyRouter'; 
import orderDeposit from './routes/orderRouter'
import { httpConnections} from './Monitoring/metrics'
import { authMiddleware } from './middleware/authMiddleware';
// import {  } from './premhelper';

import { metricsRouter } from './Monitoring/metricsRoute';
import {healthRouter} from './Monitoring/healthRouter'
import { incrementConnection,decrementConnection } from './Monitoring/healthRouter';
import  cookieParser from 'cookie-parser'

dotenv.config();

export const app:Express = express();

prisma.$connect()
.then(() => console.log("Prisma connected"))
.catch((e:Error) => {
  console.error("Prisma connection failed:", e);
  process.exit(1);
});


app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req:Request,res:Response,next:NextFunction)=>{
  const startTime = performance.now()
  req.traceId = req.headers['x-trace-id'] as string || uuidv4()
  req.startTime  = startTime

   
  res.setHeader('X-Trace-ID', req.traceId);

  res.on('finish',()=>{

    const duration = performance.now()-startTime
    console.log(duration)
    const route:string = req.route?.path||req.path
    console.log(route)
    // @ts-ignore
    httpTotalRequest.inc({
        method:req.method,
        routes:route,
    })
    
    
    httpRequestDurationSeconds.observe({
      method:req.method ,
      route: route,
    },duration/1000)
    
  })
  next()
})


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

let activeConnections= 0
app.use((req,res,next)=>{
  activeConnections+=1
  httpConnections.set(activeConnections)
  res.on("finish",()=>{
    activeConnections-=1
    httpConnections.set(activeConnections)
  })
  next()
})



app.use("/auth" ,auth);
app.use("/account" ,authMiddleware ,moneyDeposit); // ← attaches /account/deposit
app.use("/order", orderDeposit);
app.use("/metrics",metricsRouter)
app.use("/health",healthRouter)





process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

app.listen(3003, () => {
  console.log("Server is running on port 3003");
});
