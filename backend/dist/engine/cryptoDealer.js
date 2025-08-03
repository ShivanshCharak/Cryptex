"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptoAmount = void 0;
exports.buyCrypto = buyCrypto;
exports.sellCrypto = sellCrypto;
exports.CryptoInserter = CryptoInserter;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const postgres_prisma_1 = __importDefault(require("@repo/postgres-prisma"));
const library_1 = require("@prisma/client/runtime/library");
const types_1 = require("../types/types");
// import { Prisma } from '@prisma/client'
exports.cryptoAmount = new Map([
    ["USD", 1200],
    ["INR", 1300]
]);
function buyCrypto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { token, crypto, quantity, side } = req.body;
            let requestedQuantity = quantity;
            // Validate input
            if (!token || !crypto || !quantity || !side) {
                return res.status(400).json({ message: "All fields are required" });
            }
            if (side !== types_1.BUY && side !== types_1.SELL) {
                return res.status(400).json({ message: "Invalid trade type" });
            }
            const decoded = jsonwebtoken_1.default.verify(token, "gamma");
            const amountNeeded = ((_a = exports.cryptoAmount.get("USD")) !== null && _a !== void 0 ? _a : 0) * Number(requestedQuantity);
            const result = yield postgres_prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const userAccount = yield getUserAccount(tx, decoded.userId);
                if (new library_1.Decimal(amountNeeded).greaterThan(userAccount.amount)) {
                    throw new Error("Insufficient funds");
                }
                const orders = yield tx.orders.findMany({
                    where: { market: crypto, side: types_1.SELL },
                    orderBy: { price: 'asc' }
                });
                for (const order of orders) {
                    if (requestedQuantity <= 0)
                        break;
                    const avaiableQty = Number(order.quantity);
                    const matchedQty = Math.min();
                }
                // Update user balance
                const newAmount = new library_1.Decimal(userAccount.amount).sub(amountNeeded);
                yield tx.accountBalance.update({
                    where: { userId: decoded.userId },
                    data: { amount: newAmount }
                });
                return { success: true };
            }));
            return res.status(200).json({ message: "Trade executed", result });
        }
        catch (error) {
            console.error("Trade error:", error);
            return res.status(500).json({ message: "Trade failed. Please try again." });
        }
    });
}
function sellCrypto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token, crypto, quantity, side } = req.body;
            let requestedQuantity = quantity;
            // Validate input
            if (!token || !crypto || !quantity || !side) {
                return res.status(400).json({ message: "All fields are required" });
            }
            if (side !== types_1.BUY && side !== types_1.SELL) {
                return res.status(400).json({ message: "Invalid trade type" });
            }
            const decoded = jsonwebtoken_1.default.verify(token, "gamma");
            const result = yield postgres_prisma_1.default.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const userAccount = yield getUserAccount(tx, decoded.userId);
                const userCrypto = yield tx.cryptoBalance.findFirst({
                    where: { userId: decoded.userId, asset: crypto }
                });
                if (!userCrypto || new library_1.Decimal(requestedQuantity).greaterThan(userCrypto.quantity)) {
                    throw new Error("Insufficient crypto balance");
                }
                const orders = yield tx.orders.findMany({
                    where: { market: crypto, side: types_1.BUY },
                    orderBy: { price: 'desc' } // Highest price first
                });
                for (const order of orders) {
                    if (requestedQuantity <= 0)
                        break;
                    const availableQty = Number(order.quantity);
                    const matchedQty = Math.min(availableQty, requestedQuantity);
                    // Simulate match logic (e.g., update order book, log transaction, etc.)
                    requestedQuantity -= matchedQty;
                    // In actual case: update order quantity, insert trade history, etc.
                }
                // Deduct crypto from user's wallet
                const newCryptoQty = new library_1.Decimal(userCrypto.quantity).sub(quantity);
                yield tx.cryptoBalance.update({
                    where: { id: userCrypto.id },
                    data: { quantity: Number(newCryptoQty) }
                });
                // Credit user fiat balance (e.g., USD)
                const fiatEarned = ((_a = exports.cryptoAmount.get("USD")) !== null && _a !== void 0 ? _a : 0) * Number(quantity);
                const newFiatBalance = new library_1.Decimal(userAccount.amount).add(fiatEarned);
                yield tx.accountBalance.update({
                    where: { userId: decoded.userId },
                    data: { amount: newFiatBalance }
                });
                return { success: true };
            }));
            return res.status(200).json({ message: "Sell executed", result });
        }
        catch (error) {
            console.error("Sell trade error:", error);
            return res.status(500).json({ message: "Sell trade failed. Please try again." });
        }
    });
}
// @ts-ignore
function getUserAccount(tx, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const account = yield tx.accountBalance.findUnique({
            where: { userId }
        });
        console.log(account);
        if (!account)
            throw new Error("Account not found");
        return account;
    });
}
function CryptoInserter(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { token, asset, quantity } = req.body;
            // Validate input
            if (!token || !asset || !quantity) {
                return res.status(400).send({ message: "All fields are required" });
            }
            // Decode token
            const userData = jsonwebtoken_1.default.verify(token, "gamma");
            // Find user ID
            const user = yield postgres_prisma_1.default.user.findFirst({
                where: { email: userData.email },
                select: { id: true }
            });
            if (!user) {
                return res.status(404).send({ message: "User not found" });
            }
            // Find account ID
            const account = yield postgres_prisma_1.default.accountBalance.findFirst({
                where: { userId: user.id },
                select: { id: true }
            });
            if (!account) {
                return res.status(404).send({ message: "Account not found" });
            }
            console.log("account found");
            // Create crypto balance entry
            yield postgres_prisma_1.default.cryptoBalance.create({
                data: {
                    asset: asset,
                    userId: user.id,
                    quantity: Number(quantity), // ensure decimal if applicable
                    accountId: account.id,
                    createdAt: new Date()
                }
            });
            return res.status(200).send({ message: "Crypto deposited successfully" });
        }
        catch (error) {
            console.error("Crypto deposit error:", error);
            return res.status(500).send({ message: "Failed to deposit crypto" });
        }
    });
}
