const express = require("express");
const router = express.Router();
const searchController = require("../../controllers/film/film.search.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");

// /api/films/search?term=abc&page=1
router.get("/search", authMiddleware, searchController.searchFilmsByTerm);

module.exports = router;
