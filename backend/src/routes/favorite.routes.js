const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const favoriteController = require("../controller/favorite.controller");

router.post("/toggle", authMiddleware.authUser, favoriteController.toggleFavorite);
router.get("/", authMiddleware.authUser, favoriteController.getFavorites);

module.exports = router;
