// [GET] /products/
const Product = require("../../models/product.model.js");

module.exports.index = async (req, res) => {

    const products = await Product
    .find({
        deleted: false,
        status: "active"
    })
    .sort( {position: "desc"} );


    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: products
    });
}

// [GET] /products/detail/:slug
module.exports.detail = async (req, res) => {

    const slug = req.params.slug;

    const product = await Product.findOne({
        slug: slug,
        deleted: false,
        status: "active"
    })

    if (product){
        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    }
    else {
        res.redirect("/products")
    }

}