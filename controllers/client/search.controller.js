const Product = require("../../models/product.model.js");


// [GET] /search
module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;

    if (!keyword){
        res.redirect("back");
        return;
    }

    const regexKeyword = new RegExp(keyword, "i");


    const products = await Product.find({
        title: regexKeyword
    })

    res.render("client/pages/search/index.pug", {
        pageTitle: "Tim ho",
        keyword: keyword,
        products: products
    })
}