const userModel = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const blacklistmodel = require("../model/blacklist.model");
const redis = require("../config/cache");

async function registerUser(req, res) {
  try {
    const { username, email, password } = req.body;
    const isAlreadyRegister = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isAlreadyRegister) {
      return res.status(400).json({
        message: "User already register",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      },
    );

    res.cookie("token", token);

    return res.status(201).json({
      message: "User register successfully",
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}   

async function loginUser(req, res) {
  
  try {
    const { username, email, password } = req.body;

    console.log(req.body);

    const user = await userModel
      .findOne({
        $or: [{ username }, { email }],
      })
      .select("+password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid credential",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credential",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      },
    );

    res.cookie("token", token);

    return res.status(200).json({
      message: "User login successfully",
      user: { id: user._id, username: user.username, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function getMe(req, res) {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    return res.status(400).json({
      message: "user not found",
    });
  }

  return res.status(200).json({
    message: "user featched sucessfully",
    user,
  });
}

async function logoutUser(req, res) {

  const token = req.cookies.token;
  res.clearCookie(token);
  
  await redis.set(token,Date.now().toString(),"EX",60*60);
  res.status(201).json({
    message: "logout sucessfull",
  });
}

async function RegisterAsArtist(req, res) {
  try {
    const { username, email, password } = req.body;
    const isAlreadyRegister = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isAlreadyRegister) {
      return res.status(400).json({
        message: "User already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const artist = await userModel.create({
      username,
      email,
      password: hashedPassword,
      role: "artist"
    });

    const token = jwt.sign(
      {
        id: artist._id,
        username: artist.username,
        role: artist.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      }
    );

    res.cookie("token", token);

    return res.status(201).json({
      message: "Artist registered successfully",
      user: { id: artist._id, username: artist.username, email: artist.email, role: artist.role },
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}

module.exports = { registerUser, loginUser, getMe, logoutUser ,RegisterAsArtist};
