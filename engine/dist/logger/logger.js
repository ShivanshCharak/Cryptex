"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
const winston_loki_1 = __importDefault(require("winston-loki")); // Import LokiTransport
exports.logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.errors({ stack: true }), winston_1.format.json()),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({
            filename: `./logs/error-log`,
            level: 'error'
        }),
        new winston_1.transports.File({
            filename: `./logs/combined-log`
        }),
        new winston_loki_1.default({
            host: "http://localhost:3100",
            json: true,
            labels: {
                job: "Loki"
            },
            onConnectionError: (err) => console.error("Loki connection error:", err)
        })
    ]
});
//# sourceMappingURL=logger.js.map