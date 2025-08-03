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
exports.healthRouter = void 0;
exports.decrementConnection = decrementConnection;
exports.incrementConnection = incrementConnection;
const metrics_1 = require("./metrics");
const express_1 = require("express");
const postgres_prisma_1 = __importDefault(require("@repo/postgres-prisma"));
const dotenv_1 = __importDefault(require("dotenv"));
const ioredis_1 = __importDefault(require("ioredis"));
dotenv_1.default.config();
exports.healthRouter = (0, express_1.Router)();
let redisUrl = process.env.REDIS_URL;
if (!redisUrl) {
    throw new Error("REDIS_URL environment variable is not set.");
}
const url = new URL(redisUrl); // Parse the URL explicitly
console.log('🔍 REDIS_URL =', process.env.REDIS_URL, url.hostname, url.port);
const redis = new ioredis_1.default({
    host: url.hostname, // Should be 'redis'
    port: parseInt(url.port, 10), // Should be 6379
    // password: url.password, // Add if your Redis requires a password
});
let redisConnectedClients = 0;
let tcpActiveConnections = 0;
function decrementConnection() {
    tcpActiveConnections++;
}
function incrementConnection() {
    tcpActiveConnections--;
}
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield redis.info("clients");
        const match = info.match('/connected_clients:(\d+)/');
        redisConnectedClients = match ? parseInt(match[1], 10) : 0;
    }
    catch (error) {
        redisConnectedClients = 0;
    }
}), 10000);
exports.healthRouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const health = {
        status: "healthy",
        server: "default",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        checks: {
            postgres: 'unknown',
            timescalePostgres: 'unknown',
            redis: 'unknown',
        },
        metrics: {
            tcpActiveConnections: tcpActiveConnections,
            redisActiveConnection: redisConnectedClients
        }
    };
    try {
        yield postgres_prisma_1.default.$queryRaw `SELECT 1`;
        health.checks.postgres = 'healthy';
    }
    catch (_a) {
        health.checks.postgres = 'unhealthy';
        health.status = 'degraded';
        metrics_1.buisnessMetrics.errorRate.inc({ error_name: 'database_prisma_write', server_id: 1 });
    }
    try {
        yield postgres_prisma_1.default.$queryRaw `SELECT 1`;
        health.checks.timescalePostgres = 'healthy';
    }
    catch (_b) {
        health.checks.timescalePostgres = 'unhealthy';
        health.status = 'degraded';
        metrics_1.buisnessMetrics.errorRate.inc({ error_name: 'timescale_postgres_write', server_id: 1 });
    }
    try {
        yield redis.ping();
        health.checks.redis = 'healthy';
    }
    catch (_c) {
        health.checks.redis = 'unhealthy';
        health.status = 'degraded';
        metrics_1.buisnessMetrics.errorRate.inc({ error_name: 'redis', server_id: 1 });
    }
    const statusCode = health.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json(health);
}));
