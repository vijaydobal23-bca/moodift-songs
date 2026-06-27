const blacklistmodel = require("../model/blacklist.model");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided",
    });
  }

  const isTokenBlacklisted = await redis.get(token);
  if(isTokenBlacklisted){
    return res.status(401).json({
      message:"Invalid token - blacklisted"
    })
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
  }
}

async function identifyArtist(req ,res,next){
  const token= req.cookies.token;
  
  const isTokenBlacklisted = await redis.get(token);
  if(isTokenBlacklisted){
    return res.status(401).json({
      message:"Invalid token - blacklisted"
    })
  }


  if(!token){
    return res.status(400).json({
      message:"Token is not provided",
    })
  }

  try{
    const decoded = await jwt.verify(token , process.env.JWT_SECRET);

    if(decoded.role !== "artist" && decoded.role !== "admin"){
      return res.status(403).json({
        message:"You are not authorized to upload songs",
      })
    };

    req.artist = decoded;
    next();

    
  }
  catch{
    return res.status(401).json({
      message:"Invalid token - blacklisted"
    })
  }
  
}

module.exports  = {
  authUser,
  identifyArtist
}