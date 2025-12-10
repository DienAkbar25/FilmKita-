const express = require("express");
const { AuthController } = require("../../controllers/auth/auth.controller");
const router = express.Router();

router.post("/auth/login", AuthController.login);
router.post("/auth/register", AuthController.register);

module.exports = router;
