import { createClient } from "redis"
import { UserManager } from "./UserManager"
export class SubscriptionManager{
    private static instance: SubscriptionManager
    private subscriptions: Map<string,string[]> = new Map()
    private reverseSubscription: Map<string,string[]> = new Map()
    private redisClient

    private constructor(){
        this.redisClient = createClient()
        this.redisClient.connect()
    }

    public static getInstance(){
        if(!this.instance){
            this.instance= new SubscriptionManager()
        }
        return this.instance
    }

    public subscribe(userId:string,subscription:string){
        console.log("all subscription",this.subscriptions)
        if(this.subscriptions.get(userId)?.includes(subscription)){
            return
        }
        this.subscriptions.set(userId,(this.subscriptions.get(userId)||[]).concat(subscription))
        const existing = this.reverseSubscription.get(subscription)||[]
        if(!existing.includes(userId)){
            this.reverseSubscription.set(subscription,[...existing,userId])
        }
    
        if(this.reverseSubscription.get(subscription)?.length===1){
            
         this.redisClient.subscribe(subscription, (message, channel) => {
    this.redisCallbackHandler(channel, message);
});

        }
    }
    
    
    private redisCallbackHandler=(channel:string,message:string)=>{
        const parsedMessage = JSON.parse(message)
        console.log(`📨 Redis Message Received | Channel: ${channel}`);
console.log(`📨 Message:`, parsedMessage);
        this.reverseSubscription.get(channel)?.forEach(s=>UserManager.getInstance()?.getUser(s)?.emit(parsedMessage))
    }

    public unsubscribe(userId: string, subscription:string){
        const subscriptions = this.subscriptions.get(userId)
        if(subscriptions){
            this.subscriptions.set(userId,subscriptions.filter(s=>s!==subscription))
        }
        const reverseSubscription = this.reverseSubscription.get(userId)
        if(reverseSubscription){
            this.reverseSubscription.set(userId,reverseSubscription.filter(s=>s!== userId))
            if(this.reverseSubscription.get(subscription)?.length===0){
                this.reverseSubscription.delete(subscription)
                this.redisClient.unsubscribe(subscriptions)
            }
        }
    }

    public userLeft(id:string){
        this.subscriptions.get(id)?.forEach(s=>this.unsubscribe(id,s))
        console.log("after deletrion:",this.subscriptions)
    }

}