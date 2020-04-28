const express = require("express");
const authcontrol = require("../config/authentication");
const User = require("../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();
const auth = require("../middleware/auth");

router.post("/validate", authcontrol.authenticate);
router.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("User Does not exist");
    res.json(user);
  } catch (e) {
    res.json({ msg: e.message });
  }
});

module.exports = router;
