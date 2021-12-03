const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DB_LINK,
});

exports.connection = pool;
