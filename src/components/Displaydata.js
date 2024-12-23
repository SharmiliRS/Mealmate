import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DisplayData = () => {
  const navigate = useNavigate();

  // Withings Data States
  const [heartRateData, setHeartRateData] = useState([]);
  const [sleepData, setSleepData] = useState([]);
  const [stepsData, setStepsData] = useState([]);
  const [bpData, setBpData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Manual Data State
  const [manualData, setManualData] = useState(() => {
    const storedData = localStorage.getItem("manual_data");
    return storedData ? JSON.parse(storedData) : {};
  });

  // Function to fetch Withings data
  const fetchWithingsData = async () => {
    const accessToken = localStorage.getItem("withings_access_token");

    if (!accessToken) {
      setError("No Withings access token found. Please connect your wearables.");
      return;
    }

    setLoading(true);
    setError(""); // Reset error before starting the request

    try {
      // Fetch Heart Rate Data
      const heartRateResponse = await axios.post(
        "https://wbsapi.withings.net/measure",
        {
          action: "getmeas",
          meastypes: "11", // Heart rate
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Fetch Sleep Data
      const sleepResponse = await axios.post(
        "https://wbsapi.withings.net/v2/sleep",
        {
          action: "getsummary",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Fetch Steps Data
      const stepsResponse = await axios.post(
        "https://wbsapi.withings.net/v2/measure",
        {
          action: "getactivity",
          meastypes: "1", // Steps
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Fetch Blood Pressure Data
      const bpResponse = await axios.post(
        "https://wbsapi.withings.net/measure",
        {
          action: "getmeas",
          meastypes: "10,35", // Blood pressure (systolic and diastolic)
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Set State with the fetched data
      setHeartRateData(heartRateResponse.data.body.measuregrps || []);
      setSleepData(sleepResponse.data.body.series || []);
      setStepsData(stepsResponse.data.body.activities || []);
      setBpData(bpResponse.data.body.measuregrps || []);
    } catch (err) {
      console.error("Error fetching Withings data:", err);
      setError("Failed to fetch Withings data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Check if the user is connected and fetch Withings data if necessary
  useEffect(() => {
    const wearablesStatus = localStorage.getItem("wearables_status");

    if (wearablesStatus === "success") {
      alert("Successfully connected to Withings!");
      fetchWithingsData();
    } else if (wearablesStatus === "failed") {
      alert("Failed to connect to Withings. Please try again.");
    }

    localStorage.removeItem("wearables_status"); // Clear the status
  }, []);

  const handleConnectToWearables = () => {
    const clientId = "192a97a3726f531a0ea724c069ec1e2ee3882f2e98c23a2628f861020de22c15";
    const redirectUri = "http://localhost:3000/callback"; // Replace with your callback URL
    const scope = "user.info,user.metrics,user.activity";

    window.location.href = `https://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  return (
    <div className="display-data-page">
      <h1>Withings and Manual Data Dashboard</h1>

      {/* Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Loading Spinner */}
      {loading && <p>Loading Withings data...</p>}

      {/* Manual Data Section */}
      <div className="details-container">
        <h2>Manual Details</h2>
        <ul>
          <li>Age: {manualData.age || "N/A"}</li>
          <li>Gender: {manualData.gender || "N/A"}</li>
          <li>Height: {manualData.height || "N/A"} cm</li>
          <li>Weight: {manualData.weight || "N/A"} kg</li>
          <li>Sugar Level: {manualData.sugarLevel || "N/A"} mg/dL</li>
          <li>Blood Pressure: {manualData.bloodPressure || "N/A"} mmHg</li>
        </ul>
      </div>

      {/* Heart Rate Section */}
      <div className="details-container">
        <h2>Heart Rate Data</h2>
        {heartRateData.length > 0 ? (
          <ul>
            {heartRateData.map((measure, index) => (
              <li key={index}>
                <strong>Heart Rate:</strong> {measure.value} bpm
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No heart rate data available.</p>
        )}
      </div>

      {/* Sleep Data Section */}
      <div className="details-container">
        <h2>Sleep Data</h2>
        {sleepData.length > 0 ? (
          <ul>
            {sleepData.map((session, index) => (
              <li key={index}>
                <strong>Start:</strong> {session.startdate}, <strong>End:</strong>{" "}
                {session.enddate}, <strong>Minutes Asleep:</strong> {session.data.total_sleep_time} mins
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No sleep data available.</p>
        )}
      </div>

      {/* Steps Data Section */}
      <div className="details-container">
        <h2>Steps Data</h2>
        {stepsData.length > 0 ? (
          <p>
            <strong>Total Steps Today:</strong> {stepsData[0]?.steps || "N/A"}
          </p>
        ) : (
          !loading && <p>No steps data available.</p>
        )}
      </div>

      {/* Blood Pressure Section */}
      <div className="details-container">
        <h2>Blood Pressure Data</h2>
        {bpData.length > 0 ? (
          <ul>
            {bpData.map((measure, index) => (
              <li key={index}>
                <strong>Systolic:</strong> {measure.systolic}, <strong>Diastolic:</strong>{" "}
                {measure.diastolic}
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No blood pressure data available.</p>
        )}
      </div>

      {/* Buttons */}
      <div className="button-container">
        <button className="wearables-btn" onClick={handleConnectToWearables}>
          CONNECT TO WEARABLES
        </button>
        <button className="suggest-food-btn" onClick={() => navigate("/suggest-food")}>
          SUGGEST FOOD
        </button>
      </div>
    </div>
  );
};

export default DisplayData;
