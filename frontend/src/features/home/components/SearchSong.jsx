import React, { useState, useEffect, useRef } from "react";
import { useSong } from "./../hooks/useSong";
import "../pages/home.scss"; // Use general styles or create specific ones if needed

const SearchSong = () => {
  const { handleSearchSong } = useSong();
  const [search, setSearch] = useState("");
  const debounceTimeout = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Clear the previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout
    debounceTimeout.current = setTimeout(() => {
      handleSearchSong(value);
    }, 500); // 500ms delay
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    handleSearchSong(search);
  };

  return (
    <div className="search-song-container" style={{ width: "100%", maxWidth: "450px" }}>
      <form onSubmit={handleFormSubmit} style={{ display: "flex", width: "100%", position: "relative" }}>
        <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#121212", display: "flex", alignItems: "center" }}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M10.533 1.278a9.25 9.25 0 1 0 5.679 16.568l4.972 4.972a.75.75 0 1 0 1.06-1.06l-4.97-4.97a9.25 9.25 0 0 0-6.74-15.518zm0 1.5a7.75 7.75 0 1 1 0 15.5 7.75 7.75 0 0 1 0-15.5z"/>
          </svg>
        </div>
        <input 
          type="text" 
          placeholder="What do you want to listen to?" 
          value={search} 
          onChange={handleInputChange}
          style={{
            width: "100%",
            padding: "12px 16px 12px 40px",
            borderRadius: "24px",
            border: "2px solid transparent",
            backgroundColor: "#ffffff",
            color: "#000000",
            outline: "none",
            fontSize: "14px",
            fontWeight: "500",
            transition: "border 0.3s ease",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}
          onFocus={(e) => e.target.style.border = "2px solid #ffffff"}
          onBlur={(e) => e.target.style.border = "2px solid transparent"}
        />
      </form>
    </div>
  );
};

export default SearchSong;