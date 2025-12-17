

import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import Home from "./Home";
import Veg from "./Veg.jsx";
import Nonveg from "./Nonveg";
import Drinks from "./Drinks";
import Icecreams from "./Icecreams";
import Contact from "./Contact";
import About from "./About";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "./store";   // ✅ IMPORTED CORRECT
import Cart from "./Cart";
import Orders from "./Orders";
import { ToastContainer } from "react-toastify";
import Registration from "./Registration";
import Login from "./Login";
import AccountDropdown from "./AccountDropdown";
import SearchResults from "./SearchResults.jsx";
import VoiceAssistant from "./VoiceAssistant.jsx";

function App() {

  const dispatch = useDispatch();  // ✅ ADDED
  const navigate = useNavigate();

  // 🔄 ROTATING SEARCH PLACEHOLDER
  const searchTexts = [
    "Search Veg...",
    "Search Nonveg...",
    "Search Starters...",
    "Search Drinks...",
    "Search Icecreams...",
    "Search Biryani...",
    "Search Paneer...",
    "Search Chicken Curry..."
  ];

  const [placeholderText, setPlaceholderText] = useState(searchTexts[0]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % searchTexts.length;
      setPlaceholderText(searchTexts[index]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  let cartItems = useSelector(globalState => globalState.cart.items || []);
  let cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // ✅ HANDLE SEARCH (NOW WORKING)
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    dispatch(setSearchTerm(value)); // ⭐ UPDATE REDUX SEARCH TERM

    if (value.trim() === "") {
      navigate("/");
      return;
    }

    navigate(`/search?query=${encodeURIComponent(value)}`);
  };

  return (
    <>
      <ToastContainer />

      {/* SALE BAR */}
      <div className="sale-bar">
        <div className="sale-carousel">
          <span>🎉 November SALE</span>
          <span>💥 40% OFF!</span>
          <span>Hurry Up And Get Your 40% OFF!</span>
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid d-flex justify-content-between align-items-center">


          {/* ✅ RUCHIZONE LOGO LEFT SIDE */}
          <div className="d-flex align-items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/857/857681.png"
              alt="food"
              style={{ width: "40px", height: "40px" }}
            />

            <h2 className="text-white fw-bold m-0" style={{ letterSpacing: "1px" }}>
              Ruchi<span style={{ color: "#ffcc00" }}>Zone</span>
            </h2>

            <img
              src="https://cdn-icons-png.flaticon.com/512/1404/1404945.png"
              alt="food"
              style={{ width: "40px", height: "40px", marginLeft: "5px" }}
            />
          </div>

          <button
            className="navbar-toggler text-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
          >
            ☰
          </button>

          <div className="collapse navbar-collapse" id="menu">
            <ul className="navbar-nav mx-auto">
              <li><Link className="nav-link custom-nav-link" to="/">🏠Home</Link></li>
              <li><Link className="nav-link custom-nav-link" to="/veg">🫜Veg</Link></li>
              <li><Link className="nav-link custom-nav-link" to="/nonveg">🍗Nonveg</Link></li>
              
              <li><Link className="nav-link custom-nav-link" to="/drinks">🍹Drinks</Link></li>
              {/* <li><Link className="nav-link custom-nav-link" to="/icecreams">🍨Icecreams</Link></li> */}
              <li><Link className="nav-link custom-nav-link" to="/contact">📞Contact</Link></li>
              <li><Link className="nav-link custom-nav-link" to="/about">About</Link></li>
              <li><Link className="nav-link custom-nav-link" to="/cart">🛒Cart{cartCount}</Link></li>
              <li><Link className="nav-link custom-nav-link" to="/orders">Orders</Link></li>

              <AccountDropdown />
            </ul>
          </div>

          {/* 🔍 SEARCH BAR (NOW WORKING) */}
          <input
            type="text"
            placeholder={placeholderText}
            value={searchText}
            onChange={handleSearch}  // ⭐ FIXED
            style={{
              width: "200px",
              padding: "6px 12px",
              borderRadius: "20px",
              border: "2px solid white",
              backgroundColor: "white",
              fontWeight: "bold",
              animation: "colorChange 4s infinite",
            }}
          />
          {/* 🤖 VOICE BOT */}
          <div style={{ marginLeft: "10px" }}>
            <VoiceAssistant />
          </div>

        </div>
      </nav>

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/veg" element={<Veg />} />
        <Route path="/nonveg" element={<Nonveg />} />
        
        <Route path="/drinks" element={<Drinks />} />
        {/* <Route path="/icecreams" element={<Icecreams />} /> */}
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />

        {/* SEARCH RESULTS PAGE */}
        <Route path="/search" element={<SearchResults />} />

      </Routes>
    </>
  );
}

export default App;

