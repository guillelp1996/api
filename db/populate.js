require("dotenv").config();
const bcrypt = require("bcrypt");
const getPool = require("./getPool");
const { success, error, ready } = require("consola");

const populateDB = async () => {
  try {
    const pool = getPool();

    success("Inserting data in users...");

    await pool.query(
      `INSERT INTO users (email, password, role, name) VALUES 
      ("admin@email.com", ?, "admin", "admin");`,
      [await bcrypt.hash("123456", 10)]
    );
    await pool.query(
      `INSERT INTO users (email, password, role, name) VALUES 
      ("info@email.com", ?, "normal", "info");`,
      [await bcrypt.hash("123456", 10)]
    );

    success("Inserting data in entries...");
    await pool.query(
      `INSERT INTO entries (title, description, url, user_id) VALUES ("Entry demo 1", "Entry demo description", "http://www.google.com", "1");`
    );
    await pool.query(
      `INSERT INTO entries (title, description, url, user_id) VALUES ("Entry demo 2", "Entry demo description", "http://www.google.com", "1");`
    );
    await pool.query(
      `INSERT INTO entries (title, description, url, user_id) VALUES ("Entry demo 3", "Entry demo description", "http://www.google.com", "1");`
    );
    await pool.query(
      `INSERT INTO entries (title, description, url, user_id) VALUES ("Entry demo 4", "Entry demo description", "http://www.google.com", "1");`
    );

    ready({
      message: `inserted data in db`,
      badge: true,
    });
  } catch (err) {
    error(err);
  } finally {
    process.exit();
  }
};

populateDB();
