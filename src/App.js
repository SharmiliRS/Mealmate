import React  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import About from "./components/About";
import Dietitian from "./components/Dietitian";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Navbar from "./components/Navbar";
import Contact from "./components/Contact";
import DietPlan from "./components/Dietplan";
import Callback from "./components/Callback";
import SuggestFoodPage from "./components/Suggestfood";
import DisplayData from "./components/Displaydata";
import TrackProgress from "./components/Trackprogress";

function App() {
  
  return (
    
    <Router>
      
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/dietitian" element={<Dietitian />} />
        <Route path="/dietplan" element={<DietPlan />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/suggest-food" element={<SuggestFoodPage />}/>
        <Route path="/display-data" element={<DisplayData />} />
        <Route path="/trackprogress" element={<TrackProgress />} />
      </Routes>
    </Router>
  );
}

export default App;
