"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tickersRouter = void 0;
const express_1 = require("express");
exports.tickersRouter = (0, express_1.Router)();
exports.tickersRouter.get("/", async (res) => {
    res.json({});
});
//# sourceMappingURL=ticker.js.map