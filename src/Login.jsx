import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import { loginUser } from "./store";

function Login() {
  const dispatch = useDispatch();
  //const { loading, error, user } = useSelector((state) => state.userlogin);
  const { loading, error, user, loggedInUserId } = useSelector(
    (state) => state.userlogin
  );

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
    reset();
  };

    // 👇 IMPORTANT: load cart + orders for this user
  useEffect(() => {
    if (loggedInUserId) {
      dispatch(setCartUser(loggedInUserId));
      dispatch(setOrderUser(loggedInUserId));
    }
  }, [loggedInUserId, dispatch]);

  useEffect(() => {
    if (user) {
      Swal.fire({
        title: "Login Successful",
        icon: "success",
        timer: 2000,
      });
    }

    if (error) {
      Swal.fire({
        title: "Login Failed",
        text: error,
        icon: "error",
      });
    }
  }, [user, error]);

  return (
    <div className="container mt-4" style={{ maxWidth: 400 }}>
      <h2>Sign In</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="border p-3 rounded">

        <div className="mb-3">
          <label>Email</label>
          <input
            {...register("email", { required: "Email required" })}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            {...register("password", { required: "Password required" })}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm"></span> Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;
