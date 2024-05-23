const express = require("express");

const controller = require("../../controllers/client/cart.controller.js");

const router = express.Router();

router.post("/add/:productId", controller.addPost);

module.exports = router;