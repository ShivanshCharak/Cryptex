"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Engine_1 = require("./trade/Engine");
const RedisManager_1 = require("./RedisManager");
const opossum_1 = __importDefault(require("opossum"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function main() {
    const engine = new Engine_1.Engine();
    const redis = new RedisManager_1.RedisManager();
    await engine.init();
    const breakerOptions = {
        timeOut: 5000,
        errorThresholdPercentage: 50,
        resetTimeout: 10000,
    };
    const breaker = new opossum_1.default(async (data) => engine.process(data), breakerOptions);
    breaker.on("open", () => console.warn("[Breaker] Open — pausing execution."));
    breaker.on("halfOpen", () => console.log("[Breaker] Half-open — testing system."));
    breaker.on("close", () => console.log("[Breaker] Closed — resumed execution."));
    breaker.on("reject", () => console.warn("[Breaker] Execution rejected."));
    breaker.on("timeout", () => console.error("[Breaker] Execution timed out."));
    breaker.on("failure", (err) => console.error("[Breaker] Execution failed:", err.message));
    while (true) {
        try {
            const response = await redis.brpop("messages", 30);
            if (response) {
                const [key, element] = response;
                console.log(key, element);
                await breaker.fire(JSON.parse(element));
            }
        }
        catch (err) {
            console.error("Error reading from Redis:", err);
            await new Promise((res) => setTimeout(res, 1000));
        }
    }
}
main();
//# sourceMappingURL=index.js.map