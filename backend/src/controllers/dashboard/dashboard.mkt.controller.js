const { mockFilms } = require("../../config/mockData");

exports.getMarketingDashboard = async (req, res) => {
  try {
    // Extract data from mock films for dashboard
    const qualityIndexData = [
      { month: 'Jan', quality: 72 },
      { month: 'Feb', quality: 76 },
      { month: 'Mar', quality: 75 },
      { month: 'Apr', quality: 78 },
      { month: 'May', quality: 82 },
      { month: 'Jun', quality: 85 },
      { month: 'Jul', quality: 88 },
    ];

    const ratingGrowthData = [
      { month: 'Jan', rating: 72 },
      { month: 'Feb', rating: 75 },
      { month: 'Mar', rating: 73 },
      { month: 'Apr', rating: 78 },
      { month: 'May', rating: 82 },
      { month: 'Jun', rating: 80 },
      { month: 'Jul', rating: 85 },
    ];

    const genreDistribution = [
      { name: 'Drama', value: 35 },
      { name: 'Action', value: 25 },
      { name: 'Sci-Fi', value: 20 },
      { name: 'Crime', value: 15 },
      { name: 'Romance', value: 5 },
    ];

    const countriesData = [
      { country: 'US', broadcasts: 87 },
      { country: 'CA', broadcasts: 68 },
      { country: 'JP', broadcasts: 65 },
      { country: 'KR', broadcasts: 52 },
      { country: 'FR', broadcasts: 48 },
      { country: 'UK', broadcasts: 42 },
      { country: 'DE', broadcasts: 38 },
      { country: 'AU', broadcasts: 28 },
    ];

    const platformData = [
      { platform: 'Netflix', performance: 92 },
      { platform: 'HBO', performance: 85 },
      { platform: 'Disney+', performance: 78 },
      { platform: 'Amazon Prime', performance: 72 },
      { platform: 'Apple TV+', performance: 65 },
    ];

    res.json({
      success: true,
      data: {
        qualityIndexData,
        ratingGrowthData,
        genreDistribution,
        countriesData,
        platformData
      }
    });
  } catch (err) {
    console.error("Error getMarketingDashboard:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
