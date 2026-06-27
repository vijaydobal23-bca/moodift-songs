import React from "react";
import "../styles/MobileNavigation.scss";

const MobileNavigation = ({ isMenuOpen, setIsMenuOpen, activeView, setActiveView, user, handlelogout, navigate, setIsScanning }) => {
  return (
    <>
      <div className={`mobile-drawer ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-drawer__header">
          <div className="logo" onClick={() => { setActiveView("home"); setIsMenuOpen(false); }}>
            <svg viewBox="0 0 24 24" width="28" height="28">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.076-.67-.135-.747-.472-.076-.336.136-.67.472-.746 3.854-.88 7.15-.506 9.822 1.13.295.18.387.563.206.863zm1.225-2.72c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.66-1.11 8.225-.573 11.35 1.348.367.226.488.707.26 1.07zm.106-2.833C14.736 8.922 9.5 8.75 6.455 9.675c-.47.143-.967-.123-1.11-.592-.143-.47.123-.967.592-1.11C9.4 6.88 15.19 7.07 19.336 9.533c.423.25.563.8.312 1.223-.25.424-.8.563-1.223.312z" />
            </svg>
            <span>Moodify</span>
          </div>
          <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
            &times;
          </button>
        </div>

        <nav className="mobile-drawer__links">
          <div
            className={`drawer-item ${activeView === "home" ? "active" : ""}`}
            onClick={() => {
              setActiveView("home");
              setIsMenuOpen(false);
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h5v-5a3 3 0 0 1 6 0v5h5V7.577l-7.5-4.33z" />
            </svg>
            <span>Home</span>
          </div>

          <div
            className={`drawer-item ${activeView === "search" ? "active" : ""}`}
            onClick={() => {
              setActiveView("search");
              setIsMenuOpen(false);
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M10.533 1.278a9.25 9.25 0 1 0 5.679 16.568l4.972 4.972a.75.75 0 1 0 1.06-1.06l-4.97-4.97a9.25 9.25 0 0 0-6.74-15.518zm0 1.5a7.75 7.75 0 1 1 0 15.5 7.75 7.75 0 0 1 0-15.5z"/>
            </svg>
            <span>Search</span>
          </div>

          <div
            className={`drawer-item ${activeView === "favorites" ? "active" : ""}`}
            onClick={() => {
              if (!user) {
                navigate("/login");
              } else {
                setActiveView("favorites");
              }
              setIsMenuOpen(false);
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span>Favorites</span>
          </div>

          <div
            className={`drawer-item ${activeView === "upload" ? "active" : ""}`}
            onClick={() => {
              setActiveView("upload");
              setIsMenuOpen(false);
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" />
            </svg>
            <span>Upload Song</span>
          </div>

          <div
            className="drawer-item drawer-item--scan"
            onClick={() => {
              setIsScanning(true);
              setIsMenuOpen(false);
            }}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
            </svg>
            <span>Scan Mood</span>
          </div>
        </nav>

        <div className="mobile-drawer__footer">
          {user ? (
            <>
              <div className="user-info">
                <div className="avatar">
                  {user.username ? user.username.substring(0, 1).toUpperCase() : "U"}
                </div>
                <div className="name">{user.username || "User"}</div>
              </div>
              <button
                className="drawer-auth-btn drawer-auth-btn--logout"
                onClick={() => {
                  handlelogout();
                  setIsMenuOpen(false);
                }}
              >
                Log Out
              </button>
            </>
          ) : (
            <button
              className="drawer-auth-btn drawer-auth-btn--login"
              onClick={() => {
                navigate("/login");
                setIsMenuOpen(false);
              }}
            >
              Log In
            </button>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="mobile-drawer-backdrop" onClick={() => setIsMenuOpen(false)} />
      )}
    </>
  );
};

export default MobileNavigation;
