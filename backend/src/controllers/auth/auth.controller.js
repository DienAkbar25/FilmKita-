const bcrypt = require("bcrypt");
const db = require("../../services/appDb");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Username dan password wajib diisi" });
  }

  const result = await db.query(
    "SELECT * FROM AppUsers WHERE Username = @username",
    { username }
  );

  if (result.recordset.length === 0) {
    return res.status(401).json({ msg: "User tidak ditemukan" });
  }

  const user = result.recordset[0];

  const isValid = await bcrypt.compare(password, user.PasswordHash);
  if (!isValid) {
    return res.status(401).json({ msg: "Password salah" });
  }

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
  res.json(req.session.user);
};
