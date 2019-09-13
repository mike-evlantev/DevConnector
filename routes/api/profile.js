const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      return res.status(400).json({ msg: "No user profile found" });
    }

    res.send(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/profile
// @desc    Create or Update a user profile
// @access  Private
router.post(
  "/",
  [
    auth,
    check("status", "Status is required")
      .not()
      .isEmpty(),
    check("skills", "Skills are required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Build profile object
    const newProfile = {};
    newProfile.user = req.user.id;
    if (company) newProfile.company = company;
    if (website) newProfile.website = website;
    if (location) newProfile.location = location;
    if (bio) newProfile.bio = bio;
    if (status) newProfile.status = status;
    if (githubusername) newProfile.githubusername = githubusername;
    if (skills) {
      newProfile.skills = skills.split(",").map(skill => skill.trim());
    }
    console.log(newProfile.skills);

    // Build social object
    newProfile.social = {};
    if (youtube) newProfile.social.youtube = youtube;
    if (twitter) newProfile.social.twitter = twitter;
    if (facebook) newProfile.social.facebook = facebook;
    if (linkedin) newProfile.social.linkedin = linkedin;
    if (instagram) newProfile.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      // Update
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: newProfile },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(newProfile);
      await profile.save();
      return res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
