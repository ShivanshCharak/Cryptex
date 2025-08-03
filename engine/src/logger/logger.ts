import {createLogger ,format, transports} from "winston";
import LokiTransport from "winston-loki"; // Import LokiTransport
export const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.errors({stack:true}),
        format.json(),
    ),
    transports:[
        new transports.Console(),
        new transports.File({
            filename:`./logs/error-log`,
            level:'error'
        }),
        new transports.File({
            filename:`./logs/combined-log`
        }),
        new LokiTransport({ 
            host: "http://localhost:3100", 
            json: true, 
            labels: {
                job: "Loki" 
            },

            onConnectionError: (err) => console.error("Loki connection error:", err) 
        })
    ]
})
