
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { logout } from "./store"; // make sure this points to your user slice

function AccountDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userlogin);

  const handleLogout = () => {
    Swal.fire({
      title: "Logged Out",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      dispatch(logout());
      navigate("/login"); // redirect to home after logout
    });
  };

  return (
    <li className="nav-item dropdown">
      <Link
        className="nav-link dropdown-toggle"
        to="#"
        role="button"
        data-bs-toggle="dropdown"
        onClick={(e) => e.preventDefault()}
      >
        👤 Account
      </Link>

      <ul className="dropdown-menu">
        {user ? (
          <>
            <li>
              <span className="dropdown-item">Welcome, {user.name || user.email}</span>
            </li>
            <li>
              <button className="dropdown-item" onClick={handleLogout}>
                🚪 Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link className="dropdown-item" to="/login">🔐 Sign In</Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/register">📝 Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </li>
  );
}

export default AccountDropdown;
