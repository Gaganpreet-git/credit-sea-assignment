import React, { useState } from "react";
import "./upload-report.css"; 

const UploadReport = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "text/xml") {
      setFile(selectedFile);
      setProgress(0);
      setMessage("");
    } else {
      setFile(null);
      setMessage("Only XML files are allowed.");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setProgress(0);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3001/credit-profile", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Upload failed");
      }
      setMessage("File uploaded successfully");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setProgress(100);
    }
  };

  return (
    <div className="file-upload-container">
      <h2>Upload XML File</h2>
      <input type="file" accept=".xml" onChange={handleFileChange} className="file-input" />
      {message && <p className="message">{message}</p>}
      {file && <p className="file-name">File Selected: {file.name}</p>}
      {file && <button onClick={handleUpload} className="upload-button">Upload</button>}
      {progress > 0 && (
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default UploadReport;
