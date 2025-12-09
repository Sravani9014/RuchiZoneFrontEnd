



import { useState } from "react";
import { useDispatch } from "react-redux";
import { applyCupon } from "./store";
import Cupon from "./Cupon";

function ApplyCupon() {
  const [showList, setShowList] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleApply = () => {
    dispatch(applyCupon(input));
  };

  return (
    <div className="position-relative" style={{ width: "250px" }}>
      {/* INPUT BOX */}
      <input
        type="text"
        placeholder="Enter Coupon"
        value={input}
        className="form-control mb-2"
        onFocus={() => setShowList(true)} 
        onChange={(e) => setInput(e.target.value)}
      />

      {/* APPLY BUTTON */}
<div className="d-flex justify-content-center w-100 mt-2">
  <button className="btn btn-primary" onClick={handleApply}>
    Apply Coupon
  </button>
</div>



      {/* BOOTSTRAP DROPDOWN */}
      {showList && (
        <ul
          className="dropdown-menu show w-100"
          style={{
            display: "block",
            maxHeight: "200px",
            overflowY: "auto",
            position: "absolute",
            top: "75px",
            zIndex: 10,
          }}
        >
          <li className="dropdown-header fw-bold text-primary">
            Available Coupons
          </li>

          {Object.keys(Cupon).map((code) => (
            <li
              key={code}
              className="dropdown-item"
              style={{ cursor: "pointer" }}
              onMouseDown={() => {
                setInput(code);
                setShowList(false);
              }}
            >
              <strong>{code}</strong> — {Cupon[code]}% OFF
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ApplyCupon;
