const express = require("express");

const controller = require("../../controllers/client/cart.controller.js");

const router = express.Router();

router.get("/", controller.index);

router.post("/add/:productId", controller.addPost);

router.get("/delete/:productId", controller.deleteProduct);


router.get("/update/:productId/:quantity", controller.updateProduct);



module.exports = router;