

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
        if (listInputChecked.length > 0){
            const ids = [];
            listInputChecked.forEach((item) => {
                const id = item.value;
                ids.push(id);
            })
            const inputIDS = document.querySelector("[name='ids']");
            console.log(inputIDS);
            inputIDS.value = ids.join(", ");
            formChangeMulti.submit()
            
        }
        else {
            alert("Vui lòng sản phẩm!");
        }
    })
}