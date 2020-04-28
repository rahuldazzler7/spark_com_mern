const express = require("express");
const UserController = require("../controllers/userController");
const Postcontroll = require("../controllers/blogController");
const User = require("../models/User");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", UserController.postSignup);
router.post("/signin", UserController.postSignin);
router.post("/newpost", Postcontroll.upload, Postcontroll.createPost);
router.patch("/edit/:id", Postcontroll.upload, Postcontroll.editPost);
router.delete("/delete/:id", Postcontroll.deletePost);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      user: req.user,
    });
  }
);

module.exports = router;
