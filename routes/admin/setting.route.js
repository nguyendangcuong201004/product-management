const express = require("express");
const multer = require('multer'); // up anh
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware.js")

const controller = require("../../controllers/admin/setting.controller.js");

const router = express.Router();

const upload = multer();

router.get("/general", controller.general)

router.patch("/general", 
    upload.single('logo'), 
    uploadCloud.uploadSingle,
    controller.generalPatch
    );
    

module.exports = router;