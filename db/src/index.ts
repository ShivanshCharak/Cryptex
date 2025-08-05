import {Client} from 'pg'
import {createClient} from 'redis'

const pgClient:Client = new Client({
    user:"shivansh",
    password:"shamsher@54",
    database:"crypto",
    port:5432,
    host:"localhost"
})
pgClient.connect()

async function main(){
    const redisClient = createClient()
    await redisClient.connect()

    console.log("connected to redis")
    while(true){
        const obj = await redisClient.brPop("db_processor" as string,1)
        if(obj?.element){
            
            let data ={
                type:obj.key ,
                data:JSON.parse(obj?.element as string)
            }
            console.log(data)
            if(!obj){
    
            }else{
                
                
                if(data.data.type==="TRADE_ADDED"){
                    
                    const price = data.data.data.price
                    const timestamp = new Date(Number(data.data.data.timestamp))
                    const quantity = data.data.data.quantity
                    console.log(data.data.timestamp)
                    const query="Insert into sol_prices(time,price,volume,currency_code) values($1,$2,$3,$4)";
                    const values=[timestamp,price,quantity,"SOL"]
                
                    const result  =await pgClient.query(query,values)
                    console.log("re",result,timestamp)
                }
                else if(data.data.type=="ORDER_UPDATE"){
                     const price = data.data.price
                    const timestamp = new Date(data.data.timestamp)
                    const query="update into sol_prices(time,price) values($1,$2)";
                    const values=[timestamp,price]
                    await pgClient.query(query,values)
                }
            }
        }
        
    }
    
}
main()