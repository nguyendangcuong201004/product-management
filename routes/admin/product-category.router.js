const express = require("express");
const multer = require('multer');
const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js")

const controller = require("../../controllers/admin/product-category.controller.js");

const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", 
upload.single('thumbnail'), 
uploadCloud.uploadSingle,
controller.createPost);

module.exports = router;