const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
  url:{
    type:String,
    required:true
  },
 
  posterUrl:{
    type:String,
    required:true
  },

  title:{
    type:String,
    required:true
  },

  mood:{
    type:String,
    enum:["sad","happy" ,"surprised" ,"neutral"]
  }
});

const songModel = mongoose.model("songs",songSchema);
module.exports = songModel;