const { sql, poolPromise } = require("../../config/db");

exports.getDashboard = async (req, res) => {
  const { genre } = req.query;

  try {
    const pool = await poolPromise;

    // =====================
    // VIEW (PAKE pool)
    // =====================
    const genreFilmCount = await pool.request()
      .query("SELECT * FROM dbo.vw_Genre_FilmCount");

    const genreRating = await pool.request()
      .query("SELECT * FROM dbo.vw_Genre_Rating");

    const contentQualityIndex = await pool.request()
      .query("SELECT * FROM dbo.vw_ContentQualityIndex");

    const tayangPerNegara = await pool.request()
      .query("SELECT * FROM dbo.vw_Tayang_Per_Negara");

    // =====================
    // EXEC (DINAMIS)
    // =====================
    let genreAnalysis = null;

    if (genre) {
      let countGenre, ratingGenre, genreRatingByYear, viewGenreRatingByYear;
      
      try {
        countGenre = await pool.request()
          .input("GenreName", sql.NVarChar, genre)
          .execute("dbo.Count_Genre");
      } catch (err) {
        console.error('Error executing Count_Genre:', err.message);
        countGenre = { recordset: [] };
      }

      try {
        ratingGenre = await pool.request()
          .input("GenreName", sql.NVarChar, genre)
          .execute("dbo.Rating_Genre");
      } catch (err) {
        console.error('Error executing Rating_Genre:', err.message);
        ratingGenre = { recordset: [] };
      }

      try {
        genreRatingByYear = await pool.request()
          .input("GenreName", sql.NVarChar, genre)
          .execute("dbo.Genre_Rating_By_Year");
      } catch (err) {
        console.error('Error executing Genre_Rating_By_Year:', err.message);
        genreRatingByYear = { recordset: [] };
      }

      try {
        viewGenreRatingByYear = await pool.request()
          .input("GenreName", sql.NVarChar, genre)
          .execute("dbo.View_Genre_Rating_By_Year");
      } catch (err) {
        console.error('Error executing View_Genre_Rating_By_Year:', err.message);
        viewGenreRatingByYear = { recordset: [] };
      }

      // DEBUG LOGGING
      console.log('\n========== DEBUG GENRE ANALYSIS ==========');
      console.log('Genre:', genre);
      console.log('\n1. COUNT_GENRE:');
      console.log('   Recordset length:', countGenre.recordset?.length || 0);
      if (countGenre.recordset?.length > 0) {
        console.log('   Column names:', Object.keys(countGenre.recordset[0]));
        console.log('   Data:', JSON.stringify(countGenre.recordset[0], null, 2));
      }
      
      console.log('\n2. RATING_GENRE:');
      console.log('   Recordset length:', ratingGenre.recordset?.length || 0);
      if (ratingGenre.recordset?.length > 0) {
        console.log('   Column names:', Object.keys(ratingGenre.recordset[0]));
        console.log('   Data:', JSON.stringify(ratingGenre.recordset[0], null, 2));
      }
      
      console.log('\n3. GENRE_RATING_BY_YEAR:');
      console.log('   Recordset length:', genreRatingByYear.recordset?.length || 0);
      if (genreRatingByYear.recordset?.length > 0) {
        console.log('   Column names:', Object.keys(genreRatingByYear.recordset[0]));
        console.log('   First row:', JSON.stringify(genreRatingByYear.recordset[0], null, 2));
        console.log('   All rows:', JSON.stringify(genreRatingByYear.recordset, null, 2));
      }
      
      console.log('\n4. VIEW_GENRE_RATING_BY_YEAR:');
      console.log('   Recordset length:', viewGenreRatingByYear.recordset?.length || 0);
      if (viewGenreRatingByYear.recordset?.length > 0) {
        console.log('   Column names:', Object.keys(viewGenreRatingByYear.recordset[0]));
        console.log('   First row:', JSON.stringify(viewGenreRatingByYear.recordset[0], null, 2));
      }
      console.log('==========================================\n');

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
