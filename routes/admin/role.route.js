const express = require("express");
const validates = require("../../validates/admin/product.validate.js")

const controller = require("../../controllers/admin/role.controller.js");

const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create",
validates.createPost
, controller.createPost);

module.exports = router;