import winston from "winston";
import config from "../config.js";

const customLevelsOptions = {
    levels: {
        debug: 5,
        http: 4,
        info: 3,
        warning: 2,
        error: 1,
        fatal: 0
    },
    colors: {
        debug: 'white',
        http: 'green',
        info: 'blue',
        warning: 'yellow',
        error: 'red',
        fatal: 'red'   
    }
};

const logConfig = {
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({
            level: config.env == 'dev' ? 'debug' : 'info' ,
            format: winston.format.combine(
                
                winston.format.colorize({colors: customLevelsOptions.colors}),
                winston.format.simple(),
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                winston.format.printf(
                    info => `[${info.level}] - ${info.timestamp} - ${info.message}`
                ),
            )        
        }),
        new winston.transports.File({
            filename: `./logs.log`,
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),
                winston.format.printf(
                    info => `{"level":"${info.level}", "timestamp": "${info.timestamp}", "message": "${info.message}"}`
                )
            )        
        })
    ]
};

export const logger = winston.createLogger(logConfig);