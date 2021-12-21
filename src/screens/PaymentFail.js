import React from "react";
import { useHistory } from "react-router-dom";

const PaymentFail = () => {
  const history = useHistory();
  return (
    <section id="payment-fail">
      <h1>
        Your Payment Was Faild. Please Try Again Later And Return To Home Page.
      </h1>
      <button onClick={() => history.push("/")}>Home Page</button>
    </section>
  );
};

export default PaymentFail;
