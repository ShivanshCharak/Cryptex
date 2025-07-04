// src/app.ts
import express from 'express';
import dotenv from 'dotenv';
import prisma from 'postgres-prisma'
import cors from 'cors'
import auth from './routes/authRouter';
import moneyDeposit from './routes/moneyRouter'; // ← Correct
import cryptoDeposit from './routes/cryptoRouter';
import orderDeposit from './routes/orderRouter'

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
app.use(cors())


app.use("/auth", auth);
app.use("/account", moneyDeposit); // ← attaches /account/deposit
app.use("/crypto", cryptoDeposit);
app.use("/order", orderDeposit);


process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});

app.listen(3003, () => {
  console.log("🚀 Server is running on port 3003");
});
