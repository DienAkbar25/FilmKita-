const express = require("express");
const router = express.Router();
const filmController = require("../../controllers/film/film.controller");
const { authMiddleware } = require("../../middleware/auth.middleware");

// GET /api/films
router.get("/", authMiddleware, filmController.getAllFilms);

module.exports = router;
