
// [GET] /user/not-friend
module.exports.notFriend = async (req, res) => {
    

    res.render("client/pages/users/not-friend.pug", {
        pageTitle: "Danh sách người dùng"
    })
}