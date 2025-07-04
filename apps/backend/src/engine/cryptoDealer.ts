import e, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserToken } from './account'
import prisma from 'postgres-prisma'
import { Decimal } from '@prisma/client/runtime/library'
import { BUY, SELL } from '../types/types'
// import { Prisma } from '@prisma/client'

export const cryptoAmount: Map<string, number> = new Map([
    ["USD", 1200],
    ["INR", 1300]
])

export async function buyCrypto(req: Request, res: Response) {
    try {
        const { token, crypto, quantity, side } = req.body;
        let requestedQuantity = quantity

        // Validate input
        if (!token || !crypto || !quantity || !side) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (side !== BUY && side !== SELL) {
            return res.status(400).json({ message: "Invalid trade type" });
        }

        const decoded = jwt.verify(token, "gamma") as UserToken;
        const amountNeeded = (cryptoAmount.get("USD") ?? 0) * Number(requestedQuantity);

        const result = await prisma.$transaction(async (tx) => {

            const userAccount = await getUserAccount(tx, decoded.userId);

            if (new Decimal(amountNeeded).greaterThan(userAccount.amount)) {
                throw new Error("Insufficient funds");
            }

            const orders = await tx.orders.findMany({
                where: { market: crypto, type: SELL },
                orderBy: { price: 'asc' }
            });

            for (const order of orders) {
                if (requestedQuantity <= 0) break

                const avaiableQty = Number(order.quantity)
                const matchedQty = Math.min()
            }
            // Update user balance
            const newAmount = new Decimal(userAccount.amount).sub(amountNeeded);
            await tx.accountBalance.update({
                where: { userId: decoded.userId },
                data: { amount: newAmount }
            });

            return { success: true };
        });

        return res.status(200).json({ message: "Trade executed", result });
    } catch (error) {
        console.error("Trade error:", error);
        return res.status(500).json({ message: "Trade failed. Please try again." });
    }
}
export async function sellCrypto(req: Request, res: Response) {
    try {
        const { token, crypto, quantity, side } = req.body;
        let requestedQuantity = quantity;

        // Validate input
        if (!token || !crypto || !quantity || !side) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (side !== BUY && side !== SELL) {
            return res.status(400).json({ message: "Invalid trade type" });
        }

        const decoded = jwt.verify(token, "gamma") as UserToken;

        const result = await prisma.$transaction(async (tx) => {
            const userAccount = await getUserAccount(tx, decoded.userId);

            const userCrypto = await tx.cryptoBalance.findFirst({
                where: { userId: decoded.userId, asset: crypto }
            });

            if (!userCrypto || new Decimal(requestedQuantity).greaterThan(userCrypto.quantity)) {
                throw new Error("Insufficient crypto balance");
            }

            const orders = await tx.orders.findMany({
                where: { market: crypto, type: BUY },
                orderBy: { price: 'desc' } // Highest price first
            });

            for (const order of orders) {
                if (requestedQuantity <= 0) break;

                const availableQty = Number(order.quantity);
                const matchedQty = Math.min(availableQty, requestedQuantity);

                // Simulate match logic (e.g., update order book, log transaction, etc.)
                requestedQuantity -= matchedQty;

                // In actual case: update order quantity, insert trade history, etc.
            }

            // Deduct crypto from user's wallet
            const newCryptoQty = new Decimal(userCrypto.quantity).sub(quantity);
            await tx.cryptoBalance.update({
                where: { id: userCrypto.id },
                data: { quantity: Number(newCryptoQty) }
            });

            // Credit user fiat balance (e.g., USD)
            const fiatEarned = (cryptoAmount.get("USD") ?? 0) * Number(quantity);
            const newFiatBalance = new Decimal(userAccount.amount).add(fiatEarned);
            await tx.accountBalance.update({
                where: { userId: decoded.userId },
                data: { amount: newFiatBalance }
            });

            return { success: true };
        });

        return res.status(200).json({ message: "Sell executed", result });
    } catch (error) {
        console.error("Sell trade error:", error);
        return res.status(500).json({ message: "Sell trade failed. Please try again." });
    }
}

async function getUserAccount(tx, userId: string) {

    const account = await tx.accountBalance.findUnique({
        where: { userId }
    })
    console.log(account)
    if (!account) throw new Error("Account not found")
    return account
}
export async function CryptoInserter(req: Request, res: Response) {
    try {
        const { token, asset, quantity } = req.body;

        // Validate input
        if (!token || !asset || !quantity) {
            return res.status(400).send({ message: "All fields are required" });
        }

        // Decode token
        const userData = jwt.verify(token, "gamma") as UserToken;

        // Find user ID
        const user = await prisma.user.findFirst({
            where: { email: userData.email },
            select: { id: true }
        });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Find account ID
        const account = await prisma.accountBalance.findFirst({
            where: { userId: user.id },
            select: { id: true }
        });

        if (!account) {
            return res.status(404).send({ message: "Account not found" });
        }
        console.log("account found")
        // Create crypto balance entry
        await prisma.cryptoBalance.create({
            data: {
                asset: asset,
                userId: user.id,
                quantity: Number(quantity), // ensure decimal if applicable
                accountId: account.id,
                createdAt: new Date()
            }
        });

        return res.status(200).send({ message: "Crypto deposited successfully" });
    } catch (error) {
        console.error("Crypto deposit error:", error);
        return res.status(500).send({ message: "Failed to deposit crypto" });
    }
}
