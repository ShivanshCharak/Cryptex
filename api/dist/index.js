"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const order_1 = require("./routes/order");
const depth_1 = require("./routes/depth");
// import { tradesRouter } from "./routes/trades";
const kline_1 = require("./routes/kline");
// import { tickersRouter } from "./routes/ticker";
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)({
    origin: "http://localhost:3002",
    "credentials": true
}));
exports.app.use(express_1.default.json());
exports.app.use("/api/v1/order", order_1.orderRouter);
exports.app.use("/api/v1/depth", depth_1.depthRouter);
// app.use("/api/v1/trades", tradesRouter);
exports.app.use("/api/v1/klines", kline_1.klineRouter);
// app.use("/api/v1/tickers", tickersRouter);
exports.app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map