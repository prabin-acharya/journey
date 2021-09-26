const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv/config");
const User = require("../../models/User");

//@route  POST api/users
//@desc   Register a user
//@access Public
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please Enter all Fields" });
  }

  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "Password is too short (minimum is 8 characters)" });

    const newUser = new User({
      name,
      email,
      password,
    });

    //Create Salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        newUser.save().then((user) => {
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
  });
});

module.exports = router;
