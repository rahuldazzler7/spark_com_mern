const mongoose = require('mongoose');

const AmaznSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    sub_category:{
        type:String,
        required:true
    },
    product_url:{
        type:String,
        required:true
    },
    tags:{
        type:String,
    },
    source:{
        type:String,
    },
    img:{
        type:String,
        required:true
    },
    timest:{
        type:Date,
        default: Date.now
    },

});

const amzprod = mongoose.model('amzprod',AmaznSchema);
module.exports = amzprod;