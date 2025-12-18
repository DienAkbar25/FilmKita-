const { mockFilms } = require("../../config/mockData");

exports.searchFilmsByTerm = async (req, res) => {
  try {
    const { term } = req.query;
    
    if (!term) {
      return res.json({
        success: true,
        data: mockFilms
      });
    }

    const searchTerm = term.toLowerCase();
    const results = mockFilms.filter(film => 
      film.title.toLowerCase().includes(searchTerm) ||
      film.synopsis.toLowerCase().includes(searchTerm)
    );

    res.json({
      success: true,
      data: results
    });
  } catch (err) {
    console.error("Error searchFilmsByTerm:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
