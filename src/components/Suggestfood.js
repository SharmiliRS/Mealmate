import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const SuggestFoodPage = () => {
  const location = useLocation();
  const userData = location.state?.userData || {};
  const [foodSuggestions, setFoodSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFoodSuggestions = async () => {
    const apiKey = "5f0bf1ccbf367f8a869d1e03c28744f1"; // Replace with your valid Edamam API key
    const apiId = "d0724926";   // Replace with your valid Edamam API ID

    // Construct a query string based on user data (simplified example)
    const query = buildQuery(userData);

    if (!query) {
      setError("Unable to build a valid query based on user data.");
      return;
    }

    setLoading(true);
    setError(""); // Reset error
    try {
      const response = await axios.get(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${apiId}&app_key=${apiKey}`
      );

      const recipes = response.data.hits.map((hit) => hit.recipe);
      setFoodSuggestions(recipes);
    } catch (err) {
      console.error("Error fetching food suggestions:", err);
      setError("Failed to fetch food suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Build the search query based on user data (example logic)
  const buildQuery = (data) => {
    let query = "";

    // Example logic for building the query string
    if (data.dietaryRestrictions) {
      query += data.dietaryRestrictions.join(", ");
    } else if (data.sugarLevel < 100) {
      query += "low sugar";
    } else if (data.age > 50) {
      query += "high protein";
    } else {
      query += "balanced diet";
    }

    return query.trim();
  };

  useEffect(() => {
    if (userData) {
      fetchFoodSuggestions();
    }
  }, [userData]);

  return (
    <div className="suggest-food-page">
      <h1>Suggested Foods Based on Your Conditions</h1>

      {loading && <p>Loading food suggestions...</p>}
      {error && <p className="error-message">{error}</p>}

      {foodSuggestions.length > 0 ? (
  <ul className="food-list">
    {foodSuggestions.map((food, index) => (
      <li key={index} className="food-item">
        <a href={food.url} target="_blank" rel="noopener noreferrer">
          <img src={food.image} alt={food.label} />
          <h3>{food.label}</h3>
          <p>Calories: {food.calories.toFixed(0)}</p>
          <p>Cuisine: {food.cuisineType?.join(", ") || "Not specified"}</p>
        </a>
      </li>
    ))}
  </ul>
) : (
  !loading && !error && <p>No food suggestions available.</p>
)}

    </div>
  );
};

export default SuggestFoodPage;
