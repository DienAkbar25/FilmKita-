const { sql, poolPromise } = require("../../config/db");

exports.getAllFilms = async (req, res) => {
  console.log("getAllFilms dipanggil, coba query DB...");

  try {
    const pool = await poolPromise;
    console.log("Pool kebentuk, siap query");

    // 1) TEST PALING SIMPLE DULU
    const result = await pool.request().query("SELECT TOP 10 * FROM Show_Basic1");
    console.log("SELECT 1 berhasil:", result.recordset);

    res.json({
      success: true,
      data: result.recordset,
    });
  } catch (err) {
    console.error("Error getAllFilms:", err);
    res.status(500).json({
      success: false,
      message: err.message, // kita kirim pesan error asli DB ke client
    });
  }
};
