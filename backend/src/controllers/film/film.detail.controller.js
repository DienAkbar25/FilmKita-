const { sql, poolPromise } = require("../../config/db");

// GET /api/films/detail/:id
exports.getFilmFullDetail = async (req, res) => {
  const combineID = req.params.id || req.query.id;

  if (!combineID || combineID.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Parameter CombineID wajib diisi (contoh: /api/films/detail/tt1457767)",
    });
  }

  try {
    const pool = await poolPromise;

    const [
      contributorsResult,
      countryResult,
      languageResult,
      yearResult,
      ratingResult,
      votesResult,
      runtimeResult,
      parentEpisodesResult,
      genresResult,
    ] = await Promise.all([
      pool.request()
        .input("CombineID", sql.NVarChar(15), combineID)
        .input("category", sql.NVarChar(100), null)
        .input("aggregate", sql.Bit, 1)
        .input("page", sql.Int, 1)
        .input("pageSize", sql.Int, 100)
        .execute("dbo.GetContributorsByShow"),

      pool.request()
        .input("combineID", sql.NVarChar(15), combineID)
        .execute("dbo.GetCountryByID"),

      pool.request()
        .input("combineID", sql.NVarChar(15), combineID)
        .execute("dbo.GetLanguageByID"),

      pool.request()
        .input("combineID", sql.NVarChar(15), combineID)
        .execute("dbo.GetYearByID"),

      pool.request()
        .input("combineID", sql.NVarChar(15), combineID)
        .execute("dbo.GetRatingByID"),

      pool.request()
        .input("combineID", sql.NVarChar(15), combineID)
        .execute("dbo.GetVotesByID"),

      pool.request()
        .input("combineID", sql.NVarChar(15), combineID)
        .execute("dbo.GetRuntimeByID"),

      pool.request()
        .input("inputID", sql.NVarChar(15), combineID)
        .execute("dbo.GetParentAndEpisodesByID"),

      pool.request()
        .input("inputID", sql.NVarChar(15), combineID)
        .execute("dbo.GetGenresByID"),
    ]);

    const contributorsRow = contributorsResult.recordset?.[0] || null;
    const countryRow      = countryResult.recordset?.[0] || null;
    const languageRow     = languageResult.recordset?.[0] || null;
    const yearRow         = yearResult.recordset?.[0] || null;
    const ratingRow       = ratingResult.recordset?.[0] || null;
    const votesRow        = votesResult.recordset?.[0] || null;
    const runtimeRow      = runtimeResult.recordset?.[0] || null;
    const genresRows      = genresResult.recordset || [];

    // ============================
    // FIX UTAMA: SERIES VS EPISODE
    // ============================
    const rawEpisodes = parentEpisodesResult.recordset || [];

    // DETEKSI: apakah combineID yang diminta adalah EPISODE
    const isEpisode = rawEpisodes.some(
      ep =>
        ep.CombineID === combineID &&
        ep.SeasonNumber !== null &&
        ep.EpisodeNumber !== null
    );

    // JIKA EPISODE → JANGAN KIRIM EPISODE LAIN
    // JIKA SERIES → KIRIM SEMUA EPISODE
    const episodesRows = isEpisode
      ? []
      : rawEpisodes.filter(
          ep => ep.SeasonNumber !== null && ep.EpisodeNumber !== null
        );

    // ============================
    // PARSE CONTRIBUTORS
    // ============================
    let contributorsString = null;
    if (contributorsRow?.Contributors) {
      contributorsString = contributorsRow.Contributors.trim();
    }

    const detail = {
      combineID,
      title:
        yearRow?.title_name ||
        countryRow?.title_name ||
        languageRow?.title_name ||
        null,

      startYear: yearRow?.start_year || null,

      rating: ratingRow?.Rating || null,
      votes: votesRow?.Vote || null,
      runtime: runtimeRow?.runtime || null,

      countries: countryRow?.Countries || null,
      languages: languageRow?.Languages || null,

      contributors: contributorsString,
      genres: genresRows
        .map(g => g.Genre_Name)
        .filter(g => g && g.trim()),

      // 🔥 FINAL FIX
      isEpisode,
      episodes: episodesRows,
    };

    return res.json({
      success: true,
      data: detail,
    });
  } catch (err) {
    console.error("Error getFilmFullDetail:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      detail: err.message,
    });
  }
};
