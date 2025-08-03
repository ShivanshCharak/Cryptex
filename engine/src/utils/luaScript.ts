export const OrderBuyScript = `
-- Arguments
local orderId = ARGV[1]
local buyerUserId = ARGV[2]
local sellerUserId = ARGV[3]
local price = tonumber(ARGV[4])
local quantity = tonumber(ARGV[5]) -- Total quantity of the order
local side = ARGV[6]
local filled = tonumber(ARGV[7])   -- Amount filled in this transaction

-- Input validation
if not price or not quantity or not filled then
return { err = "Invalid price/quantity/filled amount" }
end

local orderKey = "order:" .. orderId
if redis.call("EXISTS", orderKey) == 0 then
  redis.call("HSET", orderKey,
    "buyerUserId", buyerUserId,
    "sellerUserId", sellerUserId,
    "price", price,
    "quantity", quantity,
    "filled", 0,
    "side", side
  )
end

-- Step 1: Check buyer's available balance
local buyerBalanceKey = "balance:" .. buyerUserId
local sellerBalanceKey = "balance:" .. sellerUserId
local buyerBalance = tonumber(redis.call("HGET", buyerBalanceKey, "available")) or 0
local prevFills = tonumber(redis.call("HGET",orderKey,'filled')) or 0
local transactionAmount = (filled - prevFills)
local totalCost = price * transactionAmount

if buyerBalance < totalCost then
  return {
    err = "BUYER_INSUFFICIENT_FUNDS",
    needed = totalCost,
    available = buyerBalance
  }
end

-- Step 2: Deduct funds from buyer
redis.call("HINCRBYFLOAT", buyerBalanceKey, "available", -totalCost)
redis.call("HINCRBYFLOAT", sellerBalanceKey, "available", totalCost)

-- Step 3: Upsert order


-- Step 4: Update filled amount
redis.call("HSET", orderKey, "filled", filled)

-- Step 5: Check if order is fully filled
local orderQuantity = tonumber(redis.call("HGET", orderKey, "quantity")) or 0

if filled >= orderQuantity then
  redis.call("DEL", orderKey)
  return {
    "ok","ORDER_COMPLETE",
    "buyerUserId", buyerUserId,
    "sellerUserId",  sellerUserId,
    "totalCost", totalCost,
    "filled", filled,
    "newfill", transactionAmount,
    "price", price
  }
else
  return {
    "ok", "PARTIAL_FILL",
   "buyerUserId", buyerUserId,
    "sellerUserId",  sellerUserId,
    "totalCost", totalCost,
    "filled", filled,
    "newfill", transactionAmount,
    "price", price
  }
end
`;
