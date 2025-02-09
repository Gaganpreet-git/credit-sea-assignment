import React, { useState } from "react";
import "./Home.css";
import CreditProfile from "../../CreditProfile/CreditProfile";

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const API_URL = `http://localhost:3001/credit-profile`;

const Home = () => {
  const [pan, setPan] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchData = async () => {
    setError(null);
    setData(null);

    if (!PAN_REGEX.test(pan)) {
      setError("Invalid PAN format. It should be in the format ABCDE1234F.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?pan=${pan}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong.");
      }
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Enter PAN to Fetch Credit Profile</h2>
      <input
        type="text"
        value={pan}
        onChange={(e) => setPan(e.target.value.toUpperCase())}
        placeholder="Enter PAN (ABCDE1234F)"
        maxLength={10}
      />
      <button onClick={handleFetchData} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Credit Profile"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && <CreditProfile data={data} />}
    </div>
  );
};

export default Home;
