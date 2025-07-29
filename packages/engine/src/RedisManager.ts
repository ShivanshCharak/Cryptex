import IORedis, { Redis, ScanStream } from "ioredis";
import { Order, OrderData } from "./utils/type";

type DbMessage = {
    type: "TRADE_ADDED",
    data: {
        id: string,
        isBuyerMaker: boolean,
        price: string,
        quantity: string,
        quoteQuantity: string,
        timestamp: number,
        market: string
    }
} | {
    type: "ORDER_UPDATE",
    data: {
        orderId: string,
        executedQty: number,
        market?: string,
        price?: string,
        quantity?: string,
        side?: "buy" | "sell",
    }
}

export class RedisManager {
    private static instance: RedisManager;
    private client: Redis;

    constructor() {
        this.client = new IORedis();
    }

    public static getInstance() {
        if (!RedisManager.instance) {
            RedisManager.instance = new RedisManager();
        }
        return RedisManager.instance;
    }

    public async pushMessage(message: DbMessage) {
        await this.client.lpush("db_processor", JSON.stringify(message));
    }

    public async publishMessage(channel: string, message: any) {
        {console.log("channel",channel)}
        await this.client.publish(channel, JSON.stringify(message));
    }

    public async sendToApi(clientId: string, message: any) {
        const result = await this.client.publish(clientId, JSON.stringify(message));
        

    }

    public async setHash(key: string, data: Record<string, string>) {
        await this.client.hmset(key, data);
    }

    public async delKey(key:string){
        await this.client.del(key)

    }
    public async getAllHashFields(key: string) {
        return this.client.hgetall(key)
    }

    public async batchLoad(key:string, value:{
        available:string,
        locked:string
    }){
        let pipeline = this.client.pipeline()
        pipeline.hset(key,value)
        pipeline.exec()

    }
    public async getOrder(){
        const keys  = await this.scanKeysStream()
        let pipeline  = this.client.pipeline()
        keys.forEach((val)=>{pipeline.hgetall(val)})
        const result = await pipeline.exec()

        return result?.map(([error,data])=>{
            if(error) throw error;
            let order = data as OrderData
            return{
                market:order?.market,
                side:order.side,
                price:order.price,
                quantity:order.quantity,
                filled:order.filled,
                orderId:order.orderId,
                userId:order.userId
            }
        })
        

    }
    public async scanKeysStream(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            const stream = this.client.scanStream({
                match: "order:*",
                count: 10000,
            });

            const keys: string[] = [];

            stream.on("data", (batch: string[]) => {
                keys.push(...batch);
            });

            stream.on("end", () => {
                resolve(keys);
            });

            stream.on("error", (err) => {
                reject(err);
            });
        });
    }

    async evaluateTransaction(script: string, scriptArgs: {
        keys?: string[];
        arguments?: string[];
    }) {
          return this.client.eval(
              script,
              scriptArgs.keys?.length||0,
              ...(scriptArgs.keys||[]),
              ...(scriptArgs.arguments||[])
        );
      }
    public async evaluation(script: string, options: number, key: string, amount: string): Promise<number> {
        try {
            const result = await this.client.eval(script, 1, key, amount);
            console.log("🧠 Redis eval result:", result, typeof result);
            return Number(result);
        } catch (error) {
            console.error("❌ Redis eval error:", error);
            return 0;
        }
    }
}