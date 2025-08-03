import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { orderRouter } from '../routes/order';
import { RedisManager } from '../RedisManager';
import { CREATE_ORDER, CANCEL_ORDER, GET_OPEN_ORDERS } from '../types';

// Setup Express app
const app = express();
app.use(express.json());
app.use('/orders', orderRouter);

describe('Order Router', () => {
  let mockSendAndAwait: any;

  beforeEach(() => {
    
    vi.clearAllMocks();
    

    mockSendAndAwait = vi.fn();
 
    vi.spyOn(RedisManager, 'getInstance').mockReturnValue({
      sendAndAwait: mockSendAndAwait
    } as any);
  });

  describe('POST /orders', () => {
    it('should create an order and return 200 with order data', async () => {
      const mockOrderResponse = {
        type: CREATE_ORDER,
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

      const orderData = {
        market: 'SOLUSDT',
        price: 100,
        quantity: 1.5,
        side: 'buy',
        userId: 'user123'
      };

      const res = await request(app)
        .post('/orders')
        .send(orderData);

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockOrderResponse.payload);
      expect(mockSendAndAwait).toHaveBeenCalledWith({
        type: CREATE_ORDER,
        data: orderData
      });
    });

    it('should return 500 if Redis fails', async () => {
      mockSendAndAwait.mockRejectedValue(new Error('Redis error'));

      const res = await request(app)
        .post('/orders')
        .send({
          market: 'SOLUSDT',
          price: 100,
          quantity: 1.5,
          side: 'buy',
          userId: 'user123'
        });

      expect(res.status).toBe(500);
    });

    it('should return 400 if required fields are missing', async () => {
      const res = await request(app)
        .post('/orders')
        .send({
         
        });

      expect(res.status).toBe(400);
    });
  });

  describe('DELETE /orders', () => {
    it('should cancel an order and return 200 with confirmation', async () => {
      const mockCancelResponse = {
        type: CANCEL_ORDER,
        payload: {
          success: true,
          orderId: 'order123',
          market: 'SOLUSDT'
        }
      };

      mockSendAndAwait.mockResolvedValue(mockCancelResponse);

      const res = await request(app)
        .delete('/orders')
        .send({
          orderId: 'order123',
          market: 'SOLUSDT'
        });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockCancelResponse.payload);
      expect(mockSendAndAwait).toHaveBeenCalledWith({
        type: CANCEL_ORDER,
        data: {
          orderId: 'order123',
          market: 'SOLUSDT'
        }
      });
    });

    it('should return 400 if orderId or market is missing', async () => {
      const res = await request(app)
        .delete('/orders')
        .send({
    
        });

      expect(res.status).toBe(400);
    });
  });

  describe('GET /orders/open', () => {
    it('should fetch open orders and return 200 with orders data', async () => {
      const mockOpenOrdersResponse = {
        type: GET_OPEN_ORDERS,
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

      const res = await request(app)
        .get('/orders/open')
        .query({
          userId: 'user123',
          market: 'SOLUSDT'
        });

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockOpenOrdersResponse.payload);
      expect(mockSendAndAwait).toHaveBeenCalledWith({
        type: GET_OPEN_ORDERS,
        data: {
          userId: 'user123',
          market: 'SOLUSDT'
        }
      });
    });

    it('should return 400 if userId is missing', async () => {
      const res = await request(app)
        .get('/orders/open')
        .query({

          market: 'SOLUSDT'
        });

      expect(res.status).toBe(400);
    });
  });
});