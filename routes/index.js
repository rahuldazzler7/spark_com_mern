const express = require("express");
const UserController = require("../controllers/userController");
const homeControl = require("../controllers/homeController");
const profileControl = require("../controllers/profileController");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const blogcontrol = require("../controllers/blogController");
const amznController = require("../controllers/amaznProdController");

const router = express.Router();

router.get("/signup");
router.get("/signin");

router.get("/home", homeControl.getPosts);
router.get("/profile", auth, profileControl.getProfile);
router.get("/edit/:id", blogcontrol.getEditblog )
router.get("/amznprods", amznController.categories),
router.get("/allprods", amznController.getAllprods);
router.get("/filter", amznController.categoricalProds);
//router.get("/test", amznController.test);

//router.get('/profile', profileControl.getProfile);
// //passport.authenticate('jwt',{session:false})
// module.exports =router;

module.exports = router;
