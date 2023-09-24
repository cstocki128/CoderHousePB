import {fileURLToPath} from 'url';
import {dirname} from 'path';
import bcrypt from 'bcrypt';
import {faker} from '@faker-js/faker' 

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

/**
 * funcion que realiza el encriptado de contraseña a través de bcrypt con el método hashSync. 
 * Recibe password sin encriptar,
 * retorna password encriptada
 * @param password tipo string
 * @returns password encriptada/hasheada
 */
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 * 
 * @param {*} user usuario encontrado en base de datos.
 * @param {*} password contraseña proporcionada por el usuario, sin encriptar.
 * @returns boolean
 */
export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

export const mockProducts = quantity => {
    const products = [];
    const generateThumbnails = () =>{
        const thumbnails = [];
        for (let i = 0; i < faker.number.int({ min: 1, max: 5 }); i++){
            thumbnails.push(faker.image.urlPlaceholder({ format: 'png' }))
        }
        return thumbnails
    };
    for (let i = 0; i < quantity ?? 1; i++){
        const product = {
            code: faker.string.alphanumeric(6),
            title: faker.commerce.product(),                
            description: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: generateThumbnails(),
            stock: faker.number.int({ min: 0, max: 500 }),
            category: faker.commerce.department()
        };
        product.stock > 0 ? product.status = true : product.status = false;
        products.push(product);
    };
    return products;
}