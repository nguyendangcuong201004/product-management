const express = require("express");

const controller = require("../../controllers/client/chat.controller.js");

const router = express.Router();

router.get("/:roomChatId", controller.index);

module.exports = router;