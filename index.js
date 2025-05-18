const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const mongoose = require("mongoose");
const { UserModel } = require("./db");
mongoose.connect(
  "mongodb+srv://sunil2003jakhar:suniljakhar@cluster0.fv5pt.mongodb.net/demo-todo-app"
);

app.use(express.json());

app.get("/", (req, res) => {
  console.log("got a req");
});

app.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  // await UserModel.create({ email: email, password: password, name: name });
  await UserModel.insertOne({ email: email, password: password, name: name });

  console.log(email, password, name);
  res.json({ message: "Got the signup data" });
});

app.post("/signin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = UserModel.find({ email: email, password: password }); //finds all the entries having name:'sunil'

  console.log("await");

  for await (const doc of user) {
    console.log(doc);
  }

  res.json({ message: "Request Submitted" });
});

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
