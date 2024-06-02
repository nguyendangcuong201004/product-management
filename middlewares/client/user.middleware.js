const User = require("../../models/user.model.js");



module.exports.infoUser = async (req, res, next) => {
    if (req.cookies.tokenUser){
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            delete: false,
            status: "active",
        }) 
        if (user){
            res.locals.user = user
        }
    }
    next();
}