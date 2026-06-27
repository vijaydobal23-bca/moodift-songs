import React from "react";

const UploadSongs = ({ handleFormSubmit, setUploadFile, uploadTitle, setUploadTitle, uploadMood, setUploadMood, isUploading, uploadStatus }) => {
  return (
    <div className="upload-container">
      <h2>Partner Song Upload</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Song File (.mp3)</label>
          <input
            id="songFileInput"
            type="file"
            accept="audio/mp3"
            onChange={(e) => setUploadFile(e.target.files[0])}
          />
        </div>

        <div className="form-group">
          <label>Title (Optional - will extract from tags or filename)</label>
          <input
            type="text"
            placeholder="e.g. My Awesome Song"
            value={uploadTitle}
            onChange={(e) => setUploadTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Song Mood</label>
          <select
            value={uploadMood}
            onChange={(e) => setUploadMood(e.target.value)}
          >
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="surprised">Surprised</option>
            <option value="neutral">Neutral</option>
          </select>
        </div>

        <button
          type="submit"
          className="submit-btn"
          disabled={isUploading}
        >
          {isUploading ? "Uploading & Processing..." : "Upload Song"}
        </button>
      </form>

      {uploadStatus.message && (
        <div
          className={`status-msg ${uploadStatus.success ? "success" : "error"}`}
        >
          {uploadStatus.message}
        </div>
      )}
    </div>
  );
};

export default UploadSongs;
