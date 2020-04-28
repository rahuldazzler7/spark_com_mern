const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const dotend = require('dotenv').config();

exports.postSignup = (req, res)=>{
    const {firstname, lastname, email, username, password, password2, lng, lat} = req.body;
    let errors = [];

    if(!firstname || !lastname || !email || !username || !password || !password2){
        return res.json({status: false, msg:'Please fill all the require filled'});
    }
    if(password.length < 7){
        return  res.json({status: false, msg:'Password needs to be atleast 7 charecters'});
    }
    if(password != password2){
        return res.json({status: false, msg:'Passwords do not match'});
    }
    if(errors.length > 0){
        res.json({status: false, msg:'Something went wrong'});
    }
    else{
        User.findOne({$or:[{email: email},{username:username}]})
        .then(user=>{
            if(user){
                res.json({status: false, msg:'User already exists, Please check with username or Email'});
            }
            else{
                const newUser = new User({
                    firstname, lastname, email, username, password, lng, lat
                });
                bcrypt.genSalt(10, (err,salt)=> bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(reguser=>{
                        res.json({status: true, msg:'You`re Successfully registered'});
                    })
                    .catch(err=>console.log(err));
                }))
            }
        })
    }
}

exports.postSignin = (req, res)=>{
    const { semail,spassword } = req.body;

    User.getUserByEmail(semail, (err,user)=>{
        if(err) throw err;
        if(!user){
            return res.json({status: false, msg: 'User not found' });
        }
        User.confirmPassword(spassword, user.password, (err, isMatch)=>{
            if(err) throw err;
            if(!isMatch){
                return res.json({status: false, msg: 'Password is incorrect' });
            }
            if(isMatch){
                const token = jwt.sign(user.toJSON(), process.env.secret,{
                    expiresIn: 604800
                });
                res.json({status:true, token:`JWT ${token}`,
                user:{
                    id: user._id,
                    firstname: user.firstname,
                    username: user.username,
                    isAdmin: user.isAdmin
                }
            });
            }
            else{
                return res.json({status: false, msg: 'User not found' });
            }
        })

    })
}