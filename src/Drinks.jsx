import React, { useEffect, useState } from "react";
import "./veg.css"; // Reusing Veg.css for styling
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchDrinksProducts } from "./store";

function Drinks() {
  const dispatch=useDispatch();
    // Get drinks from Redux store
  const drinksItems = useSelector(state => (state.drinks && state.drinks.drinksItems) || []);


  //databse products
    useEffect(() => {
      dispatch(fetchDrinksProducts());
    }, [dispatch]);

  // ---------------- PAGINATION ----------------
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = drinksItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(drinksItems.length / itemsPerPage);

  const goToPage = (num) => setCurrentPage(num);

  // ---------------- MAP OUTSIDE RETURN ----------------
  const renderDrinkCards = () =>
    currentItems.map((item) => (
      <div className="col-6 col-md-4 col-lg-2 custom-col" key={item.id}>
        <div className="card item-card shadow-sm h-100">
          <img src={item.image} className="card-img-top fixed-img" alt={item.name} />
          <div className="card-body text-center d-flex flex-column">
            <h5 className="card-title">{item.name}</h5>
            <p className="card-text small">{item.desc}</p>
            <h6>₹{item.price}</h6>
            <button className="btn btn-success mt-auto w-100" onClick={()=>dispatch(addToCart(item))}>Add to Cart</button>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Drinks</h2>

      <div className="row g-3 custom-row">
        {renderDrinkCards()}
      </div>

      {/* Pagination (Veg-style) */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center" style={{ gap: "10px" }}>
          
          {/* Previous */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => goToPage(currentPage - 1)}>
              Previous
            </button>
          </li>

          {/* Page numbers */}
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => goToPage(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}

          {/* Next */}
          <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => goToPage(currentPage + 1)}>
              Next
            </button>
          </li>

        </ul>
      </nav>
    </div>
  );
}

export default Drinks;
