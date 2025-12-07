const express = require("express");
const router = express.Router();
const searchController = require("../../controllers/film/film.search.controller");

// /api/films/search?term=abc&page=1
router.get("/search", searchController.searchFilmsByTerm);

module.exports = router;
