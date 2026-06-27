const mongoose = require("mongoose");
const dns = require("dns");

// Set DNS to Google's public DNS to fix "querySrv ECONNREFUSED" on certain networks (e.g., Jio)
dns.setServers(["8.8.8.8", "8.8.4.4"]);


function connectDb(){
  mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Database connected")
  }).catch((err)=>{
    console.log(err); 
  })
}

module.exports = connectDb;