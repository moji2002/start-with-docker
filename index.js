const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./user.model");

const app = express();
app.use(cors());
app.use(express.json());

const mongoPath = process.env.MONGO_PATH;

console.log({ mongoPath });

mongoose.set("debug", true);

mongoose
  .connect(mongoPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", async (req, res) => {
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
