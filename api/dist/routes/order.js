"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const RedisManager_1 = require("../RedisManager");
const types_1 = require("../types");
const metrics_1 = require("@repo/backend/metrics");
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.post("/", async (req, res) => {
    console.log("hey");
    metrics_1.httpTotalRequest.inc({
        method: "post",
        routes: "api/v1/order"
    });
    const { market, price, quantity, side, userId } = req.body;
    const response = await RedisManager_1.RedisManager.getInstance().sendAndAwait({
        type: types_1.CREATE_ORDER,
        data: {
            market,
            price,
            quantity,
            side,
            userId
        }
    });
    metrics_1.httpSuccessfullRequest.inc({
        method: "/post",
        routes: "/api/v1/order",
        message: "Order created and sent to the frontend"
    });
    res.json(response.payload);
});
exports.orderRouter.delete("/", async (req, res) => {
    metrics_1.httpTotalRequest.inc({
        method: "delete",
        routes: "api/v1/order"
    });
    const { orderId, market } = req.body;
    const response = await RedisManager_1.RedisManager.getInstance().sendAndAwait({
        type: types_1.CANCEL_ORDER,
        data: {
            orderId,
            market
        }
    });
    res.json(response.payload);
});
exports.orderRouter.get("/open", async (req, res) => {
    metrics_1.httpTotalRequest.inc({
        method: "get",
        routes: "api/v1/order"
    });
    const response = await RedisManager_1.RedisManager.getInstance().sendAndAwait({
        type: types_1.GET_OPEN_ORDERS,
        data: {
            userId: req.query.userId,
            market: req.query.market
        }
    });
    res.json(response.payload);
});
//# sourceMappingURL=order.js.map