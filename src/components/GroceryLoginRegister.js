import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  register,
  signin,
  facebookSignin,
  googleSignin,
} from "../actions/userActions";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { MdClose } from "react-icons/md";

function GroceryLoginRegister(props) {
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rePasswordVisible, setRePasswordVisible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
    closeLogin();
  };

  const registerHandler = (e) => {
    e.preventDefault();
    password === rePassword
      ? dispatch(
        register(name, email, password, "", countryCode, mobileNumber),
        closeRegister()
      )
      : alert("Password did not match. Please Try Again!");
  };

  const closeLogin = () => {
    document.querySelector(".grocery-login-modal").classList.remove("open");
    setPasswordVisible(false);
  };

  const closeRegister = () => {
    document.querySelector(".grocery-register-modal").classList.remove("open");
    setPasswordVisible(false);
    setRePasswordVisible(false);
  };

  const closeLoginOpenRegister = () => {
    document.querySelector(".grocery-login-modal").classList.remove("open");
    document.querySelector(".grocery-register-modal").classList.add("open");
    setPasswordVisible(false);
  };

  const closeRegisterOpenLogin = () => {
    document.querySelector(".grocery-register-modal").classList.remove("open");
    document.querySelector(".grocery-login-modal").classList.add("open");
    setPasswordVisible(false);
    setRePasswordVisible(false);
  };

  const responseSuccessGoogle = (response) => {
    dispatch(googleSignin(response.tokenId, response.googleId));
    closeLogin();
    closeRegister();

  };

  const responseFailureGoogle = (response) => {

  };

  const responseSuccessFacebook = (response) => {
    if (response.email) {
      dispatch(facebookSignin(response.id, response.name, response.email));
      closeLogin();
      closeRegister();
    } else {
      alert("Your facebook account does not contain an email id");
    }
  };

  return (
    <>
      <div className="grocery-login-modal">
        <div className="grocery-login">
          <div className="d-flex justify-content-end">
            <Button
              className="btn-dark grocery-login-close-button"
              onClick={closeLogin}
            >
              <MdClose></MdClose>
            </Button>
          </div>
          <div className="d-flex flex-column">
            <div className="grocery-login-login-text d-flex justify-content-center">
              Login
            </div>
            <div className="grocery-login-signup-text d-flex justify-content-center align-items-center">
              New to Farmroots?
              <Button
                onClick={closeLoginOpenRegister}
                className="grocery-login-signup-button"
              >
                Sign Up
              </Button>
            </div>
            <FacebookLogin
              appId={facebookAppId}
              fields="name,email"
              callback={responseSuccessFacebook}
              onFailure={responseFailureGoogle}
              textButton=" Continue with Facebook"
              cssClass="facebook-button"
              icon="fa-facebook-official"
            />
            <GoogleLogin
              clientId={googleClientId}
              onSuccess={responseSuccessGoogle}
              onFailure={responseFailureGoogle}
              cookiePolicy={"single_host_origin"}
              icon={false}
              theme="dark"
              className="google-button"
            >
              <i className="fa fa-google"></i>
              <span style={{ fontWeight: "bold" }}> Continue with Google</span>
            </GoogleLogin>
            <h4 className="grocery-login-horizontal-line">
              {" "}
              or continue with email{" "}
            </h4>
            <Form onSubmit={loginHandler}>
              <div className="d-flex flex-column">
                <label className="grocery-login-email-text" htmlFor="email">
                  Email
                </label>
                <input
                  autoComplete="off"
                  className="grocery-login-email-input"
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <div className="d-flex justify-content-between">
                  <label
                    className="grocery-login-password-text"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <Button
                    type="button"
                    className="grocery-login-forget-password"
                  >
                    Forgot your password?
                  </Button>
                </div>
                {passwordVisible ? (
                  <div className="d-flex justify-content-between">
                    <input
                      autoComplete="off"
                      className="grocery-login-password-input"
                      type="text"
                      id="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <Button
                      type="button"
                      className="grocery-login-password-show-button"
                      onClick={() => setPasswordVisible(false)}
                    >
                      Hide
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between">
                    <input
                      autoComplete="off"
                      className="grocery-login-password-input"
                      type="password"
                      id="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <Button
                      type="button"
                      className="grocery-login-password-show-button"
                      onClick={() => setPasswordVisible(true)}
                    >
                      Show
                    </Button>
                  </div>
                )}
                <Button className="grocery-login-submit" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div className="grocery-register-modal">
        <div className="grocery-register">
          <div className="d-flex justify-content-end">
            <Button
              className="btn-dark grocery-register-close-button"
              onClick={closeRegister}
            >
              <MdClose></MdClose>
            </Button>
          </div>
          <div className="d-flex flex-column">
            <div className="grocery-register-register-text d-flex justify-content-center">
              Sign Up
            </div>
            <div className="grocery-register-login-text d-flex justify-content-center align-items-center">
              Already have an account?
              <Button
                onClick={closeRegisterOpenLogin}
                className="grocery-register-login-button"
              >
                Login
              </Button>
            </div>
            <FacebookLogin
              appId={facebookAppId}
              fields="name,email"
              callback={responseSuccessFacebook}
              onFailure={responseFailureGoogle}
              textButton=" Continue with Facebook"
              cssClass="facebook-button"
              icon="fa-facebook-official"
            />
            <GoogleLogin
              clientId={googleClientId}
              onSuccess={responseSuccessGoogle}
              onFailure={responseFailureGoogle}
              cookiePolicy={"single_host_origin"}
              icon={false}
              theme="dark"
              className="google-button"
            >
              <i className="fa fa-google"></i>
              <span style={{ fontWeight: "bold" }}> Continue with Google</span>
            </GoogleLogin>
            <h4 className="grocery-register-horizontal-line">
              {" "}
              or continue with email{" "}
            </h4>
            <Form onSubmit={registerHandler}>
              <div className="d-flex flex-column">
                <label className="grocery-register-email-text" htmlFor="name">
                  Your Name
                </label>
                <input
                  autoComplete="off"
                  className="grocery-register-email-input"
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
                <label className="grocery-register-email-text" htmlFor="email">
                  Email
                </label>
                <input
                  autoComplete="off"
                  className="grocery-register-email-input"
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <div className="d-flex justify-content-between row">
                  <div className=" col-sm-4">
                    <label
                      className="grocery-register-email-text"
                      htmlFor="countryCode"
                    >
                      Country Code
                    </label>
                    <input
                      autoComplete="off"
                      className="grocery-register-country-input"
                      type="text"
                      name="countryCode"
                      id="countryCode"
                      onChange={(e) => setCountryCode(e.target.value)}
                    ></input>
                  </div>
                  <div className="d-flex align-items-start flex-column col-sm-8">
                    <label
                      className="grocery-register-mobile-text"
                      htmlFor="mobileNumber"
                    >
                      Mobile Number
                    </label>
                    <input
                      autoComplete="off"
                      className="grocery-register-mobile-input"
                      type="text"
                      name="mobileNumber"
                      id="mobileNumber"
                      onChange={(e) => setMobileNumber(e.target.value)}
                    ></input>
                  </div>
                </div>
                <label
                  className="grocery-register-password-text"
                  htmlFor="password"
                >
                  Password
                </label>
                {passwordVisible ? (
                  <div className="d-flex justify-content-between">
                    <input
                      autoComplete="off"
                      className="grocery-register-password-input"
                      type="text"
                      id="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <Button
                      type="button"
                      className="grocery-register-password-show-button"
                      onClick={() => setPasswordVisible(false)}
                    >
                      Hide
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between">
                    <input
                      autoComplete="off"
                      className="grocery-register-password-input"
                      type="password"
                      id="password"
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <Button
                      type="button"
                      className="grocery-register-password-show-button"
                      onClick={() => setPasswordVisible(true)}
                    >
                      Show
                    </Button>
                  </div>
                )}
                <label
                  className="grocery-register-password-text"
                  htmlFor="rePassword"
                >
                  Confirm Password
                </label>
                {rePasswordVisible ? (
                  <div className="d-flex justify-content-between">
                    <input
                      autoComplete="off"
                      className="grocery-register-password-input"
                      type="text"
                      id="rePassword"
                      name="rePassword"
                      onChange={(e) => setRePassword(e.target.value)}
                    ></input>
                    <Button
                      type="button"
                      className="grocery-register-password-show-button"
                      onClick={() => setRePasswordVisible(false)}
                    >
                      Hide
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between">
                    <input
                      autoComplete="off"
                      className="grocery-register-password-input"
                      type="password"
                      id="rePassword"
                      name="rePassword"
                      onChange={(e) => setRePassword(e.target.value)}
                    ></input>
                    <Button
                      type="button"
                      className="grocery-register-password-show-button"
                      onClick={() => setRePasswordVisible(true)}
                    >
                      Show
                    </Button>
                  </div>
                )}
                <Button className="grocery-register-submit" type="submit">
                  Sign Up
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}

export default withRouter(GroceryLoginRegister);
