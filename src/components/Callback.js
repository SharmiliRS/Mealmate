import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const Callback = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get("code");
    console.log("Authorization Code:", authorizationCode); // Log the code

    if (authorizationCode) {
      fetchAccessToken(authorizationCode);
    } else {
      console.error("No authorization code found");
      localStorage.setItem("wearables_status", "failed");
      navigate("/display-data");
    }
  }, [location]);

  const fetchAccessToken = async (authorizationCode) => {
    const clientId = "192a97a3726f531a0ea724c069ec1e2ee3882f2e98c23a2628f861020de22c15"; // Replace with your Withings client ID
    const clientSecret = "7f73c0f4896a1c7a173a0cd61b86757bbbe966dd6e1b52b3effbdb32b0507501"; // Replace with your Withings client secret
    const redirectUri = "http://localhost:3000/callback"; // Replace with your redirect URI

    const tokenUrl = "https://wbsapi.withings.net/v2/oauth2";

    const body = new URLSearchParams({
      action: "requesttoken",
      client_id: clientId,
      client_secret: clientSecret,
      code: authorizationCode,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    });

    try {
      const response = await axios.post(tokenUrl, body, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      const { access_token, refresh_token, userid } = response.data.body;

      localStorage.setItem("withings_access_token", access_token);
      localStorage.setItem("withings_refresh_token", refresh_token);
      localStorage.setItem("withings_user_id", userid);

      localStorage.setItem("wearables_status", "success");

      console.log("Access Token:", access_token);
      console.log("Refresh Token:", refresh_token);

      navigate("/display-data");
    } catch (error) {
      console.error("Error fetching the access token:", error);
      localStorage.setItem("wearables_status", "failed");
      navigate("/display-data");
    }
  };

  return (
    <div className="callback-page">
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .callback-container {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 100vh;
            text-align: center;
            padding: 20px;
            box-sizing: border-box;
          }

          .callback-text {
            font-size: 2rem;
            margin-bottom: 20px;
            color: #333;
          }

          .loader {
            border: 10px solid #f3f3f3;
            border-top: 10px solid rgb(0, 77, 27);
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite;
          }

          /* Mobile responsiveness */
          @media (max-width: 768px) {
            .callback-text {
              font-size: 1.5rem;
            }

            .loader {
              width: 40px;
              height: 40px;
            }
          }

          /* Tablet responsiveness */
          @media (max-width: 480px) {
            .callback-text {
              font-size: 1.2rem;
            }

            .loader {
              width: 35px;
              height: 35px;
            }
          }
        `}
      </style>
      <div className="callback-container">
        <div className="callback-text">Redirecting...</div>
        <div className="loader"></div>
      </div>
    </div>
  );
};

export default Callback;
