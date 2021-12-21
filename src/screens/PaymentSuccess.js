import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { emptyCart } from "../actions/cartActions";
import "../css/paymentEndScreen.css";
const PaymentSuccess = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <section id="payment-success">
      <h1>Your Payment Was Successfull. Please Go To Your Orders Page.</h1>
      <button
        onClick={() => {
          dispatch(emptyCart());
          history.push("/user-profile/my-orders");
        }}
      >
        My Orders
      </button>
    </section>
  );
};

export default PaymentSuccess;
