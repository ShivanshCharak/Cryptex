"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/moneyDeposit.ts
const express_1 = require("express");
const account_1 = require("../engine/account");
const router = (0, express_1.Router)();
router.post("/deposit", account_1.depositMoney);
exports.default = router;
