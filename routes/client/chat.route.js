const express = require("express");

const controller = require("../../controllers/client/chat.controller.js");
const chatMiddleware = require("../../middlewares/client/chat.middleware.js");

const router = express.Router();

router.get("/:roomChatId", chatMiddleware.isAccess ,controller.index);

module.exports = router;