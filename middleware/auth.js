const jwt = require("jsonwebtoken");

let auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    console.log("Unauthorized");
    return res.json({ status: false, msg: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.secret);
    req.user = decoded;
    console.log("token validatd");
    next();
  } catch (e) {
    console.log("Invalid token");
    res.json({ status: false, msg: "Invalid token" });
  }
};

module.exports = auth;
