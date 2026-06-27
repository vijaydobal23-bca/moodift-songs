const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload.middleware");
const songController = require("../controller/song.controller");
const authMiddleware = require("../middleware/auth.middleware");

router.post("/",authMiddleware.identifyArtist,upload.single("song"),songController.uploadSongs);

router.get("/all", songController.getAllSongs);
router.get("/search/:songName", songController.searchSong);
router.get("/",songController.getSong);
module.exports = router;     