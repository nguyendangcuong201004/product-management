// Gửi lời mời kết bạn
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]");

if(listBtnAddFriend.length > 0){
    listBtnAddFriend.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("add");
            const userIdRecieve = button.getAttribute("btn-add-friend");
            socket.emit("CLIENT_ADD_FRIEND", {
                userIdRecieve: userIdRecieve
            })
        })
    })
}
//  Gửi lời mời kết bạn

// Thu hồi lời mời
const listBtnCancelFriends = document.querySelectorAll("[btn-cancel-friend]");

if (listBtnCancelFriends.length > 0){
    listBtnCancelFriends.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.remove("add");
            const userIdRecieve = button.getAttribute("btn-cancel-friend");
            socket.emit("CLIENT_CANCEL_FRIEND", userIdRecieve)
        })
    })
}
// Thu hồi lời mời

// Từ chối kết bạn
const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0){
    listBtnRefuseFriend.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("refuse");
            const userIdSend = button.getAttribute("btn-refuse-friend");
            socket.emit("CLIENT_REFUSE_FRIEND", userIdSend)
        })
    })
}
// Từ chối kết bạn

// Chấp nhận lời mời kết bạn
const listBtnAccpetFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAccpetFriend.length > 0){
    listBtnAccpetFriend.forEach((button) => {
        button.addEventListener("click", () => {
            button.closest(".box-user").classList.add("accepted");
            const userIdSend = button.getAttribute("btn-accept-friend");
            socket.emit("CLIENT_ACCEPT_FRIEND", userIdSend);
        })
    })
}
// Chấp nhận lời mời kết bạn