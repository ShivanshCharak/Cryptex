import {Router} from 'express'
import { RedisManager } from '../RedisManager'
import {GET_DEPTH} from '../types/index'
import { httpTotalRequest, httpRequestDurationSeconds,httpSuccessfullRequest } from '@repo/prometheus/metrics'


export const depthRouter:Router = Router()

depthRouter.use((req, res, next) => {
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

depthRouter.get("/",async (req,res)=>{
    {console.log("gettting orders")}
      httpTotalRequest.inc({
            method:"post",
            routes:"api/v1/depth"
        })
    const {symbol} = req.query
    
    const response = await RedisManager.getInstance().sendAndAwait({
    type: GET_DEPTH,
    data:{
        market: symbol as string
    }
    })
     httpSuccessfullRequest.inc({
            method:"/post",
            routes:"/api/v1/depth",
            message:"depth sent to the frontend"
        })

   
    res.json(response.payload)

})