const User = require("../../models/user.model.js")


// [GET] /user/not-friend
module.exports.notFriend = async (req, res) => {
    const userId = res.locals.user.id;

    const users = await User.find({
        _id: { $ne: userId },
        deleted: false,
        status: "active"
    }).select("avatar fullName")


    res.render("client/pages/users/not-friend.pug", {
        pageTitle: "Danh sách người dùng",
        users: users
    })
}