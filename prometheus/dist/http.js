import { collectDefaultMetrics, register, Registry, Counter, Histogram, Gauge } from 'prom-client';
export const sharedRegistry = new Registry();
collectDefaultMetrics({ register: sharedRegistry });
export const httpRequestDurationSeconds = new Histogram({
    name: "http_request_duration_seconds",
    help: "Duration og HTTP request in seconds",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 0.3, 0.5, 1, 2, 5],
    registers: [sharedRegistry]
});
export const httpTotalRequest = new Counter({
    name: "http_requests_total",
    help: "Total number of http request",
    labelNames: ["method", "routes"],
    registers: [sharedRegistry]
});
export const errorTotal = new Counter({
    name: "http_error_total",
    help: "Total numbers of http errors",
    labelNames: ["error", 'status_code', "routes"],
    registers: [sharedRegistry]
});
export const httpSuccessfullRequest = new Counter({
    name: "http_successfull_requests_total",
    help: "Total number of http request",
    labelNames: ["method", "routes", "message"],
    registers: [sharedRegistry]
});
export const httpConnections = new Gauge({
    name: "total_http_connections",
    help: "Number of http connections",
    registers: [sharedRegistry]
});
export const memoryUsedGauge = new Gauge({
    name: "total_memory_used",
    help: "Memory used gauge",
    registers: [sharedRegistry]
});
export const totalMemoryGauge = new Gauge({
    name: "total_memory",
    help: "Memory gauge",
    registers: [sharedRegistry]
});
export const redisPendingOrderGauge = new Gauge({
    name: "redis_pending_orders",
    help: "Redis pending orders",
    registers: [sharedRegistry]
});
// const temperatureGauge = new Gauge({
//   name: 'temperature_celsius',
//   help: 'Current CPU temperature in Celsius',
// });
// export const activeConnections = new Gauge({
//     name:"active_connections",
//     help:"Total number of active connections",
//     labelNames:["server_id"]
// })
// export const redis_connection_status = new Gauge({
//     name:"redis_connection_status",
//     help:"return 1 for active 0 for dead"
// })
// export const timescaleDb_connection_status= new Gauge({
//     name:"timescale_connection_status",
//     help:"return 1 for active 0 for dead"
// })
// export const postgres_connection_status= new Gauge({
//     name:"postgres_connection_status",
//     help:"return 1 for active 0 for dead"
// })
export const buisnessMetrics = {
    usersCreated: new Counter({
        name: "users_created",
        help: "Total number of users created",
        labelNames: ['channel_type', 'server_id'],
        registers: [sharedRegistry]
    }),
    messageProcessed: new Counter({
        name: "message_processed",
        help: "total number of message processed",
        labelNames: ["channel_type", "server_id"],
        registers: [sharedRegistry]
    }),
    errorRate: new Counter({
        name: "application_error",
        help: "Application error",
        labelNames: ["error_name", "server_id"],
        registers: [sharedRegistry]
    })
};
export { sharedRegistry as register };
//# sourceMappingURL=http.js.map