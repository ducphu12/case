const ProductRouting = require('./handle/producrRouting');
const handler = {
    "home": ProductRouting.showHome,
    "product/create":ProductRouting.showFormCreate,
    "product/edit":ProductRouting.showFormEdit,
    "product/delete":ProductRouting.delete


}
module.exports = handler;