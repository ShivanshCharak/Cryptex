// tests/klineRouter.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { klineRouter } from '../routes/kline';
import * as pg from 'pg'; // to mock Client

// Setup Express app
const app = express();
app.use(express.json());
app.use('/kline', klineRouter);

const mockQuery = vi.fn();

vi.mock('pg', () => {
  return {
    Client: vi.fn().mockImplementation(() => ({
      connect: vi.fn(),
      query: mockQuery,
    })),
  };
});

describe('GET /kline', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 200 and mapped kline data', async () => {
    const mockKlineData = {
      rows: [
        {
          close: 100,
          bucket: '2024-01-01T00:00:00.000Z',
          high: 105,
          low: 95,
          open: 98,
          quoteVolume: 12000,
          start: '2024-01-01T00:00:00.000Z',
          trades: 10,
          volume: 400,
        },
      ],
    };

    mockQuery.mockResolvedValue(mockKlineData);

    const now = Math.floor(Date.now() / 1000);
    const res = await request(app).get('/kline').query({
      market: 'SOLUSDT',
      interval: '1h',
      startTime: now - 3600,
      endTime: now,
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual([
      {
        close: 100,
        end: '2024-01-01T00:00:00.000Z',
        high: 105,
        low: 95,
        open: 98,
        quoteVolume: 12000,
        start: '2024-01-01T00:00:00.000Z',
        trades: 10,
        volume: 400,
      },
    ]);
    expect(mockQuery).toHaveBeenCalled();
  });

  it('should return 500 if DB throws error', async () => {
    mockQuery.mockRejectedValue(new Error('DB Error'));

    const now = Math.floor(Date.now() / 1000);
    const res = await request(app).get('/kline').query({
      market: 'SOLUSDT',
      interval: '1h',
      startTime: now - 3600,
      endTime: now,
    });

    expect(res.status).toBe(500);
  });

  it('should return 400 if interval is invalid (based on switch)', async () => {
    
    const now = Math.floor(Date.now() / 1000);
    const res = await request(app).get('/kline').query({
      market: 'SOLUSDT',
      interval: 'invalid',
      startTime: now - 3600,
      endTime: now,
    });

   
    expect(res.status).toBe(400);
    expect(res.text).toBe('Invalid interval');
  });
});
