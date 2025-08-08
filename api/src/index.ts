import express,{Express} from "express";
import cors from "cors";
import { orderRouter } from "./routes/order";
import { depthRouter } from "./routes/depth";
import { klineRouter } from "./routes/kline";
import { metricsRouter } from "./routes/metricsRoute";
import { sharedRegistry } from "@repo/prometheus/metrics";

export const app:Express = express();
app.use(cors({
    origin:"http://localhost:3002",
    "credentials":true
}));
app.use(express.json());



app.use("/api/v1/order", orderRouter);
app.use("/api/v1/depth", depthRouter);
app.use("/api/v1/klines", klineRouter);

app.get("/metrics", metricsRouter);
app.get("/metrics", async (_,res) => {

    res.set('Content-Type', sharedRegistry.contentType);
    res.end(await sharedRegistry.metrics());
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});