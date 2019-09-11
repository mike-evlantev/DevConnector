const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// Load User Model
const User = require("../../models/User");

// @route   GET api/users
// @desc    Tests users route
// @access  Public
router.get("/", (req, res) => res.send("User route"));

// @route GET api/users/register
// @desc Register User
// @access Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        e: "pg", // Rating
        d: "mm" // Default
      });

      // Create a new user
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      // Encrypt given password for persistence
      // Generate a Salt. params: 10 is number of characters in hash
      bcrypt.genSalt(10, (err, salt) => {
        // Hash the plain-text password using the salt
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          // Set user password to hash
          newUser.password = hash;
          // Persist
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;
