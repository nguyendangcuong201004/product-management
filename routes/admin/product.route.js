const express = require("express");

const controller = require("../../controllers/admin/product.controller.js");

const router = express.Router();

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);


router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteProducts);


module.exports = router;