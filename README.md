
# Cryptex Exchange

A complete cryptocurrency exchange implementation with order matching, market making, and real-time data streams.

## Order Flow Architecture

### Market Makers
- Provide liquidity by constantly placing limit orders
- Maintain fair pricing through algorithmic strategies
- Replenish orderbook after large trades
- Typically use high-frequency trading algorithms

### User Orders
1. **Quote Request**:
   ```bash
   POST /api/v1/order/quote
   {
     "kind": "buy",
     "quantity": 5,
     "market": "ETH-USDC"
   }
## System design of Cryptex

![system design of cryptx](https://github.com/user-attachments/assets/3296a3d6-ddd2-43b1-8829-8ec134b8ade9)


IOC Orders (Immediate-or-Cancel)

    Partial fills allowed

    Unfilled portion cancels automatically
## API Endpoints

### User Routes

| Endpoint            | Method | Description            |
|---------------------|--------|------------------------|
| `/api/v1/signup`    | POST   | User registration      |
| `/api/v1/signin`    | POST   | JWT authentication    |

### Order Routes

| Endpoint                  | Method | Body                              |
|---------------------------|--------|-----------------------------------|
| `/api/v1/order`           | POST   | Order JSON                        |
| `/api/v1/order/:id`       | GET    | -                                 |
| `/api/v1/order/:id`       | DELETE | -                                 |
| `/api/v1/order/quote`     | POST   | `{kind, quantity, market}`       |

## WebSocket Streams

Subscribe to real-time data:

```javascript
const ws = new WebSocket('wss://api.cryptex.example/stream');
ws.send(JSON.stringify({
  subscribe: ['price', 'orderbook', 'trades']
}));




```


## Sequencing Diagram
![deepseek_mermaid_20250512_992080](https://github.com/user-attachments/assets/4e494f10-94c1-49cc-aa08-5c7668098858)



