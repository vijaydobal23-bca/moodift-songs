const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  songId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "songs",
    required: true,
  },
}, { timestamps: true });

// Ensure a user can only favorite a song once
favoriteSchema.index({ userId: 1, songId: 1 }, { unique: true });

const favoriteModel = mongoose.model("favorites", favoriteSchema);
module.exports = favoriteModel;
