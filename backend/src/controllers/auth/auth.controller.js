const bcrypt = require("bcrypt");
const db = require("../../services/appDb");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  // pesan error GENERIC (anti enumeration)
  const INVALID_MSG = "Username atau password salah";

  if (!username || !password) {
    return res.status(400).json({ msg: INVALID_MSG });
  }

  const result = await db.query(
    "SELECT * FROM AppUsers WHERE Username = @username",
    { username }
  );

  // kalau user ga ada
  if (result.recordset.length === 0) {
    // fake delay biar timing mirip (opsional tapi keren)
    await bcrypt.compare(password, "$2b$10$invalidinvalidinvalidinvalidinv");
    return res.status(401).json({ msg: INVALID_MSG });
  }

  const user = result.recordset[0];

  const isValid = await bcrypt.compare(password, user.PasswordHash);
  if (!isValid) {
    return res.status(401).json({ msg: INVALID_MSG });
  }

  // sukses login
  req.session.user = {
    userId: user.UserID,
    username: user.Username,
    role: user.Role
  };

  res.json({
    msg: "Login berhasil",
    user: {
      username: user.Username,
      role: user.Role
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ msg: "Logout berhasil" });
  });
};

exports.me = (req, res) => {
  if (!req.session.user) {
    return res.json({ loggedIn: false });
  }

  res.json({
    loggedIn: true,
    user: req.session.user
  });
};
