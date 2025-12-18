const { mockFilms } = require("../../config/mockData");

exports.getFilmsByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    
    const results = mockFilms.filter(film => 
      film.genres && film.genres.includes(decodeURIComponent(genre))
    );

    res.json({
      success: true,
      data: results
    });
  } catch (err) {
    console.error("Error getFilmsByGenre:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
