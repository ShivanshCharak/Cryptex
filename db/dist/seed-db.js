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
    user: 'shivansh',
    host: 'localhost',
    database: 'crypto',
    password: 'shamsher@54',
    port: 5432,
});
function initializeDB() {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        // Drop views and table first
        yield client.query(`
        DROP MATERIALIZED VIEW IF EXISTS klines_1m CASCADE;
        DROP MATERIALIZED VIEW IF EXISTS klines_1h CASCADE;
        DROP MATERIALIZED VIEW IF EXISTS klines_1w CASCADE;
    `);
        // Create fresh table
        // await client.query(`
        //     CREATE TABLE "sol_prices"(
        //         time TIMESTAMP WITH TIME ZONE NOT NULL,
        //         price DOUBLE PRECISION,
        //         volume DOUBLE PRECISION,
        //         currency_code VARCHAR(10)
        //     );
        //     SELECT create_hypertable('sol_prices', 'time', 'price', 2);
        // `);
        // Create views again
        yield client.query(`
        CREATE MATERIALIZED VIEW klines_1m AS
        SELECT
            time_bucket('1 minute', time) AS bucket,
            first(price, time) AS open,
            max(price) AS high,
            min(price) AS low,
            last(price, time) AS close,
            sum(volume) AS volume,
            currency_code
        FROM sol_prices
        GROUP BY bucket, currency_code;
    `);
        yield client.query(`
        CREATE MATERIALIZED VIEW klines_1h AS
        SELECT
            time_bucket('1 hour', time) AS bucket,
            first(price, time) AS open,
            max(price) AS high,
            min(price) AS low,
            last(price, time) AS close,
            sum(volume) AS volume,
            currency_code
        FROM sol_prices
        GROUP BY bucket, currency_code;
    `);
        yield client.query(`
        CREATE MATERIALIZED VIEW klines_1w AS
        SELECT
            time_bucket('1 week', time) AS bucket,
            first(price, time) AS open,
            max(price) AS high,
            min(price) AS low,
            last(price, time) AS close,
            sum(volume) AS volume,
            currency_code
        FROM sol_prices
        GROUP BY bucket, currency_code;
    `);
        yield client.end();
        console.log("✅ Database initialized successfully");
    });
}
initializeDB().catch(console.error);
