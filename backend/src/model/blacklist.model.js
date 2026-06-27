const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
  token:{
    type:String,
    required:[true , "Token is required for blacklist"],
  }
},{timestamps:true});


const blacklistmodel = mongoose.model("blacklist" , blacklistSchema);

module.exports = blacklistmodel;
