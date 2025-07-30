import e, { Request, Response } from 'express';
export declare const cryptoAmount: Map<string, number>;
export declare function buyCrypto(req: Request, res: Response): Promise<e.Response<any, Record<string, any>>>;
export declare function sellCrypto(req: Request, res: Response): Promise<e.Response<any, Record<string, any>>>;
export declare function CryptoInserter(req: Request, res: Response): Promise<e.Response<any, Record<string, any>>>;
