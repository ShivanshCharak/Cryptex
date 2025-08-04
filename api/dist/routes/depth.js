"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depthRouter = void 0;
const express_1 = require("express");
const RedisManager_1 = require("../RedisManager");
const index_1 = require("../types/index");
const metrics_1 = require("@repo/backend/metrics");
exports.depthRouter = (0, express_1.Router)();
exports.depthRouter.get("/", async (req, res) => {
    {
        console.log("gettting orders");
    }
    metrics_1.httpTotalRequest.inc({
        method: "post",
        routes: "api/v1/depth"
    });
    const { symbol } = req.query;
    const response = await RedisManager_1.RedisManager.getInstance().sendAndAwait({
        type: index_1.GET_DEPTH,
        data: {
            market: symbol
        }
    });
    metrics_1.httpSuccessfullRequest.inc({
        method: "/post",
        routes: "/api/v1/depth",
        message: "depth sent to the frontend"
    });
    res.json(response.payload);
});
//# sourceMappingURL=depth.js.map