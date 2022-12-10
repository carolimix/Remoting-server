require("dotenv").config();

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const spacesRoutes = require("./routes/spaces.routes");
app.use("/", spacesRoutes);

const path = require('path');
app.use(express.static(path.join(__dirname, "/client/dist")));

app.use((req, res) => {
  res.sendFile(__dirname + "/client/dist/index.html");
});

require("./error-handling")(app);

module.exports = app;
