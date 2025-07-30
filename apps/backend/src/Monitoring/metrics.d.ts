import { register, Counter, Gauge } from 'prom-client';
export declare const httpTotalRequest: Counter<"method" | "routes">;
export declare const errorTotal: Counter<"routes" | "error" | "status_code">;
export declare const httpSuccessfullRequest: Counter<"method" | "routes" | "message">;
export declare const httpConnections: Gauge<string>;
export declare const memoryUsedGauge: Gauge<string>;
export declare const totalMemoryGauge: Gauge<string>;
export declare const redisPendingOrderGauge: Gauge<string>;
export declare const buisnessMetrics: {
    usersCreated: Counter<"channel_type" | "server_id">;
    messageProcessed: Counter<"channel_type" | "server_id">;
    errorRate: Counter<"server_id" | "error_name">;
};
export { register };
