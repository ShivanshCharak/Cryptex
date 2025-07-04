import {createClient} from 'redis'
import {Engine} from "./trade/Engine"
import { RedisManager } from './RedisManager'


async function main(){
    const engine = new Engine()
    const redisClient = createClient()
    await redisClient.connect()
    const redis  = new RedisManager()
    await engine.init()

    console.log("connected to redis")

    while(true){
        const response = await redisClient.rPop("messages" as string)
        
        if(!response){
           
        }else{
            engine.process(JSON.parse(response))
        }
    }
}
main()