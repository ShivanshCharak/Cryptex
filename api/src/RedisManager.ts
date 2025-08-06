import {RedisClientType,createClient} from 'redis'
import { MessageToEngine } from './types/to'
import { MessageFromOrderbook } from './types'


export class RedisManager{
    public static instance: RedisManager
    private client: RedisClientType
    private publisher:RedisClientType
    
    private constructor(){
        this.client = createClient()
        this.client.connect()
        this.publisher = createClient()
        this.publisher.connect()
    }

    public static getInstance(){
        if(!this.instance){
            this.instance = new RedisManager()
        }
        return this.instance
    }
    public sendAndAwait(message:MessageToEngine){
        return new Promise<MessageFromOrderbook>(async (resolve)=>{
            const id = this.getRandomClientId()
            this.client.subscribe(id,(message)=>{
                this.client.unsubscribe(id)
                resolve(JSON.parse(message))
            })
            let find  = await this.publisher.lPush("messages",JSON.stringify({clientId:id, message}))
    
            return find
            
        })
    }
    public getRandomClientId() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

}