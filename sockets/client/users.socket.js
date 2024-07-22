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

        })
        // Từ chối lời mời kết bạn
    })
}
