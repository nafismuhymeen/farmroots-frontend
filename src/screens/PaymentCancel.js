import React from "react";
import { useHistory } from "react-router-dom";

const PaymentCancel = () => {
  const history = useHistory();
  return (
    <section id="payment-cancel">
      <h1>Your Payment Was Cancel. Please Return To Home Page.</h1>
      <button onClick={() => history.push("/")}>Home Page</button>
    </section>
  );
};

export default PaymentCancel;
