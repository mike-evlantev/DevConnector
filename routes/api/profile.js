const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const request = require("request");
const { check, validationResult } = require("express-validator");
require("dotenv").config();

const User = require("../../models/User");
const Profile = require("../../models/Profile");
const Post = require("../../models/Post");

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

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    let profiles = await Profile.find()
      .sort("user")
      .populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get user profile by id
// @access  Public
router.get("/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId")
      return res.status(400).json({ msg: "Profile not found" });
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    // 1. Remove users posts
    await Post.deleteMany({ user: req.user.id });
    // 2. Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // 3. Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("company", "Company is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/profile/experience/:exp_id
// @desc    Update profile experience
// @access  Private
router.put(
  "/experience/:exp_id",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("company", "Company is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) return res.status(400).json({ msg: "Profile not found" });
      // Verify profile belongs to user
      if (profile.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      const updateIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      profile.experience[updateIndex].title = title;
      profile.experience[updateIndex].company = company;
      if (company) profile.experience[updateIndex].location = location;
      profile.experience[updateIndex].from = from;
      if (to) profile.experience[updateIndex].to = to;
      if (current) profile.experience[updateIndex].current = current;
      if (description)
        profile.experience[updateIndex].description = description;

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });
    // Get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    // Remove experience under index
    profile.experience.splice(removeIndex, 1);

    // Save profile
    await profile.save();

    // Return profile
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("fieldOfStudy", "Field of study is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/profile/education/:edu_id
// @desc    Update profile education
// @access  Private
router.put(
  "/education/:edu_id",
  [
    auth,
    [
      check("school", "School is required")
        .not()
        .isEmpty(),
      check("degree", "Degree is required")
        .not()
        .isEmpty(),
      check("fieldOfStudy", "Field of study is required")
        .not()
        .isEmpty(),
      check("from", "From date is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldOfStudy,
      from,
      to,
      current,
      description
    } = req.body;

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      if (!profile) return res.status(400).json({ msg: "Profile not found" });
      // Verify profile belongs to user
      if (profile.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: "Not authorized" });
      }

      const updateIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);

      profile.education[updateIndex].school = school;
      profile.education[updateIndex].degree = degree;
      profile.education[updateIndex].fieldOfStudy = fieldOfStudy;
      profile.education[updateIndex].from = from;
      if (to) profile.education[updateIndex].to = to;
      if (current) profile.education[updateIndex].current = current;
      if (description) profile.education[updateIndex].description = description;

      await profile.save();
      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    });
    // Get remove index
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    // Remove education under index
    profile.education.splice(removeIndex, 1);

    // Save profile
    await profile.save();

    // Return profile
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get("/github/:username", async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
      method: "GET",
      headers: { "user-agent": "node.js" }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "GitHub profile not found" });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
