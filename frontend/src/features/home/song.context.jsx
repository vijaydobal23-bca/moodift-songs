import React, { createContext, useState } from "react";
import axios from "axios";

export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setSong] = useState(null);
  const [allSongs, setAllSongs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeView, setActiveView] = useState("home");

  const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
  });

  const handleGetAllSongs = async () => {
    try {
      const response = await api.get("/songs/all");
      if (response.data.songs) {
        setAllSongs(response.data.songs);
      }
    } catch (error) {
      console.error("Error fetching all songs", error);
    }
  };

  const handleSearchSong = async (searchQuery) => {
    try {
      if (!searchQuery.trim()) {
        await handleGetAllSongs();
        return;
      }
      const response = await api.get(`/songs/search/${encodeURIComponent(searchQuery)}`);
      if (response.data.songs) {
        setAllSongs(response.data.songs);
      }
    } catch (error) {
      console.error("Error searching songs", error);
    }
  };

  const handleGetSong = async ({ mood }) => {
    try {
      const response = await api.get(`/songs?mood=${mood}`);
      if (response.data.song) {
        setSong(response.data.song);
      }
    } catch (error) {
      console.error("Error fetching song by mood", error);
    }
  };

  const handleGetFavorites = async () => {
    try {
      const response = await api.get("/favorites");
      if (response.data.songs) {
        setFavorites(response.data.songs);
      }
    } catch (error) {
      console.error("Error fetching favorites", error);
    }
  };

  const handleToggleFavorite = async (songId) => {
    try {
      await api.post("/favorites/toggle", { songId });
      await handleGetFavorites(); // Refresh list after toggle
    } catch (error) {
      console.error("Error toggling favorite", error);
    }
  };

  const handleUploadSong = async (formData) => {
    try {
      await api.post("/songs", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      await handleGetAllSongs(); // Refresh songs list after upload
    } catch (error) {
      console.error("Error uploading song", error);
      throw error;
    }
  };

  return (
    <SongContext.Provider
      value={{
        song,
        setSong,
        allSongs,
        favorites,
        activeView,
        setActiveView,
        handleGetAllSongs,
        handleSearchSong,
        handleGetFavorites,
        handleToggleFavorite,
        handleUploadSong,
        handleGetSong
      }}
    >
      {children}
    </SongContext.Provider>
  );
};
