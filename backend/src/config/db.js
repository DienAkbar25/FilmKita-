const sql = require("mssql");
require("dotenv").config();

// Mock data digunakan saat development
const USE_MOCK_DATA = process.env.USE_MOCK_DATA === "true" || !process.env.DB_SERVER;

let poolPromise = Promise.resolve(null);

if (!USE_MOCK_DATA) {
  const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT || "1433"),
    options: {
      encrypt: process.env.DB_ENCRYPT === "true",
      trustServerCertificate: true,
    },
  };

  poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then((pool) => {
      console.log("✓ Connected to SQL Server");
      return pool;
    })
    .catch((err) => {
      console.error("✗ DB Connection Failed:", err.message);
      console.log("→ Using mock data instead");
      return null;
    });
} else {
  console.log("→ Using mock data (DB_SERVER not configured)");
}

module.exports = { sql, poolPromise };
