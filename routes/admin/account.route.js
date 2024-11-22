const express = require("express");

const multer = require('multer');
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js")

const upload = multer();

const validate = require("../../validates/admin/accout.validate.js");


const controller = require("../../controllers/admin/account.controller.js");

const router = express.Router();

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", 
upload.single('avatar'), 
uploadCloud.uploadSingle,
validate.createPost,
controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", 
upload.single('avatar'), 
uploadCloud.uploadSingle,
validate.editPatch,
controller.editPatch
);

router.patch("/delete/:id", controller.delete)

module.exports = router;