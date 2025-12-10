const express = require("express");
const { AuthController } = require("../../controllers/auth/auth.controller");
const router = express.Router();

router.post("/auth/session", AuthController.getSession);
