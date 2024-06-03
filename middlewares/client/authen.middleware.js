const prefixAdmin = require("../../config/system.js");
const User = require("../../models/user.model.js");

module.exports.requireAuth = async (req, res, next) => {
    if (!req.cookies.tokenUser){
        res.redirect(`/user/login`);
        return;
    }
    const user = await User.findOne({
        tokenUser: req.cookies.tokenUser,
        deleted: false,
        status: "active"
    })
    if (!user){
        res.clearCookie("tokenUser")
        res.redirect(`/user/login`);
        return;
    }

    res.locals.user = user; 

    next();
}