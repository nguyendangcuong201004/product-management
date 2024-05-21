const ProductCategory = require("../../models/product-category.model.js");
const createTreeHelper = require("../../helpers/createTree.helper.js");
const Product = require("../../models/product.model.js");

// [GET] /
module.exports.index =  async (req, res) => {

    const productFeatured = await Product.find({
        deleted: false,
        status: "active",
        featured: "1",
    }).limit(10).select("-description");

    for (const product of productFeatured) {
        product.priceNew = Math.round(product.price - product.price * product.discountPercentage / 100);
    }

    const productNew = await Product.find({
        deleted: false,
        status: "active",
    }).limit(9).select("-description").sort({ positon: "desc" });

    for (const product of productNew) {
        product.priceNew = Math.round(product.price - product.price * product.discountPercentage / 100);
    }

    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",
        productFeatured: productFeatured,
        productNew: productNew
    });
}