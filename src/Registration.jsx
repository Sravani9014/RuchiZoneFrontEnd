import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { registerUser } from "./store";
import Swal from "sweetalert2";


function Registration() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    reset(); // reset form
  };

    // ⭐ Show SweetAlert on success/error
  useEffect(() => {
    if (success) {
      Swal.fire({
        title: "Success!",
        text: "You registered successfully!",
        icon: "success",
        timer: 9000
      });
      reset();
    }

    if (error) {
      Swal.fire({
        title: "Error!",
        text: error,
        icon: "error",
      });
    }
  }, [success, error, reset]);

  return (
    <div className="container mt-4" style={{ maxWidth: 450 }}>
      <h2>Register</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Registration Successful!</div>}

      <form onSubmit={handleSubmit(onSubmit)} className="border p-3 rounded">
        {/* NAME */}
        <div className="mb-3">
          <label>Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>

        {/* EMAIL */}
        <div className="mb-3">
          <label>Email</label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
        </div>

        {/* PASSWORD */}
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" },
            })}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
          />
          {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm"></span> Registering...
            </>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}

export default Registration;
