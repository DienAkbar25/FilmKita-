const express = require("express");
const router = express.Router();
const genreController = require("../../controllers/film/film.genre.controller");

// GET /api/films/by-genre?genre=Drama&page=1
router.get("/by-genre", genreController.getFilmsByGenre);

module.exports = router;
