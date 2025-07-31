# Cryptex

 it is a real-time crypto trading engine built using Redis, WebSockets, and a microservices-based API style, its is well monitored logged and oberved using Loki, Promethues, Grafana
### 🧑‍💻 User Flow

1. **Browser → API (`/api/v1/order`)**:

   * A client sends a buy/sell order.
   * Example:

     ```json
     {
       "kind": "buy",
       "type": "limit",
       "price": 12000,
       "quantity": 20,
       "market": "sol/usdc"
     }
     ```

2. **API → Redis Queue**:

   * The API pushes the order into a Redis Queue using a key like `MESSAGES`.

3. **Engine (Matching Engine)**:

   * Subscribes to Redis Queue.
   * Pops the order using the `MESSAGES` key.
   * Processes the order and publishes the result (fills, executed quantity) using Redis Pub/Sub to the respective `clientId`.

4. **API → Redis Pub/Sub**:

   * API subscribes to Redis Pub/Sub using `clientId`.
   * Receives real-time updates for order execution (`ORDER_PLACED`, `fills`, etc.) and returns this data to the browser.

5. **WebSocket**:

   * The browser maintains a WebSocket connection for real-time updates.
   * The WebSocket service streams back order status, ticker, trade fills, etc.

---

### 🧠 Engine Internals

* **Market Streams on Init**:

  * On startup, the engine listens to Redis streams like:

    * `Trades@SOL/USD`
    * `DEPTH@SOL/USD`
    * `Ticker@SOL/USD`

* **Redis Pub/Sub**:

  * Used to distribute updates across API and WebSocket components.

* **Redis Queue**:

  * Handles order queuing for the engine to consume and process.

---

### 📈 Price Data Aggregation

* **Engine → DB Processor**:

  * Pushes raw trade data (`Price`, `Volume`, `Timestamp`) into Redis Lists.

* **DB Processor → Timeseries DB**:

  * Aggregates raw trades into candlestick data (OHLC - Open, High, Low, Close).
  * Stores structured historical data for charting and analytics.

---

### 🔁 Real-Time Pub/Sub Summary

* Subscribed clients are notified through Redis channels using their `clientId`.
* All Redis messages are structured and pushed through:

  * `Redis Queue` → for backend processing.
  * `Redis Pub/Sub` → for client notifications.





