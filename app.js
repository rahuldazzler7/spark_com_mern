const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const dotend = require("dotenv").config();
mongoose.Promise = global.Promise;
const cors = require("cors");
const path= require('path');

const app = express();

require(`./config/passport`)(passport);
app.use(cors());
app.use(express.json());

//DB connection

mongoose.connect(process.env.MongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
let db = mongoose.connection;
/*Check connection*/
db.once("open", function () {
  console.log("Connected to Database");
});

/*Check for DB error */
db.on("error", function (err) {
  console.log(`Error occured while connecting to DB - ${err}`);
});

app.use(express.urlencoded({ extended: false }));

//Express Session
app.use(
  session({
    secret: "Rahulsecret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, HEAD, OPTIONS"
  );
  next();
});

// app.use(function(req, res, next) {
//   res.locals.currentuser = req.user;
//   next();
// });

app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/validator"));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT||8000;
app.listen(PORT, console.log(`Server connected to port ${PORT}`));
