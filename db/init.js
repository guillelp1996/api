require("dotenv").config();
const getPool = require("./getPool");
const { ready, success, error, info } = require("consola");
const { DATABASE_NAME } = process.env;
const initDB = async () => {
  try {
    const pool = getPool();

    info("Creating Database...");
    await pool.query(`DROP DATABASE IF EXISTS ${DATABASE_NAME}`);
    await pool.query(`CREATE DATABASE ${DATABASE_NAME}`);
    await pool.query(`USE ${DATABASE_NAME}`);
    success("Database created. . .");

    info("Deleting tables...");
    await pool.query("DROP TABLE IF EXISTS entries;");
    await pool.query("DROP TABLE IF EXISTS users;");
    await pool.query("DROP TABLE IF EXISTS votes;");

    info("Creating users table...");
    await pool.query(`
      CREATE TABLE users (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        role ENUM("normal", "admin") DEFAULT "normal",
        name VARCHAR(100),
        registrationCode VARCHAR(100)
      );
    `);
    success("user table created. . .");

    info("Creating entries table...");
    await pool.query(`
      CREATE TABLE entries (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        date datetime default now(),
        title VARCHAR(100) NOT NULL,
        description VARCHAR(500) NOT NULL,
        url VARCHAR(500) NOT NULL,
        user_id INT UNSIGNED,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);

    success("entries table created. . .");

    info("Creating votes table...");
    await pool.query(`
      CREATE TABLE votes (
        id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        entry_id int UNSIGNED,
        user_id int UNSIGNED,
        KEY entry_id (entry_id),
        KEY user_id (user_id),
        FOREIGN KEY (entry_id) REFERENCES entries (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );
    `);
    success("votes table created");

    ready({
      message: `db ${DATABASE_NAME} is loaded`,
      badge: true,
    });
  } catch (err) {
    error(err);
  } finally {
    process.exit();
  }
};

initDB();
