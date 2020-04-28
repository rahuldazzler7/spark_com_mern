const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.getProfile = (req,res, next)=>{
    // User.findById(req.params.id, (err,user)=>{
    //     if(err) throw err;
    //     else{
    //         res.json({user : user})
    //     }
    // })

    
      res.json({user: req.user});
      
}