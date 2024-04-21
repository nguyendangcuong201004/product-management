const ProductCategory = require("../../models/product-category.model.js");
const prefixAdmin = require("../../config/system.js");
const createTreeHepler = require("../../helpers/createTree.helper.js");

// [GET] /admin/products-category
module.exports.index = async (req, res) => {
    const records = await ProductCategory.find({
        deleted: false,
    });
    
    const newRecords = createTreeHepler(records);

    res.render("admin/pages/products-category/index.pug", {
        pageTitle: "Danh mục sản phẩm",
        records: newRecords
    })
}

// [GET] /admin/products-category/create
module.exports.create = async (req, res) => {
    
    if(!res.locals.role.permissions.includes("products-category_create")){
        res.send("Không có quyền truy cập !");
        return; 
     }

    const records = await ProductCategory.find({
        deleted: false
    });

    const newRecords = createTreeHepler(records);


    res.render("admin/pages/products-category/create.pug", {
        pageTitle: "Thêm mới danh mục sản phẩm ",
        records: newRecords
    })
}

// [POST] /admin/products-category/create
module.exports.createPost = async (req, res) => {

    if(!res.locals.role.permissions.includes("products-category_create")){
        res.send("Không có quyền truy cập !");
        return; 
     }

    if(req.body.position){
        req.body.position = parseInt(req.body.position);  
    }
    else {
        const countRecords = await ProductCategory.countDocuments({});
        req.body.position = countRecords + 1;
    }
    req.body.createdBy = res.locals.user.id;
    const record = new ProductCategory(req.body);
    await record.save();

    req.flash('success', 'Thêm mới danh mục thành công!');

    res.redirect(`${prefixAdmin}/products-category`);
}


// [GET] /admin/products-category/edit/:id
module.exports.edit = async (req, res) => {

    
    if(!res.locals.role.permissions.includes("products-category_edit")){
        res.send("Không có quyền truy cập !");
        return; 
     }


    let find = {
        _id: req.params.id,
        deleted: false
    };

    try {
        const data = await ProductCategory.findOne(find);

        const records = await ProductCategory.find({
            deleted: false,
        })

        const newRecords = createTreeHepler(records);

        res.render("admin/pages/products-category/edit.pug", {
            pageTitle: "Chỉnh sửa danh mục",
            data: data,
            records: newRecords,
        })
    }

    catch(error){
        res.redirect(`${prefixAdmin}/products-category`)
    }

}


// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {

    if(!res.locals.role.permissions.includes("products-category_edit")){
        res.send("Không có quyền truy cập !");
        return; 
     }

    const id = req.params.id;

    req.body.postion = parseInt(req.body.postion)

    req.body.updatedBy = res.locals.user.id;

    try {
        await ProductCategory.updateOne({
            _id: id
        }, req.body);
        req.flash("success", "Cập nhật danh mục thành công!");
    }
    catch(error){
        req.flash("error", "Cập nhật danh mục không thành công!");
    }
    res.redirect("back");
}