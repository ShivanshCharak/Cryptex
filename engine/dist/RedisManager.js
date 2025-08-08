"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisManager = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class RedisManager {
    static instance;
    client;
    constructor() {
        this.client = new ioredis_1.default();
    }
    static getInstance() {
        if (!RedisManager.instance) {
            RedisManager.instance = new RedisManager();
        }
        return RedisManager.instance;
    }
    async pushMessage(message) {
        await this.client.lpush("db_processor", JSON.stringify(message));
    }
    async brpop(message, delay) {
        return await this.client.brpop(message, delay);
    }
    async publishMessage(channel, message) {
        {
            console.log("channel", channel, message);
        }
        await this.client.publish(channel, JSON.stringify(message));
    }
    async sendToApi(clientId, message) {
        const result = await this.client.publish(clientId, JSON.stringify(message));
    }
    async setHash(key, data) {
        await this.client.hmset(key, data);
    }
    async delKey(key) {
        await this.client.del(key);
    }
    async getAllHashFields(key) {
        return this.client.hgetall(key);
    }
    async batchLoad(key, value) {
        let pipeline = this.client.pipeline();
        pipeline.hset(key, value);
        pipeline.exec();
    }
    async getOrder() {
        const keys = await this.scanKeysStream();
        let pipeline = this.client.pipeline();
        keys.forEach((val) => { pipeline.hgetall(val); });
        const result = await pipeline.exec();
        return result?.map(([error, data]) => {
            if (error)
                throw error;
            let order = data;
            return {
                market: order?.market,
                side: order.side,
                price: order.price,
                quantity: order.quantity,
                filled: order.filled,
                orderId: order.orderId,
                userId: order.userId
            };
        });
    }
    async scanKeysStream() {
        return new Promise((resolve, reject) => {
            const stream = this.client.scanStream({
                match: "order:*",
                count: 10000,
            });
            const keys = [];
            stream.on("data", (batch) => {
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
    async evaluateTransaction(script, scriptArgs) {
        return this.client.eval(script, scriptArgs.keys?.length || 0, ...(scriptArgs.keys || []), ...(scriptArgs.arguments || []));
    }
    async evaluation(script, options, key, amount) {
        try {
            const result = await this.client.eval(script, 1, key, amount);
            console.log("🧠 Redis eval result:", result, typeof result);
            return Number(result);
        }
        catch (error) {
            console.error("❌ Redis eval error:", error);
            return 0;
        }
    }
}
exports.RedisManager = RedisManager;
//# sourceMappingURL=RedisManager.js.map