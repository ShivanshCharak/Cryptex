import { Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import prisma from "postgres-prisma";
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