import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "./store";

export default function Orders() {
  const dispatch = useDispatch();
  const { list: orders, loading, error } = useSelector((state) => state.order);
  const user = useSelector((state) => state.userlogin.user);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchAllOrders(user._id));
    }
  }, [user, dispatch]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  if (error)
    return <p className="text-danger text-center mt-5 fs-5">{error}</p>;

  return (
    <div
      className="container-fluid"
      style={{
        background: "linear-gradient(135deg, #ffdee9 0%, #b5fffc 100%)",
        minHeight: "100vh",
        paddingTop: "40px",
        paddingBottom: "40px",
      }}
    >
      <h2 className="text-center mb-5 fw-bold">📦 My Orders</h2>

      <div className="row justify-content-center">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div className="col-lg-7 col-md-10 mb-4" key={order._id || order.orderId}>
              <div className="card shadow border-0 rounded-4 p-3">
                <h5 className="mb-2">Order ID: {order.orderId}</h5>
                <p className="mb-2">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p className="mb-3">Email: {order.email}</p>

                <h6 className="fw-bold mb-2">Items:</h6>
                <div className="row g-2">
                  {order.items?.map((item) => (
                    <div
                      key={item.id}
                      className="col-12 d-flex align-items-center border-bottom py-2"
                    >
                      <img
                        src={item.image || "/images/default.jpg"} // fallback image
                        alt={item.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginRight: "15px",
                        }}
                      />
                      <div className="flex-grow-1">
                        <p className="mb-0">{item.name}</p>
                        <small className="text-muted">
                          Qty: {item.quantity} × ₹{item.price} → ₹{item.price * item.quantity}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
                  <div>
                    <p className="mb-1">
                      <strong>Total:</strong> ₹{order.totalAmount}
                    </p>
                    <p className="mb-1">
                      <strong>Discount:</strong> ₹
                      {order.buttonDiscountAmount + order.couponDiscountAmount}
                    </p>
                    <p className="mb-1">
                      <strong>GST:</strong> ₹{order.gst}
                    </p>
                  </div>
                  <h5 className="text-success mb-0">
                    Net Amount: ₹{order.netAmount}
                  </h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h4 className="text-center mt-5">No orders found</h4>
        )}
      </div>
    </div>
  );
}
