const Connection = require('../model/connection');
Connection.connecting();

class ProductService {
    static getProduct() {
        let connection = Connection.getConnection()
        return new Promise((resolve, reject) => {
            connection.query('SELECT * from product', (err, product) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(product)
                }
            });
        })
    }
    static createProduct(product){
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`insert into  product (name, price, description) values ( '${product.name}',${product.price},'${product.description}') `, (err, product) => {
                if (err) {
                    reject(err);
                } else {

                    resolve(product);
                }
            });
        })

   }

    static saveProduct(product,id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`update product set name = '${product.name}',price = ${product.price},description = '${product.description}' where id = ${id}`, (err, product) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(product);
                }
            });
        })

    }

    static findById(id) {
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`select *
                              from product
                              where id = ${id}`, (err, product) => {
                if (err) {
                    reject(err);
                } else {

                    resolve(product);
                }
            });
        })

    }
    static delete(product,id){
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`DELETE FROM product
                              WHERE ID = '${id}'`, (err, product) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(product);
                }
            });
        })

    }
}

module.exports = ProductService;