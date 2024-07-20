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

    const upload = new FileUploadWithPreview.FileUploadWithPreview('upload-images', {
        multiple: true,
        maxFileCount: 6
    });

    formSendData.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = formSendData.content.value || "";
        const images = upload.cachedFileArray || [];

        if (content || images){
            socket.emit("CLIENT_SEND_MESSAGE", {
                content: content,
                images: images
            });
            formSendData.content.value = "";
            socket.emit("CLIENT_SEND_TYPING", "hidden");
            upload.resetPreviewPanel(); // clear all selected images
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
    let htmlImages = '';
    let htmlContent = '';

    if (data.content){
        htmlContent = `<div class="inner-content">${data.content}</div>`
    }

    if (data.images.length > 0){
        htmlImages = `<div class="inner-images">`;
        data.images.forEach((item) => {
            htmlImages += `<img src="${item}">`
        })
        htmlImages += `</div>`
    }
    
    if(myId == data.user_id) {
        div.classList.add("inner-outgoing");
    }
    else {
        div.classList.add("inner-incoming");
        htmlFullName = `<div class="inner-name">${data.userFullName}</div>`;
    }

    div.innerHTML = `
        ${htmlFullName}
        ${htmlContent}
        ${htmlImages}
    `;
    const elementListTyping = document.querySelector(".inner-list-typing");
    body.insertBefore(div, elementListTyping);

    new Viewer(div)
    
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


// Typing chat
var timeOut;
const inputChat = document.querySelector(".chat .inner-form input[name='content']");
if (inputChat){
    inputChat.addEventListener("keyup", (e) => {
        socket.emit("CLIENT_SEND_TYPING", "show");

        clearTimeout(timeOut);

        timeOut = setTimeout(() => {
            socket.emit("CLIENT_SEND_TYPING", "hidden");
        }, 5000)
    })
}
// Typing chat

// SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".inner-list-typing");
socket.on("SERVER_RETURN_TYPING", (data) => {
    if (data.type == "show"){
        const exitBoxTyping = document.querySelector(`.box-typing[user-id="${data.userId}"]`);
        if (!exitBoxTyping){
            const boxTyping = document.createElement("div");
            boxTyping.classList.add("box-typing");
            boxTyping.setAttribute("user-id", data.userId);
            boxTyping.innerHTML = `
            <div class="inner-name">${data.userFullName}</div>
            <div class="inner-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
            `;
        
            elementListTyping.appendChild(boxTyping);
        }
    }
    else {
        const exitBoxRemove = document.querySelector(`.box-typing[user-id="${data.userId}"]`);
        if (exitBoxRemove){
            elementListTyping.removeChild(exitBoxRemove);
        }
    }
    
})
// SERVER_RETURN_TYPING


// Preview Images

const bodyChat = document.querySelector(".chat .inner-body");
if (bodyChat){
    new Viewer(bodyChat);
}

// Preview Images