const Chat = require("../../models/chat.model.js");
const uploadToCloudiary = require("../../helpers/uploadToCloudiary.helper.js");


module.exports = async (req, res) => {

    const userId = res.locals.user.id;
    const userFullName = res.locals.user.fullName;
    const roomChatId = req.params.roomChatId;

    _io.once('connection', (socket) => {
        console.log('Có 1 user đang kết nối')
        // Thêm user vào room chat
        socket.join(roomChatId);

        // CLIENT_SEND_MESSAGE
        socket.on("CLIENT_SEND_MESSAGE", async (data) => {
            console.log(userFullName)
            console.log(data);
            const images = [];
            if (data.images.length > 0) {
                for (const image of data.images) {
                    const linkImage = await uploadToCloudiary(image);
                    images.push(linkImage);
                }
            }
            console.log(images);
            const chat = new Chat({
                user_id: userId,
                room_chat_id: roomChatId,
                content: data.content,
                images: images,
            })
            // Luu vào database 
            await chat.save();
            // Trả data realtime về client
            _io.to(roomChatId).emit("SERVER_RETURN_MESSAGE", {
                user_id: userId,
                content: data.content,
                images: images,
                userFullName: userFullName
            })
        })
        // CLIENT_SEND_MESSAGE

        // CLIENT_SEND_TYPING
        socket.on("CLIENT_SEND_TYPING", (type) => {
            socket.broadcast.to(roomChatId).emit("SERVER_RETURN_TYPING", {
                userId: userId,
                userFullName: userFullName,
                type: type
            })
        })
        // CLIENT_SEND_TYPING
    })

}