import {collectDefaultMetrics,register,Counter,Histogram,Gauge} from 'prom-client'
import {Request, Response, NextFunction} from 'express'

collectDefaultMetrics({register})

const httpRequestDurationSeconds = new Histogram({
    name:"http_request_duration_seconds",
    help:"Duration og HTTP request in seconds",
    labelNames:["method","route","status_code"],
    buckets:[0.1,0.3,0.5,1,2,5]
})
export const httpTotalRequest = new Counter({
    name:"http_requests_total",
    help:"Total number of http request",
    labelNames:["method","routes","server_id"]
})

export const activeConnections = new Gauge({
    name:"active_connections",
    help:"Total number of active connections",
    labelNames:["server_id"]
})
export const redis_connection_status = new Gauge({
    name:"redis_connection_status",
    help:"return 1 for active 0 for dead"
})
export const timescaleDb_connection_status= new Gauge({
    name:"timescale_connection_status",
    help:"return 1 for active 0 for dead"
})
export const postgres_connection_status= new Gauge({
    name:"postgres_connection_status",
    help:"return 1 for active 0 for dead"
})
export const buisnessMetrics={
    usersCreated: new Counter({
        name:"users_created",
        help:"Total number of users created",
        labelNames:['channel_type','server_id']
    }),
    messageProcessed: new Counter({
        name:"message_processed",
        help:"total number of message processed",
        labelNames:["channel_type","server_id"]
    }),
    errorRate: new Counter({
        name:"application_error",
        help:"Application error",
        labelNames:["error_name","server_id"]
    })
}
// register.registerMetric(httpRequestDurationSeconds)

// export const metricsMiddleware=(req:Request, res:Response, next:NextFunction)=>{
//     res.on('finish', () => {
//     end({
//       method: req.method,
//       route: req.route?.path || req.path, // fallback for unmatched route
//       status_code: res.statusCode.toString()
//     });
//     })
//     next()
// }
// export const metricsHandler = async(req:Request, res:Response)=>{
//     try {
//         res.setHeader('Content-Type',register.contentType)
//         const metrics = await register.metrics()
//         res.status(200).end(metrics)
//     } catch (error) {
//         console.error("Error generating prometheus metrics:", error)
//         res.status(500).end("Could not generate metrics")
//     }
// }
export {register}