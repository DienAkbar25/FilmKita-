const { sql, poolPromise } = require("../../config/db");
const asyncHandler = require("../../middleware/mid.asyncHandler");

// GET /api/dashboard/marketing?genre=Horror
exports.getDashboard = asyncHandler(async (req, res) => {
  const { genre } = req.query;
  const pool = await poolPromise;

  // =====================
  // VIEW (STATIS / GLOBAL)
  // =====================
  const [
    genreFilmCount,
    genreRating,
    contentQualityIndex,
    tayangPerNegara
  ] = await Promise.all([
    pool.request().query("SELECT * FROM dbo.vw_Genre_FilmCount"),
    pool.request().query("SELECT * FROM dbo.vw_Genre_Rating"),
    pool.request().query("SELECT * FROM dbo.vw_ContentQualityIndex"),
    pool.request().query("SELECT * FROM dbo.vw_Tayang_Per_Negara")
  ]);

  // =====================
  // EXEC (DINAMIS BY GENRE)
  // =====================
  let genreAnalysis = null;

  if (genre) {
    const [
      countGenre,
      ratingGenre,
      genreRatingByYear,
      viewGenreRatingByYear,
      top5CountryByGenre
    ] = await Promise.all([
      pool.request()
        .input("GenreName", sql.NVarChar, genre)
        .execute("dbo.Count_Genre"),

      pool.request()
        .input("GenreName", sql.NVarChar, genre)
        .execute("dbo.Rating_Genre"),

      pool.request()
        .input("GenreName", sql.NVarChar, genre)
        .execute("dbo.Genre_Rating_By_Year"),

      pool.request()
        .input("GenreName", sql.NVarChar, genre)
        .execute("dbo.View_Genre_Rating_By_Year"),

      // 🔥 SP BARU
      pool.request()
        .input("GenreName", sql.NVarChar, genre)
        .execute("dbo.Top5_Country_By_Genre_Performance")
    ]);

    genreAnalysis = {
      genre,
      countGenre: countGenre.recordset,
      ratingGenre: ratingGenre.recordset,
      genreRatingByYear: genreRatingByYear.recordset,
      viewGenreRatingByYear: viewGenreRatingByYear.recordset,

      // 🔥 DATA BARU BUAT DASHBOARD
      top5CountryByGenre: top5CountryByGenre.recordset
    };
  }

  // =====================
  // RESPONSE
  // =====================
  res.json({
    msg: "Dashboard Marketing",
    data: {
      views: {
        genreFilmCount: genreFilmCount.recordset,
        genreRating: genreRating.recordset,
        contentQualityIndex: contentQualityIndex.recordset,
        tayangPerNegara: tayangPerNegara.recordset
      },
      procedures: genreAnalysis
    }
  });
});
