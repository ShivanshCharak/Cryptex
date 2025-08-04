
import { Engine } from "./trade/Engine";
import { RedisManager } from "./RedisManager";
import CircuitBreaker from "opossum";
import dotenv from 'dotenv'
dotenv.config()
async function main() {
  const engine = new Engine();
  const redis = new RedisManager();
  await engine.init();

  const breakerOptions = {
    timeOut: 5000, 
    errorThresholdPercentage: 50,
    resetTimeout: 10000,
  };
  const breaker = new CircuitBreaker(
    async (data: any) => engine.process(data),
    breakerOptions
  );
  breaker.on("open", () => console.warn("[Breaker] Open — pausing execution."));
  breaker.on("halfOpen", () =>
    console.log("[Breaker] Half-open — testing system.")
  );
  breaker.on("close", () =>
    console.log("[Breaker] Closed — resumed execution.")
  );
  breaker.on("reject", () => console.warn("[Breaker] Execution rejected."));
  breaker.on("timeout", () => console.error("[Breaker] Execution timed out."));
  breaker.on("failure", (err:Error) =>
    console.error("[Breaker] Execution failed:", err.message)
  );

  while (true) {
    try {
      const response = await redis.brpop("messages", 30);

      if (response) {
        const [ key, element ] = response;
        console.log(key,element)
        
        await breaker.fire(JSON.parse(element));
      }
    } catch (err) {
      console.error("Error reading from Redis:", err);
      await new Promise((res) => setTimeout(res, 1000));
    }
  }
}
main();
