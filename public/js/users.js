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
const deleteUser = (button) => {
    button.addEventListener("click", () => {
        button.closest(".box-user").classList.add("refuse");
        const userIdSend = button.getAttribute("btn-refuse-friend");
        socket.emit("CLIENT_REFUSE_FRIEND", userIdSend)
    })
}

const listBtnRefuseFriend = document.querySelectorAll("[btn-refuse-friend]");
if (listBtnRefuseFriend.length > 0){
    listBtnRefuseFriend.forEach((button) => {
        deleteUser(button)
    })
}
// Từ chối kết bạn

// Chấp nhận lời mời kết bạn
const accpetUser = (button) => {
    button.addEventListener("click", () => {
        button.closest(".box-user").classList.add("accepted");
        const userIdSend = button.getAttribute("btn-accept-friend");
        socket.emit("CLIENT_ACCEPT_FRIEND", userIdSend);
    })
}

const listBtnAccpetFriend = document.querySelectorAll("[btn-accept-friend]");
if (listBtnAccpetFriend.length > 0){
    listBtnAccpetFriend.forEach((button) => {
        accpetUser(button)
    })
}
// Chấp nhận lời mời kết bạn

// SERVER_RETURN_LENGTH_ACCEPT_FRIEND
socket.on("SERVER_RETURN_LENGTH_ACCEPT_FRIEND", (data) => {
    const badgeUserAccpet = document.querySelector(`[badge-user-accpet="${data.userId}"]`);
    badgeUserAccpet.innerHTML = data.lengthAccpetFriends
})
// SERVER_RETURN_LENGTH_ACCEPT_FRIEND

// SERVER_RETURN_INFO_ACCEPT_FRIEND
socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND", (data) => {
    const dataUsersAccept = document.querySelector(`[data-users-accept="${data.userId}"]`)
    if (dataUsersAccept){
        const newBoxUser = document.createElement("div");
        newBoxUser.classList.add("col-6");
        newBoxUser.setAttribute("user-id", data.infoUserSend._id)
        newBoxUser.innerHTML = `
        <div class="box-user">
        <div class="inner-avatar"><img src="https://cdn.discordapp.com/attachments/1261618265025679461/1266753883322187776/avatar.jpg?ex=66a64bfc&amp;is=66a4fa7c&amp;hm=bbb3c1bd81f250e43e2714b4134312ae46a9e0ffccb7d8111510108ccc1f5e74&amp;" alt="avatat"></div><div class="inner-info"><div class="inner-name">${data.infoUserSend.fullName}</div><div class="inner-buttons"><button class="btn btn-sm btn-primary mr-1" btn-accept-friend="${data.infoUserSend._id}">Chấp nhận</button><button class="btn btn-sm btn-secondary mr-1" btn-refuse-friend="${data.infoUserSend._id}">Xóa  </button><button class="btn btn-sm btn-secondary mr-1" btn-delete-friend="${data.infoUserSend._id}">Đã xóa</button><button class="btn btn-sm btn-primary mr-1" btn-accepted-friend="${data.infoUserSend._id}">Bạn bè</button></div></div></div>
        `;
        dataUsersAccept.appendChild(newBoxUser);
        const btnRefuseFriend = newBoxUser.querySelector("[btn-refuse-friend]");
        deleteUser(btnRefuseFriend)
        const btnAccpetFriend = newBoxUser.querySelector("[btn-accept-friend]");
        accpetUser(btnAccpetFriend)
    }

})
// SERVER_RETURN_INFO_ACCEPT_FRIEND


// SERVER_RETURN_CANCEL_FRIEND
socket.on("SERVER_RETURN_CANCEL_FRIEND", (data) => {
    const dataUsersAccept = document.querySelector(`[data-users-accept="${data.userIdRecieve}"]`)
    if (dataUsersAccept){
        const boxUser = document.querySelector(`[user-id="${data.userIdSend}"]`)
        dataUsersAccept.removeChild(boxUser)
    }
 
    
})
// SERVER_RETURN_CANCEL_FRIEND
