const express = require("express");
const router = express.Router();
const genreController = require("../../controllers/film/film.genre.controller");

// GET /api/films/genre/:genre
router.get("/genre/:genre", genreController.getFilmsByGenre);

module.exports = router;
