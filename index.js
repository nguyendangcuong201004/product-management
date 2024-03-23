const express = require("express");
const routeClient = require("./routes/client/index.route.js");
const dotenv = require("dotenv");
const database = require("./config/database.js");
const routeAdmin = require("./routes/admin/index.route.js");

dotenv.config();

database.connect();


const app = express();

app.set("views", "./views");
app.set('view engine', 'pug');

app.use(express.static('public'))

const port = process.env.PORT;

routeClient(app);
routeAdmin(app);



app.listen(port, () => {
    console.log(`Chay tren cong ${port}`);
})