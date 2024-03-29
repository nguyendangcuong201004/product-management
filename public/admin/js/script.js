const listButtonStatus = document.querySelectorAll("[button-status]");

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