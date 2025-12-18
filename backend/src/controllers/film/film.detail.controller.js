const { mockFilms } = require("../../config/mockData");

exports.getFilmFullDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const film = mockFilms.find(f => f.id === parseInt(id));
    
    if (!film) {
      return res.status(404).json({
        success: false,
        message: 'Film not found'
      });
    }

    res.json({
      success: true,
      data: film
    });
  } catch (err) {
    console.error("Error getFilmFullDetail:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
