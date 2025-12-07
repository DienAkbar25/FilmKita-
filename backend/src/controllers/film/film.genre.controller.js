const { sql, poolPromise } = require("../../config/db");

exports.getFilmsByGenre = async (req, res) => {
  // ambil genre & page dari query ?genre=Drama&page=1
  const { genre } = req.query;
  const page = parseInt(req.query.page || "1");

  if (!genre || genre.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Parameter `genre` wajib diisi (contoh: ?genre=Drama&page=1)",
    });
  }

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input("genre", sql.NVarChar(200), genre)
      .input("page", sql.Int, page)
      .execute("dbo.GetCombineByGenre");

    return res.json({
      success: true,
      genre,
      page,
      pageSize: 15, 
      data: result.recordset,
    });
  } catch (err) {
    console.error(" Error getFilmsByGenre:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      detail: err.message, // boleh dihapus kalau ga mau ngasih detail
    });
  }
};
