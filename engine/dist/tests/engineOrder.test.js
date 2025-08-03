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
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const Engine_1 = require("../trade/Engine");
const Orderbook_1 = require("../trade/Orderbook");
const RedisManager_1 = require("../RedisManager");
globals_1.jest.mock('../RedisManager');
globals_1.jest.mock('fs');
globals_1.jest.mock('postgres-prisma');
(0, globals_1.describe)('Orderbook', () => {
    let orderbook;
    (0, globals_1.beforeEach)(() => {
        orderbook = new Orderbook_1.Orderbook('SOL', [], [], 0, 100);
    });
    (0, globals_1.describe)('Constructor and Basic Properties', () => {
        (0, globals_1.it)('should initialize orderbook with correct properties', () => {
            (0, globals_1.expect)(orderbook.baseAsset).toBe('SOL');
            (0, globals_1.expect)(orderbook.bids).toEqual([]);
            (0, globals_1.expect)(orderbook.asks).toEqual([]);
            (0, globals_1.expect)(orderbook.lastTradeId).toBe(0);
            (0, globals_1.expect)(orderbook.currentPrice).toBe(100);
        });
        (0, globals_1.it)('should return correct ticker format', () => {
            (0, globals_1.expect)(orderbook.ticker()).toBe('SOL_INR');
        });
        (0, globals_1.it)('should return correct snapshot', () => {
            const snapshot = orderbook.getSnapshot();
            (0, globals_1.expect)(snapshot).toEqual({
                baseAsset: 'SOL',
                bids: [],
                asks: [],
                lastTradeId: 0,
                currentPrice: 100
            });
        });
    });
    (0, globals_1.describe)('Buy Order Processing', () => {
        (0, globals_1.it)('should add buy order to bids when no matching asks exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const buyOrder = {
                price: 100,
                quantity: 10,
                orderId: 'buy-1',
                filled: 0,
                side: 'buy',
                userId: 'user1'
            };
            const result = yield orderbook.addOrder(buyOrder);
            (0, globals_1.expect)(result.executedQty).toBe(0);
            (0, globals_1.expect)(result.fills).toHaveLength(1); // Partial fill entry
            (0, globals_1.expect)(orderbook.bids).toHaveLength(1);
            (0, globals_1.expect)(orderbook.bids[0].orderId).toBe('buy-1');
        }));
        (0, globals_1.it)('should match buy order with existing ask order', () => __awaiter(void 0, void 0, void 0, function* () {
            const askOrder = {
                price: 95,
                quantity: 5,
                orderId: 'ask-1',
                filled: 0,
                side: 'sell',
                userId: 'user2'
            };
            orderbook.asks.push(askOrder);
            const buyOrder = {
                price: 100,
                quantity: 3,
                orderId: 'buy-1',
                filled: 0,
                side: 'buy',
                userId: 'user1'
            };
            const result = yield orderbook.addOrder(buyOrder);
            (0, globals_1.expect)(result.executedQty).toBe(3);
            (0, globals_1.expect)(result.fills).toHaveLength(1);
            (0, globals_1.expect)(result.fills[0].price).toBe(95);
            (0, globals_1.expect)(result.fills[0].quantity).toBe(5);
            (0, globals_1.expect)(orderbook.asks[0].filled).toBe(3);
        }));
        (0, globals_1.it)('should partially fill buy order when ask quantity is insufficient', () => __awaiter(void 0, void 0, void 0, function* () {
            const askOrder = {
                price: 95,
                quantity: 3,
                orderId: 'ask-1',
                filled: 0,
                side: 'sell',
                userId: 'user2'
            };
            orderbook.asks.push(askOrder);
            const buyOrder = {
                price: 100,
                quantity: 10,
                orderId: 'buy-1',
                filled: 0,
                side: 'buy',
                userId: 'user1'
            };
            const result = yield orderbook.addOrder(buyOrder);
            (0, globals_1.expect)(result.executedQty).toBe(3);
            (0, globals_1.expect)(result.fills).toHaveLength(2);
            (0, globals_1.expect)(orderbook.bids).toHaveLength(1);
            (0, globals_1.expect)(orderbook.asks).toHaveLength(0);
        }));
        (0, globals_1.it)('should match multiple ask orders for a large buy order', () => __awaiter(void 0, void 0, void 0, function* () {
            // Add multiple ask orders
            orderbook.asks.push({ price: 95, quantity: 3, orderId: 'ask-1', filled: 0, side: 'sell', userId: 'user2' }, { price: 96, quantity: 4, orderId: 'ask-2', filled: 0, side: 'sell', userId: 'user3' });
            const buyOrder = {
                price: 100,
                quantity: 6,
                orderId: 'buy-1',
                filled: 0,
                side: 'buy',
                userId: 'user1'
            };
            const result = yield orderbook.addOrder(buyOrder);
            (0, globals_1.expect)(result.executedQty).toBe(6);
            (0, globals_1.expect)(result.fills).toHaveLength(2);
            (0, globals_1.expect)(orderbook.asks).toHaveLength(1);
            (0, globals_1.expect)(orderbook.asks[0].filled).toBe(3);
        }));
    });
    (0, globals_1.describe)('Sell Order Processing', () => {
        (0, globals_1.it)('should add sell order to asks when no matching bids exist', () => __awaiter(void 0, void 0, void 0, function* () {
            const sellOrder = {
                price: 100,
                quantity: 10,
                orderId: 'sell-1',
                filled: 0,
                side: 'sell',
                userId: 'user1'
            };
            const result = yield orderbook.addOrder(sellOrder);
            (0, globals_1.expect)(result.executedQty).toBe(0);
            (0, globals_1.expect)(result.fills).toHaveLength(1); // Partial fill entry
            (0, globals_1.expect)(orderbook.asks).toHaveLength(1);
            (0, globals_1.expect)(orderbook.asks[0].orderId).toBe('sell-1');
        }));
        (0, globals_1.it)('should match sell order with existing bid order', () => __awaiter(void 0, void 0, void 0, function* () {
            const bidOrder = {
                price: 105,
                quantity: 5,
                orderId: 'bid-1',
                filled: 0,
                side: 'buy',
                userId: 'user2'
            };
            orderbook.bids.push(bidOrder);
            const sellOrder = {
                price: 100,
                quantity: 3,
                orderId: 'sell-1',
                filled: 0,
                side: 'sell',
                userId: 'user1'
            };
            const result = yield orderbook.addOrder(sellOrder);
            (0, globals_1.expect)(result.executedQty).toBe(3);
            (0, globals_1.expect)(result.fills).toHaveLength(1);
            (0, globals_1.expect)(result.fills[0].price).toBe(105);
            (0, globals_1.expect)(orderbook.bids[0].filled).toBe(3);
        }));
        (0, globals_1.it)('should not match sell order if bid price is too low', () => __awaiter(void 0, void 0, void 0, function* () {
            const bidOrder = {
                price: 95,
                quantity: 5,
                orderId: 'bid-1',
                filled: 0,
                side: 'buy',
                userId: 'user2'
            };
            orderbook.bids.push(bidOrder);
            const sellOrder = {
                price: 100,
                quantity: 3,
                orderId: 'sell-1',
                filled: 0,
                side: 'sell',
                userId: 'user1'
            };
            const result = yield orderbook.addOrder(sellOrder);
            (0, globals_1.expect)(result.executedQty).toBe(0);
            (0, globals_1.expect)(orderbook.asks).toHaveLength(1);
            (0, globals_1.expect)(orderbook.bids[0].filled).toBe(0);
        }));
    });
    (0, globals_1.describe)('Order Matching Logic', () => {
        (0, globals_1.it)('should respect price-time priority', () => __awaiter(void 0, void 0, void 0, function* () {
            orderbook.asks.push({ price: 100, quantity: 3, orderId: 'ask-1', filled: 0, side: 'sell', userId: 'user2' }, { price: 100, quantity: 4, orderId: 'ask-2', filled: 0, side: 'sell', userId: 'user3' });
            const buyOrder = {
                price: 100,
                quantity: 5,
                orderId: 'buy-1',
                filled: 0,
                side: 'buy',
                userId: 'user1'
            };
            const result = yield orderbook.addOrder(buyOrder);
            (0, globals_1.expect)(result.fills[0].orderId).toBe('ask-1');
        }));
        (0, globals_1.it)('should handle partially filled orders correctly', () => __awaiter(void 0, void 0, void 0, function* () {
            const askOrder = {
                price: 100,
                quantity: 10,
                orderId: 'ask-1',
                filled: 5,
                side: 'sell',
                userId: 'user2'
            };
            orderbook.asks.push(askOrder);
            const buyOrder = {
                price: 100,
                quantity: 3,
                orderId: 'buy-1',
                filled: 0,
                side: 'buy',
                userId: 'user1'
            };
            const result = yield orderbook.addOrder(buyOrder);
            (0, globals_1.expect)(result.executedQty).toBe(3);
            (0, globals_1.expect)(orderbook.asks[0].filled).toBe(8); // 5 + 3
        }));
    });
});
(0, globals_1.describe)('Engine', () => {
    let engine;
    let mockRedisManager;
    (0, globals_1.beforeEach)(() => {
        globals_1.jest.clearAllMocks();
        mockRedisManager = {
            getInstance: globals_1.jest.fn().mockReturnThis(),
            sendToApi: globals_1.jest.fn(),
            pushMessage: globals_1.jest.fn(),
            publishMessage: globals_1.jest.fn(),
            evaluateTransaction: globals_1.jest.fn(),
            batchLoad: globals_1.jest.fn(),
            setHash: globals_1.jest.fn(),
            scanKeysStream: globals_1.jest.fn(),
            getAllHashFields: globals_1.jest.fn()
        };
        RedisManager_1.RedisManager.getInstance.mockReturnValue(mockRedisManager);
        engine = new Engine_1.Engine();
    });
    (0, globals_1.describe)('Message Processing', () => {
        (0, globals_1.it)('should process CREATE_ORDER message', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockMessage = {
                type: 'CREATE_ORDER',
                data: {
                    market: 'SOL',
                    price: 100,
                    quantity: 10,
                    side: 'buy',
                    userId: 'user1'
                }
            };
            const mockCreateOrderResult = { executedQty: 5, fills: [] };
            globals_1.jest.spyOn(engine, 'createOrder').mockResolvedValue(mockCreateOrderResult);
            yield engine.process({ message: mockMessage, clientId: 'client1' });
            (0, globals_1.expect)(engine.createOrder).toHaveBeenCalledWith('SOL', 100, 10, 'buy', 'user1');
            (0, globals_1.expect)(mockRedisManager.sendToApi).toHaveBeenCalledWith('client1', {
                type: 'ORDER_PLACED',
                payload: mockCreateOrderResult
            });
        }));
        (0, globals_1.it)('should process GET_DEPTH message', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockMessage = {
                type: 'GET_DEPTH',
                data: {
                    market: 'SOL'
                }
            };
            yield engine.process({ message: mockMessage, clientId: 'client1' });
            (0, globals_1.expect)(mockRedisManager.sendToApi).toHaveBeenCalledWith('client1', {
                type: 'DEPTH',
                payload: { bids: [], asks: [] }
            });
        }));
        (0, globals_1.it)('should handle GET_DEPTH for non-existent market', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockMessage = {
                type: 'GET_DEPTH',
                data: {
                    market: 'INVALID'
                }
            };
            yield engine.process({ message: mockMessage, clientId: 'client1' });
            (0, globals_1.expect)(mockRedisManager.sendToApi).toHaveBeenCalledWith('client1', {
                type: 'DEPTH',
                payload: { bids: [], asks: [] }
            });
        }));
    });
    (0, globals_1.describe)('Order Creation', () => {
        (0, globals_1.beforeEach)(() => {
            mockRedisManager.evaluateTransaction.mockResolvedValue({
                ok: 'ORDER_COMPLETE',
                buyerUserId: 'user1',
                sellerUserId: 'user2',
                totalCost: '1000',
                filled: '10',
                newfill: '10',
                price: '100'
            });
            // Spy on other methods
            globals_1.jest.spyOn(engine, 'publisWsDepthUpdates').mockImplementation(() => { });
            globals_1.jest.spyOn(engine, 'createDbTrades').mockImplementation(() => { });
            globals_1.jest.spyOn(engine, 'publishWsTrades').mockImplementation(() => { });
        });
        (0, globals_1.it)('should create buy order successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield engine.createOrder('SOL', 100, 10, 'buy', 'user1');
            (0, globals_1.expect)(result).toHaveProperty('fills');
            (0, globals_1.expect)(result).toHaveProperty('executedQty');
            (0, globals_1.expect)(mockRedisManager.evaluateTransaction).toHaveBeenCalled();
        }));
        (0, globals_1.it)('should create sell order successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield engine.createOrder('SOL', 100, 10, 'sell', 'user1');
            (0, globals_1.expect)(result).toHaveProperty('fills');
            (0, globals_1.expect)(result).toHaveProperty('executedQty');
        }));
        (0, globals_1.it)('should throw error for invalid market', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, globals_1.expect)(engine.createOrder('INVALID', 100, 10, 'buy', 'user1'))
                .rejects
                .toThrow('No orderbook found');
        }));
    });
    (0, globals_1.describe)('Redis Trade Initiation', () => {
        (0, globals_1.it)('should handle successful trade initiation', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockResult = {
                ok: 'ORDER_COMPLETE',
                buyerUserId: 'user1',
                sellerUserId: 'user2',
                totalCost: '1000',
                filled: '10',
                newfill: '10',
                price: '100'
            };
            mockRedisManager.evaluateTransaction.mockResolvedValue(mockResult);
            const result = yield engine.InitiateRedisTrades('order1', 'user1', 'user2', 100, 10, 'buy', 10);
            (0, globals_1.expect)(result).toEqual(mockResult);
            (0, globals_1.expect)(mockRedisManager.evaluateTransaction).toHaveBeenCalled();
        }));
        (0, globals_1.it)('should handle insufficient balance error', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockResult = {
                err: 'INSUFFICIENT_BALANCE',
                needed: '1000',
                available: '500'
            };
            mockRedisManager.evaluateTransaction.mockResolvedValue(mockResult);
            const result = yield engine.InitiateRedisTrades('order1', 'user1', 'user2', 100, 10, 'buy', 10);
            (0, globals_1.expect)(result).toEqual(mockResult);
        }));
        (0, globals_1.it)('should throw error for invalid price', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, globals_1.expect)(engine.InitiateRedisTrades('order1', 'user1', 'user2', NaN, 10, 'buy', 10)).rejects.toThrow('Invalid price or fill amount');
        }));
    });
    (0, globals_1.describe)('WebSocket Updates', () => {
        (0, globals_1.it)('should publish trade updates', () => {
            const fills = [{
                    price: 100,
                    quantity: 10,
                    tradeId: 1,
                    otherUserId: 'user2',
                    orderId: 'order1',
                    side: 'buy',
                    filled: 10
                }];
            engine.publishWsTrades(fills, 'user1', 'SOL');
            (0, globals_1.expect)(mockRedisManager.publishMessage).toHaveBeenCalledWith('trade@SOL', {
                stream: 'trade@SOL',
                data: {
                    e: 'trade',
                    t: 1,
                    m: true,
                    p: 100,
                    q: '10',
                    s: 'SOL'
                }
            });
        });
        (0, globals_1.it)('should publish depth updates', () => {
            const fills = [{
                    price: 100,
                    quantity: 10,
                    tradeId: 1,
                    otherUserId: 'user2',
                    orderId: 'order1',
                    side: 'buy',
                    filled: 10
                }];
            engine.publisWsDepthUpdates(fills, 100, 'buy', 'SOL');
            (0, globals_1.expect)(mockRedisManager.publishMessage).toHaveBeenCalledWith('depth@SOL', globals_1.expect.any(Object));
        });
    });
    (0, globals_1.describe)('Database Operations', () => {
        (0, globals_1.it)('should create database trades', () => {
            const fills = [{
                    price: 100,
                    quantity: 10,
                    tradeId: 1,
                    otherUserId: 'user2',
                    orderId: 'order1',
                    side: 'buy',
                    filled: 10
                }];
            engine.createDbTrades(fills, 'SOL', 'user1');
            (0, globals_1.expect)(mockRedisManager.pushMessage).toHaveBeenCalledWith({
                type: 'TRADE_ADDED',
                data: globals_1.expect.objectContaining({
                    market: 'SOL',
                    id: '1',
                    isBuyerMaker: true,
                    price: '100',
                    quantity: '10'
                })
            });
        });
    });
    (0, globals_1.describe)('Error Handling', () => {
        (0, globals_1.it)('should handle Redis connection errors gracefully', () => __awaiter(void 0, void 0, void 0, function* () {
            mockRedisManager.evaluateTransaction.mockRejectedValue(new Error('Redis connection failed'));
            yield (0, globals_1.expect)(engine.InitiateRedisTrades('order1', 'user1', 'user2', 100, 10, 'buy', 10)).rejects.toThrow('Redis connection failed');
        }));
        (0, globals_1.it)('should handle invalid order data', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockMessage = {
                type: 'CREATE_ORDER',
                data: {
                    market: '',
                    price: -100,
                    quantity: 0,
                    side: 'invalid',
                    userId: ''
                }
            };
            yield (0, globals_1.expect)(engine.process({ message: mockMessage, clientId: 'client1' }))
                .resolves.not.toThrow();
        }));
    });
});
(0, globals_1.describe)('Integration Tests', () => {
    let engine;
    let orderbook;
    (0, globals_1.beforeEach)(() => {
        orderbook = new Orderbook_1.Orderbook('SOL', [], [], 0, 100);
        engine = new Engine_1.Engine();
    });
    (0, globals_1.it)('should handle complete order flow', () => __awaiter(void 0, void 0, void 0, function* () {
        const sellOrder = {
            price: 100,
            quantity: 10,
            orderId: 'sell-1',
            filled: 0,
            side: 'sell',
            userId: 'seller1'
        };
        yield orderbook.addOrder(sellOrder);
        (0, globals_1.expect)(orderbook.asks).toHaveLength(1);
        const buyOrder = {
            price: 100,
            quantity: 5,
            orderId: 'buy-1',
            filled: 0,
            side: 'buy',
            userId: 'buyer1'
        };
        const result = yield orderbook.addOrder(buyOrder);
        (0, globals_1.expect)(result.executedQty).toBe(5);
        (0, globals_1.expect)(result.fills).toHaveLength(1);
        (0, globals_1.expect)(orderbook.asks[0].filled).toBe(5);
    }));
    (0, globals_1.it)('should maintain order book integrity after multiple trades', () => __awaiter(void 0, void 0, void 0, function* () {
        const orders = [
            { price: 95, quantity: 5, orderId: 'sell-1', filled: 0, side: 'sell', userId: 'user1' },
            { price: 100, quantity: 10, orderId: 'sell-2', filled: 0, side: 'sell', userId: 'user2' },
            { price: 105, quantity: 8, orderId: 'buy-1', filled: 0, side: 'buy', userId: 'user3' },
            { price: 90, quantity: 15, orderId: 'buy-2', filled: 0, side: 'buy', userId: 'user4' }
        ];
        for (const order of orders) {
            yield orderbook.addOrder(order);
        }
        (0, globals_1.expect)(orderbook.bids.length + orderbook.asks.length).toBeGreaterThan(0);
        [...orderbook.bids, ...orderbook.asks].forEach(order => {
            (0, globals_1.expect)(order.quantity).toBeGreaterThan(0);
            (0, globals_1.expect)(order.filled).toBeGreaterThanOrEqual(0);
            (0, globals_1.expect)(order.filled).toBeLessThanOrEqual(order.quantity);
        });
    }));
});
(0, globals_1.describe)('Performance Tests', () => {
    let orderbook;
    (0, globals_1.beforeEach)(() => {
        orderbook = new Orderbook_1.Orderbook('SOL', [], [], 0, 100);
    });
    (0, globals_1.it)('should handle large number of orders efficiently', () => __awaiter(void 0, void 0, void 0, function* () {
        const startTime = Date.now();
        // Add 1000 orders
        for (let i = 0; i < 1000; i++) {
            const order = {
                price: 100 + (i % 10),
                quantity: 10,
                orderId: `order-${i}`,
                filled: 0,
                side: i % 2 === 0 ? 'buy' : 'sell',
                userId: `user-${i}`
            };
            yield orderbook.addOrder(order);
        }
        const endTime = Date.now();
        const duration = endTime - startTime;
        console.log(`Processed 1000 orders in ${duration}ms`);
        (0, globals_1.expect)(duration).toBeLessThan(5000);
    }));
});
