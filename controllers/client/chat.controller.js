const Chat = require("../../models/chat.model.js");
const User = require("../../models/user.model.js");

// [GET] /chat
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    const userFullName = res.locals.user.fullName;
    
    _io.once('connection', (socket) => {
        console.log('Có 1 user đang kết nối')
        // CLIENT_SEND_MESSAGE
        socket.on("CLIENT_SEND_MESSAGE", async (content) => {
            const chat = new Chat({
                user_id: userId,
                // room_chat_id: String,
                content: content,
                // images: Array,
            })
            // Luu vào database 
            await chat.save();
            // Trả data realtime về client
            _io.emit("SERVER_RETURN_MESSAGE", {
                user_id: userId,
                content: content,
                userFullName: userFullName
            })
        })
        // CLIENT_SEND_MESSAGE

        // CLIENT_SEND_TYPING
        socket.on("CLIENT_SEND_TYPING", (type) => {
            socket.broadcast.emit("SERVER_RETURN_TYPING", {
                userId: userId,
                userFullName: userFullName,
                type: type
            })
        })
        // CLIENT_SEND_TYPING
    })

    // Lay data trong database
    const chats = await Chat.find({
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