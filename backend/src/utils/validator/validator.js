function validateToken(token) {
  if (!token) {
    console.log("Token tidak tersedia.");
    return null;
  }

  if (!token.startsWith("Bearer ")) {
    console.log("Format token tidak valid.");
    return null;
  }

  const actualToken = token.substring(7);

  if (actualToken === "VALID_USER_TOKEN_12345") {
    return {
      userId: "user_123",
      role: "admin",
      iat: Date.now(),
    };
  }

  console.log("Token tidak cocok atau kadaluarsa.");
  return null;
}

module.exports = { validateToken };
