const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
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
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

// //Routes
// app.get("/", (req, res) => {
//   res.send("We are Home.");
// });

//serve static assets if on production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Connect to DB
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected!..."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;

//Listening to the server
app.listen(port, () => console.log(`Server Started on port ${port}`));
