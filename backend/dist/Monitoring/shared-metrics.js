"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sharedRegistry = void 0;
const prom_client_1 = require("prom-client");
const prom_client_2 = require("prom-client");
// Singel shared registery created
exports.sharedRegistry = new prom_client_1.Registry();
// Default metrics applied
(0, prom_client_2.collectDefaultMetrics)({ register: exports.sharedRegistry });
// Re-export your existing metrics but bound to the shared registry
__exportStar(require("./metrics"), exports); // Your original metrics file
