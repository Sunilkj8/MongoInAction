const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const user = new Schema({
  email: { type: String  },
  password: String,
  name: String,
});

const UserModel = mongoose.model("Users", user);

module.exports = { UserModel };
