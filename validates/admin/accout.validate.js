const Account = require("../../models/account.model.js");

module.exports.createPost = async (req, res, next) => {
    if (!req.body.fullName){
        req.flash("error", "Vui lòng nhập tên của bạn!");
        res.redirect("back");
        return;
    }
    if (req.body.fullName.length < 5){
        req.flash("error", "Vui lòng nhập tên có ít nhất 5 kí tự!");
        res.redirect("back");
        return;
    }
    if (!req.body.email){
        req.flash("error", "Vui lòng nhập email của bạn!");
        res.redirect("back");
        return;
    }
    if (!req.body.password){
        req.flash("error", "Vui lòng nhập password của bạn!");
        res.redirect("back");
        return;
    }

    const exitEmail = await Account.findOne({
        email: req.body.email,
        deleted: false
    })

    if (exitEmail){
        req.flash("error", "Email đã tồn tại!");
        res.redirect("back");
        return;
    }

    next();
}