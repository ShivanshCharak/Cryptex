import {Client} from 'pg'
import {createClient} from 'redis'

const pgClient = new Client({
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
        const response = await redisClient.rPop("db_processor" as string)
        
        if(!response){

        }else{
            const data = JSON.parse(response)
            if(data.type==="TRADE_ADDED"){
                console.log("adding trade")
                const price = data.data.price
                const timestamp = new Date(data.data.timestamp)
                const query="Insert into tata_prices(time,price) values($1,$2)";
                const values=[timestamp,price]
                await pgClient.query(query,values)
            }
        }
    }
    
}
main()