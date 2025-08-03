
import { Router, Response } from "express";

export const tickersRouter:Router = Router();

tickersRouter.get("/", async (res:Response) => {    
  
    res.json({});
});