const express = require("express");
const http = require('http');
const routeClient = require("./routes/client/index.route.js");
const dotenv = require("dotenv");
const database = require("./config/database.js");
const routeAdmin = require("./routes/admin/index.route.js");
const systemConfig = require("./config/system.js");
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const moment = require("moment");
const { Server } = require("socket.io");

dotenv.config();

database.connect();


const app = express();

const server = http.createServer(app);
const io = new Server(server);
global._io = io;

// Flash
app.use(cookieParser('NDCNDTN'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash

/* New Route to the TinyMCE Node module */
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));

app.set("views", `${__dirname}/views`);
app.set('view engine', 'pug');

app.use(express.static(`${__dirname}/public`))

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT;

app.locals.prefixAdmin = systemConfig;
app.locals.moment = moment;

routeClient(app);
routeAdmin(app);


app.get("*", (req, res) => {
    res.render("client/pages/errors/404.pug", {
        pageTitle: "404 Not Found"  
    })
})



server.listen(port, () => {
    console.log(`Chay tren cong ${port}`);
})