const express = require("express");

const authMiddleware = require("../../middlewares/admin/auth.middleware.js")

const controller = require("../../controllers/admin/myAccount.controller.js");

const router = express.Router();

router.get("/", authMiddleware.requireAuth ,controller.index);

module.exports = router;