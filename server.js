const getPool = require("./db/getPool");
const express = require("express");
const cors = require("cors");
const consola = require("consola");
const morgan = require("morgan");
// const host = process.env.HOST || "localHost";
const port = process.env.PORT || 8080;
const pool = getPool();
const app = express();
app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

// end points
app.get("/", async (req, res, next) => {
  const [entries] = await pool.query("SELECT * FROM entries");

  res.send({ status: "ok", data: entries });
}); // get all entry in feed
app.post("/user", (req, res, next) => {}); // registe user
// app.post("/login", () => {}); // login user {auth}
// app.patch("/user/:activateCode"); // active user with email validation
// app.get("/user/:userId", () => {}); // user profile {auth}
// app.get("/entry/:userId", () => {}); // get all entries by user
// app.get("/entry/:entryId", () => {}); // get a entry by id
// app.post("/entry/vote/:id", () => {}); //insert a vote into entry

// app.all("/*", () => {}); // page 404 not found
app.listen(port, () => {
  consola.ready({
    message: `Server listening on http://${"localhost"}:${port}`,
    badge: true,
  });
});
