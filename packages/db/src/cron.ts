import { Client } from 'pg'; 

const client:Client = new Client({
    user:"shivansh",
    password:"shamsher@54",
    database:"crypto",
    port:5432,
    host:"localhost"
});
client.connect();

async function refreshViews() {

    await client.query('REFRESH MATERIALIZED VIEW klines_1m');
    await client.query('REFRESH MATERIALIZED VIEW klines_1h');
    await client.query('REFRESH MATERIALIZED VIEW klines_1w');

    console.log("Materialized views refreshed successfully");
}

refreshViews().catch(console.error);

setInterval(() => {
    refreshViews()
}, 1000 * 10 );