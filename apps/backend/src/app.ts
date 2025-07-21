// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import prisma from 'postgres-prisma'
import cors from 'cors'
import auth from './routes/authRouter';
import moneyDeposit from './routes/moneyRouter'; 
import cryptoDeposit from './routes/cryptoRouter';
import orderDeposit from './routes/orderRouter'
import { authMiddleware } from './middleware/authMiddleware';

dotenv.config();

export const app = express();

prisma.$connect()
  .then(() => console.log("✅ Prisma connected"))
  .catch((e) => {
    console.error("❌ Prisma connection failed:", e);
    process.exit(1);
  });

  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:'http://localhost:3000',
  credentials:true
}))


app.use("/auth", auth);
app.use("/account" ,authMiddleware ,moneyDeposit); // ← attaches /account/deposit
app.use("/crypto",authMiddleware ,cryptoDeposit);
app.use("/order",authMiddleware ,orderDeposit);


process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

app.listen(3003, () => {
  console.log("🚀 Server is running on port 3003");
});
