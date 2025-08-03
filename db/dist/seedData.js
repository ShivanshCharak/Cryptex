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
    host: "localhost",
    database: "crypto",
    password: "shamsher@54",
    port: 5432,
});
function randomBetween(min, max) {
    return +(Math.random() * (max - min) + min).toFixed(2);
}
function generateHourData(hourStart) {
    const isBullish = Math.random() > 0.5; // 50% chance bullish or bearish
    const open = randomBetween(100, 300);
    const spread = randomBetween(30, 80);
    const close = isBullish
        ? open + spread
        : open - spread;
    const high = Math.max(open, close) + randomBetween(10, 30);
    const low = Math.min(open, close) - randomBetween(10, 30);
    const prices = [
        { price: open, atMin: 1 },
        { price: high, atMin: 10 },
        { price: low, atMin: 30 },
        { price: randomBetween(low, high), atMin: 45 },
        { price: close, atMin: 59 },
    ];
    return prices.map(({ price, atMin }) => {
        const time = new Date(hourStart);
        time.setMinutes(atMin);
        return {
            time: time.toISOString(),
            price,
            volume: randomBetween(10, 80),
        };
    });
}
function seedData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        yield client.query(`DELETE FROM sol_prices`);
        const allData = [];
        const now = new Date();
        now.setMinutes(0, 0, 0);
        for (let i = 0; i < 24 * 7; i++) {
            const hour = new Date(now);
            hour.setHours(hour.getHours() - i);
            const hourData = generateHourData(hour).map(d => (Object.assign(Object.assign({}, d), { currency_code: "SOL" })));
            allData.push(...hourData);
        }
        const placeholders = allData.map((_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`).join(", ");
        const values = allData.flatMap(d => [d.time, d.price, d.volume, d.currency_code]);
        yield client.query(`INSERT INTO SOL_prices (time, price, volume, currency_code) VALUES ${placeholders}`, values);
        yield client.query(`REFRESH MATERIALIZED VIEW klines_1m`);
        yield client.query(`REFRESH MATERIALIZED VIEW klines_1h`);
        yield client.query(`REFRESH MATERIALIZED VIEW klines_1w`);
        yield client.end();
        console.log("✅ Seeded realistic bullish + bearish OHLC data.");
    });
}
seedData().catch(console.error);
