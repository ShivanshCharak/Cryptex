import { Request, Response } from "express";
import prisma from "postgres-prisma";
import jwt from 'jsonwebtoken';
import { httpTotalRequest,errorTotal,httpSuccessfullRequest } from "../Monitoring/metrics";



export interface UserToken {
    email: string;
    userId: string;
    iat: number;
    exp: number;
}

export  async function depositMoney(req: Request, res: Response):Promise<void> {
     httpTotalRequest.inc({
            routes:"/account/deposit"
        })
    try {
        const { amountToDeposit } = req.body;

        if (amountToDeposit === undefined) {
            errorTotal.inc({status_code:400,error:"Amount is required",routes:"/account/deposit"})
            res.status(400).json({ error: " amount is required." });
            return
        }

        if (Number(amountToDeposit) <= 0) {
            errorTotal.inc({
            status_code:"400",
            error:"Amont must be positive",
            routes:"/account/deposit"
        })
            res.status(400).json({ error: "Amount must be positive." });
            return
        }


        const accountUpdated = await prisma.$transaction(async (tx) => {
            const existingUser = await tx.user.findUnique({
                where: { email: req.user?.email },
                select: { id: true }
            });
            console.log("existisng user",existingUser,req.user)
            if (!existingUser) {
                throw new Error("UserNotFound");
            }

            const existingAccount = await tx.accountBalance.findFirst({
                where: { userId: existingUser.id }
            });
            

            if (existingAccount) {
                console.log("existing account",existingAccount)
                return await tx.accountBalance.update({
                    where: { id: existingAccount.id },
                    data: { amount: { increment: Number(amountToDeposit) } },
                    select: { amount: true }
                });
            } else {
                console.log(existingUser.id,"existing users")
                return await tx.accountBalance.create({
                    data: {
                        amount: Number(amountToDeposit),
                        user: { connect: { id: existingUser.id } }
                    },
                    select: { amount: true }
                });
            }
        });
         httpSuccessfullRequest.inc({
                    method:"201",
                    routes:"/account/deposit",
                    message:"Amount deposited successfully"
                })
        res.status(201).json({
            message: "Amount deposited successfully.",
            account: accountUpdated
        });
        return
        
    } catch (error: any) {
        errorTotal.inc({
            status_code:"401",
            error:`Deposit error ${error}`,
            routes:"/account/deposit"
        })
        console.error("Deposit error:", error);

        if (error instanceof jwt.JsonWebTokenError) {
              errorTotal.inc({
            status_code:"401",
            error:`Invalid token`,
            routes:"/account/deposit"
        })
            res.status(401).json({ error: "Invalid token." });
            return
        }

        if (error.message === "UserNotFound") {
              errorTotal.inc({
            status_code:"401",
            error:`User not found`,
            routes:"/account/deposit"
        })
            res.status(404).json({ error: "User not found." });
            return
        }
          errorTotal.inc({
            status_code:"500",
            error:`Internal server error`,
            routes:"/account/deposit"
        })
        res.status(500).json({ error: "Internal server error." });
        return
    }
}
