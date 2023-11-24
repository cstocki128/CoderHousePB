import config from '../config.js';
let url;
if (config.host == 'localhost') url = `${config.protocol}://${config.host}:${config.port}/api`
else url = `${config.protocol}://${config.host}/api`

export const info = {
    definition: {
        openapi: '3.0.0',   
        info: {
            title: 'API Ecommerce',
            version: '1.0.0',
            description: 'Tecnologías utilizadas: Node, Express, MongoDB'
        },
        servers: [  
            {
                url: url
            }
        ],
        components: {        
            securitySchemes: {
              bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
              }
            }
          }  
    },
    apis: ['./src/docs/**/*.yml']
    
}