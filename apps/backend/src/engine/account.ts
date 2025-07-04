import { Request, Response } from "express";
import prisma from "postgres-prisma";
import jwt from 'jsonwebtoken';

export interface UserToken {
    email: string;
    userId: string;
    iat: number;
    exp: number;
}

export  async function depositMoney(req: Request, res: Response):Promise<void> {
    try {
        const { token, amountToDeposit } = req.body;
        console.log(req.body)

        if (!token || amountToDeposit === undefined) {
            res.status(400).json({ error: "Token and amount are required." });
            return
        }

        if (Number(amountToDeposit) <= 0) {
            res.status(400).json({ error: "Amount must be positive." });
            return
        }

        const decoded = jwt.verify(token, 'gamma') as UserToken;

        const accountUpdated = await prisma.$transaction(async (tx) => {
            const existingUser = await tx.user.findUnique({
                where: { email: decoded.email },
                select: { id: true }
            });

            if (!existingUser) {
                throw new Error("UserNotFound");
            }

            const existingAccount = await tx.accountBalance.findFirst({
                where: { userId: existingUser.id }
            });

            if (existingAccount) {
                return await tx.accountBalance.update({
                    where: { id: existingAccount.id },
                    data: { amount: { increment: Number(amountToDeposit) } },
                    select: { amount: true }
                });
            } else {
                return await tx.accountBalance.create({
                    data: {
                        amount: Number(amountToDeposit),
                        user: { connect: { id: existingUser.id } }
                    },
                    select: { amount: true }
                });
            }
        });

        res.status(201).json({
            message: "Amount deposited successfully.",
            account: accountUpdated
        });
        return

    } catch (error: any) {
        console.error("Deposit error:", error);

        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ error: "Invalid token." });
            return
        }

        if (error.message === "UserNotFound") {
            res.status(404).json({ error: "User not found." });
            return
        }

        res.status(500).json({ error: "Internal server error." });
        return
    }
}
