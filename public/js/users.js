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
    // Lấy thông tin để render trong trang lời mời kết bạn
    const dataUsersAccept = document.querySelector(`[data-users-accept="${data.userId}"]`)
    if (dataUsersAccept){
        const exitUser = dataUsersAccept.querySelector(`[user-id="${data.infoUserSend._id}"]`)
        if (!exitUser){
            const newBoxUser = document.createElement("div");
            newBoxUser.classList.add("col-6");
            newBoxUser.setAttribute("user-id", data.infoUserSend._id)
            newBoxUser.innerHTML = `
            <div class="box-user">
            <div class="inner-avatar"><img src="https://i.imgur.com/ttyjQxs.jpeg" alt="avatat"></div><div class="inner-info"><div class="inner-name">${data.infoUserSend.fullName}</div><div class="inner-buttons"><button class="btn btn-sm btn-primary mr-1" btn-accept-friend="${data.infoUserSend._id}">Chấp nhận</button><button class="btn btn-sm btn-secondary mr-1" btn-refuse-friend="${data.infoUserSend._id}">Xóa  </button><button class="btn btn-sm btn-secondary mr-1" btn-delete-friend="${data.infoUserSend._id}">Đã xóa</button><button class="btn btn-sm btn-primary mr-1" btn-accepted-friend="${data.infoUserSend._id}">Bạn bè</button></div></div></div>
            `;
            dataUsersAccept.appendChild(newBoxUser);
            const btnRefuseFriend = newBoxUser.querySelector("[btn-refuse-friend]");
            deleteUser(btnRefuseFriend)
            const btnAccpetFriend = newBoxUser.querySelector("[btn-accept-friend]");
            accpetUser(btnAccpetFriend)
        }
    }

    // Xoá người vừa gửi khỏi trang danh sách người dùng
    const dataUsersNotFriend = document.querySelector(`[data-users-not-friend="${data.userId}"]`);
    if (dataUsersNotFriend){
        const exitUser = dataUsersNotFriend.querySelector(`[user-id="${data.infoUserSend._id}"]`)
        if (exitUser){
            dataUsersNotFriend.removeChild(exitUser);
        }
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


// SERVER_RETURN_STATUS_ONLINE
socket.on("SERVER_RETURN_STATUS_ONLINE", (data) => {
    const dataUsersFriend = document.querySelector(`[data-users-friend`)
    if (dataUsersFriend){
        const boxUser = dataUsersFriend.querySelector(`[user-id="${data.userId}"]`);
        if (boxUser){
            const boxInnerStatus = boxUser.querySelector(".inner-status");
            boxInnerStatus.setAttribute("status", data.statusOnline);                                                   
        }
    }
})
// SERVER_RETURN_STATUS_ONLINE

// SERVER_RETURN_STATUS_OFFLINE
socket.on("SERVER_RETURN_STATUS_OFFLINE", (data) => {
    const dataUsersFriend = document.querySelector(`[data-users-friend`)
    if (dataUsersFriend){
        const boxUser = dataUsersFriend.querySelector(`[user-id="${data.userId}"]`);
        if (boxUser){
            const boxInnerStatus = boxUser.querySelector(".inner-status");
            boxInnerStatus.setAttribute("status", data.statusOnline);                                                   
        }
    }
})
// SERVER_RETURN_STATUS_OFFLINE