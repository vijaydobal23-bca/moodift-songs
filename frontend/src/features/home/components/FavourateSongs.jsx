import React from "react";

const FavourateSongs = ({ favorites, user, setSong, handleFavoriteClick }) => {
  return (
    <>
      {/* Spotify-style Liked Songs Hero Banner */}
      <div className="spotify-playlist-banner">
        <div className="banner-cover-wrapper">
          <div className="liked-songs-gradient-box">
            <svg viewBox="0 0 24 24" width="60" height="60" fill="white">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
        </div>
        <div className="banner-text-info">
          <span className="playlist-tag">Playlist</span>
          <h1 className="playlist-title">Liked Songs</h1>
          <div className="playlist-meta-row">
            <span className="user-name">{user?.username || "User"}</span>
            <span className="bullet-separator">•</span>
            <span className="song-count">{favorites.length} songs</span>
          </div>
        </div>
      </div>

      <div className="playlist-content-section">
        {/* Play bar inside playlist */}
        {favorites.length > 0 && (
          <div className="playlist-action-bar">
            <button className="big-green-play-btn" onClick={() => setSong(favorites[0])}>
              <svg viewBox="0 0 24 24" width="28" height="28" fill="black">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        )}

        <div className="songs-grid">
          {favorites.length > 0 ? (
            favorites.map((songItem) => (
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
                      className="fav-heart-btn favorited"
                      onClick={(e) => handleFavoriteClick(e, songItem._id)}
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ color: "#b3b3b3", padding: "16px" }}>
              No favorite songs yet. Go to Home to add some!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FavourateSongs;
