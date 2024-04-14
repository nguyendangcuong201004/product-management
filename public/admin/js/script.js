

const listButtonStatus = document.querySelectorAll("[button-status]");


// Tim kiem
if (listButtonStatus.length > 0){

    let url = new URL(location.href);

    listButtonStatus.forEach((item) => {
        item.addEventListener("click", () => {

            if (item.getAttribute("button-status") != ""){
                url.searchParams.set("status", item.getAttribute("button-status"));              
            }
            else {
                url.searchParams.delete("status");   
            }
            location.href = url.href;
        })
    })
}   


// Search

const formSearch = document.querySelector("#form-search");
if (formSearch){
    let url = new URL(location.href);

    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = e.target.elements.keyword.value.trim();
        if (value){
            url.searchParams.set("keyword", value);
        }
        else {
            url.searchParams.delete("keyword");
        }
        location.href = url.href;
    })
}

// Phan trang

const listButtonPagination = document.querySelectorAll("[button-pagination]");
if (listButtonPagination.length > 0){
    let url = new URL(location.href);
    listButtonPagination.forEach((item) => {
        item.addEventListener("click", () => {
            url.searchParams.set("page", item.getAttribute("button-pagination"));
            location.href = url.href;
        })
    })
}


// Button change status

const listButtonChangeStatus = document.querySelectorAll("[button-change-status]");

if (listButtonChangeStatus.length > 0){

    const formChangeStatus = document.querySelector("[form-change-status]");

    listButtonChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-id");
            const status = button.getAttribute("data-status");

            const path = formChangeStatus.getAttribute("data-patch");
    
            const action = path + `/${status}/${id}?_method=PATCH`;
    
            formChangeStatus.action = action;

            formChangeStatus.submit();

        });
    })
}


// Check box multi
const checkBoxMulti = document.querySelector("[checkbox-multi]");
if (checkBoxMulti) {
    const inputCheckAll = checkBoxMulti.querySelector("input[name=checkall]")
    const listInputCheckBox = checkBoxMulti.querySelectorAll("input[name=id]");
    

    inputCheckAll.addEventListener("click", () => {
        listInputCheckBox.forEach((item) => {
            item.checked = inputCheckAll.checked;
        })
    })

    listInputCheckBox.forEach((item) => {
        item.addEventListener("click", () => {
            const countInputChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked");
            if (countInputChecked.length == listInputCheckBox.length){
                inputCheckAll.checked = true;
            }
            else inputCheckAll.checked = false;
        })
    })
}


// form

const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti){
    formChangeMulti.addEventListener("submit", (event) => {
        event.preventDefault();
        const listInputChecked = document.querySelectorAll("input[name=id]:checked");
        const type = formChangeMulti.querySelector("select[name='type']");
        console.log(type.value);
        if (listInputChecked.length > 0){
            const ids = [];
            listInputChecked.forEach((item) => {
                const id = item.value;
                if (type.value == "change-position"){
                    const position = item.closest("tr").querySelector("input[name='position']");
                    ids.push(`${id}-${position.value}`);
                }
                else ids.push(id);
            })
            const inputIDS = document.querySelector("[name='ids']");
            inputIDS.value = ids.join(", ");
            if (type.value == "deleteAll"){
                if (!confirm("Bạn có chắc muốn xóa?")){
                    return;
                }
            }
            console.log(ids)
            formChangeMulti.submit();
        }
        else {
            alert("Vui lòng sản phẩm!");
        }
    })
}


// Delete

const listButtonDelete = document.querySelectorAll("[button-delete]");
if (listButtonDelete.length > 0){
    const formDeleteButton = document.querySelector("[form-delete-button]");
    listButtonDelete.forEach((button) => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này?")
            if (isConfirm){
                const id = button.getAttribute("data-id");

                const path = formDeleteButton.getAttribute("data-patch");
        
                const action = path + `/${id}?_method=DELETE`;
        
                formDeleteButton.action = action;

                formDeleteButton.submit();
            }
        })
    })
}


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


// Preview image 

const uploadImage = document.querySelector("[upload-image]");
if (uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
    
    uploadImageInput.addEventListener("change", () => {
        const file = uploadImageInput.files[0];
        if (file){
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
}

// Preview image 