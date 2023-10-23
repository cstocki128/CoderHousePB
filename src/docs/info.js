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
                url: 'http://localhost:8080/api'
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