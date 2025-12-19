const db = require("../../services/appDb");

exports.getDashboard = async (req, res) => {
  const { genre } = req.query; 

  try {

    const genreFilmCount = await db.query(
      "SELECT * FROM dbo.vw_Genre_FilmCount"
    );

    const genreRating = await db.query(
      "SELECT * FROM dbo.vw_Genre_Rating"
    );

    const contentQualityIndex = await db.query(
      "SELECT * FROM dbo.vw_ContentQualityIndex"
    );

    const tayangPerNegara = await db.query(
      "SELECT * FROM dbo.vw_Tayang_Per_Negara"
    );

    let genreAnalysis = null;

    if (genre) {
      const countGenre = await db.query(
        "EXEC dbo.Count_Genre @GenreName = @genre",
        { genre }
      );

      const ratingGenre = await db.query(
        "EXEC dbo.Rating_Genre @GenreName = @genre",
        { genre }
      );

      const genreRatingByYear = await db.query(
        "EXEC dbo.Genre_Rating_By_Year @GenreName = @genre",
        { genre }
      );

      const viewGenreRatingByYear = await db.query(
        "EXEC dbo.View_Genre_Rating_By_Year @GenreName = @genre",
        { genre }
      );

      console.log(`Genre: ${genre}`);
      console.log('Count Genre Result:', countGenre.recordset);
      console.log('Rating Genre Result:', ratingGenre.recordset);
      console.log('Genre Rating By Year Result:', genreRatingByYear.recordset);
      console.log('View Genre Rating By Year Result:', viewGenreRatingByYear.recordset);

      genreAnalysis = {
        genre,
        countGenre: countGenre.recordset,
        ratingGenre: ratingGenre.recordset,
        genreRatingByYear: genreRatingByYear.recordset,
        viewGenreRatingByYear: viewGenreRatingByYear.recordset
      };
    }

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
  } catch (err) {
    console.error("Dashboard MKT error:", err);
    res.status(500).json({
      msg: "Gagal mengambil dashboard marketing",
      error: err.message
    });
  }
};
