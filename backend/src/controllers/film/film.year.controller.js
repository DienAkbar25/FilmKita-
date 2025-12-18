const { mockFilms } = require("../../config/mockData");

exports.getFilmsByYear = async (req, res) => {
  try {
    const { year } = req.params;
    
    const results = mockFilms.filter(film => 
      film.year === parseInt(year)
    );

    res.json({
      success: true,
      data: results
    });
  } catch (err) {
    console.error("Error getFilmsByYear:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
