const Connection = require('../model/connection');
Connection.connecting();

class ProductService {
    static getProduct() {
        let connection = Connection.getConnection()
        return new Promise((resolve, reject) => {
            connection.query('select * from product', (err, product) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(product)
                }
            });
        })
    }
    static detailProduct(product){
        let connection = Connection.getConnection()
        return new Promise((resolve, reject)=>{
            connection.query(`SELECT * FROM  product where nation = '${product.nation}'`,(err,product)=>{
                if(err){
                    reject(err)
                }else {
                    resolve(product)
                }
            })
        })
    }
    static createProduct(product){
        let connection = Connection.getConnection();
        return new Promise((resolve, reject) => {
            connection.query(`insert into product (nation, area, people, GDP, description) VALUES ('${product.nation}','${product.area}',${product.people},${product.GDP},'${product.description}') `, (err, product) => {
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
            connection.query(`update product set nation ='${product.nation}',area = '${product.area}',people = ${product.people},GDP = ${product.GDP},description = '${product.description}' where id = ${id}`, (err, product) => {
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