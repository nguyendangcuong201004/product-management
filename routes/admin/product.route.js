const express = require("express");

const controller = require("../../controllers/admin/product.controller.js");

const router = express.Router();

router.get("/", controller.index);
router.get("/:status/:id", controller.changeStatus);

module.exports = router;