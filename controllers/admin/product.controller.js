const Product = require("../../models/product.model.js");
const filterHelper = require("../../helpers/filter.helper.js");
const paginationHelper = require("../../helpers/pagination.helper.js");
const prefixAdmin = require("../../config/system.js");
const ProductCategory = require("../../models/product-category.model.js");
const createTreeHelper = require("../../helpers/createTree.helper.js");
const Account = require("../../models/account.model.js");

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

    //Sort

    const sort = {};
    if (req.query.sortKey && req.query.sortValue){
        const sortKey = req.query.sortKey;
        const sortValue = req.query.sortValue;
        sort[sortKey] = sortValue;
    }   
    else {
        sort.position = "desc"
    }


    //Sort

    const countRecords = await Product.countDocuments(find);

    const objectPagination = paginationHelper(req, countRecords);

    const products = await Product
        .find(find)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip)
        .sort(sort);
    // console.log(products)
    for (const product of products) {
        const createdBy = await Account.findOne({
            _id: product.createdBy
        })

        if (!createdBy){
            product.createdByFullName = res.locals.role.title
        }

        else {
            product.createdByFullName = createdBy.fullName;
        }
    }
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

    const infoProduct = await Product.findOne({
        _id: id
    })

    req.flash('success', `Cập nhật trạng thái sản phẩm ${infoProduct.title} thành công!`);
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
            req.flash('success', 'Cập nhật trạng thái thành công!');
            break;
        case "inactive":
            await Product.updateMany({
                _id: { $in: ids}
            }, {
                status: status
            })
            req.flash('success', 'Cập nhật trạng thái thành công!');
            break;

        case "deleteAll":
            await Product.updateMany({
                _id: { $in: ids }
            }, {
                deleted: true,
                deletedBy: res.locals.user.id,
                deletedAt: new Date(),
            })
            req.flash('success', 'Xóa sản phẩm thành công!');
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({
                    _id: id
                }, {
                    position: position
                })
            }   
            req.flash('success', 'Thay đổi vị trí sản phẩm thành công!');
            break;
        default:
            break;
    };
    res.redirect("back")
}


// [DELETE] /admin/products/:status/:id
module.exports.deleteProducts = async (req, res) => {
    if(!res.locals.role.permissions.includes("products_view")){
       res.send("Không có quyền truy cập !");
       return; 
    }
    const id = req.params.id;
    await Product.updateOne({
        _id: id
    }, {
        deleted: true,
        deletedBy: res.locals.user.id,
        deletedAt: new Date(),
    });
    req.flash('success', 'Xóa sản phẩm thành công!');
    res.redirect("back")
}

//[GET] /admin/products/create
module.exports.create = async (req, res) => {

    if(!res.locals.role.permissions.includes("products_create")){
        res.send("Không có quyền truy cập !");
        return; 
     }

    const category = await ProductCategory.find({
        deleted: false
    });

    const newCategory = createTreeHelper(category);

    res.render("admin/pages/products/create.pug", {
        pageTitle: "Thêm mới sản phẩm",
        category: newCategory,
    });
}

//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {

    if(!res.locals.role.permissions.includes("products_create")){
        res.send("Không có quyền truy cập !");
        return; 
     }

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);  
    if(req.body.position){
        req.body.position = parseInt(req.body.position);  
    }
    else {
        const countRecords = await Product.countDocuments({});
        req.body.position = countRecords + 1;
    }

    // if (req.file){
    //     req.body.thumbnail = `/uploads/${req.file.filename}`;
    // }

    req.body.createdBy = res.locals.user.id;

    const record = new Product(req.body);
    await record.save();

    req.flash('success', 'Thêm mới sản phẩm thành công!');

    res.redirect(`${prefixAdmin}/products`);
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {

    if(!res.locals.role.permissions.includes("products_edit")){
        res.send("Không có quyền truy cập !");
        return; 
     }

    const category = await ProductCategory.find({
        deleted: false
    });

    const newCategory = createTreeHelper(category);


    const id = req.params.id;
    const product = await Product.findOne({
        _id: id,
        deleted: false
    });

    res.render("admin/pages/products/edit.pug", {
        pageTitle: "Chỉnh sửa sản phẩm",
        product: product,
        category: newCategory
    });
}

// [PATCH] /admin/product/edit/:id
module.exports.editPatch = async (req, res) => {
    
    if(!res.locals.role.permissions.includes("products_edit")){
        res.send("Không có quyền truy cập !");
        return; 
     }
    const id = req.params.id;
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);  
    req.body.position = parseInt(req.body.position);  
    req.body.updatedBy = res.locals.user.id;  
    // if (req.file){
    //     req.body.thumbnail = `/uploads/${req.file.filename}`;
    // }


    // console.log(req.body);

    await Product.updateOne({
        _id: id,
        deleted: false
    }, req.body);

    req.flash('success', 'Cập nhật sản phẩm thành công!');

    res.redirect(`back`);
}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    const id = req.params.id;
    const product = await Product.findOne({
        _id: id,
        deleted: false
    });
    res.render("admin/pages/products/detail", {
        pageTitle: product.title,
        product: product
    })
}

