const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "pratikS@1405",
  host: "localhost",
  port: 5432,
  database: "dbms",
});

module.exports = pool;
