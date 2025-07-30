import { Request, Response } from "express";
export default function createOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function BulkCreateOrder(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
