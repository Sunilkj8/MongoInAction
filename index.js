const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "s3cret";
const app = express();
const mongoose = require("mongoose");
const { UserModel, TodoModel } = require("./db");
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
  try {
    const user = await UserModel.findOne({ email: email, password: password }); //finds all the entries having name:'sunil'

    const token = jwt.sign(user._id.toString(), JWT_SECRET);
    console.log(token);
    res.json({ token: token });
  } catch (e) {
    // console.log(e);
    res.json({ message: "Invalid Credentials" });
  }

  // for await (const doc of user) {
  //   console.log(doc);
  // }
});

app.post("/addtodos", auth, async (req, res) => {
  const userId = req.user._id.toString();
  const todoTitle = req.body.todoTitle;

  // console.log(userId);

  await TodoModel.insertOne({ title: todoTitle, userId: userId });

  res.json({ message: "Todo Added" });
});

app.post("/gettodos", auth, async (req, res) => {
  const userId = req.user._id.toString();

  const todos = await TodoModel.find({ userId: userId });
  // console.log("todos \n",todos);
  const todosArr=[]
  todos.forEach((elem)=>{
    todosArr.push(elem.title)
  })
 res.json({todos:todosArr})
});

async function auth(req, res, next) {
  const token = req.body.token;
  try {
    const userId = jwt.verify(token, JWT_SECRET);
    // console.log(userId);
    const user = await UserModel.findOne({ _id: userId }); // Get the user with the specified user id...
    console.log("found user: \n", user.name);

    req.user = user;
    next();
  } catch (e) {
    res.json({ message: "Can't find the user with specified token" });
  }
}

app.listen(3000, () => {
  console.log("app listening on port 3000");
});
