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

    while(true){
        const obj = await redisClient.brPop("db_processor" as string,20)
        if(obj?.element){
            let data ={
                type:obj.key ,
                data:JSON.parse(obj?.element as string)
            }
            if(!obj){
            }else{
                if(data.data.type==="TRADE_ADDED"){
                    const price = data.data.data.price
                    const timestamp = new Date(Number(data.data.data.timestamp))

                    const quantity = data.data.data.quantity
                    let market = data.data.data.market.split("_")[0].toLowerCase()
                    console.log(market)
                    
                    const query=`Insert into ${market}_prices(time,price,volume,currency_code) values($1,$2,$3,$4)`;
                    const values=[timestamp,price,quantity,"SOL"]
                
                    const result  =await pgClient.query(query,values)
                }
                else if(data.data.type=="ORDER_UPDATE"){
                     const price = data.data.price
                    const timestamp = new Date(data.data.timestamp)
                    const query="update into sol_prices(time,price) values($1,$2)";
                    const values=[timestamp,price]
                    await pgClient.query(query,values)
                }
                 const klineQuery = `
                      SELECT
                        time_bucket('1 hour', time) AS interval,
                        first(price, time) AS open,
                        max(price) AS high,
                        min(price) AS low,
                        last(price, time) AS close,
                        sum(volume) AS volume
                      FROM sol_prices
                      WHERE currency_code = 'SOL'
                        AND time >= NOW() - INTERVAL '1 minute'
                      GROUP BY interval
                      ORDER BY interval DESC
                      LIMIT 60;
                    `;

  const { rows } = await pgClient.query(klineQuery);
  console.log("Rows",rows)

  if (rows.length > 0) {
    await redisClient.publish(
      "trade@SOL_USDC",
      JSON.stringify({
        stream: "trade@SOL_USDC",
        data: {
          e: "trade",
          interval: rows[0].interval,
          o: rows[0].open,
          h: rows[0].high,
          l: rows[0].low,
          c: rows[0].close,
          v: rows[0].volume,
          s: "SOL_USDC",
        },
      })
    );
  }
                // redisClient.publish("trade@SOL_USDC",JSON.stringify())
                
            }
        }
        
    }
    
}
main()