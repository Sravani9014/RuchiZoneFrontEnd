
import React, { useEffect, useState } from "react";
import "./Veg.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchVegProducts } from "./store.js";
import { toast } from "react-toastify";
import { getVegItemsFromLocal } from "./storage.js";




function Veg() {

  const dispatch = useDispatch();
  const { loading, vegItems, error } = useSelector((state) => state.veg);

  // ------------------ PAGINATION ------------------
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  // Ratings state
  const [ratings, setRatings] = useState({});



useEffect(() => {
  const interval = setInterval(() => {
    console.log("⏳ Auto Refresh Check...");

    const localData = getVegItemsFromLocal();

    if (!localData) {
      console.log("♻️ Cache expired → Auto fetching...");
      dispatch(fetchVegProducts());
    } else {
      console.log("💾 Cache still valid");
    }

  }, 10000); // 10 seconds

  return () => clearInterval(interval);

}, []);





  
//databse products
  useEffect(() => {
    dispatch(fetchVegProducts());
  }, [dispatch]);

  // Initialize ratings when products load
  useEffect(() => {
    if (vegItems.length > 0) {
      const initialRatings = vegItems.reduce((acc, item) => {
        acc[item.id] = 3;
        return acc;
      }, {});
      setRatings(initialRatings);
    }
  }, [vegItems]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vegItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(vegItems.length / itemsPerPage);

  const goToPage = (num) => setCurrentPage(num);

  // Handle star click
  const handleStarClick = (id, value) => {
    setRatings({ ...ratings, [id]: value });
  };

  const renderStars = (id) => {
    const stars = [];
    const rating = ratings[id] || 0;
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= Math.round(rating) ? "filled" : ""}`}
          onClick={() => handleStarClick(id, i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  // ------------------ RENDERED CARDS ------------------
  const renderedCards = currentItems.map((item) => (
    <div className="col-6 col-md-4 col-lg-2 custom-col" key={item.id}>
      <div className="card item-card shadow-sm h-100">

        <img src={item.image} className="card-img-top fixed-img" alt={item.name} />

        <div className="card-body text-center d-flex flex-column">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text small">{item.desc}</p>
          <h6>₹{item.price}</h6>

          {/* Stars */}
          <div className="rating mb-2 d-flex justify-content-center align-items-center">
            {renderStars(item.id)}
            <span className="rating-text ms-2">
              {ratings[item.id]?.toFixed(1)} Rating
            </span>
          </div>

         <button
          className="btn btn-success mt-auto w-100"
          onClick={() => {
          dispatch(addToCart(item));
          toast.success(`${item.name} added to cart!`);
  }}
>
  Add to Cart
</button>
        </div>

      </div>
    </div>
  ));

  // ------------------ RETURN ------------------
  return (

    <div
      className="container-fluid"
      style={{
        background: "linear-gradient(135deg, #ffdedeff 0%, #b5fffc 100%)",
        minHeight: "100vh",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
    <div className="container mt-4">
      <>
      <h2 className="text-center mb-4">
        𝓦𝓱𝓮𝓻𝓮 𝓯𝓻𝓮𝓼𝓱𝓷𝓮𝓼𝓼 𝓶𝓮𝓮𝓽𝓼 𝓯𝓵𝓪𝓿𝓸𝓻
      </h2>

      <div className="row g-3 custom-row">
        {renderedCards}
      </div>

      {/* PAGINATION */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center" style={{ gap: "10px" }}>
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
              Previous
            </button>
          </li>

          {[...Array(totalPages)].map((_, index) => (
            <li
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              key={index}
            >
              <button className="page-link" onClick={() => goToPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}

          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
              Next
            </button>
          </li>
        </ul>
      </nav>
      </>
    </div>
    </div>
  );
}

export default Veg;




