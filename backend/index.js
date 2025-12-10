require("dotenv").config();
const express = require("express");
const app = express();


const filmRoutes = require("./src/routes/film/film.routes");
const filmSearchRoutes = require("./src/routes/film/film.search.routes");
const filmGenreRoutes = require("./src/routes/film/film.genre.routes");
const filmYearRoutes = require("./src/routes/film/film.year.route");
const filmDetailRoutes = require("./src/routes/film/film.detail.routes");

app.use("/api/films", filmDetailRoutes);
app.use("/api/films", filmSearchRoutes);
app.use("/api/films", filmRoutes);
app.use("/api/films", filmGenreRoutes);
app.use("/api/films", filmYearRoutes);

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
