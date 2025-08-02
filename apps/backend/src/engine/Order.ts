import { Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import prisma, {Prisma} from "@repo/postgres-prisma";
import { UserToken } from "./account";

export default async function createOrder(req:Request, res:Response){
  try {
      const {token, market, side, price, quantity, filled} = req.body
      console.log(token)
    //   if(!token||!market||!side||!price||!quantity){
          
    //       return res.status(400).json({message:"All fields are required"})
    //     }
      const decoded  = jwt.verify(token,'gamma') as UserToken
  
      const result = await prisma.$transaction(async(tx)=>{
          const user  = await tx.user.findFirst({
              where:{
                  email: decoded.email
              }
              })
          if(!user){
              return res.status(400).json({message:"No users found"})
          }
          const orders = await tx.orders.create({
              data:{
                  market,
                  userId:decoded.userId,
                  side,
                  price,
                  quantity,
    
              },
              select:{
                market:true,userId:true,side:true,filled:true,quantity:true,price:true,id:true,
              }
          })
          return res.status(200).json({message:"Order created",data:orders})
        
      })
      
  } catch (error) {
    return res.status(500).json({message:"Error occured while creating order", error})
  }

}

export async function BulkCreateOrder(req: Request, res: Response) {
  const orders = Array.from({ length: 50 }, (_, i) => {
    const userIds = [
      "339c7492-6aeb-481e-b793-81a6b68915af",
      "5fcfed7c-9049-4daa-8818-e15b4686f47a",
      "b58a559b-1b43-4025-9d4d-1896b0f70e48",
      "c8162fbf-837b-4820-bd84-15de798b4dac",
      "d5f0af04-426e-409f-ab13-ef2e7f50daa4"
    ];

    const now = new Date();
    const minutesBack = Math.floor(Math.random() * 60 * 24 * 7); // last 7 days
    const timestamp = new Date(now.getTime() - minutesBack * 60000).toISOString();

    const basePrice = 82;
    const price = (basePrice + (Math.random() * 18 - 8)).toFixed(2);
    const quantity = +(Math.random() * 50 + 0.5).toFixed(3);
    const filled = +(Math.random() * quantity).toFixed(3);

    return {
      userId: userIds[Math.floor(Math.random() * userIds.length)],
      market: "SOL",
      side: i < 25 ? "buy" : "sell",
      price: +price,
      quantity,
      filled,
      createdAt: new Date(timestamp), // Prisma expects a Date object, not string
    };
  });

  try {
    await prisma.$transaction(async (tx:Prisma.TransactionClient) => {
      await tx.orders.createMany({
        // @ts-ignore
        data: orders ,
        skipDuplicates:true
      });
    });

    return res.status(200).json({ message: "Orders created successfully." });
  } catch (error) {
    console.error("Bulk create error:", error);
    return res.status(500).json({ error: "Failed to insert orders." });
  }
}