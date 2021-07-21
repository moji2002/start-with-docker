const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./user.model");

const app = express();
app.use(cors());
app.use(express.json());

// mongoose.set("debug", true);
mongoose.connect(
  "mongodb://admin:password@localhost:27017/user?authSource=admin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) return;
    console.log(err);
  }
);

app.get("/",async (req, res) => {
  res.send(await UserModel.find({}));
});

app.post("/", async (req, res) => {
  const { name, familyName, number, password } = req.body;
  const newUser = UserModel({ name, familyName, number, password });
  await newUser.save();
  res.json(newUser);
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
