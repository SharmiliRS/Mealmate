import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IonIcon } from "react-ion-icon";

const DietPlan = () => {
  const navigate = useNavigate();

  // State for manual inputs
  const [manualData, setManualData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    sugarLevel: "",
    bloodPressure: "",
  });

  // State for form errors
  const [errors, setErrors] = useState({});

  // Validate the form
  const validateForm = () => {
    const newErrors = {};

    // Validate age (positive integer)
    if (!manualData.age || manualData.age <= 0 || !Number.isInteger(Number(manualData.age))) {
      newErrors.age = "Age must be a positive whole number.";
    }

    // Validate gender (allow only "Male", "Female", or "Other", case-insensitive)
    const validGenders = ["Male", "Female", "Other"];
    const formattedGender =
      manualData.gender.trim().charAt(0).toUpperCase() + manualData.gender.trim().slice(1).toLowerCase();
    if (!manualData.gender.trim() || !validGenders.includes(formattedGender)) {
      newErrors.gender = 'Gender must be "Male", "Female", or "Other" (case-insensitive).';
    }

    // Validate height (positive number within a reasonable range)
    if (!manualData.height || manualData.height <= 0 || manualData.height > 300) {
      newErrors.height = "Height must be a positive number less than or equal to 300 cm.";
    }

    // Validate weight (positive number within a reasonable range)
    if (!manualData.weight || manualData.weight <= 0 || manualData.weight > 500) {
      newErrors.weight = "Weight must be a positive number less than or equal to 500 kg.";
    }

    // Validate sugar level (positive number within a reasonable range)
    if (!manualData.sugarLevel || manualData.sugarLevel <= 0 || manualData.sugarLevel > 500) {
      newErrors.sugarLevel = "Sugar level must be a positive number less than or equal to 500 mg/dL.";
    }

    // Validate blood pressure (positive number within a reasonable range)
    if (!manualData.bloodPressure || manualData.bloodPressure <= 0 || manualData.bloodPressure > 300) {
      newErrors.bloodPressure = "Blood pressure must be a positive number less than or equal to 300 mmHg.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    // Store the manual data in localStorage
    localStorage.setItem("manual_data", JSON.stringify(manualData));

    // Navigate to the DisplayData page
    navigate("/display-data", {
      state: { userData: manualData }, // Passing data through navigation state (optional)
    });
  };

  return (
    <div className="dietary-planner-page">
      <div className="planner-container">
        <h1 className="planner-title">
          <em>DIETARY PLANNER</em>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="input-grid">
            <div>
              <label>
                <em>AGE</em>
              </label>
              <input
                type="number"
                value={manualData.age}
                onChange={(e) => setManualData({ ...manualData, age: e.target.value })}
                placeholder="Enter Age"
              />
              {errors.age && <p className="error-message">{errors.age}</p>}
            </div>
            <div>
              <label>
                <em>GENDER</em>
              </label>
              <input
                type="text"
                value={manualData.gender}
                onChange={(e) => setManualData({ ...manualData, gender: e.target.value })}
                placeholder="Enter Gender"
              />
              {errors.gender && <p className="error-message">{errors.gender}</p>}
            </div>
            <div>
              <label>
                <em>HEIGHT</em>
              </label>
              <input
                type="number"
                value={manualData.height}
                onChange={(e) => setManualData({ ...manualData, height: e.target.value })}
                placeholder="Enter Height (cm)"
              />
              {errors.height && <p className="error-message">{errors.height}</p>}
            </div>
            <div>
              <label>
                <em>SUGAR LEVEL</em>
              </label>
              <input
                type="number"
                value={manualData.sugarLevel}
                onChange={(e) => setManualData({ ...manualData, sugarLevel: e.target.value })}
                placeholder="Enter Sugar Level (mg/dL)"
              />
              {errors.sugarLevel && <p className="error-message">{errors.sugarLevel}</p>}
            </div>
            <div>
              <label>
                <em>WEIGHT</em>
              </label>
              <input
                type="number"
                value={manualData.weight}
                onChange={(e) => setManualData({ ...manualData, weight: e.target.value })}
                placeholder="Enter Weight (kg)"
              />
              {errors.weight && <p className="error-message">{errors.weight}</p>}
            </div>
            <div>
              <label>
                <em>BLOOD PRESSURE</em>
              </label>
              <input
                type="number"
                value={manualData.bloodPressure}
                onChange={(e) => setManualData({ ...manualData, bloodPressure: e.target.value })}
                placeholder="Enter BP (mmHg)"
              />
              {errors.bloodPressure && <p className="error-message">{errors.bloodPressure}</p>}
            </div>
          </div>

          <div className="button-container">
            <button type="submit" className="d-submit-btn">
              SUBMIT
            </button>
          </div>
        </form>
      </div>

      <footer>
        {/* Social Icons */}
        <ul className="social_icon">
          <li>
            <p>
              <IonIcon name="logo-facebook" />
            </p>
          </li>
          <li>
            <p>
              <IonIcon name="logo-twitter" />
            </p>
          </li>
          <li>
            <p>
              <IonIcon name="logo-linkedin" />
            </p>
          </li>
          <li>
            <p>
              <IonIcon name="logo-instagram" />
            </p>
          </li>
        </ul>

        {/* Copyright */}
        <p className="copyright">&copy; 2024 MEALMATE. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default DietPlan;
