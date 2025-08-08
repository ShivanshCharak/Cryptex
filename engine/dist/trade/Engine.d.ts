import { RedisManager } from "../RedisManager";
import { Order, Fill } from "../utils/type";
export declare const redis: RedisManager;
export declare class Engine {
    private orderbooks;
    private DepthMap;
    constructor();
    init(): Promise<void>;
    process({ message, clientId, }: {
        message: {
            type: string;
            data: {
                market: string;
                price: number;
                quantity: number;
                side: "buy" | "sell";
                userId: string;
            };
        };
        clientId: string;
    }): Promise<void>;
    createOrder(market: string, price: number, quantity: number, side: "buy" | "sell", userId: string): Promise<{
        fills: Fill[];
        executedQty: number;
    }>;
    InitiateRedisTrades(orderId: string, buyerUserId: string, sellerUserId: string, price: number, fillAmount: number, market: string, side: "buy" | "sell", filled: number): Promise<{
        ok: string;
        buyerUserId: string;
        sellerUserId: string;
        totalCost: string;
        filled: string;
        newfill: string;
        price: string;
    } | {
        err: string;
        needed: string;
        available: string;
    }>;
    syncArraysWithRedisResult(result: any, orderId: string, price: number, market: string, side: "buy" | "sell"): Promise<void>;
    createDbTrades(fills: Fill[], market: string, userId: string): void;
    updateDbOrders(order: Order, executedQty: number, fills: Fill[], market: string): void;
    publisWsDepthUpdates(fills: Fill[], price: number, side: "buy" | "sell", market: string): void;
    loadUserBalancesToRedis(): Promise<void>;
    loadOrdersToRedis(): Promise<void>;
    updateOrderBook(): Promise<void>;
    syncOrderbookToDB(): Promise<void>;
}
