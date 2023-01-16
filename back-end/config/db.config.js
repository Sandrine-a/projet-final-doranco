require('dotenv').config()

module.exports = {
  HOST: "localhost",
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASS,
  DB: process.env.DB_NAME,
  DIALECT: process.env.DB_DIALECT,
  PORT: process.env.DB_PORT,
};
