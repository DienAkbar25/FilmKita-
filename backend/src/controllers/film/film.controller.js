const { poolPromise } = require("../../config/db");

exports.getHomePage = async (req, res) => {
  try {
    const pool = await poolPromise;

    const moviesResult = await pool.request().query(`
      SELECT *
      FROM dbo.vw_Movie_Top10_Page
      ORDER BY Rating DESC
    `);

    const tvResult = await pool.request().query(`
      SELECT *
      FROM dbo.vw_TvShow_Top10_Page
      ORDER BY Rating DESC
    `);

    res.json({
      success: true,
      data: {
        movies: moviesResult.recordset,
        tvShows: tvResult.recordset
      }
    });
  } catch (err) {
    console.error("Home page error:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
