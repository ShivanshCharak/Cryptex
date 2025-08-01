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
var index_1 = require("../index");
var supertest_1 = require("supertest");
var RedisManager_1 = require("../RedisManager");
var types_1 = require("../types");
(0, vitest_1.describe)('GET /depth', function () { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                (0, vitest_1.beforeEach)(function () {
                    vitest_1.vi.clearAllMocks();
                });
                (0, vitest_1.it)(" Sohould return a not non empty object", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app).get("/").send({
                                    type: "GET_DEPTH",
                                    data: {
                                        market: "SOL_USDC"
                                    }
                                })];
                            case 1:
                                res = _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                (0, vitest_1.it)("Should return depth data for a valid symbol", function () { return __awaiter(void 0, void 0, void 0, function () {
                    var mockSendAndAwait;
                    return __generator(this, function (_a) {
                        mockSendAndAwait = vitest_1.vi.fn().mockResolvedValue({
                            type: types_1.GET_DEPTH,
                            payload: {
                                bids: [[100.0, 1.5], [99.5, 2.0]],
                                asks: [[101.0, 1.0], [101.5, 3.0]]
                            }
                        });
                        vitest_1.vi.spyOn(RedisManager_1.RedisManager, 'getInstance').mockReturnValue({
                            sendAndAwait: mockSendAndAwait
                        });
                        return [2 /*return*/];
                    });
                }); });
                return [4 /*yield*/, (0, supertest_1.default)(index_1.app).get("/depth").query({ symbol: "SOL_USD" })];
            case 1:
                res = _a.sent();
                (0, vitest_1.expect)(res.status).toBe(200);
                (0, vitest_1.expect)(res.body).toEqual({
                    bids: [[100.0, 1.5], [99.5, 2.0]],
                    asks: [[101.0, 1.0], [101.5, 3.0]]
                });
                (0, vitest_1.it)('should still return 200 if symbol is missing', function () { return __awaiter(void 0, void 0, void 0, function () {
                    var mockSendAndAwait, res;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                mockSendAndAwait = vitest_1.vi.fn().mockResolvedValue({
                                    type: types_1.GET_DEPTH,
                                    payload: { bids: [], asks: [] }
                                });
                                vitest_1.vi.spyOn(RedisManager_1.RedisManager, "getInstance").mockReturnValue({
                                    sendAndAwait: mockSendAndAwait
                                });
                                return [4 /*yield*/, (0, supertest_1.default)(index_1.app).get('/depth')];
                            case 1:
                                res = _a.sent();
                                (0, vitest_1.expect)(res.status).toBe(200);
                                (0, vitest_1.expect)(res.body).toEqual({ bids: [], asks: [] });
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); });
