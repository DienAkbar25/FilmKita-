const { mockUsers } = require("../../config/mockData");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Mock authentication
    if (email === 'marketing@filmarchive.com' && password === 'marketing123') {
      const user = mockUsers[email];
      req.session.user = user;
      return res.json({
        success: true,
        data: user
      });
    }

    if (email === 'executive@filmarchive.com' && password === 'executive123') {
      const user = mockUsers[email];
      req.session.user = user;
      return res.json({
        success: true,
        data: user
      });
    }

    res.status(401).json({
      success: false,
      msg: 'Invalid email or password'
    });
  } catch (err) {
    console.error("Error login:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.logout = async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: err.message
        });
      }
      res.json({
        success: true,
        message: 'Logged out successfully'
      });
    });
  } catch (err) {
    console.error("Error logout:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

exports.me = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    res.json({
      success: true,
      data: req.session.user
    });
  } catch (err) {
    console.error("Error me:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
