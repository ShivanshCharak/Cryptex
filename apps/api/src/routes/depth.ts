import {Router} from 'express'
import { RedisManager } from '../RedisManager'
import {GET_DEPTH} from '../types/index'
import { httpTotalRequest, httpSuccessfullRequest } from 'backend/src/Monitoring/metrics'


export const depthRouter = Router()

depthRouter.get("/",async (req,res)=>{
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