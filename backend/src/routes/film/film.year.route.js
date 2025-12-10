const express = require("express");
const router = express.Router();
const yearController = require("../../controllers/film/film.year.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");

router.get("/by-year", authMiddleware, yearController.getTitlesByYear);

module.exports = router;
