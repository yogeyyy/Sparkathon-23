import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

// // Import your route components here
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import Products from './components/Products';
// import Cart from './components/Cart';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Navbar />
    <Routes>
      <Route exact path="/" element={<App />}></Route>
      <Route index element={<Home />} />
      <Route exact path="/about" element={<About />}></Route>
    </Routes>
    <Footer />
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
