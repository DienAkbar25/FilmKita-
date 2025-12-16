const express = require("express");
const router = express.Router();

const authCtrl = require("../../controllers/auth/auth.controller");
const authMid = require("../../middleware/mid.auth");
const loginLimiter = require("../../middleware/mid.loginRatelimit");


router.post("/login", loginLimiter, authCtrl.login);
router.post("/logout", authCtrl.logout);
router.get("/me", authMid, authCtrl.me);

module.exports = router;
