"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisManager = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
class RedisManager {
    constructor() {
        this.client = new ioredis_1.default();
    }
    static getInstance() {
        if (!RedisManager.instance) {
            RedisManager.instance = new RedisManager();
        }
        return RedisManager.instance;
    }
    pushMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.lpush("db_processor", JSON.stringify(message));
        });
    }
    publishMessage(channel, message) {
        return __awaiter(this, void 0, void 0, function* () {
            {
                console.log("channel", channel);
            }
            yield this.client.publish(channel, JSON.stringify(message));
        });
    }
    sendToApi(clientId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.publish(clientId, JSON.stringify(message));
        });
    }
    setHash(key, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.hmset(key, data);
        });
    }
    delKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.del(key);
        });
    }
    getAllHashFields(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.hgetall(key);
        });
    }
    batchLoad(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            let pipeline = this.client.pipeline();
            pipeline.hset(key, value);
            pipeline.exec();
        });
    }
    getOrder() {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = yield this.scanKeysStream();
            let pipeline = this.client.pipeline();
            keys.forEach((val) => { pipeline.hgetall(val); });
            const result = yield pipeline.exec();
            return result === null || result === void 0 ? void 0 : result.map(([error, data]) => {
                if (error)
                    throw error;
                let order = data;
                return {
                    market: order === null || order === void 0 ? void 0 : order.market,
                    side: order.side,
                    price: order.price,
                    quantity: order.quantity,
                    filled: order.filled,
                    orderId: order.orderId,
                    userId: order.userId
                };
            });
        });
    }
    scanKeysStream() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    evaluateTransaction(script, scriptArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return this.client.eval(script, ((_a = scriptArgs.keys) === null || _a === void 0 ? void 0 : _a.length) || 0, ...(scriptArgs.keys || []), ...(scriptArgs.arguments || []));
        });
    }
    evaluation(script, options, key, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.client.eval(script, 1, key, amount);
                console.log("🧠 Redis eval result:", result, typeof result);
                return Number(result);
            }
            catch (error) {
                console.error("❌ Redis eval error:", error);
                return 0;
            }
        });
    }
}
exports.RedisManager = RedisManager;
