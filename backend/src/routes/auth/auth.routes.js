const express = require("express");
const router = express.Router();

const authCtrl = require("../../controllers/auth/auth.controller");
const authMid = require("../../middleware/mid.auth");
const asyncHandler = require("../../middleware/mid.asyncHandler");

router.post("/login", asyncHandler(authCtrl.login));
router.post("/logout", asyncHandler(authCtrl.logout));
router.get("/me", authMid, asyncHandler(authCtrl.me));

module.exports = router;