// Show alert

const showAlert = document.querySelector("[show-alert]");
if (showAlert){
    const time = showAlert.getAttribute("data-time");
    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, parseInt(time))
}

// Close alert
const closeAlert = document.querySelector("[close-alert]");
if (closeAlert){
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden")
    })
}


// Thay đổi số lượng sản phâm trong trang giỏ hàng - Bang gio hang

const tableCart = document.querySelector("[table-cart]");
if (tableCart){
    const inputQuantity = document.querySelectorAll("input[item-id]");

    if (inputQuantity.length > 0){
        inputQuantity.forEach((input) => {
            input.addEventListener("change", () => {
                const quantity = input.value;
                const productId = input.getAttribute("item-id");
                
                window.location.href = `/cart/update/${productId}/${quantity}`
            })
        })
    }
}   

// Thay đổi số lượng sản phâm trong trang giỏ hàng


// Chat

const formChat = document.querySelector(".chat .inner-foot .inner-form");
if (formChat){
    formChat.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = formChat.content.value;
        if (content){
            socket.emit("CLIENT_SEND_MESSAGE", content)
            formChat.content.value = ""
        }
    })
}

// Chat

//SERVER_RETURN_MESSAGE

socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".inner-body");
    const div = document.createElement("div");
    if (myId == data.user_id){
        div.classList.add("inner-outgoing")
        div.innerHTML = `
        <div class="inner-content">${data.content}</div>
    `;
    }
    else {
        div.classList.add("inner-incoming")
        div.innerHTML = `
        <div class="inner-name">${data.fullName}</div>
        <div class="inner-content">${data.content}</div>
    `;
    }
    
    body.appendChild(div);
})

//SERVER_RETURN_MESSAGE

// scroll

const chatBody = document.querySelector(".inner-body");
if (chatBody){
    chatBody.scrollTop = chatBody.scrollHeight;
}

// scroll