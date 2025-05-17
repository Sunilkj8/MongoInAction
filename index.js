const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://sunil2003jakhar:suniljakhar@cluster0.fv5pt.mongodb.net/')

app.use(express.json());

app.get("/", (req, res) => {
  console.log("got a req");
});

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
