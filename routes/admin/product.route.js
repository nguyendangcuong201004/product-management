const express = require("express");
const multer = require('multer');
const router = express.Router();
const storage = require("../../helpers/storage.helper.js");

const upload = multer({ storage: storage })


const controller = require("../../controllers/admin/product.controller.js");
const validate = require("../../validates/admin/product.validate.js");

router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteProducts);

router.get("/create", controller.create);

router.post("/create", upload.single('thumbnail'), validate.createPost ,controller.createPost);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", upload.single('thumbnail'), validate.createPost ,controller.editPatch);

router.get("/detail/:id", controller.detail)

module.exports = router;