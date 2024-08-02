const User = require("../../models/user.model.js");


module.exports = async (req, res) => {

    const userIdSend = res.locals.user.id;

    _io.once('connection', (socket) => {
        // Gửi yêu câù kết bạn
        socket.on("CLIENT_ADD_FRIEND", async (data) => {

            // Thêm id người gửi vào accept friend của người nhận
            const exitSend = await User.findOne({
                _id: data.userIdRecieve,
                acceptFriends: userIdSend
            })
            if (!exitSend){
                await User.updateOne({
                    _id: data.userIdRecieve,
                }, {
                    $push: { acceptFriends: userIdSend }
                }) 
            }

            // Thêm id người nhận vào request friend của người gửi 
            const exitRecieve = await User.findOne({
                _id: userIdSend,
                requestFriends: data.userIdRecieve
            })
            if (!exitRecieve){
                await User.updateOne({
                    _id: userIdSend
                }, {
                    $push: { requestFriends: data.userIdRecieve}
                })
            }

            // Lấy độ dài accept Friend của người nhận lời mời kết bạn
            const infoUser = await User.findOne({
                _id: data.userIdRecieve
            })
            const lengthAccpetFriends = infoUser.acceptFriends.length;
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                lengthAccpetFriends: lengthAccpetFriends,
                userId: data.userIdRecieve
            });

            // Lấy thông tin của người gửi trả về cho người nhận 
            const infoUserSend = await User.findOne({
                _id: userIdSend,
                status: "active",
                deleted: false
            }).select("fullName avatar")
            socket.broadcast.emit("SERVER_RETURN_INFO_ACCEPT_FRIEND", {
                userId: data.userIdRecieve,
                infoUserSend: infoUserSend
            })

        })
        // Gửi yêu câù kết bạn

        // Thu hồi lời mời kết bạn
        socket.on("CLIENT_CANCEL_FRIEND", async (userIdRecieve) => {
            // Xóa id của người gửi trong accept friend của người nhận
            const exitRecieve = await User.find({
                _id: userIdRecieve,
                acceptFriends: userIdSend,
            });
            if (exitRecieve){
                await User.updateOne({
                    _id: userIdRecieve
                }, {
                    $pull: { acceptFriends: userIdSend }
                })
            }

            // Xóa id của người nhận trong request friend của người gửi 
            const exitSend = await User.find({
                _id: userIdSend,
                acceptFriends: userIdRecieve,
            });
            if (exitRecieve){
                await User.updateOne({
                    _id: userIdSend
                }, {
                    $pull: { requestFriends: userIdRecieve }
                })
            }
            const infoUser = await User.findOne({
                _id: userIdRecieve
            })
            const lengthAccpetFriends = infoUser.acceptFriends.length;
            socket.broadcast.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                lengthAccpetFriends: lengthAccpetFriends,
                userId: userIdRecieve
            });
            // Lấy id của người thu hồi trả về cho người nhận lời mời trước đó 
            socket.broadcast.emit("SERVER_RETURN_CANCEL_FRIEND", {
                userIdSend: userIdSend,
                userIdRecieve: userIdRecieve
            });

        })
        // Thu hồi lời mời kết bạn

        // Từ chối lời mời kết bạn
        socket.on("CLIENT_REFUSE_FRIEND", async (data) => { // Bị ngược
            const userIdRefuse = userIdSend;
            const userIdMake = data;
            
            await User.updateOne({
                _id: userIdRefuse
            }, {
                $pull: { acceptFriends: userIdMake }
            })

            await User.updateOne({
                _id: userIdMake
            }, {
                $pull: { requestFriends: userIdRefuse }
            })

            const infoUser = await User.findOne({
                _id: userIdRefuse
            })
            const lengthAccpetFriends = infoUser.acceptFriends.length;
            socket.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                lengthAccpetFriends: lengthAccpetFriends,
                userId: userIdRefuse
            });
        })
        // Từ chối lời mời kết bạn

        // Chấp nhận lời mời kết bạn
        socket.on("CLIENT_ACCEPT_FRIEND", async (data) => {
            const userIdAccept = userIdSend;
            const userIdMake = data;
            // Thêm vào các friend list tương ứng và xóa khỏi accept, request 
            await User.updateOne({
                _id: userIdAccept
            }, {
                $push: { friendsList: {
                    user_id: userIdMake,
                    room_chat_id: "",
                } },
                $pull: { acceptFriends: userIdMake }
            })

            await User.updateOne({
                _id: userIdMake
            }, {
                $push: { friendsList: {
                    user_id: userIdAccept,
                    room_chat_id: "",
                } },
                $pull: { requestFriends: userIdAccept }
            })

            const infoUser = await User.findOne({
                _id: userIdAccept
            })
            const lengthAccpetFriends = infoUser.acceptFriends.length;
            socket.emit("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", {
                lengthAccpetFriends: lengthAccpetFriends,
                userId: userIdAccept
            });
        })
        // Chấp nhận lời mời kết bạn
    })
}
