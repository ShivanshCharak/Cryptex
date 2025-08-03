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
exports.app = void 0;
// src/app.ts
const uuid_1 = require("uuid");
const metrics_1 = require("./Monitoring/metrics");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const postgres_prisma_1 = __importDefault(require("@repo/postgres-prisma"));
const cors_1 = __importDefault(require("cors"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const moneyRouter_1 = __importDefault(require("./routes/moneyRouter"));
const orderRouter_1 = __importDefault(require("./routes/orderRouter"));
const metrics_2 = require("./Monitoring/metrics");
const authMiddleware_1 = require("./middleware/authMiddleware");
// import {  } from './premhelper';
const metricsRoute_1 = require("./Monitoring/metricsRoute");
const healthRouter_1 = require("./Monitoring/healthRouter");
const healthRouter_2 = require("./Monitoring/healthRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
exports.app = (0, express_1.default)();
postgres_prisma_1.default.$connect()
    .then(() => console.log("Prisma connected"))
    .catch((e) => {
    console.error("Prisma connection failed:", e);
    process.exit(1);
});
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((req, res, next) => {
    const startTime = performance.now();
    req.traceId = req.headers['x-trace-id'] || (0, uuid_1.v4)();
    req.startTime = startTime;
    res.setHeader('X-Trace-ID', req.traceId);
    res.on('finish', () => {
        var _a;
        const duration = performance.now() - startTime;
        console.log(duration);
        const route = ((_a = req.route) === null || _a === void 0 ? void 0 : _a.path) || req.path;
        console.log(route);
        // @ts-ignore
        metrics_1.httpTotalRequest.inc({
            method: req.method,
            routes: route,
        });
        metrics_1.httpRequestDurationSeconds.observe({
            method: req.method,
            route: route,
        }, duration / 1000);
    });
    next();
});
exports.app.use((0, cors_1.default)({
    origin: 'http://localhost:3002',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
exports.app.on("connection", (socket) => {
    (0, healthRouter_2.incrementConnection)();
    exports.app.on("close", () => {
        (0, healthRouter_2.decrementConnection)();
    });
});
let activeConnections = 0;
exports.app.use((req, res, next) => {
    activeConnections += 1;
    metrics_2.httpConnections.set(activeConnections);
    res.on("finish", () => {
        activeConnections -= 1;
        metrics_2.httpConnections.set(activeConnections);
    });
    next();
});
exports.app.use("/auth", authRouter_1.default);
exports.app.use("/account", authMiddleware_1.authMiddleware, moneyRouter_1.default); // ← attaches /account/deposit
exports.app.use("/order", authMiddleware_1.authMiddleware, orderRouter_1.default);
exports.app.use("/metrics", metricsRoute_1.metricsRouter);
exports.app.use("/health", healthRouter_1.healthRouter);
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield postgres_prisma_1.default.$disconnect();
    process.exit();
}));
exports.app.listen(3003, () => {
    console.log("Server is running on port 3003");
});
