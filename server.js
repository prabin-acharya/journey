const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const Page = require("./models/Page");

const app = express();

//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("We are Home.");
});

app.get("/api/pages", (req, res) => {
  Page.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

app.post("/api/pages", (req, res) => {
  const newPage = new Page({
    title: req.body.title,
    content: req.body.content,
  });

  newPage.save().then((page) => res.json(page));
});

//Connect to DB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected!..."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

//Listening to the server
app.listen(port, () => console.log(`Server Started on port ${port}`));
