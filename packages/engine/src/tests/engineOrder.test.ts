import { describe, it, expect, beforeEach, jest, afterEach } from '@jest/globals';
import { Engine } from '../trade/Engine';
import { Orderbook } from '../trade/Orderbook';
import { Order, Fill } from '../utils/type';
import { RedisManager } from '../RedisManager';


jest.mock('../RedisManager');
jest.mock('fs');
jest.mock('postgres-prisma');

describe('Orderbook', () => {
  let orderbook: Orderbook;

  beforeEach(() => {
    orderbook = new Orderbook('SOL', [], [], 0, 100);
  });

  describe('Constructor and Basic Properties', () => {
    it('should initialize orderbook with correct properties', () => {
      expect(orderbook.baseAsset).toBe('SOL');
      expect(orderbook.bids).toEqual([]);
      expect(orderbook.asks).toEqual([]);
      expect(orderbook.lastTradeId).toBe(0);
      expect(orderbook.currentPrice).toBe(100);
    });

    it('should return correct ticker format', () => {
      expect(orderbook.ticker()).toBe('SOL_INR');
    });

    it('should return correct snapshot', () => {
      const snapshot = orderbook.getSnapshot();
      expect(snapshot).toEqual({
        baseAsset: 'SOL',
        bids: [],
        asks: [],
        lastTradeId: 0,
        currentPrice: 100
      });
    });
  });

  describe('Buy Order Processing', () => {
    it('should add buy order to bids when no matching asks exist', async () => {
      const buyOrder: Order = {
        price: 100,
        quantity: 10,
        orderId: 'buy-1',
        filled: 0,
        side: 'buy',
        userId: 'user1'
      };

      const result = await orderbook.addOrder(buyOrder);

      expect(result.executedQty).toBe(0);
      expect(result.fills).toHaveLength(1); // Partial fill entry
      expect(orderbook.bids).toHaveLength(1);
      expect(orderbook.bids[0].orderId).toBe('buy-1');
    });

    it('should match buy order with existing ask order', async () => {

      const askOrder: Order = {
        price: 95,
        quantity: 5,
        orderId: 'ask-1',
        filled: 0,
        side: 'sell',
        userId: 'user2'
      };
      orderbook.asks.push(askOrder);

      const buyOrder: Order = {
        price: 100,
        quantity: 3,
        orderId: 'buy-1',
        filled: 0,
        side: 'buy',
        userId: 'user1'
      };

      const result = await orderbook.addOrder(buyOrder);

      expect(result.executedQty).toBe(3);
      expect(result.fills).toHaveLength(1);
      expect(result.fills[0].price).toBe(95);
      expect(result.fills[0].quantity).toBe(5); 
      expect(orderbook.asks[0].filled).toBe(3);
    });

    it('should partially fill buy order when ask quantity is insufficient', async () => {
      const askOrder: Order = {
        price: 95,
        quantity: 3,
        orderId: 'ask-1',
        filled: 0,
        side: 'sell',
        userId: 'user2'
      };
      orderbook.asks.push(askOrder);

      const buyOrder: Order = {
        price: 100,
        quantity: 10,
        orderId: 'buy-1',
        filled: 0,
        side: 'buy',
        userId: 'user1'
      };

      const result = await orderbook.addOrder(buyOrder);

      expect(result.executedQty).toBe(3);
      expect(result.fills).toHaveLength(2); 
      expect(orderbook.bids).toHaveLength(1); 
      expect(orderbook.asks).toHaveLength(0); 
    });

    it('should match multiple ask orders for a large buy order', async () => {
      // Add multiple ask orders
      orderbook.asks.push(
        { price: 95, quantity: 3, orderId: 'ask-1', filled: 0, side: 'sell', userId: 'user2' },
        { price: 96, quantity: 4, orderId: 'ask-2', filled: 0, side: 'sell', userId: 'user3' }
      );

      const buyOrder: Order = {
        price: 100,
        quantity: 6,
        orderId: 'buy-1',
        filled: 0,
        side: 'buy',
        userId: 'user1'
      };

      const result = await orderbook.addOrder(buyOrder);

      expect(result.executedQty).toBe(6);
      expect(result.fills).toHaveLength(2);
      expect(orderbook.asks).toHaveLength(1); 
      expect(orderbook.asks[0].filled).toBe(3); 
    });
  });

  describe('Sell Order Processing', () => {
    it('should add sell order to asks when no matching bids exist', async () => {
      const sellOrder: Order = {
        price: 100,
        quantity: 10,
        orderId: 'sell-1',
        filled: 0,
        side: 'sell',
        userId: 'user1'
      };

      const result = await orderbook.addOrder(sellOrder);

      expect(result.executedQty).toBe(0);
      expect(result.fills).toHaveLength(1); // Partial fill entry
      expect(orderbook.asks).toHaveLength(1);
      expect(orderbook.asks[0].orderId).toBe('sell-1');
    });

    it('should match sell order with existing bid order', async () => {
      
      const bidOrder: Order = {
        price: 105,
        quantity: 5,
        orderId: 'bid-1',
        filled: 0,
        side: 'buy',
        userId: 'user2'
      };
      orderbook.bids.push(bidOrder);

      const sellOrder: Order = {
        price: 100,
        quantity: 3,
        orderId: 'sell-1',
        filled: 0,
        side: 'sell',
        userId: 'user1'
      };

      const result = await orderbook.addOrder(sellOrder);

      expect(result.executedQty).toBe(3);
      expect(result.fills).toHaveLength(1);
      expect(result.fills[0].price).toBe(105);
      expect(orderbook.bids[0].filled).toBe(3);
    });

    it('should not match sell order if bid price is too low', async () => {
      const bidOrder: Order = {
        price: 95,
        quantity: 5,
        orderId: 'bid-1',
        filled: 0,
        side: 'buy',
        userId: 'user2'
      };
      orderbook.bids.push(bidOrder);

      const sellOrder: Order = {
        price: 100,
        quantity: 3,
        orderId: 'sell-1',
        filled: 0,
        side: 'sell',
        userId: 'user1'
      };

      const result = await orderbook.addOrder(sellOrder);

      expect(result.executedQty).toBe(0);
      expect(orderbook.asks).toHaveLength(1);
      expect(orderbook.bids[0].filled).toBe(0);
    });
  });

  describe('Order Matching Logic', () => {
    it('should respect price-time priority', async () => {
      
      orderbook.asks.push(
        { price: 100, quantity: 3, orderId: 'ask-1', filled: 0, side: 'sell', userId: 'user2' },
        { price: 100, quantity: 4, orderId: 'ask-2', filled: 0, side: 'sell', userId: 'user3' }
      );

      const buyOrder: Order = {
        price: 100,
        quantity: 5,
        orderId: 'buy-1',
        filled: 0,
        side: 'buy',
        userId: 'user1'
      };

      const result = await orderbook.addOrder(buyOrder);

      expect(result.fills[0].orderId).toBe('ask-1'); 
    });

    it('should handle partially filled orders correctly', async () => {
      const askOrder: Order = {
        price: 100,
        quantity: 10,
        orderId: 'ask-1',
        filled: 5, 
        side: 'sell',
        userId: 'user2'
      };
      orderbook.asks.push(askOrder);

      const buyOrder: Order = {
        price: 100,
        quantity: 3,
        orderId: 'buy-1',
        filled: 0,
        side: 'buy',
        userId: 'user1'
      };

      const result = await orderbook.addOrder(buyOrder);

      expect(result.executedQty).toBe(3);
      expect(orderbook.asks[0].filled).toBe(8); // 5 + 3
    });
  });
});

describe('Engine', () => {
  let engine: Engine;
  let mockRedisManager: jest.Mocked<RedisManager>;

  beforeEach(() => {
    
    jest.clearAllMocks();
    
    
    mockRedisManager = {
      getInstance: jest.fn().mockReturnThis(),
      sendToApi: jest.fn(),
      pushMessage: jest.fn(),
      publishMessage: jest.fn(),
      evaluateTransaction: jest.fn(),
      batchLoad: jest.fn(),
      setHash: jest.fn(),
      scanKeysStream: jest.fn(),
      getAllHashFields: jest.fn()
    } as any;

    (RedisManager.getInstance as jest.Mock).mockReturnValue(mockRedisManager);
    
    engine = new Engine();
  });

  describe('Message Processing', () => {
    it('should process CREATE_ORDER message', async () => {
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
      jest.spyOn(engine, 'createOrder').mockResolvedValue(mockCreateOrderResult);

      await engine.process({ message: mockMessage, clientId: 'client1' });

      expect(engine.createOrder).toHaveBeenCalledWith('SOL', 100, 10, 'buy', 'user1');
      expect(mockRedisManager.sendToApi).toHaveBeenCalledWith('client1', {
        type: 'ORDER_PLACED',
        payload: mockCreateOrderResult
      });
    });

    it('should process GET_DEPTH message', async () => {
      const mockMessage = {
        type: 'GET_DEPTH',
        data: {
          market: 'SOL'
        }
      };

      await engine.process({ message: mockMessage, clientId: 'client1' });

      expect(mockRedisManager.sendToApi).toHaveBeenCalledWith('client1', {
        type: 'DEPTH',
        payload: { bids: [], asks: [] }
      });
    });

    it('should handle GET_DEPTH for non-existent market', async () => {
      const mockMessage = {
        type: 'GET_DEPTH',
        data: {
          market: 'INVALID'
        }
      };

      await engine.process({ message: mockMessage, clientId: 'client1' });

      expect(mockRedisManager.sendToApi).toHaveBeenCalledWith('client1', {
        type: 'DEPTH',
        payload: { bids: [], asks: [] }
      });
    });
  });

  describe('Order Creation', () => {
    beforeEach(() => {
      
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
      jest.spyOn(engine, 'publisWsDepthUpdates').mockImplementation(()=>{});
      jest.spyOn(engine, 'createDbTrades').mockImplementation(()=>{});
      jest.spyOn(engine, 'publishWsTrades').mockImplementation(()=>{});
    });

    it('should create buy order successfully', async () => {
      const result = await engine.createOrder('SOL', 100, 10, 'buy', 'user1');

      expect(result).toHaveProperty('fills');
      expect(result).toHaveProperty('executedQty');
      expect(mockRedisManager.evaluateTransaction).toHaveBeenCalled();
    });

    it('should create sell order successfully', async () => {
      const result = await engine.createOrder('SOL', 100, 10, 'sell', 'user1');

      expect(result).toHaveProperty('fills');
      expect(result).toHaveProperty('executedQty');
    });

    it('should throw error for invalid market', async () => {
      await expect(engine.createOrder('INVALID', 100, 10, 'buy', 'user1'))
        .rejects
        .toThrow('No orderbook found');
    });
  });

  describe('Redis Trade Initiation', () => {
    it('should handle successful trade initiation', async () => {
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


      const result = await engine.InitiateRedisTrades(
        'order1', 'user1', 'user2', 100, 10, 'buy', 10
      );

      expect(result).toEqual(mockResult);
      expect(mockRedisManager.evaluateTransaction).toHaveBeenCalled();
    });

    it('should handle insufficient balance error', async () => {
      const mockResult = {
        err: 'INSUFFICIENT_BALANCE',
        needed: '1000',
        available: '500'
      };

      mockRedisManager.evaluateTransaction.mockResolvedValue(mockResult);

      const result = await engine.InitiateRedisTrades(
        'order1', 'user1', 'user2', 100, 10, 'buy', 10
      );

      expect(result).toEqual(mockResult);
    });

    it('should throw error for invalid price', async () => {
      await expect(engine.InitiateRedisTrades(
        'order1', 'user1', 'user2', NaN, 10, 'buy', 10
      )).rejects.toThrow('Invalid price or fill amount');
    });
  });

  describe('WebSocket Updates', () => {
    it('should publish trade updates', () => {
      const fills: Fill[] = [{
        price: 100,
        quantity: 10,
        tradeId: 1,
        otherUserId: 'user2',
        orderId: 'order1',
        side: 'buy',
        filled: 10
      }];

      engine.publishWsTrades(fills, 'user1', 'SOL');

      expect(mockRedisManager.publishMessage).toHaveBeenCalledWith('trade@SOL', {
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

    it('should publish depth updates', () => {
      const fills: Fill[] = [{
        price: 100,
        quantity: 10,
        tradeId: 1,
        otherUserId: 'user2',
        orderId: 'order1',
        side: 'buy',
        filled: 10
      }];

      engine.publisWsDepthUpdates(fills, 100, 'buy', 'SOL');

      expect(mockRedisManager.publishMessage).toHaveBeenCalledWith('depth@SOL', expect.any(Object));
    });
  });

  describe('Database Operations', () => {
    it('should create database trades', () => {
      const fills: Fill[] = [{
        price: 100,
        quantity: 10,
        tradeId: 1,
        otherUserId: 'user2',
        orderId: 'order1',
        side: 'buy',
        filled: 10
      }];

      engine.createDbTrades(fills, 'SOL', 'user1');

      expect(mockRedisManager.pushMessage).toHaveBeenCalledWith({
        type: 'TRADE_ADDED',
        data: expect.objectContaining({
          market: 'SOL',
          id: '1',
          isBuyerMaker: true,
          price: '100',
          quantity: '10'
        })
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle Redis connection errors gracefully', async () => {
      mockRedisManager.evaluateTransaction.mockRejectedValue(new Error('Redis connection failed'));

      await expect(engine.InitiateRedisTrades(
        'order1', 'user1', 'user2', 100, 10, 'buy', 10
      )).rejects.toThrow('Redis connection failed');
    });

    it('should handle invalid order data', async () => {
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

      
      await expect(engine.process({ message: mockMessage, clientId: 'client1' }))
        .resolves.not.toThrow();
    });
  });
});

describe('Integration Tests', () => {
  let engine: Engine;
  let orderbook: Orderbook;

  beforeEach(() => {
    orderbook = new Orderbook('SOL', [], [], 0, 100);
    engine = new Engine();
  });

  it('should handle complete order flow', async () => {
    
    const sellOrder: Order = {
      price: 100,
      quantity: 10,
      orderId: 'sell-1',
      filled: 0,
      side: 'sell',
      userId: 'seller1'
    };

    await orderbook.addOrder(sellOrder);
    expect(orderbook.asks).toHaveLength(1);


    const buyOrder: Order = {
      price: 100,
      quantity: 5,
      orderId: 'buy-1',
      filled: 0,
      side: 'buy',
      userId: 'buyer1'
    };

    const result = await orderbook.addOrder(buyOrder);

    expect(result.executedQty).toBe(5);
    expect(result.fills).toHaveLength(1);
    expect(orderbook.asks[0].filled).toBe(5); 
  });

  it('should maintain order book integrity after multiple trades', async () => {
    
    const orders: Order[] = [
      { price: 95, quantity: 5, orderId: 'sell-1', filled: 0, side: 'sell', userId: 'user1' },
      { price: 100, quantity: 10, orderId: 'sell-2', filled: 0, side: 'sell', userId: 'user2' },
      { price: 105, quantity: 8, orderId: 'buy-1', filled: 0, side: 'buy', userId: 'user3' },
      { price: 90, quantity: 15, orderId: 'buy-2', filled: 0, side: 'buy', userId: 'user4' }
    ];

    for (const order of orders) {
      await orderbook.addOrder(order);
    }

    
    expect(orderbook.bids.length + orderbook.asks.length).toBeGreaterThan(0);
    

    [...orderbook.bids, ...orderbook.asks].forEach(order => {
      expect(order.quantity).toBeGreaterThan(0);
      expect(order.filled).toBeGreaterThanOrEqual(0);
      expect(order.filled).toBeLessThanOrEqual(order.quantity);
    });
  });
});


describe('Performance Tests', () => {
  let orderbook: Orderbook;

  beforeEach(() => {
    orderbook = new Orderbook('SOL', [], [], 0, 100);
  });

  it('should handle large number of orders efficiently', async () => {
    const startTime = Date.now();
    
    // Add 1000 orders
    for (let i = 0; i < 1000; i++) {
      const order: Order = {
        price: 100 + (i % 10),
        quantity: 10,
        orderId: `order-${i}`,
        filled: 0,
        side: i % 2 === 0 ? 'buy' : 'sell',
        userId: `user-${i}`
      };
      
      await orderbook.addOrder(order);
    }
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log(`Processed 1000 orders in ${duration}ms`);
    expect(duration).toBeLessThan(5000); 
  });
});

