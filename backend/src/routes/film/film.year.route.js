const express = require("express");
const router = express.Router();
const yearController = require("../../controllers/film/film.year.controller");

// GET /api/films/year/:year
router.get("/year/:year", yearController.getFilmsByYear);

module.exports = router;
