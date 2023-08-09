const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Server is running on Port - " + PORT);
});

app.listen(PORT, () => console.log("Server running on PORT - " + PORT));
