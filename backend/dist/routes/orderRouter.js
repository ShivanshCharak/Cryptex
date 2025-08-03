"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Order_1 = __importDefault(require("../engine/Order"));
const Order_2 = require("../engine/Order");
const router = (0, express_1.Router)();
router.post("/create", Order_1.default);
router.post("/bulk", Order_2.BulkCreateOrder);
exports.default = router;
