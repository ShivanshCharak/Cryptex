"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.klineRouter = void 0;
const pg_1 = require("pg");
const express_1 = require("express");
const metrics_1 = require("@repo/backend/metrics");
const pgClient = new pg_1.Client({
    user: 'shivansh',
    host: 'localhost',
    database: 'crypto',
    password: 'shamsher@54',
    port: 5432,
});
pgClient.connect();
exports.klineRouter = (0, express_1.Router)();
exports.klineRouter.get("/", async (req, res) => {
    console.log("HITTING");
    metrics_1.httpTotalRequest.inc({
        method: "get",
        routes: "api/v1/klines"
    });
    const { startTime, endTime, symbol } = req.query;
    console.log("starttime", startTime, endTime, req.query);
    let market = symbol?.toString().split("_")[0]?.toLowerCase();
    console.log(market);
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
    console.log("resultdata", "fjv", query);
    try {
        //@ts-ignore
        console.log("result", startTime, endTime);
        const result = await pgClient.query(query, [new Date(Number(endTime)), new Date(Number(startTime))]);
        console.table(result.rows);
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
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});
//# sourceMappingURL=kline.js.map