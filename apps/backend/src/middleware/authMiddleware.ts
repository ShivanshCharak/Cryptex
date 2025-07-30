import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import dotenv from 'dotenv'

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  dotenv.config()
  

  if (!authHeader?.startsWith('Bearer')) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  
  const token = authHeader.split(' ')[1]
  console.log(token)
  
  if(!process.env.ACCESS_TOKEN_SECRET){
    res.status(500).json({message:"server config error"})
    return
  }
  try {
    
    console.log("accesstoken")
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET) as JwtPayload & {userId:string,email:string}
    console.log(payload)
    req.user=payload 
    next()
  } catch(error) {
    console.log(error)
    res.status(401).json({ message: 'Invalid token' })
    return 
  }
}
