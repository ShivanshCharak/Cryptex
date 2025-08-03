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
exports.metricsRouter = void 0;
const metrics_1 = require("./metrics");
const express_1 = require("express");
const ioredis_1 = __importDefault(require("ioredis"));
let redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
    throw new Error("REDIS_URL environment variable is not set.");
}
const url = new URL(redisUrl); // Parse the URL explicitly
console.log('🔍 REDIS_URL =', process.env.REDIS_URL, url.hostname, url.port);
const redis = new ioredis_1.default({
    host: url.hostname,
    port: parseInt(url.port, 10),
});
exports.metricsRouter = (0, express_1.Router)();
function updateMetrics() {
    return __awaiter(this, void 0, void 0, function* () {
        let totalMemory = process.memoryUsage().heapTotal;
        let totalUsed = process.memoryUsage().heapUsed;
        let redisUnProccessedOrders = yield redis.llen('messages');
        metrics_1.memoryUsedGauge.set(totalUsed);
        metrics_1.memoryUsedGauge.set(totalMemory);
        metrics_1.redisPendingOrderGauge.set(redisUnProccessedOrders);
    });
}
exports.metricsRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield updateMetrics();
    res.set('Content-Type', metrics_1.register.contentType);
    res.end(yield metrics_1.register.metrics());
}));
