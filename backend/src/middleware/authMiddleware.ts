import { verify, JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config()


// declare module 'express-serve-static-core' {
//   interface Request {
//     user?: {email:string} | JwtPayload
//   }
// }

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const token = authHeader.split(' ')[1]

  const secret = process.env.ACCESS_TOKEN_SECRET
  if (!secret) {
    return res.status(500).json({ message: 'Server config error' })
  }

  try {
    console.log("Access token received")

    const payload = verify(token as string, secret) as JwtPayload
    console.log(payload)

    req.user = payload
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).json({ message: 'Invalid token' })
  }
}
