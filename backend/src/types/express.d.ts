import { JwtPayload } from "jsonwebtoken";

declare global {
    namespace Express{
        interface Request{
            traceId: string;
            startTime:number;
            user: {email:string}|JwtPayload;
        }
    }
}