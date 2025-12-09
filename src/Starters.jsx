/*import "./Veg.css";   // same CSS for equal card sizes

function Starters() {

  const starterItems = [
    { id: 1, name: "Paneer Tikka", price: 160, desc: "Grilled paneer marinated in spices.", img: "/images/starter1.jpg" },
    { id: 2, name: "Chicken Lollipop", price: 180, desc: "Crispy fried chicken lollipops.", img: "/images/starter2.jpg" },
    { id: 3, name: "Veg Spring Roll", price: 120, desc: "Crispy rolls stuffed with veggies.", img: "/images/starter3.jpg" },
    { id: 4, name: "Chicken Wings", price: 190, desc: "Hot & spicy grilled wings.", img: "/images/starter4.jpg" },
    { id: 5, name: "Gobi Manchurian", price: 130, desc: "Fried cauliflower in Indo-Chinese sauce.", img: "/images/starter5.jpg" },

    { id: 6, name: "Fish Fingers", price: 200, desc: "Crispy golden fried fish sticks.", img: "/images/starter6.jpg" },
    { id: 7, name: "Aloo Tikki", price: 110, desc: "North-Indian crispy potato patties.", img: "/images/starter7.jpg" },
    { id: 8, name: "Chicken 65", price: 170, desc: "Crispy deep-fried spicy chicken.", img: "/images/starter8.jpg" },
    { id: 9, name: "Mushroom Pepper Fry", price: 150, desc: "Pepper tossed spicy mushrooms.", img: "/images/starter9.jpg" },
    { id: 10, name: "Prawns Koliwada", price: 240, desc: "Mumbai-style deep-fried prawns.", img: "/images/starter10.jpg" },

    { id: 11, name: "Hara Bhara Kebab", price: 130, desc: "Green veg kebabs made with spinach & peas.", img: "/images/starter11.jpg" },
    { id: 12, name: "Chicken Tikka", price: 210, desc: "Smoky grilled chicken pieces.", img: "/images/starter12.jpg" },
    { id: 13, name: "Crispy Corn", price: 120, desc: "Fried corn kernels tossed with spices.", img: "/images/starter13.jpg" },
    { id: 14, name: "Tandoori Prawns", price: 260, desc: "Prawns roasted in tandoor.", img: "/images/starter14.jpg" },
    { id: 15, name: "Veg Cutlet", price: 100, desc: "Crispy snack made with mixed vegetables.", img: "/images/starter15.jpg" }
  ];

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Starters</h2>

      <div className="row g-3 custom-row">
        {starterItems.map(item => (
          <div className="col-6 col-md-4 col-lg-2 custom-col" key={item.id}>
            <div className="card item-card shadow-sm">

              <img src={item.img} className="card-img-top fixed-img" alt={item.name} />

              <div className="card-body text-center">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text small">{item.desc}</p>
                <h6>₹{item.price}</h6>

                <button className="btn btn-warning mt-2 w-100">Add to Cart</button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Starters;*/



import React, { useState } from "react";
import "./Veg.css"; // Reusing Veg.css
import { addToCart } from "./store";
import { useDispatch } from "react-redux";


function Starters() {
  const dispatch=useDispatch();
  const startersItems = [
    { id: 1, name: "Spring Rolls", price: 120, desc: "Crispy veggie rolls.", img: "/images/starter1.jpg" },
    { id: 2, name: "Paneer Tikka", price: 150, desc: "Grilled paneer cubes.", img: "/images/starter2.jpg" },
    { id: 3, name: "Chicken 65", price: 200, desc: "Spicy fried chicken bites.", img: "/images/starter3.jpg" },
    { id: 4, name: "Gobi 65", price: 120, desc: "Crispy fried cauliflower.", img: "/images/starter4.jpg" },
    { id: 5, name: "Fish Fingers", price: 180, desc: "Fried fish strips.", img: "/images/starter5.jpg" },
    { id: 6, name: "Veg Pakora", price: 100, desc: "Mixed vegetable fritters.", img: "/images/starter6.jpg" },
    { id: 7, name: "Chicken Wings", price: 220, desc: "Spicy grilled wings.", img: "/images/starter7.jpg" },
    { id: 8, name: "Paneer Chilli", price: 160, desc: "Spicy Indo-Chinese paneer.", img: "/images/starter8.jpg" },
    { id: 9, name: "Cheese Balls", price: 140, desc: "Crispy cheesy bites.", img: "/images/starter9.jpg" },
    { id: 10, name: "Mutton Kebab", price: 250, desc: "Juicy grilled kebabs.", img: "/images/starter10.jpg" },
    { id: 11, name: "Corn Balls", price: 120, desc: "Crunchy corn fritters.", img: "/images/starter11.jpg" },
    { id: 12, name: "Veg Cutlet", price: 100, desc: "Pan-fried veggie patties.", img: "/images/starter12.jpg" },
    { id: 13, name: "Chicken Nuggets", price: 180, desc: "Crispy chicken bites.", img: "/images/starter13.jpg" },
    { id: 14, name: "Hara Bhara Kebab", price: 140, desc: "Spinach and peas kebabs.", img: "/images/starter14.jpg" },
    { id: 15, name: "Paneer Spring Roll", price: 160, desc: "Stuffed paneer rolls.", img: "/images/starter15.jpg" },
  ];

  // ---------------- PAGINATION ----------------
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = startersItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(startersItems.length / itemsPerPage);

  const goToPage = (num) => setCurrentPage(num);

  // ---------------- MAP OUTSIDE RETURN ----------------
  const renderedCards = currentItems.map((item) => (
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
      <h2 className="text-center mb-4">Starters</h2>

      <div className="row g-3 custom-row">
        {renderedCards}
      </div>

      {/* ---------- PAGINATION (Veg-style) ---------- */}
      <nav className="mt-4">
        <ul
          className="pagination justify-content-center"
          style={{ gap: "10px" }}
        >
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

export default Starters;

