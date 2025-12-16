const { poolPromise } = require("../config/db");

const query = async (sql, params = {}) => {
  const pool = await poolPromise;
  const request = pool.request();

  for (const key in params) {
    request.input(key, params[key]);
  }

  return request.query(sql);
};

module.exports = {
  query
};