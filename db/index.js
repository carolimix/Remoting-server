const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/FinalProject";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    const FinalProject = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${FinalProject}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
