"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.buisnessMetrics = exports.redisPendingOrderGauge = exports.totalMemoryGauge = exports.memoryUsedGauge = exports.httpConnections = exports.httpSuccessfullRequest = exports.errorTotal = exports.httpTotalRequest = void 0;
const prom_client_1 = require("prom-client");
Object.defineProperty(exports, "register", { enumerable: true, get: function () { return prom_client_1.register; } });
(0, prom_client_1.collectDefaultMetrics)({ register: prom_client_1.register });
const httpRequestDurationSeconds = new prom_client_1.Histogram({
    name: "http_request_duration_seconds",
    help: "Duration og HTTP request in seconds",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 0.3, 0.5, 1, 2, 5]
});
exports.httpTotalRequest = new prom_client_1.Counter({
    name: "http_requests_total",
    help: "Total number of http request",
    labelNames: ["method", "routes"]
});
exports.errorTotal = new prom_client_1.Counter({
    name: "http_error_total",
    help: "Total numbers of http errors",
    labelNames: ["error", 'status_code', "routes"]
});
exports.httpSuccessfullRequest = new prom_client_1.Counter({
    name: "http_successfull_requests_total",
    help: "Total number of http request",
    labelNames: ["method", "routes", "message"]
});
exports.httpConnections = new prom_client_1.Gauge({
    name: "total_http_connections",
    help: "Number of http connections"
});
exports.memoryUsedGauge = new prom_client_1.Gauge({
    name: "total_memory_used",
    help: "Memory used gauge"
});
exports.totalMemoryGauge = new prom_client_1.Gauge({
    name: "total_memory",
    help: "Memory gauge"
});
exports.redisPendingOrderGauge = new prom_client_1.Gauge({
    name: "redis_pending_orders",
    help: "Redis pending orders"
});
const temperatureGauge = new prom_client_1.Gauge({
    name: 'temperature_celsius',
    help: 'Current CPU temperature in Celsius',
});
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
exports.buisnessMetrics = {
    usersCreated: new prom_client_1.Counter({
        name: "users_created",
        help: "Total number of users created",
        labelNames: ['channel_type', 'server_id']
    }),
    messageProcessed: new prom_client_1.Counter({
        name: "message_processed",
        help: "total number of message processed",
        labelNames: ["channel_type", "server_id"]
    }),
    errorRate: new prom_client_1.Counter({
        name: "application_error",
        help: "Application error",
        labelNames: ["error_name", "server_id"]
    })
};
