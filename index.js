const express = require("express");
const cors = require("cors");
const consola = require("consola");
const host = process.env.HOST || "localHost";
const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());

// end points
app.get("/user/:id", () => {}); // user profile {auth}
app.post("/user", () => {}); // registe user
app.post("/login", () => {}); // login user {auth}
app.get("/entry", () => {}); // get all entry in feed
app.get("/entry/:id");

app.listen(port, host, () => {
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
});
