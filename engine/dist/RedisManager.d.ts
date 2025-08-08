type DbMessage = {
    type: "TRADE_ADDED";
    data: {
        id: string;
        isBuyerMaker: boolean;
        price: string;
        quantity: string;
        quoteQuantity: string;
        timestamp: number;
        market: string;
    };
} | {
    type: "ORDER_UPDATE";
    data: {
        orderId: string;
        executedQty: number;
        market?: string;
        price?: string;
        quantity?: string;
        side?: "buy" | "sell";
    };
};
export declare class RedisManager {
    private static instance;
    private client;
    constructor();
    static getInstance(): RedisManager;
    pushMessage(message: DbMessage): Promise<void>;
    brpop(message: string, delay: number): Promise<[string, string] | null>;
    publishMessage(channel: string, message: any): Promise<void>;
    sendToApi(clientId: string, message: any): Promise<void>;
    setHash(key: string, data: Record<string, string>): Promise<void>;
    delKey(key: string): Promise<void>;
    getAllHashFields(key: string): Promise<Record<string, string>>;
    batchLoad(key: string, value: {
        available: string;
        locked: string;
    }): Promise<void>;
    getOrder(): Promise<{
        market: string;
        side: "buy" | "sell";
        price: number;
        quantity: number;
        filled: number;
        orderId: string;
        userId: string;
    }[] | undefined>;
    scanKeysStream(): Promise<string[]>;
    evaluateTransaction(script: string, scriptArgs: {
        keys?: string[];
        arguments?: string[];
    }): Promise<unknown>;
    evaluation(script: string, options: number, key: string, amount: string): Promise<number>;
}
export {};
