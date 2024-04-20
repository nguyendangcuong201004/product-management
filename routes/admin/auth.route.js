const express = require("express");

const controller = require("../../controllers/admin/auth.controller.js");

const router = express.Router();

router.get("/login", controller.login);

router.post("/login", controller.loginPost);

module.exports = router;