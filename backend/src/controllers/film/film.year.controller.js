const { sql, poolPromise } = require("../../config/db");

exports.getTitlesByYear = async (req, res) => {
  const year = parseInt(req.query.year, 10);
  const page = parseInt(req.query.page || "1", 10);

  if (Number.isNaN(year)) {
    return res.status(400).json({
      success: false,
      message: "Parameter `year` wajib diisi dan harus angka. Contoh: ?year=2021&page=1",
    });
  }

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("year", sql.Int, year)
      .input("page", sql.Int, page)
      .execute("dbo.GetTitlesByYear");

    return res.json({
      success: true,
      year,
      page,
      pageSize: 15,           
      data: result.recordset, 
    });
  } catch (err) {
    console.error("Error getTitlesByYear:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      detail: err.message,
    });
  }
};
