const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
require("dotenv/config");
const User = require("../../models/User");
const { JsonWebTokenError } = require("jsonwebtoken");

//@route  POST api/auth
//@desc   LogIn User
//@access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please Enter all Fields" });
  }

  User.findOne({ email }).then((user) => {
    if (!user) return res.status(400).json({ msg: "User Does not exists" });

    //Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch)
        return res.status(400).json({ msg: "Invalid Credentials." });

      jwt.sign(
        { id: user.id },
        process.env.jwtSecret,
        {
          expiresIn: "30d",
        },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email },
          });
        }
      );
    });
  });
});

//@route  GET api/auth/user
//@desc   Get user data
//@access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
