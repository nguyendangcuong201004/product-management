const express = require("express");
const route = require("./routes/client/index.route.js");
const dotenv = require("dotenv");
const database = require("./config/database.js");

dotenv.config();

database.connect();


const app = express();

app.set("views", "./views");
app.set('view engine', 'pug');

app.use(express.static('public'))

const port = process.env.PORT;

route(app);



app.listen(port, () => {
    console.log(`Chay tren cong ${port}`);
})