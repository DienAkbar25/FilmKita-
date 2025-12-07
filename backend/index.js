require("dotenv").config();
const express = require("express");
const app = express();


const filmRoutes = require("./src/routes/film/film.routes");
const filmSearchRoutes = require("./src/routes/film/film.search.routes");

app.use("/api/films", filmSearchRoutes);

app.use("/api/films", filmRoutes);

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
