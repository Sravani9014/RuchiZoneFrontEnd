import React, {  useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incCart, decCart, removeFromCart, placeOrder } from "./store";
import ApplyCupon from "./ApplyCupon";
import SenderOrderEmail from "./SenderOrderEmail";

import { QRCodeCanvas } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";


function Cart() {
  const cartItems = useSelector((state) => state.cart.items  || []);
  const dispatch = useDispatch();
  const [discount, setDiscount] = useState(null);
  const[customerEmail,setCustomerEmail]=useState("");
  const navigate=useNavigate();


  const[showQr,setShowQr]=useState(false);


  const { loading, order, error } = useSelector((state) => state.order);

let { code, discount: cuponDiscount, applied, message } = useSelector(state => state.cupon);


  // ------------------------------
  // CART ITEMS RENDERING
  // ------------------------------
  const renderedCart = cartItems.map((item) => (
    <div key={item.id} className="col-12 mb-3">
      <div className="card p-3 d-flex flex-row align-items-center">

        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "100px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />

        <div className="ms-3 flex-grow-1">
          <h5>{item.name}</h5>
          <p className="m-0">₹{item.price}</p>
          <p className="m-0 text-muted">Qty: {item.quantity}</p>
        </div>

        <button
          className="btn btn-success ms-2"
          onClick={() => dispatch(incCart(item))}
        >
          +
        </button>

        <button
          className="btn btn-warning ms-2"
          onClick={() => dispatch(decCart(item))}
        >
          -
        </button>

        <button
          className="btn btn-danger ms-2"
          onClick={() => {dispatch(removeFromCart(item));
            toast.error("Item removed from cart!");}}
        >
          Remove
        </button>
      </div>
    </div>
  ));
//cart in apply cupon 


  // ------------------------------
  // CLEAN PRICE CALCULATIONS (NO IF/ELSE)
  // ------------------------------
  // const totalAmount = cartItems.reduce(
  //   (total, item) => total + item.price * item.quantity,
  //   0
  // );

  // const discountAmount = discount ? (discount * totalAmount) / 100 : 0;

  // const priceAfterDiscount = totalAmount - discountAmount;
  // const cuponAmount=priceAfterDiscount+cuponDiscount/100;

  // const gst = priceAfterDiscount * 0.18;

  // const netAmount = priceAfterDiscount + gst-cuponAmount;
  let allcalculations=useMemo(()=>{
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const buttonDiscountAmount = discount ? (discount * totalAmount) / 100 : 0;

  const amountAfterButtonDiscount = totalAmount - buttonDiscountAmount;

// Coupon Discount
  const cuponAmount = applied ? (cuponDiscount * amountAfterButtonDiscount) / 100 : 0;

  const amountAfterCupon = amountAfterButtonDiscount - cuponAmount;

// GST on final amount
const gst = amountAfterCupon * 0.18;

const netAmount = amountAfterCupon + gst;
console.log("cart calculations happens:",{totalAmount, buttonDiscountAmount,cuponAmount,gst,netAmount});
return {totalAmount, buttonDiscountAmount,cuponAmount,gst,netAmount} ;
  },[cartItems, discount, applied, cuponDiscount]);

  const {totalAmount, buttonDiscountAmount,cuponAmount,gst,netAmount} = allcalculations;




 // import { placeOrder } from "./orderThunk"; // <-- Make sure this import exists

const handleCheckout = () => {
  if (cartItems.length === 0) {
    alert("Your cart is empty!");
    return;
    
    
  }
  // navigate("/orders");

  // ---------------------------
  // BUILD ORDER OBJECT
  // ---------------------------
  const orderData = {
    orderId: Date.now(),
    orderDate: new Date().toLocaleString(),
    email: customerEmail,

    // All cart items with full data
    items: cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
      description: item.description || "",
    })),

    // Summary values
    totalAmount: totalAmount,
    buttonDiscountAmount: buttonDiscountAmount,
    couponDiscountAmount: cuponAmount,
    gst: gst,
    netAmount: netAmount,

    // combined discount
    discountAmount: buttonDiscountAmount + cuponAmount,
  };

  console.log("ORDER CREATED:", orderData);

  // ---------------------------
  // FIRE THUNK → RETURNS PROMISE


  // ---------------------------

   if (!customerEmail) {
    toast.warning("Please enter your email!");
    return;
  }
  dispatch(placeOrder(orderData));



    // SweetAlert Confirmation
  // -------------------
  Swal.fire({
    title: "Order Placed Successfully!",
    html: `
      <p><strong>Net Amount:</strong> ₹${netAmount.toFixed(2)}</p>
      <p>Thank you for your purchase!</p>
    `,
    icon: "success",
    confirmButtonText: "Go to Orders",
  }).then((result) => {
    if (result.isConfirmed) {
      navigate("/orders");
    }
  });
   //navigate("/orders");
    
 
};

//scanner details 
  const upiID="9014965288@ybl";
  const payerName="sravani";
  const upiLink = `upi://pay?pa=${upiID}&pn=${payerName}&am=${netAmount}&cu=INR`;
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

    <div className="row g-4">

      {/* LEFT SIDE – CART ITEMS */}
      <div className="col-lg-8">
        <h2 className="fw-bold mb-4">Your Cart ({cartItems.length} items)</h2>

        {cartItems.length === 0 ? (
          <h4 className="text-center mt-5">🛒 Your cart is empty</h4>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="card p-3 mb-3 shadow-sm">

              <div className="d-flex align-items-center">

                {/* PRODUCT IMAGE */}
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />

                {/* NAME + PRICE + QUANTITY */}
                <div className="ms-3 flex-grow-1">
                  <h5 className="fw-semibold">{item.name}</h5>
                  <p className="m-0 fw-bold text-primary">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* QTY BUTTONS */}
                  <div className="d-flex align-items-center mt-2">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => dispatch(decCart(item))}
                    >
                      -
                    </button>

                    <span className="mx-3 fw-bold">{item.quantity}</span>

                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => dispatch(incCart(item))}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* REMOVE BUTTON */}
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => {
                    dispatch(removeFromCart(item));
                    toast.error("Item removed from cart!");
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* RIGHT SIDE – ORDER SUMMARY */}
      <div className="col-lg-4">
        <div className="card p-4 shadow-sm">

          <h3 className="fw-bold mb-3">Order Summary</h3>

          {/* PRICE ROWS */}
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <strong>₹{totalAmount.toFixed(2)}</strong>
          </div>

          <div className="d-flex justify-content-between mb-2">
            <span>Sales Tax (18%):</span>
            <strong>₹{gst.toFixed(2)}</strong>
          </div>

          {discount > 0 && (
            <div className="d-flex justify-content-between text-danger mb-2">
              <span>⚡ Manual Discount:</span>
              <strong>-₹{buttonDiscountAmount.toFixed(2)}</strong>
            </div>
          )}

          {applied && (
            <div className="d-flex justify-content-between text-danger mb-2">
              <span>🎟 Coupon Discount:</span>
              <strong>-₹{cuponAmount.toFixed(2)}</strong>
            </div>
          )}

          <hr />

          <div className="d-flex justify-content-between mb-3">
            <h5 className="fw-bold">Net Amount:</h5>
            <h5 className="fw-bold text-success">₹{netAmount.toFixed(2)}</h5>
          </div>

          {/* MANUAL DISCOUNTS */}
          <label className="fw-semibold">Manual Discounts</label>
          <div className="d-flex gap-2 mb-3 mt-2">
            {[10, 20, 30].map((d) => (
              <button
                key={d}
                className="btn btn-outline-primary btn-sm"
                onClick={() => {
                  setDiscount(d);
                  toast.success(`${d}% Discount Applied`);
                }}
              >
                {d}%
              </button>
            ))}
          </div>

          {/* COUPON */}
          <div className="input-group mb-3">
            <ApplyCupon />
          </div>

          {/* EMAIL */}
          <label className="fw-semibold">Email for Confirmation</label>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />

          {/* PAYMENT METHOD */}
          <label className="fw-semibold">Select Payment Method</label>

          <button
            className="btn btn-outline-primary w-100 mt-2"
            onClick={() => setShowQr(true)}
          >
            QR Code
          </button>

          <button
            className="btn btn-outline-primary w-100 mt-2"
            onClick={() => toast.info("Card payment coming soon")}
          >
            Card
          </button>

          <button
            className="btn btn-outline-primary w-100 mt-2"
            onClick={() => toast.info("Cash on Delivery selected")}
          >
            Cash on Delivery
          </button>

          {/* CHECKOUT */}
          <button
            className="btn btn-success w-100 mt-4"
            onClick={handleCheckout}
          >
            Check Out
          </button>

        </div>

        {/* QR CODE SECTION */}
      {/* QR Code Section (Visible ONLY when clicked) */}
{showQr && (
  <div className="card p-3 mt-4 text-center shadow-sm">
    <h5>Scan to Pay</h5>
    <QRCodeCanvas value={upiLink} size={200} />
  </div>
)}
      </div>
    </div>
  </div>
  </div>
);

}

export default Cart;
