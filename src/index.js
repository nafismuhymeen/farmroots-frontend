import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "./css/cart.css";
import "./css/homeScreen.css";
import "./css/loginRegister.css";
import "./css/main.css";
import "./css/header.css";
import "./css/ratingVegan.css";
import "./css/groceryHeader.css";
import "./css/groceryScreen.css";
import "./css/groceryProductScreen.css";
import "./css/groceryTastesBetter.css";
import "./css/groceryDetailedInfo.css";
import "./css/groceryCart.css";
import "./css/groceryLoginRegister.css";
import "./css/checkoutScreen.css";
import "./css/address.css";
import "./css/userInfoScreen.css";
import "./css/userSidebar.css";
import "./css/addressScreen.css";
import "./css/myReviewsScreen.css";
import "./css/myOrdersScreen.css";
import "./css/changePasswordScreen.css";
import "./css/searchScreen.css";
import "./css/orderDetails.css";
import "./css/adminSidebar.css";
import "./css/adminScreen.css";
import "./css/aboutUsScreen.css";
import "./css/careerScreen.css";
import "./css/videoScreen.css";
import "./css/helpScreen.css";
import "./css/suggestProductScreen.css";
import "./css/blogScreen.css";
import "./css/exportsScreen.css";
import "./css/partnerScreen.css";
// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5002";
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
