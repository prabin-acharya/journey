const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
require("dotenv/config");

const app = express();

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Use Routes
app.use("/api/pages", require("./routes/api/pages"));
app.use("/api/journal", require("./routes/api/journal"));

//Routes
app.get("/", (req, res) => {
  res.send("We are Home.");
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
