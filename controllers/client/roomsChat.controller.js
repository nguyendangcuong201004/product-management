const User = require("../../models/user.model.js");
const RoomsChat = require("../../models/rooms-chat.model.js");

// [GET] /rooms-chat
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    
    const listRoomChats = await RoomsChat.find({
        "users.user_id": userId,
        typeRoom: "group",
        deleted: false,
    });

    console.log(listRoomChats)

    res.render("client/pages/rooms-chat/index.pug", {
        pageTitle: "Danh sách phòng",
        listRoomChats: listRoomChats
    })
}

// [GET] /rooms-chat/create
module.exports.create = async (req, res) => {
    const friendsList = res.locals.user.friendsList;

    for (const friend of friendsList) {
        const infoUser = await User.findOne({
            _id: friend.user_id,
            deleted: false,
        }).select("fullName avatar")
        friend.infoFriend = infoUser;
    }

    res.render("client/pages/rooms-chat/create.pug", {
        pageTitle: "Tạo phòng",
        friendsList: friendsList
    })
}

// [POST] /rooms-chat/create
module.exports.createPost = async (req, res) => {
    const title = req.body.title;
    const usersId = req.body.usersId;

    const roomChat = {
        title: title,
        typeRoom: "group",
        users: []
    }

    usersId.forEach((user) => {
        roomChat.users.push({
            user_id: user,
            role: "user",
        })
    })

    roomChat.users.push({
        user_id: res.locals.user.id,
        role: "superAdmin",
    })

    const newRoomChat = new RoomsChat(roomChat);

    await newRoomChat.save()

    res.redirect(`/chat/${newRoomChat.id}`)
}