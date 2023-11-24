import config from '../config.js';

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
                url: `${config.protocol}://${config.host}:${config.port}/api`
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