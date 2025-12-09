import React, { useState, useEffect, useRef } from "react";
import "./Home.css";

function Home() {
  // Background slider images
  const images = [
    "/images/backg1.jpg",
    "/images/backg2.jpg",
    "/images/backg3.jpg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  // Horizontal scroll reference
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  // 20 Food items (10 + 10)
  const items = [
    { name: "Biryani", img: "/images/veg1.jpg" },
    { name: "Shawarma", img: "/images/Shawarma.jpg" },
    { name: "Pizza", img: "/images/pizza.jpg" },
    { name: "Burger", img: "/images/burger.jpg" },
    { name: "Dosa", img: "/images/dosa.jpg" },
    { name: "South Indian", img: "/images/southindian.jpg" },
    { name: "Shake", img: "/images/drinks2.jpg" },
    { name: "Noodles", img: "/images/noodles.jpg" },
    { name: "North Indian", img: "/images/northindian.jpg" },
    { name: "Salad", img: "/images/salad.jpg" },

    // Second row
    { name: "Pure Veg", img: "/images/pureveg.jpg" },
    { name: "Rolls", img: "/images/rolls.jpg" },
    { name: "Ice Cream", img: "/images/icecream.jpg" },
    { name: "Cake", img: "/images/cake.jpg" },
    { name: "Fries", img: "/images/fries.jpg" },
    { name: "Tea", img: "/images/tea.jpg" },
    { name: "Juice", img: "/images/juice.jpg" },
    { name: "Soup", img: "/images/soup.jpg" },
    { name: "Pasta", img: "/images/pasta.jpg" },
  ];

  // ✅ map items OUTSIDE return
  const firstRow = items.slice(0, 10).map((item, i) => (
    <div className="food-card" key={i}>
      <img src={item.img} alt={item.name} />
      <p>{item.name}</p>
    </div>
  ));

  const secondRow = items.slice(10, 20).map((item, i) => (
    <div className="food-card" key={i + 10}>
      <img src={item.img} alt={item.name} />
      <p>{item.name}</p>
    </div>
  ));

  return (
    <>
      {/* HERO SECTION */}
      <div
        className="hero"
        style={{ backgroundImage: `url(${images[index]})` }}
      >
        <div className="hero-content">
          <h1>Delicious Food Delivered Fresh</h1>
          <p>Order your favourite veg & non-veg dishes from our menu.</p>
          <button className="view-btn">View Menu</button>
        </div>
      </div>

      {/* FOOD SECTION */}
      <div className="food-container">
        <div className="heading-row">
          <h2>Order our best food options</h2>
        </div>

        {/* ✅ First Line 10 Images */}
        <div className="food-row">{firstRow}</div>

        {/* ✅ Second Line 10 Images */}
        <div className="food-row">{secondRow}</div>
      </div>



     <section className="why-section py-5">
  <div className="container text-center">
    <h2 className="mb-5 fw-bold section-title">Why Choose Us</h2>

    <div className="row g-4">

      <div className="col-md-4">
        <div className="why-card shadow-sm rounded p-4 h-100">
          <div className="icon-box">🚚</div>
          <h3 className="mb-3">Fast Delivery</h3>
          <p>Get your favorite meals delivered hot and fresh at lightning speed.</p>
        </div>
      </div>

      <div className="col-md-4">
        <div className="why-card shadow-sm rounded p-4 h-100">
          <div className="icon-box">🍴</div>
          <h3 className="mb-3">Fresh Ingredients</h3>
          <p>We use only high-quality, fresh, and hygienic ingredients in every dish.</p>
        </div>
      </div>

      <div className="col-md-4">
        <div className="why-card shadow-sm rounded p-4 h-100">
          <div className="icon-box">⭐</div>
          <h3 className="mb-3">Top Rated Food</h3>
          <p>Thousands of happy customers, 4.8/5 average rating across platforms.</p>
        </div>
      </div>

    </div>
  </div>
</section>

      {/* 🌟 6. CUSTOMER REVIEWS */}
      <section className="py-5" style={{ backgroundColor: "#ffffff" }}>
        <div className="container text-center">
          <h2 className="mb-4 fw-bold">Customer Reviews</h2>

          <div className="row g-4">

            <div className="col-md-4">
              <div className="p-4 shadow rounded bg-light h-100">
                <h5>⭐⭐⭐⭐⭐</h5>
                <p>“Best biryani in town. The flavors are amazing!”</p>
                <strong>- Arjun R</strong>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 shadow rounded bg-light h-100">
                <h5>⭐⭐⭐⭐⭐</h5>
                <p>“Super fast delivery and excellent taste.”</p>
                <strong>- Sneha K</strong>
              </div>
            </div>

            <div className="col-md-4">
              <div className="p-4 shadow rounded bg-light h-100">
                <h5>⭐⭐⭐⭐</h5>
                <p>“Good food at a very reasonable price.”</p>
                <strong>- Rahul M</strong>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🌟 9. FOOTER */}
      <footer
        className="text-white pt-5 pb-3"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        <div className="container">

          <div className="row">

            {/* About */}
            <div className="col-md-4 mb-4">
              <h4 className="fw-bold">About Us</h4>
              <p>
                We deliver delicious food prepared with love. Fast, fresh, and always satisfying.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-md-4 mb-4">
              <h4 className="fw-bold">Quick Links</h4>
              <ul className="list-unstyled">
                <li><a href="/menu" className="text-white text-decoration-none">View Menu</a></li>
                <li><a href="/contact" className="text-white text-decoration-none">Contact Us</a></li>
                <li><a href="/privacy" className="text-white text-decoration-none">Privacy Policy</a></li>
                <li><a href="/terms" className="text-white text-decoration-none">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="col-md-4 mb-4">
              <h4 className="fw-bold">Contact</h4>
              <p>📍 Hyderabad, India</p>
              <p>📞 +91 98765 43210</p>
              <p>📧 support@restaurant.com</p>
            </div>

          </div>

          <hr className="border-secondary" />
          <p className="text-center text-secondary mb-0">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>

        </div>
      </footer>
    </>
  );
}

export default Home;


















