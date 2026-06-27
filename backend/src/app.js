const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");

const authRouter = require("./routes/auth.routes");
const songRouter = require("./routes/song.routes");
const favoriteRouter = require("./routes/favorite.routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(cookieParser());

app.use(cors({ 
  origin: ["http://localhost:5173", "https://moodift-songs-pbhm.vercel.app"],
  credentials: true
}));

app.use("/api/auth", authRouter);
app.use("/api/songs",songRouter);
app.use("/api/favorites", favoriteRouter);

module.exports = app;
