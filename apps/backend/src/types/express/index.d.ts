
import "express"

declare module "express-serve-static-core" {
  interface Request {
    traceId?: string; 
    startTime?:number,
    user?:Jwt & JwtPayload & void
  }
}
