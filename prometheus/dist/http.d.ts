import { Registry, Counter, Histogram, Gauge } from 'prom-client';
export declare const sharedRegistry: Registry<"text/plain; version=0.0.4; charset=utf-8">;
export declare const httpRequestDurationSeconds: Histogram<"method" | "route" | "status_code">;
export declare const httpTotalRequest: Counter<"method" | "routes">;
export declare const errorTotal: Counter<"status_code" | "routes" | "error">;
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
export { sharedRegistry as register };
//# sourceMappingURL=http.d.ts.map