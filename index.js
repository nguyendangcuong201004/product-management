const express = require("express");
const route = require("./routes/client/index.route.js");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.set("views", "./views");
app.set('view engine', 'pug');

const port = process.env.PORT;

route(app);



app.listen(port, () => {
    console.log(`Chay tren cong ${port}`);
})