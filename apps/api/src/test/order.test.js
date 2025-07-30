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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var vitest_1 = require("vitest");
var supertest_1 = require("supertest");
var express_1 = require("express");
var order_1 = require("../routes/order");
var RedisManager_1 = require("../RedisManager");
var types_1 = require("../types");
// Setup Express app
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/orders', order_1.orderRouter);
(0, vitest_1.describe)('Order Router', function () {
    var mockSendAndAwait;
    (0, vitest_1.beforeEach)(function () {
        vitest_1.vi.clearAllMocks();
        mockSendAndAwait = vitest_1.vi.fn();
        vitest_1.vi.spyOn(RedisManager_1.RedisManager, 'getInstance').mockReturnValue({
            sendAndAwait: mockSendAndAwait
        });
    });
    (0, vitest_1.describe)('POST /orders', function () {
        (0, vitest_1.it)('should create an order and return 200 with order data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockOrderResponse, orderData, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockOrderResponse = {
                            type: types_1.CREATE_ORDER,
                            payload: {
                                id: 'order123',
                                market: 'SOLUSDT',
                                price: 100,
                                quantity: 1.5,
                                side: 'buy',
                                status: 'open'
                            }
                        };
                        mockSendAndAwait.mockResolvedValue(mockOrderResponse);
                        orderData = {
                            market: 'SOLUSDT',
                            price: 100,
                            quantity: 1.5,
                            side: 'buy',
                            userId: 'user123'
                        };
                        return [4 /*yield*/, (0, supertest_1.default)(app)
                                .post('/orders')
                                .send(orderData)];
                    case 1:
                        res = _a.sent();
                        (0, vitest_1.expect)(res.status).toBe(200);
                        (0, vitest_1.expect)(res.body).toEqual(mockOrderResponse.payload);
                        (0, vitest_1.expect)(mockSendAndAwait).toHaveBeenCalledWith({
                            type: types_1.CREATE_ORDER,
                            data: orderData
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)('should return 500 if Redis fails', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockSendAndAwait.mockRejectedValue(new Error('Redis error'));
                        return [4 /*yield*/, (0, supertest_1.default)(app)
                                .post('/orders')
                                .send({
                                market: 'SOLUSDT',
                                price: 100,
                                quantity: 1.5,
                                side: 'buy',
                                userId: 'user123'
                            })];
                    case 1:
                        res = _a.sent();
                        (0, vitest_1.expect)(res.status).toBe(500);
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)('should return 400 if required fields are missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app)
                            .post('/orders')
                            .send({})];
                    case 1:
                        res = _a.sent();
                        (0, vitest_1.expect)(res.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, vitest_1.describe)('DELETE /orders', function () {
        (0, vitest_1.it)('should cancel an order and return 200 with confirmation', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockCancelResponse, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockCancelResponse = {
                            type: types_1.CANCEL_ORDER,
                            payload: {
                                success: true,
                                orderId: 'order123',
                                market: 'SOLUSDT'
                            }
                        };
                        mockSendAndAwait.mockResolvedValue(mockCancelResponse);
                        return [4 /*yield*/, (0, supertest_1.default)(app)
                                .delete('/orders')
                                .send({
                                orderId: 'order123',
                                market: 'SOLUSDT'
                            })];
                    case 1:
                        res = _a.sent();
                        (0, vitest_1.expect)(res.status).toBe(200);
                        (0, vitest_1.expect)(res.body).toEqual(mockCancelResponse.payload);
                        (0, vitest_1.expect)(mockSendAndAwait).toHaveBeenCalledWith({
                            type: types_1.CANCEL_ORDER,
                            data: {
                                orderId: 'order123',
                                market: 'SOLUSDT'
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)('should return 400 if orderId or market is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app)
                            .delete('/orders')
                            .send({})];
                    case 1:
                        res = _a.sent();
                        (0, vitest_1.expect)(res.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
    });
    (0, vitest_1.describe)('GET /orders/open', function () {
        (0, vitest_1.it)('should fetch open orders and return 200 with orders data', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockOpenOrdersResponse, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockOpenOrdersResponse = {
                            type: types_1.GET_OPEN_ORDERS,
                            payload: [
                                {
                                    id: 'order123',
                                    market: 'SOLUSDT',
                                    price: 100,
                                    quantity: 1.5,
                                    side: 'buy',
                                    status: 'open'
                                }
                            ]
                        };
                        mockSendAndAwait.mockResolvedValue(mockOpenOrdersResponse);
                        return [4 /*yield*/, (0, supertest_1.default)(app)
                                .get('/orders/open')
                                .query({
                                userId: 'user123',
                                market: 'SOLUSDT'
                            })];
                    case 1:
                        res = _a.sent();
                        (0, vitest_1.expect)(res.status).toBe(200);
                        (0, vitest_1.expect)(res.body).toEqual(mockOpenOrdersResponse.payload);
                        (0, vitest_1.expect)(mockSendAndAwait).toHaveBeenCalledWith({
                            type: types_1.GET_OPEN_ORDERS,
                            data: {
                                userId: 'user123',
                                market: 'SOLUSDT'
                            }
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        (0, vitest_1.it)('should return 400 if userId is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, supertest_1.default)(app)
                            .get('/orders/open')
                            .query({
                            market: 'SOLUSDT'
                        })];
                    case 1:
                        res = _a.sent();
                        (0, vitest_1.expect)(res.status).toBe(400);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
