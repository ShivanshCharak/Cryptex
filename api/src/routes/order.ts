import { Router } from "express";
import { RedisManager } from "../RedisManager";
import { CREATE_ORDER, CANCEL_ORDER, GET_OPEN_ORDERS } from "../types";
import {httpSuccessfullRequest, httpTotalRequest} from '@repo/backend/metrics'



export const orderRouter:Router = Router();

orderRouter.post("/", async (req, res) => {
    console.log("hey")
    httpTotalRequest.inc({
        method:"post",
        routes:"api/v1/order"
    })
    const { market, price, quantity, side, userId } = req.body;


    

    const response = await RedisManager.getInstance().sendAndAwait({
        type: CREATE_ORDER,
        data: {
            market,
            price,
            quantity,
            side,
            userId
        }
    });
    httpSuccessfullRequest.inc({
        method:"/post",
        routes:"/api/v1/order",
        message:"Order created and sent to the frontend"
    })


    res.json(response.payload);
});

orderRouter.delete("/", async (req, res) => {
      httpTotalRequest.inc({
        method:"delete",
        routes:"api/v1/order"
    })
    const { orderId, market } = req.body;
    const response = await RedisManager.getInstance().sendAndAwait({
        type: CANCEL_ORDER,
        data: {
            orderId,
            market
        }
    });
    
    res.json(response.payload);
});

orderRouter.get("/open", async (req, res) => {
      httpTotalRequest.inc({
        method:"get",
        routes:"api/v1/order"
    })
    const response = await RedisManager.getInstance().sendAndAwait({
        type: GET_OPEN_ORDERS,
        data: {
            userId: req.query.userId as string,
            market: req.query.market as string
        }
    });
    res.json(response.payload);
});