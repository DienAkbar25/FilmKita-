const { sql, poolPromise } = require("../../config/db");

exports.searchFilmsByTerm = async (req, res) => {
  const { term } = req.query;
  const page = parseInt(req.query.page || "1");

  if (!term || term.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Parameter `term` wajib diisi!"
    });
  }

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("term", sql.NVarChar(200), term)
      .input("page", sql.Int, page)
      .execute("dbo.SearchTitlesByTerm");

    res.json({
      success: true,
      page,
      data: result.recordset,
    });
  } catch (err) {
    console.error("❌ Error searchFilmsByTerm:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
