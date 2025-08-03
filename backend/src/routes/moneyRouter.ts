// src/routes/moneyDeposit.ts
import { Router } from "express";
import { depositMoney } from "../engine/account";

const router = Router();

router.post("/deposit", depositMoney);

export default router; 
