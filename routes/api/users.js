const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Load User Model
const User = require("../../models/User");

// @route   POST api/users/register
// @desc    Register User
// @access  Public
router.post(
  "/register",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Valid email is required").isEmail(),
    check(
      "password",
      "Password with 6 or more characters is required"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pull out name, email, password from req.body
    const { name, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Create a new user
      // Get users gravatar
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        e: "pg", // Rating
        d: "mm" // Default - if no avatar found
      });

      // Create a User model object
      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt password
      // Generate a Salt. params: 10 is number of characters in hash
      const salt = await bcrypt.genSalt(10);
      // Hash the plain-text password using the salt
      user.password = await bcrypt.hash(password, salt);
      // Save user to DB
      await user.save();

      // Rerturn JWT
      const payload = {
        user: {
          id: user._id
        }
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );

      //res.send("User Registered");
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
