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
const redis_1 = require("redis");
const Engine_1 = require("./trade/Engine");
const RedisManager_1 = require("./RedisManager");
const opossum_1 = __importDefault(require("opossum"));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const engine = new Engine_1.Engine();
        const redisClient = (0, redis_1.createClient)();
        yield redisClient.connect();
        const redis = new RedisManager_1.RedisManager();
        yield engine.init();
        const breakerOptions = {
            timeOut: 5000,
            errorThresholdPercentage: 50,
            resetTimeout: 10000,
        };
        const breaker = new opossum_1.default((data) => __awaiter(this, void 0, void 0, function* () { return engine.process(data); }), breakerOptions);
        breaker.on("open", () => console.warn("[Breaker] Open — pausing execution."));
        breaker.on("halfOpen", () => console.log("[Breaker] Half-open — testing system."));
        breaker.on("close", () => console.log("[Breaker] Closed — resumed execution."));
        breaker.on("reject", () => console.warn("[Breaker] Execution rejected."));
        breaker.on("timeout", () => console.error("[Breaker] Execution timed out."));
        breaker.on("failure", (err) => console.error("[Breaker] Execution failed:", err.message));
        while (true) {
            try {
                const response = yield redisClient.brPop("messages", 30);
                console.log(response);
                if (response) {
                    const { key, element } = response;
                    yield breaker.fire(JSON.parse(element));
                }
            }
            catch (err) {
                console.error("Error reading from Redis:", err);
                yield new Promise((res) => setTimeout(res, 1000));
            }
        }
    });
}
main();
