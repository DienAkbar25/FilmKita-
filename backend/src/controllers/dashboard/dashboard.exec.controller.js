const db = require("../../services/appDb");

exports.getDashboard = async (req, res) => {
  try {
    // 1. Production Trend
    const productionTrend = await db.query(
      "SELECT * FROM dbo.vw_ProductionTrend"
    );

    // 2. Top 7 Company Rating
    const topCompanyRating = await db.query(
      "SELECT * FROM dbo.vw_Top7_CompanyRating"
    );

    // 3. Top 7 Company Film Count
    const topCompanyFilmCount = await db.query(
      "SELECT * FROM dbo.vw_Top7_CompanyFilmCount"
    );

    // 4. Top 7 Network Contribution
    const topNetworkContribution = await db.query(
      "SELECT * FROM dbo.vw_Top7NetworkContribution"
    );

    res.json({
      msg: "Dashboard Executive",
      data: {
        productionTrend: productionTrend.recordset,
        topCompanyRating: topCompanyRating.recordset,
        topCompanyFilmCount: topCompanyFilmCount.recordset,
        topNetworkContribution: topNetworkContribution.recordset
      }
    });
  } catch (err) {
    console.error("Dashboard EXEC error:", err);
    res.status(500).json({
      msg: "Gagal mengambil data dashboard exec",
      error: err.message
    });
  }
};
