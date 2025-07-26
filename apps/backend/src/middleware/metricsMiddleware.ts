import {app} from '../app'
import {v4 as uuidv4} from 'uuid'
import { Request,Response,NextFunction } from 'express'
import { httpRequestDuration, httpRequestsTotal } from '../premhelper'
app.use((req:Request,res:Response,next:NextFunction)=>{
  const startTime = performance.now()
  req.traceId = req.headers['x-trace-id'] as string || uuidv4()
  req.startTime  = startTime
   
  res.setHeader('X-Trace-ID', req.traceId);

  res.on('finish',()=>{
    const duration = performance.now()-startTime
    const route:string = req.route?.path||req.path
    httpRequestsTotal.inc({
        method:req.method,
        route:route,
        status_code:req.statusCode,
        server_id:1
    })
    httpRequestDuration.observe({
        method:req.method ,
        route: route,
        server_id:1 ,
    },duration)
  })
})
