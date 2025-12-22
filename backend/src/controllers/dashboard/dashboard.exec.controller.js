const { sql, poolPromise } = require("../../config/db");
const asyncHandler = require("../../middleware/mid.asyncHandler");

// GET /api/dashboard/exec
// GET /api/dashboard/exec?country=GB
exports.getDashboard = asyncHandler(async (req, res) => {
  console.log('\n🔥 DASHBOARD EXEC CALLED');
  console.log('Query params:', req.query);
  const { country } = req.query;
  console.log('Country param:', country);
  const countryCode = country
    ? country.trim().toUpperCase()
    : null;
  console.log('CountryCode:', countryCode);
  const pool = await poolPromise;

  // =====================
  // GLOBAL DATA
  // =====================
  const [
    productionTrend,
    topCompanyRating,
    topCompanyFilmCount,
    topNetworkContribution
  ] = await Promise.all([
    pool.request().query("SELECT * FROM dbo.vw_ProductionTrend"),
    pool.request().query("SELECT * FROM dbo.vw_Top7_CompanyRating"),
    pool.request().query("SELECT * FROM dbo.vw_Top7_CompanyFilmCount"),
    pool.request().query("SELECT * FROM dbo.vw_Top7NetworkContribution")
  ]);

  // =====================
  // COUNTRY-SPECIFIC DATA
  // =====================
  let countryAnalysis = null;

  if (countryCode) {
    try {
      console.log('Searching for country:', countryCode);
      const [
        topGenreByCountry,
        topNetworkByCountry
      ] = await Promise.all([
        pool.request()
          .input("CountryName", sql.NVarChar(50), countryCode)
          .execute("dbo.TOP5_GENRE_BY_COUNTRY"),
        
        pool.request()
          .input("CountryName", sql.NVarChar(50), countryCode)
          .execute("dbo.TOP5_NETWORK_BY_COUNTRY")
      ]);

      console.log('Genre data:', topGenreByCountry.recordset);
      console.log('Network data:', topNetworkByCountry.recordset);

      countryAnalysis = {
        country: countryCode,
        topGenreByCountry: topGenreByCountry.recordset,
        topNetworkByCountry: topNetworkByCountry.recordset
      };
    } catch (err) {
      console.error('Error fetching country analysis:', err.message);
      countryAnalysis = {
        country: countryCode,
        topGenreByCountry: [],
        topNetworkByCountry: [],
        error: err.message
      };
    }
  }

  // =====================
  // RESPONSE
  // =====================
  res.json({
    msg: "Dashboard Executive",
    data: {
      productionTrend: productionTrend.recordset,
      topCompanyRating: topCompanyRating.recordset,
      topCompanyFilmCount: topCompanyFilmCount.recordset,
      topNetworkContribution: topNetworkContribution.recordset,
      countryAnalysis
    }
  });
});
