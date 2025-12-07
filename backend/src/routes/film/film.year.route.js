const express = require("express");
const router = express.Router();
const yearController = require("../../controllers/film/film.year.controller");

router.get("/by-year", yearController.getTitlesByYear);

module.exports = router;
