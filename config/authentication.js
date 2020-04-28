const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.authenticate = (req, res) => {
  const { semail, spassword } = req.body;
  let errors = [];

  if (!semail || !spassword) {
    return res.json({
      status: false,
      msg: "Please fill all the require filled",
    });
  } else {
    User.findOne({ email: semail }).then((user) => {
      if (!user) {
        return res.json({ status: false, msg: "User does not exsist" });
      } else {
        bcrypt.compare(spassword, user.password).then((isMatch) => {
          if (!isMatch) {
            return res.json({ status: false, msg: "Invalid credentials" });
          } else if (isMatch) {
            jwt.sign(
              { id: user.id },
              process.env.secret,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) throw err;
                res.json({
                  status: true,
                  token,
                  user: {
                    id: user._id,
                    firstname: user.firstname,
                  },
                });
              }
            );
          }
        });
      }
    });
  }
};
