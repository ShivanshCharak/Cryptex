"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: "shivansh",
    password: "shamsher@54",
    database: "crypto",
    port: 5432,
    host: "localhost"
});
client.connect();
function refreshViews() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.query('REFRESH MATERIALIZED VIEW klines_1m');
        yield client.query('REFRESH MATERIALIZED VIEW klines_1h');
        yield client.query('REFRESH MATERIALIZED VIEW klines_1w');
        console.log("Materialized views refreshed successfully");
    });
}
refreshViews().catch(console.error);
setInterval(() => {
    refreshViews();
}, 1000 * 10);
