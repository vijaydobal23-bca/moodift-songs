const favoriteModel = require("../model/favorite.model");

async function toggleFavorite(req, res) {
  try {
    const { songId } = req.body;
    const userId = req.user.id;

    if (!songId) {
      return res.status(400).json({ message: "Song ID is required" });
    }

    const existing = await favoriteModel.findOne({ userId, songId });

    if (existing) {
      await favoriteModel.deleteOne({ userId, songId });
      return res.status(200).json({
        message: "Removed from favorites",
        isFavorite: false
      });
    } else {
      await favoriteModel.create({ userId, songId });
      return res.status(201).json({
        message: "Added to favorites",
        isFavorite: true
      });
    }
  } catch (error) {
    console.error("Error in toggleFavorite:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getFavorites(req, res) {
  try {
    const userId = req.user.id;
    const favorites = await favoriteModel.find({ userId }).populate("songId");
    
    // Extract only the populated song objects, filter out any deleted songs
    const songs = favorites.map(fav => fav.songId).filter(song => song !== null);

    res.status(200).json({
      message: "Favorites fetched successfully",
      songs
    });
  } catch (error) {
    console.error("Error in getFavorites:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  toggleFavorite,
  getFavorites
};
