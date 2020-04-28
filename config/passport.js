const JwtStrategy = require('passport-jwt').Strategy;
const Extractjwt = require('passport-jwt').ExtractJwt;
const dotend = require('dotenv').config();
const User = require('../models/User');
const LocalStrategy = require('passport-local');

module.exports = (passport)=>{
    let opts = {};
    opts.jwtFromRequest = Extractjwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = process.env.secret;
    passport.use(new JwtStrategy(opts,(jwt_payload, done)=>{
        User.getUserById(jwt_payload._id, (err, user)=>{
            if(err){
                return done(err, false);
            }
            if(user){
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        });
    }));
}
