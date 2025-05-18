const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const user = new Schema({
  email: { type: String },
  password: String,
  name: String,
});

const todo = new Schema({
  title: String,
  userId: ObjectId,
});

const UserModel = mongoose.model("users", user);// It is an function containing collection name and the schema for the collection repectively
const TodoModel = mongoose.model("todos", todo);

module.exports = { UserModel ,TodoModel};
