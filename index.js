const express = require("express");
const route = require("./routes/client/index.route.js");

const app = express();

app.set("views", "./views");
app.set('view engine', 'pug');

const port = 3000;

route(app);



app.listen(port, () => {
    console.log(`Chay tren cong ${port}`);
})