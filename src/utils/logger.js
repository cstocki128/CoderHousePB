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
                winston.format.printf(
                    info => `[${info.level}] ${info.message}`
                ),
            )        
        }),
        new winston.transports.File({
            filename: `./logs.log`,
            level: 'error'
        })
    ]
};

export const logger = winston.createLogger(logConfig);