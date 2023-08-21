# CoderHousePB
# Curso de programacion backend de Coderhouse

## Comandos de inicio
  - `npm start`: iniciar con node
  - `npm run dev`: Iniciar con nodemon

## Vistas

- [localhost:8080/login](http://localhost:8080/login): Login
- [localhost:8080/products](http://localhost:8080/products): Listado de productos.
- `localhost:8080/carts/:cartId`: Listado de items del cart seleccionado.
- [localhost:8080/realTimeProducts](http://localhost:8080/realTimeProducts): Listado de productos en tiempo real con WEBSOCKET
- [localhost:8080/chat](http://localhost:8080/chat): Chat en tiempo real con WEBSOCKET

## Endpoints

### Users

- `GET /api/users/authenticate`: Genera y retorna token JWT. Debe recibir Form-encode `{email, password}`
- `POST /api/users/current`: Retorna datos de usuario/sesión. Requiere Bearer Auth.
- `POST /api/users/addCart`: Agrega cart al usuario. Debe recibir Form-encode `{email, cid}`

### Products

- `GET /api/products`: Retorna todos los productos paginados. Recibe parámetros opcionales: `limit`, `page`, `sort`, `category` y `status`
- `GET /api/products/:id`: Retorna el producto por id.
- `POST /api/products`: Crea un producto nuevo.
- `PUT /api/products/:id`: Edita el producto. 
- `DELETE /api/products/:id`: Elimina el producto enviado.

### Cart

- `GET /api/carts`: Retorna todos los carts.
- `GET /api/carts/:id`: Retorna el cart por id.
- `POST /api/carts`: Crea un cart nuevo. Con o sin productos
- `POST /api/carts/:id/product/:productId`: Agrega un producto al cart. Si ya existe, aumenta su cantidad en uno.
- `DELETE /api/carts/:id/product/:productId`: Elimina el producto seleccionado del carrito.
- `DELETE /api/carts/:id`: Elimina todos los productos del carrito
- `PUT /api/carts/:id/product/:productId`: Actualiza la cantidad de producto del cart. Debe recibir Form-encode {quantity: value}
- `PUT /api/carts/:id`: Actualiza los productos del cart. Debe recibir en el body la salida de `GET /api/products`:

```
{
  "payloads": [
      Productos...
  ],
  "totalPages": 1,
  "page": 1,
  "hasPrevPage": false,
  "hasNextPage": false,
  "prevPage": null,
  "nextPage": null,
  "status": "Success",
  "prevLink": null,
  "nextLink": null
}
```
