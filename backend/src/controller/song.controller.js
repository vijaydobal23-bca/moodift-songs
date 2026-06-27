const songModel = require("../model/song.model");
const id3 = require("node-id3");
const storageService = require("../services/storage.service");

async function uploadSongs(req, res) {
  try {
    const { mood } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No song file provided" });
    }

    const songBuffer = req.file.buffer;
    let tags = {};
    try {
      tags = id3.read(songBuffer) || {};
    } catch (e) {
      console.log("Could not read ID3 tags:", e);
    }

    // Default title is either ID3 title, or req.body.title, or filename without extension
    const title = tags.title || req.body.title || req.file.originalname.replace(/\.[^/.]+$/, "");

    let posterBuffer = null;
    let posterFilename = title + ".jpeg";

    if (tags.image && tags.image.imageBuffer) {
      posterBuffer = tags.image.imageBuffer;
    }

    let songFile;
    let posterFile;

    if (posterBuffer) {
      const [songUpload, posterUpload] = await Promise.all([
        storageService.uploadFile({
          buffer: songBuffer,
          filename: title + ".mp3",
          folder: "/cohort-2/moodify/songs",
        }),
        storageService.uploadFile({
          buffer: posterBuffer,
          filename: posterFilename,
          folder: "cohort-2/moodify/posters",
        }),
      ]);
      songFile = songUpload;
      posterFile = posterUpload;
    } else {
      // Only upload the song file
      songFile = await storageService.uploadFile({
        buffer: songBuffer,
        filename: title + ".mp3",
        folder: "/cohort-2/moodify/songs",
      });
      // Fallback Cover image URL
      posterFile = { url: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300" };
    }

    const song = await songModel.create({
      title,
      url: songFile.url,
      posterUrl: posterFile.url,
      mood,
    });

    res.status(201).json({
      message: "Song created",
      song
    });
  } catch (error) {
    console.error("Error in uploadSongs:", error);
    res.status(500).json({ message: "Error uploading song" });
  }
}


async function getSong(req ,res){
  const {mood} =req.query;
  const songs = await songModel.find({ mood });
  const song = songs.length > 0 ? songs[Math.floor(Math.random() * songs.length)] : null;

  res.status(200).json({
    message:"Song fetched sucessfully",
    song
  })
}

async function getAllSongs(req, res) {
  try {
    const songs = await songModel.find({});
    res.status(200).json({
      message: "Songs fetched successfully",
      songs
    });
  } catch (error) {
    console.error("Error in getAllSongs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function searchSong(req, res) {
  try {
    const { songName } = req.params;
    
    const songs = await songModel.find({ title: { $regex: songName, $options: "i" } });
    
    res.status(200).json({
      message: "Songs fetched successfully",
      songs
    });
  } catch (error) {
    console.error("Error in searchSong:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  uploadSongs,
  getSong,
  getAllSongs,
  searchSong
};
