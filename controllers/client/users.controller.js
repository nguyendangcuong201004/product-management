const User = require("../../models/user.model.js")
const userSocket = require("../../sockets/client/users.socket.js");


// [GET] /user/not-friend
module.exports.notFriend = async (req, res) => {

    userSocket(req, res)

    const userId = res.locals.user.id;
    const requestFriends = res.locals.user.requestFriends
    const acceptFriends = res.locals.user.acceptFriends;

    const users = await User.find({
        $and: [
            {_id: { $ne: userId }},
            {_id: { $nin: requestFriends }} ,
            {_id: { $nin: acceptFriends}}
        ],
        deleted: false,
        status: "active"
    }).select("avatar fullName")

    res.render("client/pages/users/not-friend.pug", {
        pageTitle: "Danh sách người dùng",
        users: users
    })
}

// [GET] /user/request
module.exports.request = async (req, res) => {

    userSocket(req, res)
    
    const requestFriends = res.locals.user.requestFriends;
    
    const users = await User.find({
        _id: { $in:  requestFriends},
        deleted: false,
        status: "active"
    }).select("avatar fullName")

    res.render("client/pages/users/request.pug", {
        pageTitle: "Lời mời đã gửi",
        users: users
    })
}

// [GET] /user/accept
module.exports.accept = async (req, res) => {

    userSocket(req, res);

    const userIdRecieve = res.locals.user.id;
    const acceptFriends = res.locals.user.acceptFriends;

    const users = await User.find({
        _id: { $in: acceptFriends },
        deleted: false,
        status: "active"
    }).select("avatar fullName");


    res.render("client/pages/users/accept.pug", {
        pageTitle: 'Lời mời kết bạn',
        users: users
    })
}