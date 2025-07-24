import {createClient} from 'redis'
import {Engine} from "./trade/Engine"
import { RedisManager } from './RedisManager'


async function main() {
    const engine = new Engine();
    const redisClient = createClient();
    await redisClient.connect();
    const redis = new RedisManager();
    await engine.init();

    console.log("connected to redis");

    while (true) {
        try {

            const response = await redisClient.brPop("messages", 30);
            console.log(response)
            if (response) {
                const {key, element} = response; 

                engine.process(JSON.parse(element));
            }
        } catch (err) {
            console.error("Error reading from Redis:", err);
            await new Promise((res) => setTimeout(res, 1000)); 
        }
    }
}
main();
