import React from "react";
import "../styles/MobileHeader.scss";

const MobileHeader = ({ setIsMenuOpen, setActiveView, user, handlelogout, navigate }) => {
  return (
    <header className="mobile-header">
      <button className="hamburger-btn" onClick={(e) => { e.stopPropagation(); setIsMenuOpen(true); }}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
      </button>
      <div className="mobile-header__logo" onClick={() => setActiveView("home")}>
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.076-.67-.135-.747-.472-.076-.336.136-.67.472-.746 3.854-.88 7.15-.506 9.822 1.13.295.18.387.563.206.863zm1.225-2.72c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.08-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.66-1.11 8.225-.573 11.35 1.348.367.226.488.707.26 1.07zm.106-2.833C14.736 8.922 9.5 8.75 6.455 9.675c-.47.143-.967-.123-1.11-.592-.143-.47.123-.967.592-1.11C9.4 6.88 15.19 7.07 19.336 9.533c.423.25.563.8.312 1.223-.25.424-.8.563-1.223.312z" />
        </svg>
        <span>Moodify</span>
      </div>
      <div className="mobile-header__user">
        {user ? (
          <div className="mobile-header__user-menu">
            <div className="avatar">
              {user.username ? user.username.substring(0, 1).toUpperCase() : "U"}
            </div>
            <button className="mobile-logout-btn" onClick={handlelogout}>
              Log Out
            </button>
          </div>
        ) : (
          <button className="mobile-login-btn" onClick={() => navigate("/login")}>
            Log In
          </button>
        )}
      </div>
    </header>
  );
};

export default MobileHeader;
