const { mockFilms } = require("../../config/mockData");

exports.getExecutiveDashboard = async (req, res) => {
  try {
    // Extract company/director data
    const companyData = {};
    mockFilms.forEach((movie) => {
      const directors = movie.director ? movie.director.split(',').map(d => d.trim()) : [];
      directors.forEach((director) => {
        if (director) {
          if (!companyData[director]) {
            companyData[director] = {
              company: director,
              count: 0,
              totalRating: 0,
              movies: [],
            };
          }
          companyData[director].count += 1;
          companyData[director].totalRating += movie.rating;
          companyData[director].movies.push(movie);
        }
      });
    });

    // Top Count Companies
    const topCountCompanies = Object.values(companyData)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
      .map((company, index) => ({
        ...company,
        rank: index + 1,
        avgRating: (company.totalRating / company.count).toFixed(1),
      }));

    // Top Rated Companies
    const topRatedCompanies = Object.values(companyData)
      .filter(c => c.count >= 1)
      .sort((a, b) => (b.totalRating / b.count) - (a.totalRating / a.count))
      .slice(0, 5)
      .map((company, index) => ({
        ...company,
        rank: index + 1,
        avgRating: (company.totalRating / company.count).toFixed(1),
      }));

    // Network Distribution
    const networkDistribution = [
      { name: 'Netflix', value: 45 },
      { name: 'HBO', value: 30 },
      { name: 'Disney+', value: 15 },
      { name: 'Amazon Prime', value: 7 },
      { name: 'Others', value: 3 },
    ];

    // Content Production by Year
    const productionByYear = {};
    mockFilms.forEach((movie) => {
      const year = movie.year;
      if (!productionByYear[year]) {
        productionByYear[year] = 0;
      }
      productionByYear[year] += 1;
    });

    const yearlyProductionData = Object.entries(productionByYear)
      .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
      .map(([year, count]) => ({
        year: year,
        count: count,
      }));

    res.json({
      success: true,
      data: {
        topCountCompanies,
        topRatedCompanies,
        networkDistribution,
        yearlyProductionData
      }
    });
  } catch (err) {
    console.error("Error getExecutiveDashboard:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
