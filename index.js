const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
    res.send("Nguyen Dang Cuong");
})

app.get("/products", (req, res) => {
    res.send("Nguyen Dang Cuong - Trang danh sach san pham")
})

app.listen(port, () => {
    console.log(`Chay tren cong ${port}`);
})