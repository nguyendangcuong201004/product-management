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

    res.render("admin/pages/accounts/index.pug", {
        pageTitle: "Trang tài khoản",
        records: records
    })
}

// [GET] /accounts/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false,
    }

    const roles = await Role.find(find);

    res.render("admin/pages/accounts/create.pug", {
        pageTitle: "Thêm mới tài khoản",
        roles: roles
    })
}

// [POST] /accounts/create
module.exports.createPost = async (req, res) => {
    
    req.body.password = md5(`${req.body.password}`);

    req.body.token = generateHelper.generateRandomString(30);

    const record = new Account(req.body);

    record.save();

    res.redirect(`${prefixAdmin}/accounts`);
}