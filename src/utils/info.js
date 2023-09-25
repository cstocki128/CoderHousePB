const generateProductErrorInfo = (product) => {
    return `One or more properties were incomplete or not valid.
    List of required properties:
    * code: tipo String, received ${product.code}
    * title: tipo String, received ${product.title}
    * description: tipo String, received ${product.description}
    * price: tipo Number, received ${product.price}
    * stock: tipo Number, received ${product.stock}
    * status: tipo Boolean, received ${product.status}
    * category: tipo String, received ${product.category}
    `
}

export default generateProductErrorInfo;