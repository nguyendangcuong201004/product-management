const express = require("express");

const controller = require("../../controllers/client/user.controller.js");
const userMiddleware = require("../../middlewares/client/user.middleware.js");

const router = express.Router();


router.get("/register", controller.register);

router.post("/register", controller.registerPost);

router.get("/login", controller.login);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);



module.exports = router;