import { Request, Response } from "express";
export interface UserToken {
    email: string;
    userId: string;
    iat: number;
    exp: number;
}
export declare function depositMoney(req: Request, res: Response): Promise<void>;
