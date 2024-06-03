const express = require("express");

const controller = require("../../controllers/client/user.controller.js");
const userMiddleware = require("../../middlewares/client/user.middleware.js");
const authenMiddleware = require("../../middlewares/client/authen.middleware.js");

const router = express.Router();


router.get("/register", controller.register);

router.post("/register", controller.registerPost);

router.get("/login", controller.login);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);

router.get("/password/forgot", controller.forgotPassword);

router.post("/password/forgot", controller.forgotPasswordPost);

router.get("/password/otp", controller.otpPassword);

router.post("/password/otp", controller.otpPasswordPost);

router.get("/password/reset", controller.resetPassword);

router.post("/password/reset", controller.resetPasswordPost);

router.get("/info", authenMiddleware.requireAuth, controller.info);

module.exports = router;