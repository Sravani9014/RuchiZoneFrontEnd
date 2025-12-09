import React, { useEffect, useState } from "react";
import "./veg.css";
import { addToCart, fetchNonVegProducts } from "./store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getNonVegItemsFromLocal} from "./storage";

function Nonveg() {
  const dispatch=useDispatch();

  const { loading, nonVegItems, error } = useSelector((state) => state.nonveg);
  // ---------------- PAGINATION ----------------
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    const interval = setInterval(() => {
      console.log("⏳ Auto Refresh Check...");
  
      const localData = getNonVegItemsFromLocal();
  
      if (!localData) {
        console.log("♻️ Cache expired → Auto fetching...");
        dispatch(fetchNonVegProducts());
      } else {
        console.log("💾 Cache still valid");
      }
  
    }, 10000); // 10 seconds
  
    return () => clearInterval(interval);
  
  }, []);


  // Ratings state
useEffect(() => {
  if (nonVegItems.length > 0) {
    const initialRatings = nonVegItems.reduce((acc, item) => {
      acc[item.id] = 3;   // default rating for each item
      return acc;
    }, {});
    setRatings(initialRatings);
  }
}, [nonVegItems]);



  //products from database using useselector and useeffect
    useEffect(() => {
      dispatch(fetchNonVegProducts());
    }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = nonVegItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(nonVegItems.length / itemsPerPage);
  const goToPage = (num) => setCurrentPage(num);

  // Handle star click
  const handleStarClick = (id, value) => {
    setRatings({ ...ratings, [id]: value });
  };

  const [ratings, setRatings] = useState({});


  // Render stars
  const renderStars = (id) => {
    const stars = [];
    const rating = ratings[id];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= Math.round(rating) ? "filled" : ""}`}
          onClick={() => handleStarClick(id, i)}
        >
          &#9733;
        </span>
      );
    }
    return stars;
  };

  // ------------- MAP OUTSIDE RETURN -------------
  const renderedCards = currentItems.map((item) => (
    <div className="col-6 col-md-4 col-lg-2 custom-col" key={item.id}>
      <div className="card item-card shadow-sm h-100">
        <img src={item.image} className="card-img-top fixed-img" alt={item.name} />

        <div className="card-body text-center d-flex flex-column">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text small">{item.desc}</p>
          <h6>₹{item.price}</h6>

          {/* Stars + rating number */}
          <div className="rating mb-2 d-flex justify-content-center align-items-center">
            {renderStars(item.id)}
            <span className="rating-text ms-2">{ratings[item.id]?.toFixed(1)} Rating</span>
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
      <h2 className="text-center mb-4">“Savor every bite!”</h2>

      <div className="row g-3 custom-row">
        {renderedCards}
      </div>

      {/* ---------- PAGINATION LIKE VEG ---------- */}
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
              className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              key={index}
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
    </div>
  );
}

export default Nonveg;




