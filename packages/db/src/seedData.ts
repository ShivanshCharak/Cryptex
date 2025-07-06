import { Client } from "pg";

const client = new Client({
  user: "shivansh",
  host: "localhost",
  database: "crypto",
  password: "shamsher@54",
  port: 5432,
});

function randomBetween(min: number, max: number): number {
  return +(Math.random() * (max - min) + min).toFixed(2);
}

function generateHourData(hourStart: Date) {
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

async function seedData() {
  await client.connect();
  await client.query(`DELETE FROM sol_prices`);

  const allData: { time: string; price: number; volume: number; currency_code: string }[] = [];

  const now = new Date();
  now.setMinutes(0, 0, 0);

  for (let i = 0; i < 24 * 7; i++) {
    const hour = new Date(now);
    hour.setHours(hour.getHours() - i);

    const hourData = generateHourData(hour).map(d => ({
      ...d,
      currency_code: "SOL",
    }));

    allData.push(...hourData);
  }

  const placeholders = allData.map((_, i) => `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`).join(", ");
  const values = allData.flatMap(d => [d.time, d.price, d.volume, d.currency_code]);

  await client.query(`INSERT INTO SOL_prices (time, price, volume, currency_code) VALUES ${placeholders}`, values);

  await client.query(`REFRESH MATERIALIZED VIEW klines_1m`);
  await client.query(`REFRESH MATERIALIZED VIEW klines_1h`);
  await client.query(`REFRESH MATERIALIZED VIEW klines_1w`);

  await client.end();
  console.log("✅ Seeded realistic bullish + bearish OHLC data.");
}

seedData().catch(console.error);
