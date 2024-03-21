const express = require("express");

const app = express();

app.set("views", "./views");
app.set('view engine', 'pug');

const port = 3000;

app.get("/", (req, res) => {
    res.render("client/pages/home/index.pug");
})

app.get("/products", (req, res) => {
    res.render("client/pages/products/index.pug");
})

app.listen(port, () => {
    console.log(`Chay tren cong ${port}`);
})