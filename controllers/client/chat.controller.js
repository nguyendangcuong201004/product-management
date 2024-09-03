const Chat = require("../../models/chat.model.js");
const User = require("../../models/user.model.js");

const chatSocket = require("../../sockets/client/chat.socket.js");

// [GET] /chat/:roomChatId
module.exports.index = async (req, res) => {
    const roomChatId = req.params.roomChatId;

    // Socket IO
    chatSocket(req, res);
    // Socket IO
        
    // Lay data trong database
    const chats = await Chat.find({
        room_chat_id: roomChatId,
        deleted: false
    });

    for (const key of chats) {
        const infoUser = await User.findOne({
            _id: key.user_id,
            deleted: false,
        })
        key.fullName = infoUser.fullName
    }
    // Lay data trong database
    res.render("client/pages/chat/index.pug", {
        pageTitle: "Chat",
        chats: chats,
    });
}
