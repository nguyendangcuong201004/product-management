// Add Friend

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

// Add Friend

// Delete Request Friend

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

// Delete Request Friend