const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/user");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({
    name: name,
    username: username,
    email: email,
    password: password,
  });

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        newUser.password = hash;
        newUser.save((err) => {
          if (err) {
            console.log(err);
            return;
          } else {
            res.redirect("/users/login");
          }
        });
      }
    });
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

module.exports = router;
