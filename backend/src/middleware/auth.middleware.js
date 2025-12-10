const { validateToken } = require("../utils/validator/validator.js"); // <-- Impor fungsi simulasi

/**
 * Middleware untuk memverifikasi otentikasi pengguna.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  const payload = validateToken(authHeader);

  if (!payload) {
    return res.status(401).json({
      message: "Akses ditolak. Token otentikasi tidak valid atau hilang.",
    });
  }

  req.user = payload;

  next();
}

module.exports = { authMiddleware };
