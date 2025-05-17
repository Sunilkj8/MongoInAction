const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const user = new Schema({
  email: { type: String, unique: true },
  password: String,
  name: String,
});





