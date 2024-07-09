import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'


// Show alert

const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
    const time = showAlert.getAttribute("data-time");
    setTimeout(() => {
        showAlert.classList.add("alert-hidden")
    }, parseInt(time))
}

// Close alert
const closeAlert = document.querySelector("[close-alert]");
if (closeAlert) {
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden")
    })
}


// Thay đổi số lượng sản phâm trong trang giỏ hàng - Bang gio hang

const tableCart = document.querySelector("[table-cart]");
if (tableCart) {
    const inputQuantity = document.querySelectorAll("input[item-id]");

    if (inputQuantity.length > 0) {
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


// CLIENT SEND MESSAGE

const formSendData = document.querySelector(".chat .inner-form");

if (formSendData){
    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = formSendData.content.value;

        if (content){
            socket.emit("CLIENT_SEND_MESSAGE", content);
            formSendData.content.value = ""
        }
    })
}
// CLIENT SEND MESSAGE

// SERVER_RETURN_MESSAGE

socket.on("SERVER_RETURN_MESSAGE", (data) => {
    const body = document.querySelector(".chat .inner-body");
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    console.log(myId);
    console.log(data)

    const div = document.createElement("div");

    let htmlFullName = '';
    
    if(myId == data.user_id) {
        div.classList.add("inner-outgoing");
    }
    else {
        div.classList.add("inner-incoming");
        htmlFullName = `<div class="inner-name">${data.userFullName}</div>`;
    }

    div.innerHTML = `
        ${htmlFullName}
        <div class="inner-content">${data.content}</div>
    `;

    body.appendChild(div);
})

// SERVER_RETURN_MESSAGE


// Scroll chat to bottom

const chatBody = document.querySelector(".chat .inner-body");
if (chatBody){
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Scroll chat to bottom

// Show tooltip emoji
const buttonIcon = document.querySelector(".chat .inner-form .button-icon");
if (buttonIcon){
    const tooltip = document.querySelector('.tooltip');
    Popper.createPopper(buttonIcon, tooltip);
    buttonIcon.onclick = () => {
        tooltip.classList.toggle('shown')
      }
}
// Show tooltip emoji


// Emoji Picker
const emojiPicker = document.querySelector('emoji-picker');

if (emojiPicker){
    emojiPicker.addEventListener('emoji-click', event => {
        const icon = event.detail.unicode;
        const inputChat = document.querySelector(".chat .inner-form input[name='content']");
        inputChat.value = inputChat.value + icon;
    });
}
// Emoji Picker