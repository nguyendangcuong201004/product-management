const ProductCategory = require("../../models/product-category.model.js");
const createTreeHelper = require("../../helpers/createTree.helper.js");

module.exports.category = async (req, res, next) => {
    const productCategory = await ProductCategory.find({
        deleted: false,
        status: "active"
    });
    
    const newProductCategory = createTreeHelper(productCategory);

    res.locals.layoutProductCatetory = newProductCategory;
    next();
}