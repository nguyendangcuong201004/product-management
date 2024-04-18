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

    res.render("admin/pages/roles/create.pug", {
        pageTitle: "Thêm mới nhóm quyền",
    })
}

// [POST] /roles/create
module.exports.createPost = async (req, res) => {
    const record = new Role(req.body);
    await record.save();

    req.flash("success", "Thêm mới quyền thành công!")

    res.redirect(`${prefixAdmin}/roles`)
}
