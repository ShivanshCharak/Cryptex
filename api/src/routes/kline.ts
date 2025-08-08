import { Client } from 'pg';
import { Router } from "express";
import { httpTotalRequest,httpSuccessfullRequest,httpRequestDurationSeconds } from '@repo/prometheus/metrics';


const pgClient = new Client({
    user: 'shivansh',
    host: 'localhost',
    database: 'crypto',
    password: 'shamsher@54',
    port: 5432,
});
pgClient.connect();

export const klineRouter:Router = Router();

klineRouter.use((req, res, next) => {
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
 
   next(); // This is crucial to let the request proceed to the route handler
});
klineRouter.get("/", async (req, res) => {
    const {  startTime, endTime,symbol } = req.query;
    console.log("starttime",startTime,endTime,req.query)
    let market = symbol?.toString().split("_")[0]?.toLowerCase()

    let query;
    switch ('1h') {
        // case '1m':
        //     query = `SELECT * FROM klines_1m WHERE bucket >= $1 AND bucket <= $2`;
        //     break;
        case '1h':
            query = `SELECT * FROM klines_${market}_1h WHERE  bucket >= $1 AND bucket <= $2`;
            break;
        // case '1w':
        //     query = `SELECT * FROM klines_1w WHERE bucket >= $1 AND bucket <= $2`;
        //     break;
        // default:
            return res.status(400).send('Invalid interval');
    }

    try {
        //@ts-ignore
      
        const result = await pgClient.query(query, [new Date(Number(endTime)), new Date(Number(startTime))]);
        console.table(result.rows)
        res.json(result.rows.map(x => ({
            close: x.close,
            end: x.bucket,
            high: x.high,
            low: x.low,
            open: x.open,
            quoteVolume: x.quoteVolume,
            start: x.start,
            trades: x.trades,
            volume: x.volume,
        })));
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
