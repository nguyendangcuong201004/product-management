const RoomsChat = require("../../models/rooms-chat.model.js");


module.exports.isAccess = async (req, res, next) => {
    const roomChatId = req.params.roomChatId;
    const userId = res.locals.user.id;

    const userInRoomChat = await RoomsChat.findOne({
        _id: roomChatId,
        "users.user_id": userId,
        deleted: false,
    })

    if (!userInRoomChat){
        res.redirect("client/pages/errors/404.pug");
        return;
    }

    next();
}