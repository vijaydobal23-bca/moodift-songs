import React, { useEffect, useState } from "react";
import FavourateSongs from "../components/FavourateSongs";
import UploadSongs from "../components/uploadSongs";
import ScanMood from "../components/ScanMood";
import Player from "../../expression/components/Player";
import { useSong } from "../hooks/useSong";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./home.scss";
import MobileHeader from "../components/MobileHeader";
import MobileNavigation from "../components/MobileNavigation";
import Sidebar from "../components/Sidebar";
import ProtectedForAdmin from "../components/ProtectedForAdmin";
import SearchSong from "../components/SearchSong";

const Home = () => {
  const navigate = useNavigate();
  const { user, handlelogout } = useAuth();
  const {
    song,
    setSong,
    allSongs,
    favorites,
    activeView,
    setActiveView,
    handleGetAllSongs,
    handleGetFavorites,
    handleToggleFavorite,
    handleUploadSong,
    handleGetSong
  } = useSong();

  const [isScanning, setIsScanning] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadMood, setUploadMood] = useState("happy");
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState({ success: null, message: "" });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    handleGetAllSongs();
    if (user) {
      handleGetFavorites();
    }
  }, [user]);

 
  useEffect(() => {
    const handleClickOutside = () => {
      setIsProfileDropdownOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleFavoriteClick = async (e, songId) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    await handleToggleFavorite(songId);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFile) {
      setUploadStatus({ success: false, message: "Please select an MP3 file to upload." });
      return;
    }

    setIsUploading(true);
    setUploadStatus({ success: null, message: "" });

    const formData = new FormData();
    formData.append("song", uploadFile);
    formData.append("mood", uploadMood);
    if (uploadTitle) {
      formData.append("title", uploadTitle);
    }

    try {
      await handleUploadSong(formData);
      setUploadStatus({ success: true, message: "Song uploaded and integrated successfully!" });
      setUploadTitle("");
      setUploadFile(null);
      // Clear file input manually
      document.getElementById("songFileInput").value = "";
    } catch (err) {
      console.error("Upload error details:", err.response || err);
      const backendError = err.response?.data?.message || "Make sure file is valid and under 60MB.";
      setUploadStatus({ success: false, message: `Upload failed: ${backendError}` });
    } finally {
      setIsUploading(false);
    }
  };

  const isSongFavorited = (songId) => {
    return favorites.some((fav) => fav._id === songId);
  };

  return (
    <div className="spotify-dashboard">
      <MobileHeader 
        setIsMenuOpen={setIsMenuOpen}
        setActiveView={setActiveView}
        user={user}
        handlelogout={handlelogout}
        navigate={navigate}
      />

      <MobileNavigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeView={activeView}
        setActiveView={setActiveView}
        user={user}
        handlelogout={handlelogout}
        navigate={navigate}
        setIsScanning={setIsScanning}
      />

      <Sidebar
        activeView={activeView}
        setActiveView={setActiveView}
        user={user}
        navigate={navigate}
        favorites={favorites}
        setIsScanning={setIsScanning}
      />

      {/* Main Panel Content with rounded borders & dynamic background */}
      <main className={`spotify-dashboard__main main-gradient-${activeView}`}>
        {/* Spotify Content Header */}
        <header className="main-panel-header">
          <div className="nav-history-buttons">
            <button className="nav-arrow-btn" disabled>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <button className="nav-arrow-btn" disabled>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>
          </div>

          <div className="header-auth-section">
            {user ? (
              <div className="user-profile-menu-container" onClick={(e) => e.stopPropagation()}>
                <button 
                  className={`profile-pill-button ${isProfileDropdownOpen ? 'active' : ''}`}
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                >
                  <div className="avatar">
                    {user.username ? user.username.substring(0, 1).toUpperCase() : "U"}
                  </div>
                  <span className="username">{user.username}</span>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="arrow-icon">
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>

                {isProfileDropdownOpen && (
                  <ul className="profile-dropdown-menu">
                    <li onClick={() => { handlelogout(); setIsProfileDropdownOpen(false); }}>
                      <span>Log Out</span>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <div className="auth-buttons-wrapper">
                <button className="auth-btn-signup" onClick={() => navigate("/register")}>Sign up</button>
                <button className="auth-btn-login" onClick={() => navigate("/login")}>Log in</button>
              </div>
            )}
          </div>
        </header>

        {activeView === "home" && (
          <>
            <div className="playlist-header">
              <h1>All Songs</h1>
            </div>
            <div className="songs-grid">
              {allSongs.map((songItem) => (
                <div
                  key={songItem._id}
                  className="song-card"
                  onClick={() => setSong(songItem)}
                >
                  <div className="song-card__cover-wrapper">
                    <img
                      src={songItem.posterUrl}
                      alt={songItem.title}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300";
                      }}
                    />
                    <button className="play-overlay-btn" onClick={(e) => { e.stopPropagation(); setSong(songItem); }}>
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="black">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                  <div className="song-card__info">
                    <div className="title" title={songItem.title}>{songItem.title}</div>
                    <div className="flex-meta">
                      <span className="mood-badge">{songItem.mood || "general"}</span>
                      <button
                        className={`fav-heart-btn ${isSongFavorited(songItem._id) ? "favorited" : ""}`}
                        onClick={(e) => handleFavoriteClick(e, songItem._id)}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeView === "search" && (
          <>
            <div className="playlist-header" style={{ marginBottom: "20px" }}>
              <h1>Search</h1>
              <div style={{ marginTop: "15px" }}>
                <SearchSong />
              </div>
            </div>
            <div className="songs-grid">
              {allSongs.map((songItem) => (
                <div
                  key={songItem._id}
                  className="song-card"
                  onClick={() => setSong(songItem)}
                >
                  <div className="song-card__cover-wrapper">
                    <img
                      src={songItem.posterUrl}
                      alt={songItem.title}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300";
                      }}
                    />
                    <button className="play-overlay-btn" onClick={(e) => { e.stopPropagation(); setSong(songItem); }}>
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="black">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                  <div className="song-card__info">
                    <div className="title" title={songItem.title}>{songItem.title}</div>
                    <div className="flex-meta">
                      <span className="mood-badge">{songItem.mood || "general"}</span>
                      <button
                        className={`fav-heart-btn ${isSongFavorited(songItem._id) ? "favorited" : ""}`}
                        onClick={(e) => handleFavoriteClick(e, songItem._id)}
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeView === "favorites" && (
          <>
          <FavourateSongs
            favorites={favorites}
            user={user}
            setSong={setSong}
            handleFavoriteClick={handleFavoriteClick}
          />
          </>
        )}

        {activeView === "upload" && (
          <ProtectedForAdmin>
            <UploadSongs
              handleFormSubmit={handleFormSubmit}
              setUploadFile={setUploadFile}
              uploadTitle={uploadTitle}
              setUploadTitle={setUploadTitle}
              uploadMood={uploadMood}
              setUploadMood={setUploadMood}
              isUploading={isUploading}
              uploadStatus={uploadStatus}
            />
          </ProtectedForAdmin>
        )}
      </main>

      {/* Floating Audio Player */}
      <Player />

      {/* Webcam Expression Scanning Overlay */}
      {isScanning && (
        <ScanMood
          setIsScanning={setIsScanning}
          handleGetSong={handleGetSong}
        />
      )}
    </div>
  );
};

export default Home;
