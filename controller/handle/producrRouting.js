const fs = require('fs');
const qs = require('qs');
const ProductService = require('../../service/productService')
class ProductRouting {
    static getHtmlProduct(product, indexHtml) {
        let tbody = '';
        product.map((product, index) => {
            tbody += `<tr style="text-align: center">
                    <td >${index}</td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td><a href="product/edit/${product.id}" class="btn btn-danger">Edit</a> </td>
                     <td><a href="product/delete/${product.id}" class="btn btn-danger">Delete</a> </td>      
            </tr>`
        });
        indexHtml = indexHtml.replace('{product}', tbody);
        return indexHtml;
    }

    static showHome(req, res) {
        fs.readFile('./views/index.html', 'utf8', async (err, indexHtml) => {
            if (err) {
                console.log(err);
            } else {

                let product = await ProductService.getProduct();
                indexHtml = ProductRouting.getHtmlProduct(product, indexHtml);
                res.writeHead(200, 'text/html');
                res.write(indexHtml);
                res.end();
            }
        });
    }

    static showFormCreate(req, res) {
        if (req.method === "GET") {
            fs.readFile('./views/product/create.html', 'utf8', async (err, productHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    res.writeHead(200, 'text/html');
                    res.write(productHtml);
                    res.end();
                }
            });

        } else {
            let productChunk = '';
            req.on(`data`, chunk => {
                productChunk += chunk
            });
            req.on(`end`, async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let product = qs.parse(productChunk);

                   await ProductService.createProduct(product);
                   res.writeHead(301, {'location':'/home'});
                   res.end();
                }
            })

        }
    };

    static showFormEdit(req, res,id) {
        if (req.method === "GET") {
            fs.readFile('./views/product/edit.html', 'utf8', async (err, editHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    let product = await ProductService.findById(id);

                    editHtml = editHtml.replace(`{name}`,product[0].name);
                    editHtml = editHtml.replace(`{price}`,product[0].price);
                    editHtml = editHtml.replace(`{description}`,product[0].description);
                    res.writeHead(200, 'text/html');
                    res.write(editHtml);
                    res.end();
                }
            });


        }else {
            let productChunk = '';
            req.on(`data`, chunk => {
                productChunk += chunk
            });
            req.on(`end`, async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let product = qs.parse(productChunk);

                    await ProductService.saveProduct(product,id);
                    res.writeHead(301, {'location':'/home'});
                    res.end();
                }
            })


        }

        };
    static delete (req,res,id){
        if (req.method === "GET") {
            fs.readFile('./views/product/delete.html', 'utf8', async (err, deleteHtml) => {
                if (err) {
                    console.log(err);
                } else {
                    let product = await ProductService.findById(id);
                    deleteHtml = deleteHtml.replace(`{name}`,product[0].name);
                    deleteHtml = deleteHtml.replace(`{price}`,product[0].price);
                    deleteHtml = deleteHtml.replace(`{description}`,product[0].description);
                    res.writeHead(200, 'text/html');
                    res.write(deleteHtml);
                    res.end();
                }
            });


        }else {
            let productChunk = '';
            req.on(`data`, chunk => {
                productChunk += chunk
            });
            req.on(`end`, async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    let product = qs.parse(productChunk);
                    await ProductService.delete(product,id);
                    res.writeHead(301, {'location':'/home'});
                    res.end();
                }
            })


        }




    };
}
    module.exports = ProductRouting;