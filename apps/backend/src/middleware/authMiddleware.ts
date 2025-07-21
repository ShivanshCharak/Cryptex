import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Unauthorized' })
    return 
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload
    req.user = payload
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
    return // ✅ Again, add return here
  }
}
