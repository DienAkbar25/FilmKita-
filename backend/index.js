require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();


<<<<<<< Updated upstream
=======
// CORS (UNTUK FRONTEND)
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// parser JSON (WAJIB DI ATAS)
>>>>>>> Stashed changes
app.use(express.json());

app.use(
  session({
    name: "filmkita.sid",
    secret: process.env.SESSION_SECRET || "filmkita_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax"
    }
  })
);

const dashboardRoutes = require("./src/routes/dashboard/dashboard.routes");
const filmRoutes = require("./src/routes/film/film.routes");
const filmSearchRoutes = require("./src/routes/film/film.search.routes");
const filmGenreRoutes = require("./src/routes/film/film.genre.routes");
const filmYearRoutes = require("./src/routes/film/film.year.route");
const filmDetailRoutes = require("./src/routes/film/film.detail.routes");
const authRoutes = require("./src/routes/auth/auth.routes");

app.use("/api/auth", authRoutes);

app.use("/api/films", filmDetailRoutes);
app.use("/api/films", filmSearchRoutes);
app.use("/api/films", filmRoutes);
app.use("/api/films", filmGenreRoutes);
app.use("/api/films", filmYearRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use((err, req, res, next) => {
  console.error("EXPRESS ERROR:", err);

  res.status(err.status || 500).json({
    msg: "Internal Server Error",
    error: err.message
  });
});

/* =========================
   SERVER
========================= */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
