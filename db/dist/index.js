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
const redis_1 = require("redis");
const pgClient = new pg_1.Client({
    user: "shivansh",
    password: "shamsher@54",
    database: "crypto",
    port: 5432,
    host: "localhost"
});
pgClient.connect();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const redisClient = (0, redis_1.createClient)();
        yield redisClient.connect();
        console.log("connected to redis");
        while (true) {
            const obj = yield redisClient.brPop("db_processor", 1);
            if (obj === null || obj === void 0 ? void 0 : obj.element) {
                let data = {
                    type: obj.key,
                    data: JSON.parse(obj === null || obj === void 0 ? void 0 : obj.element)
                };
                console.log(data);
                if (!obj) {
                }
                else {
                    if (data.data.type === "TRADE_ADDED") {
                        const price = data.data.data.price;
                        const timestamp = new Date(Number(data.data.data.timestamp));
                        const quantity = data.data.data.quantity;
                        console.log(data.data.timestamp);
                        const query = "Insert into sol_prices(time,price,volume,currency_code) values($1,$2,$3,$4)";
                        const values = [timestamp, price, quantity, "SOL"];
                        const result = yield pgClient.query(query, values);
                        console.log("re", result, timestamp);
                    }
                    else if (data.data.type == "ORDER_UPDATE") {
                        const price = data.data.price;
                        const timestamp = new Date(data.data.timestamp);
                        const query = "update into sol_prices(time,price) values($1,$2)";
                        const values = [timestamp, price];
                        yield pgClient.query(query, values);
                    }
                }
            }
        }
    });
}
main();
