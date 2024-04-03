const Product = require("../../models/product.model.js");
const filterHelper = require("../../helpers/filter.helper.js");
const paginationHelper = require("../../helpers/pagination.helper.js");
const prefixAdmin = require("../../config/system.js");

// [GET] /admin/products

module.exports.index = async (req, res) => {
    const find = {
        deleted: "false",
    }

    // Filter

    if (req.query.status) {
        find.status = req.query.status;
    }

    const filterStatus = filterHelper(req);


    // Search
    if (req.query.keyword){
        const regex = new RegExp(req.query.keyword, "i");
        find.title = regex;
    }

    // Pagination

    const countRecords = await Product.countDocuments(find);

    const objectPagination = paginationHelper(req, countRecords);

    const products = await Product
        .find(find)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);
    // console.log(products)
    res.render("admin/pages/products/index.pug", {
        pageTitle: "Trang danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: req.query.keyword,
        objectPagination: objectPagination,

    })
}


// [PATCH] /admin/products/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({
        _id: id
    }, {
        status: status
    });

    res.redirect(`back`);
}


// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const status = req.body.type;
    const ids = req.body.ids.split(", ");
    
    switch(status){
        case "active":
            await Product.updateMany({
                _id: { $in: ids}
            }, {
                status: status
            })
            break;
        case "inactive":
            await Product.updateMany({
                _id: { $in: ids}
            }, {
                status: status
            })
            break;

        case "deleteAll":
            await Product.updateMany({
                _id: { $in: ids }
            }, {
                deleted: true
            })
        default:
            break;
    };
    res.redirect("back")
}


// [DELETE] /admin/products/:status/:id
module.exports.deleteProducts = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({
        _id: id
    }, {
        deleted: true   
    });
    res.redirect("back")
}