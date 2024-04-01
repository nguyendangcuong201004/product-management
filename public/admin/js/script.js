

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