const express = require("express");
const router = express.Router();
const detailController = require("../../controllers/film/film.detail.controller");

// GET /api/films/detail/tt1457767
router.get("/detail/:id", detailController.getFilmFullDetail);

module.exports = router;
