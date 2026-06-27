import React from "react";
import FaceExpression from "../../expression/components/FaceExpression";

const ScanMood = ({ setIsScanning, handleGetSong }) => {
  return (
    <div className="camera-modal">
      <div className="camera-modal__content">
        <button className="close-btn" onClick={() => setIsScanning(false)}>
          &times;
        </button>
        <h3>Scan Your Mood</h3>
        <FaceExpression
          onClick={(detectedMood) => {
            if (detectedMood) {
              handleGetSong({ mood: detectedMood.toLowerCase() });
              setIsScanning(false);
            } else {
              console.warn("No face detected");
            }
          }}
        />
      </div>
    </div>
  );
};

export default ScanMood;
