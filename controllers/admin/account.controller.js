const Account = require("../../models/account.model.js");
const Role = require("../../models/role.model.js");
const generateHelper = require("../../helpers/generate.helper.js");
const md5 = require('md5');
const prefixAdmin = require("../../config/system.js");


// [GET] /accounts
module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    }

    const records = await Account.find(find);

    for (const item of records) {
        const role = await Role.findOne({
            _id: item.role_id,
            deleted: false,
        })
        item.roleTitle = role.title;
    }

    res.render("admin/pages/accounts/index.pug", {
        pageTitle: "Trang tài khoản",
        records: records
    })
}

// [GET] /accounts/create
module.exports.create = async (req, res) => {
    if(!res.locals.role.permissions.includes("accounts_create")){
        res.send("Không có quyền truy cập !");
        return; 
     }
    let find = {
        deleted: false,
    }

    const roles = await Role.find(find);

    const records = await Account(find);

    res.render("admin/pages/accounts/create.pug", {
        pageTitle: "Thêm mới tài khoản",
        roles: roles,
        records: records
    })
}

// [POST] /accounts/create
module.exports.createPost = async (req, res) => {

    if(!res.locals.role.permissions.includes("accounts_create")){
        res.send("Không có quyền truy cập !");
        return; 
     }

    req.body.createdBy = res.locals.user.id;
    
    req.body.password = md5(`${req.body.password}`);

    req.body.token = generateHelper.generateRandomString(30);

    const record = new Account(req.body);

    record.save();

    res.redirect(`${prefixAdmin}/accounts`);
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {

    if(!res.locals.role.permissions.includes("accounts_edit")){
        res.send("Không có quyền truy cập !");
        return; 
     }

    const id = req.params.id;

    let find = {
        _id: id,
        deleted: false,
    }

    try {
        const data = await Account.findOne(find);
        
        const roles = await Role.find({
            deleted: false,
        })

        res.render("admin/pages/accounts/edit.pug", {
            pageTitle: "Chỉnh sửa tài khoản",
            data: data,
            roles: roles
        })
    }
    catch(error){
        res.redirect(`${prefixAdmin}/accounts`)
    }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {   
    if(!res.locals.role.permissions.includes("accounts_edit")){
        res.send("Không có quyền truy cập !");
        return; 
     }

    try {
        if (req.body.password){
            req.body.password = md5(req.body.password);
        }
        else {
            delete req.body.password
        }
        const id = req.params.id;

        req.body.updatedBy = res.locals.user.id;
        
        await Account.updateOne({
            _id: id,
            deleted: false,
        }, req.body);
    
        req.flash("success", "Cập nhật tài khoản thành công !");

        res.redirect("back");
    } 
    catch(error){
        res.redirect(`${prefixAdmin}/accounts`)
    }
    
}

// [PATCH] /admin/accounts/edit/:id // delete
module.exports.delete = async (req, res) => {   
    if(!res.locals.role.permissions.includes("accounts_delete")){
        res.send("Không có quyền truy cập !");
        return; 
     }

    try {
        const id = req.params.id;
        await Account.updateOne({
            _id: id
        }, {
            deleted: true,
            deletedBy: res.locals.user.id,
            deletedAt: new Date()
        })
        req.flash("success", "Tài khoản được xóa thành công !");
        res.redirect("back")
    } 
    catch(error){
        res.redirect(`${prefixAdmin}/accounts`)
    }
    
}