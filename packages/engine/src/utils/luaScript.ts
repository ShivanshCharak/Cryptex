export const AmountLockingScript = `
local available = tonumber(redis.call("HGET", KEYS[1], "available") or 0)
local locked = tonumber(redis.call("HGET", KEYS[1], "locked") or 0)
local amount = tonumber(ARGV[1])

if not available or not locked or not amount then
return redis.error_reply("Invalid data: available=" .. tostring(available) .. ", locked=" .. tostring(locked) .. ", amount=" .. tostring(amount))
end

if available < amount then
return 0
else
redis.call("HINCRBYFLOAT", KEYS[1], "available", -amount)
redis.call("HINCRBYFLOAT", KEYS[1], "locked", amount)
return 1
end

`


export const AmountDepositScript = `
        local available = tonumber(redis.call("HGET", KEYS[1], "available") or "0")
        local amount = tonumber(ARGV[1])
        
        if not available or not amount then
        return redis.error_reply("Invalid data: available=" .. tostring(available) .. ", amount=" .. tostring(amount))
        end
        
        redis.call("HINCRBYFLOAT", KEYS[1], "available", amount)
        return 1
        
        `;
{` Have to write two scritps for the order of buying as well as selling
`}

//** Will need data orderid, userid, otherUser */
// Step 1 :- The user who is buying has enough funds or not
// step 2:- get the order with the help of orderid and update the filled value and if filled === quantity in the redis then delete that order and add take the userid from that redis hash and add the amount into the account of order
// 
export const OrderBuyScript = `
local orderId = ARGV[1]
local buyerUserId = ARGV[2]
local sellerUserId = ARGV[3]
local price = tonumber(ARGV[4])
local quantity = tonumber(ARGV[5])  -- Total quantity
local side = ARGV[6]
local filled = tonumber(ARGV[7])  --AMOUNT FILLED 

-- Input validation
if not price or not quantity then
    return {err="Invalid price/quantity/quantity"}
end

-- Step 1: Check buyer's money balance
local buyerBalance = tonumber(redis.call("HGET", "balance:"..buyerUserId, "available")) or 0

local totalCost = price * quantity

if buyerBalance < totalCost then
    return {err="BUYER_INSUFFICIENT_FUNDS", needed=totalCost, available=buyerBalance}
else
        buyerBalance = buyerBalance+totalCost
        redis.call("HSET","balance:"..buyerUserId,"available",buyerBalance)
        
end
-- WHAT IF USER SENDS MORE FILLING QUANTITY IN THAT CASE IT WILL BECOME +

-- Step 2: Update order
local orderKey = "order:"..orderId
local currentFilled = tonumber(redis.call("HGET", orderKey, "filled")) or 0
local newFilled = filled
redis.call("HSET", orderKey, "filled", newFilled)

-- Step 3: Delete if fully filled
local orderQuantity = tonumber(redis.call("HGET", orderKey, "quantity")) or 0
if newFilled >= orderQuantity then
    redis.call("DEL", orderKey)
    return {
        ok="ORDER_COMPLETE",
        buyerUserId=buyerUserId,
        sellerUserId=sellerUserId,
        amount=totalCost,
        cryptoAmount=filled
    }
else
    return {
        ok="PARTIAL_FILL",
        amount=totalCost,
        cryptoAmount=filled
    }
end
`