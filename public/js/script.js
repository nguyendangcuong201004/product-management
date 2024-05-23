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