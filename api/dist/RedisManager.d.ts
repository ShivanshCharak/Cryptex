import { MessageToEngine } from './types/to';
import { MessageFromOrderbook } from './types';
export declare class RedisManager {
    static instance: RedisManager;
    private client;
    private publisher;
    private constructor();
    static getInstance(): RedisManager;
    sendAndAwait(message: MessageToEngine): Promise<MessageFromOrderbook>;
    getRandomClientId(): string;
}
//# sourceMappingURL=RedisManager.d.ts.map