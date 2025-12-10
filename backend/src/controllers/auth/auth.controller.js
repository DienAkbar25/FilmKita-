/**
 * Pokok controller
 */
export class AuthController {
  /**
   * login
   */
  static login(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username dan password harus diisi.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login berhasil (SIMULASI).",
      data: {
        user: username,
        token: "FAKE_JWT_TOKEN_12345", 
      },
    });
  }
  /**
   * register
   */
  static register() {}

  static getSession() {}
}
