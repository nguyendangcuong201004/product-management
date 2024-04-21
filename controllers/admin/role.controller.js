const Role = require("../../models/role.model.js");
const prefixAdmin = require("../../config/system.js");

// [GET] /roles
module.exports.index = async (req, res) => {

    let find = {
        deleted: false
    };

    const records = await Role.find(find);

    res.render("admin/pages/roles/index.pug", {
        pageTitle: "Nhóm quyền",
        records: records
    })
}

// [GET] /roles/create
module.exports.create = (req, res) => {

    if(!res.locals.role.permissions.includes("roles_create")){
        res.send("Không có quyền truy cập !");
        return; 
     }


    res.render("admin/pages/roles/create.pug", {
        pageTitle: "Thêm mới nhóm quyền",
    })
}

// [POST] /roles/create
module.exports.createPost = async (req, res) => {
    if(!res.locals.role.permissions.includes("roles_create")){
        res.send("Không có quyền truy cập !");
        return; 
     }
    const record = new Role(req.body);
    await record.save();

    req.flash("success", "Thêm mới quyền thành công!")

    res.redirect(`${prefixAdmin}/roles`)
}

// [GET] /roles/edit/:id
module.exports.edit = async (req, res) => {
    if(!res.locals.role.permissions.includes("roles_edit")){
        res.send("Không có quyền truy cập !");
        return; 
     }
    let find = {
        _id: req.params.id,
        deleted: false,
    };

    try {
        const data = await Role.findOne(find);
        
        res.render("admin/pages/roles/edit.pug", {
            pageTitle: "Chỉnh sửa nhóm quyền",
            data: data
        })
    }
    catch(error){
        res.redirect(`${prefixAdmin}/roles`);
    }
}

// [PATCH] /roles/edit/:id
module.exports.editPatch = async (req, res) => {
    if(!res.locals.role.permissions.includes("roles_edit")){
        res.send("Không có quyền truy cập !");
        return; 
     }
    const id = req.params.id;

    try {
        await Role.updateOne({
            _id: id
        }, req.body);
        req.flash("success", "Cập nhật Nhóm quyền thành công!");
    }
    catch(error){
        req.flash("error", "Cập nhật Nhóm quyền không thành công!");
    }
    res.redirect("back");
}

// [GET] /roles/edit/:id
module.exports.permissions = async (req, res) => {
    
    if(!res.locals.role.permissions.includes("roles_permissions")){
        res.send("Không có quyền truy cập !");
        return; 
     }

    let find = {
        deleted: false
    }

    const records = await Role.find(find);

    res.render("admin/pages/roles/permissions.pug", {
        pageTitle: "Trang phân quyền",
        records: records
    })
}

// [PATCH] /roles/edit/:id
module.exports.permissionsPatch = async (req, res) => {

    if(!res.locals.role.permissions.includes("roles_permissions")){
        res.send("Không có quyền truy cập !");
        return; 
     }

    const roles = JSON.parse(req.body.roles);

    for (const role of roles){
        await Role.updateOne({
            _id: role.id
        }, {
            permissions: role.permissions
        })
    }

    req.flash("success", "Cập nhật phân quyền thành công!!!")

    res.redirect("back")
}