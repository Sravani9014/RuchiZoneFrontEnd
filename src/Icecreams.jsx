import React, { useState } from "react";
import "./veg.css";
import { useDispatch } from "react-redux";

function Icecreams() {
  const dispatch=useDispatch();
  const icecreamsItems = [
    { id: 1, name: "Vanilla", price: 80, desc: "Classic vanilla ice cream.", img: "/images/ice1.jpg" },
    { id: 2, name: "Chocolate", price: 90, desc: "Rich chocolate flavor.", img: "/images/ice2.jpg" },
    { id: 3, name: "Strawberry", price: 85, desc: "Fresh strawberry delight.", img: "/images/ice3.jpg" },
    { id: 4, name: "Mango", price: 95, desc: "Sweet and tropical mango.", img: "/images/ice4.jpg" },
    { id: 5, name: "Butterscotch", price: 100, desc: "Creamy butterscotch flavor.", img: "/images/ice5.jpg" },
    { id: 6, name: "Coffee", price: 90, desc: "Rich coffee ice cream.", img: "/images/ice6.jpg" },
    { id: 7, name: "Pista", price: 95, desc: "Nutty pista delight.", img: "/images/ice7.jpg" },
    { id: 8, name: "Black Currant", price: 100, desc: "Tangy black currant flavor.", img: "/images/ice8.jpg" },
    { id: 9, name: "Chocolate Chip", price: 110, desc: "Vanilla with chocolate chips.", img: "/images/ice9.jpg" },
    { id: 10, name: "Mint Chocolate", price: 105, desc: "Refreshing mint with chocolate.", img: "/images/ice10.jpg" },
    { id: 11, name: "Raspberry", price: 95, desc: "Sweet and tart raspberry.", img: "/images/ice11.jpg" },
    { id: 12, name: "Caramel", price: 100, desc: "Creamy caramel flavor.", img: "/images/ice12.jpg" },
    { id: 13, name: "Blueberry", price: 95, desc: "Fresh blueberry taste.", img: "/images/ice13.jpg" },
    { id: 14, name: "Vanilla Almond", price: 110, desc: "Vanilla with almond pieces.", img: "/images/ice14.jpg" },
    { id: 15, name: "Cookies & Cream", price: 120, desc: "Creamy with cookie chunks.", img: "/images/ice15.jpg" },
  ];

  // ------------------ PAGINATION ------------------
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = icecreamsItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(icecreamsItems.length / itemsPerPage);

  const goToPage = (num) => setCurrentPage(num);

  // ------------------ MAP OUTSIDE RETURN ------------------
  const renderedCards = currentItems.map(item => (
    <div className="col-6 col-md-4 col-lg-2 custom-col" key={item.id}>
      <div className="card item-card shadow-sm h-100">

        <img src={item.img} className="card-img-top fixed-img" alt={item.name} />

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
      <h2 className="text-center mb-4">Icecreams</h2>

      <div className="row g-3 custom-row">
        {renderedCards}
      </div>

      {/* -------------- PAGINATION -------------- */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center" style={{ gap: "10px" }}>
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button className="page-link" onClick={() => goToPage(currentPage - 1)}>Previous</button>
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
            <button className="page-link" onClick={() => goToPage(currentPage + 1)}>Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Icecreams;
