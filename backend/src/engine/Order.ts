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

// export async function BulkCreateOrder(req: Request, res: Response) {
//   const orders = Array.from({ length: 50 }, (_, i) => {
//     const userIds = [
//       "339c7492-6aeb-481e-b793-81a6b68915af",
//       "5fcfed7c-9049-4daa-8818-e15b4686f47a",
//       "b58a559b-1b43-4025-9d4d-1896b0f70e48",
//       "c8162fbf-837b-4820-bd84-15de798b4dac",
//       "d5f0af04-426e-409f-ab13-ef2e7f50daa4"
//     ];

//     const now = new Date();
//     const minutesBack = Math.floor(Math.random() * 60 * 24 * 7); // last 7 days
//     const timestamp = new Date(now.getTime() - minutesBack * 60000).toISOString();

//     const basePrice = 82;
//     const price = (basePrice + (Math.random() * 18 - 8)).toFixed(2);
//     const quantity = +(Math.random() * 50 + 0.5).toFixed(3);
//     const filled = +(Math.random() * quantity).toFixed(3);

//     return {
//       userId: userIds[Math.floor(Math.random() * userIds.length)],
//       market: "SOL",
//       side: i < 25 ? "buy" : "sell",
//       price: +price,
//       quantity,
//       filled,
//       createdAt: new Date(timestamp), // Prisma expects a Date object, not string
//     };
//   });

//   try {
//     await prisma.$transaction(async (tx:Prisma.TransactionClient) => {
//       await tx.orders.createMany({
//         // @ts-ignore
//         data: orders ,
//         skipDuplicates:true
//       });
//     });

//     return res.status(200).json({ message: "Orders created successfully." });
//   } catch (error) {
//     console.error("Bulk create error:", error);
//     return res.status(500).json({ error: "Failed to insert orders." });
//   }
// }




export async function BulkCreateOrder(req: Request, res: Response) {
  try {
    const orders = [
    { userId: '339c7492-6aeb-481e-b793-81a6b68915af', market: 'SOL', side: 'buy', price: 113310.50, quantity: 0.45, filled: 0 },
{ userId: '5fcfed7c-9049-4daa-8818-e15b4686f47a', market: 'SOL', side: 'buy', price: 113870.25, quantity: 0.31, filled: 0 },
{ userId: '600d8a45-bc6c-4001-b684-3792e5265a02', market: 'SOL', side: 'buy', price: 113990.10, quantity: 0.63, filled: 0 },
{ userId: '61988b4f-df14-4c4d-81ee-9b12762dc063', market: 'SOL', side: 'buy', price: 113520.00, quantity: 0.40, filled: 0 },
{ userId: '67d2ae29-e764-428e-b619-b813a4054105', market: 'SOL', side: 'buy', price: 113580.50, quantity: 0.36, filled: 0 },
{ userId: '8be226b3-2a44-4e5f-a9ff-149e406b4673', market: 'SOL', side: 'buy', price: 113150.75, quantity: 0.29, filled: 0 },
{ userId: 'a4ad83ef-708b-4e47-816f-16b6989f6603', market: 'SOL', side: 'buy', price: 113720.00, quantity: 0.52, filled: 0 },
{ userId: 'b58a559b-1b43-4025-9d4d-1896b0f70e48', market: 'SOL', side: 'buy', price: 113250.30, quantity: 0.38, filled: 0 },
{ userId: 'c8162fbf-837b-4820-bd84-15de798b4dac', market: 'SOL', side: 'buy', price: 113680.00, quantity: 0.44, filled: 0 },
{ userId: 'd5f0af04-426e-409f-ab13-ef2e7f50daa4', market: 'SOL', side: 'buy', price: 113440.60, quantity: 0.39, filled: 0 },
{ userId: 'e54f5901-7e45-4e1c-91ff-f751f3681a73', market: 'SOL', side: 'buy', price: 113370.00, quantity: 0.50, filled: 0 },
{ userId: '339c7492-6aeb-481e-b793-81a6b68915af', market: 'SOL', side: 'buy', price: 113920.90, quantity: 0.60, filled: 0 },
{ userId: '5fcfed7c-9049-4daa-8818-e15b4686f47a', market: 'SOL', side: 'buy', price: 113410.45, quantity: 0.28, filled: 0 },
{ userId: '600d8a45-bc6c-4001-b684-3792e5265a02', market: 'SOL', side: 'buy', price: 113980.80, quantity: 0.33, filled: 0 },
{ userId: '61988b4f-df14-4c4d-81ee-9b12762dc063', market: 'SOL', side: 'buy', price: 113620.00, quantity: 0.31, filled: 0 },
{ userId: '67d2ae29-e764-428e-b619-b813a4054105', market: 'SOL', side: 'buy', price: 113790.40, quantity: 0.47, filled: 0 },
{ userId: '8be226b3-2a44-4e5f-a9ff-149e406b4673', market: 'SOL', side: 'buy', price: 113100.00, quantity: 0.69, filled: 0 },
{ userId: 'a4ad83ef-708b-4e47-816f-16b6989f6603', market: 'SOL', side: 'buy', price: 113650.90, quantity: 0.41, filled: 0 },
{ userId: 'b58a559b-1b43-4025-9d4d-1896b0f70e48', market: 'SOL', side: 'buy', price: 113710.25, quantity: 0.35, filled: 0 },
{ userId: 'c8162fbf-837b-4820-bd84-15de798b4dac', market: 'SOL', side: 'buy', price: 113890.00, quantity: 0.61, filled: 0 },


 { userId: 'd5f0af04-426e-409f-ab13-ef2e7f50daa4', market: 'SOL', side: 'sell', price: 114810.20, quantity: 0.34, filled: 0 },
{ userId: 'e54f5901-7e45-4e1c-91ff-f751f3681a73', market: 'SOL', side: 'sell', price: 114300.10, quantity: 0.58, filled: 0 },
{ userId: '339c7492-6aeb-481e-b793-81a6b68915af', market: 'SOL', side: 'sell', price: 114460.00, quantity: 0.40, filled: 0 },
{ userId: '5fcfed7c-9049-4daa-8818-e15b4686f47a', market: 'SOL', side: 'sell', price: 114580.90, quantity: 0.52, filled: 0 },
{ userId: '600d8a45-bc6c-4001-b684-3792e5265a02', market: 'SOL', side: 'sell', price: 114430.50, quantity: 0.55, filled: 0 },
{ userId: '61988b4f-df14-4c4d-81ee-9b12762dc063', market: 'SOL', side: 'sell', price: 114710.00, quantity: 0.61, filled: 0 },
{ userId: '67d2ae29-e764-428e-b619-b813a4054105', market: 'SOL', side: 'sell', price: 114790.25, quantity: 0.39, filled: 0 },
{ userId: '8be226b3-2a44-4e5f-a9ff-149e406b4673', market: 'SOL', side: 'sell', price: 114570.75, quantity: 0.36, filled: 0 },
{ userId: 'a4ad83ef-708b-4e47-816f-16b6989f6603', market: 'SOL', side: 'sell', price: 114430.60, quantity: 0.48, filled: 0 },
{ userId: 'b58a559b-1b43-4025-9d4d-1896b0f70e48', market: 'SOL', side: 'sell', price: 114650.00, quantity: 0.45, filled: 0 },
{ userId: 'c8162fbf-837b-4820-bd84-15de798b4dac', market: 'SOL', side: 'sell', price: 114770.80, quantity: 0.32, filled: 0 },
{ userId: 'd5f0af04-426e-409f-ab13-ef2e7f50daa4', market: 'SOL', side: 'sell', price: 114390.00, quantity: 0.54, filled: 0 },
{ userId: 'e54f5901-7e45-4e1c-91ff-f751f3681a73', market: 'SOL', side: 'sell', price: 114620.00, quantity: 0.30, filled: 0 },
{ userId: '339c7492-6aeb-481e-b793-81a6b68915af', market: 'SOL', side: 'sell', price: 114350.60, quantity: 0.49, filled: 0 },
{ userId: '5fcfed7c-9049-4daa-8818-e15b4686f47a', market: 'SOL', side: 'sell', price: 114600.20, quantity: 0.43, filled: 0 },
{ userId: '600d8a45-bc6c-4001-b684-3792e5265a02', market: 'SOL', side: 'sell', price: 114500.10, quantity: 0.50, filled: 0 },
{ userId: '61988b4f-df14-4c4d-81ee-9b12762dc063', market: 'SOL', side: 'sell', price: 114720.00, quantity: 0.33, filled: 0 },
{ userId: '67d2ae29-e764-428e-b619-b813a4054105', market: 'SOL', side: 'sell', price: 114480.50, quantity: 0.38, filled: 0 },
{ userId: '8be226b3-2a44-4e5f-a9ff-149e406b4673', market: 'SOL', side: 'sell', price: 114730.00, quantity: 0.47, filled: 0 },
{ userId: 'a4ad83ef-708b-4e47-816f-16b6989f6603', market: 'SOL', side: 'sell', price: 114390.80, quantity: 0.41, filled: 0 },

    ];

    const result = await prisma.orders.createMany({
      data: orders,
      skipDuplicates: true // useful if you already inserted some rows
    });

    return res.status(200).json({ message: 'Orders created successfully', count: result.count });
  } catch (error) {
    console.error('Error creating orders:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
