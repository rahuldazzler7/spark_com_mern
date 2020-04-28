const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    lat:{
        type:String
    },
    lng:{
        type:String
    },
    timest:{
        type:Date,
        default: Date.now
    },

});

const user = mongoose.model('user',UserSchema);
module.exports = user;

module.exports.getUserById= function(id, callback){
    user.findById(id, callback);
}

module.exports.getUserByEmail= function(email, callback){
    const query = {email: email}
    user.findOne(query, callback);
}

module.exports.confirmPassword= function(userPassword, hash, callback ){
    bcrypt.compare(userPassword, hash, (err, isMatch)=>{
        if(err) throw err;
        callback(null, isMatch);
    })
}