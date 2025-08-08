import { Router } from "express";
import { RedisManager } from "../RedisManager";
import { CREATE_ORDER, CANCEL_ORDER, GET_OPEN_ORDERS } from "../types";
import {httpSuccessfullRequest, httpRequestDurationSeconds,httpTotalRequest} from '@repo/backend/metrics'



export const orderRouter:Router = Router();
orderRouter.use((req, res, next) => {
const startTime = performance.now();

  const route = req.baseUrl + (req.route?.path || req.path);
  httpTotalRequest.inc({
    method: req.method,
    routes: route
  });
  res.on('finish', () => {
    const duration = performance.now() - startTime;
     httpSuccessfullRequest.inc({
    method: req.method,
    message:res.statusMessage||"sucessfull",
    routes: route
  });

    httpRequestDurationSeconds.observe({ method: req.method, route, status_code: res.statusCode }, duration / 1000);
    console.log(` Route: ${route} | Status: ${res.statusCode} | Duration: ${duration}ms`);
  });

  next();  
});
orderRouter.post("/", async (req, res) => {
    console.log("hey")


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