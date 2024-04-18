

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

// Sort

const sort = document.querySelector("[sort]");
if (sort){
    let url = new URL(location.href);
    const sortSelect = sort.querySelector("[sort-select]");
    sortSelect.addEventListener("change", () => {
        const [sortKey, sortValue] = sortSelect.value.split("-");
        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);
        location.href = url.href;
    })
    const selectedSortKey = url.searchParams.get("sortKey");
    const selectedSortValue = url.searchParams.get("sortValue");
    if(selectedSortKey && selectedSortValue){
        const stringSort = selectedSortKey + "-" + selectedSortValue;
        const optionSelected = sortSelect.querySelector(`option[value='${stringSort}'`);
        optionSelected.selected = true;

    }
}

const sortClear = document.querySelector("[sort-clear]");
if(sortClear){
    let url = new URL(location.href);
    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        location.href = url.href;
    })
}
// Sort

// button-submit-permissions cho phan quyen

const buttonSubmitPermissions = document.querySelector('[button-submit-permissions]');

if (buttonSubmitPermissions) {
    buttonSubmitPermissions.addEventListener("click", () => {
        const roles = [];
        const tablePermissions = document.querySelector('[table-permissions]');
        const rows = tablePermissions.querySelectorAll("tbody tr[data-name]");
        rows.forEach((row, index) => {
            const dataName = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");
            if (dataName == "id"){
                inputs.forEach((input) => {
                    const id = input.value;
                    roles.push({
                        id: id,
                        permissions: []
                    })
                })
            }
            else {
                inputs.forEach((input, index) => {
                    const inputCheck = input.checked;
                    if (inputCheck){
                        roles[index].permissions.push(dataName);
                    }
                })
            }
        })
        console.log(roles)
        if (roles.length > 0){
            const formChangePermissions = document.querySelector("[form-change-permissions ]");
            const inputRole = formChangePermissions.querySelector("input");
            inputRole.value = JSON.stringify(roles);
            formChangePermissions.submit()
        }
    })
}
// button-submit-permissions cho phan quyen


// Data default

const dataRecords = document.querySelector("[data-records]");
if (dataRecords){
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    const tablePermissions = document.querySelector("[table-permissions]");
    records.forEach((record, index) => {
        const permissions = record.permissions;
        permissions.forEach((role) => {
            const rows = tablePermissions.querySelectorAll(`tr[data-name="${role}"]`);
            rows.forEach((row) => {
                const inputs = row.querySelectorAll(`input`);
                inputs[index].checked = true
            })
        })
    })
}

// Data default