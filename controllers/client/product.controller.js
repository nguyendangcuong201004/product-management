// [GET] /products/
const Product = require("../../models/product.model.js");

module.exports.index = async (req, res) => {

    const products = await Product
    .find({
        deleted: false
    })
    .sort( {position: "desc"} );


    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: products
    });
}