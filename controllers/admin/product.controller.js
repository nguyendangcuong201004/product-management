const Product = require("../../models/product.model.js");
const filterHelper = require("../../helpers/filter.helper.js");

module.exports.index = async (req, res) => {
    const find = {
        deleted: "false",
    }

    if (req.query.status) {
        find.status = req.query.status;
    }

    const filterStatus = filterHelper(req);

    if (req.query.keyword){
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
    }


    const products = await Product.find(find);
    // console.log(products)
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: req.query.keyword
    })
}