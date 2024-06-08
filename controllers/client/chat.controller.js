const Chat = require("../../models/chat.model.js");
const User = require("../../models/user.model.js");

// [GET] /chat
module.exports.index = async (req, res) => {
    const userId = res.locals.user.id;
    const userFullName = res.locals.user.fullName;

    _io.once('connection', (socket) => {
        console.log("Có một user đang kết nối đến server")

        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
            const chat = new Chat({
                user_id: userId,
                content: data,
            });

            
            await chat.save()


            _io.emit("SERVER_RETURN_MESSAGE", {
                user_id: userId,
                content: data,
                fullName: userFullName
            })
        })

    })

    const chats = await Chat.find({
        deleted: false,
    })

    for (const chat of chats){
        const user = await User.findOne({
            _id: chat.user_id,
        })
        chat.fullName = user.fullName
    }

    res.render("client/pages/chat/index.pug", {
        pageTitle: "Chat",
        chats: chats
    });
}