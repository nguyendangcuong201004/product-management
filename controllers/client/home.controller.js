const ProductCategory = require("../../models/product-category.model.js");
const createTreeHelper = require("../../helpers/createTree.helper.js");

// [GET] /
module.exports.index =  (req, res) => {

    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",
    });
}