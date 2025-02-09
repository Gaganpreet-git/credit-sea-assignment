import Header from "./components/Header/Header";
import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import UploadReport from "./components/pages/upload-report/upload-report";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload-report" element={<UploadReport />} />
      </Routes>
    </div>
  );
}

export default App;
