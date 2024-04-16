const ProductCategory = require("../../models/product-category.model.js");
const prefixAdmin = require("../../config/system.js");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false,
    });

    res.render("admin/pages/products-category/index.pug", {
        pageTitle: "Danh mục sản phẩm",
        records: records
    })
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {

    const records = await ProductCategory.find({
        deleted: false
    });

    res.render("admin/pages/products-category/create.pug", {
        pageTitle: "Thêm mới danh mục sản phẩm ",
        records: records
    })
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {

    if(req.body.position){
        req.body.position = parseInt(req.body.position);  
    }
    else {
        const countRecords = await ProductCategory.countDocuments({});
        req.body.position = countRecords + 1;
    }
    const record = new ProductCategory(req.body);
    await record.save();

    req.flash('success', 'Thêm mới danh mục thành công!');

    res.redirect(`${prefixAdmin}/products-category`);
}
