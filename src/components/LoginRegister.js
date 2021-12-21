import React, { useEffect, useState } from 'react';
import ValidForm from 'react-valid-form-component';
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import btoa from 'btoa';
import { withRouter } from 'react-router-dom';
import {
  register,
  signin,
  facebookSignin,
  googleSignin,
  resetToastData,
  forgetPassword,
} from '../actions/userActions';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import { MdClose } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MESSAGES } from '../contants';
let toastCount = 0;

function LoginRegister(props) {
  const facebookAppId = process.env.REACT_APP_FACEBOOK_APP_ID;
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rePasswordVisible, setRePasswordVisible] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [countryCode, setCountryCode] = useState('+880');
  const [mobileNumber, setMobileNumber] = useState('');
  const [toggle, setToggle] = useState(false);
  const [form, setValue] = useState({ email: '' });
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);

  const loginHandler = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(signin(email, btoa(password)));
    } else {
      setErrorMessage(MESSAGES.LOGIN_MANDATARY_FIELDS);
    }
  };

  const registerHandler = (e) => {
    e.preventDefault();
    if (
      name &&
      email &&
      password &&
      rePassword &&
      countryCode &&
      mobileNumber
    ) {
      password === rePassword
        ? dispatch(
            register(name, email, btoa(password), countryCode, mobileNumber)
          )
        : setErrorMessage(MESSAGES.PASSWORD_NOT_MATCHING);
    } else {
      setErrorMessage(MESSAGES.REGISTER_FORM_MANDATARY_FIELDS);
    }
  };

  const setErrorMessage = (msg) => {
    toastCount++;
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      pauseOnHover: false,
      autoClose: 3500,
      onClose: () => {
        dispatch(resetToastData());
        toastCount = 0;
      },
    });
  };

  const setSuccessMessage = (msg) => {
    toastCount++;
    toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      pauseOnHover: false,
      autoClose: 3500,
      onClose: () => {
        dispatch(resetToastData());
        toastCount = 0;
      },
    });
  };

  const closeModalBox = (props) => {
    props.onHideLoginClick();
    props.onHideForgetPassClick();
    props.onHideRegisterClick();
  };

  const closeLoginOpenRegister = () => {
    props.onHideLoginClick();
    props.onShowRegisterClick();
  };
  // -------forget Password-------
  const closeLoginOpenForgotPassword = () => {
    props.onHideLoginClick();
    props.onShowForgetPassClick();
  };

  const closeForgetPassword = () => {
    document.querySelector('.login-forget-password').classList.remove('open');
    setToggle(false);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(forgetPassword(email));
      setToggle(false);
      setEmail('');
    } else {
      setErrorMessage(MESSAGES.FORGET_PASSWORD_MANDATARY_FIELDS);
    }
  };

  const closeRegisterOpenLogin = () => {
    props.onHideRegisterClick();
    props.onShowLoginClick();
  };

  const responseSuccessGoogle = (response) => {
    dispatch(
      googleSignin(
        response.googleId,
        response.profileObj.name,
        response.profileObj.email,
        response.profileObj.mobileNumber,
        'google'
      )
    );
  };

  const responseFailureGoogle = (response) => {
    console.log(response);
  };

  const responseSuccessFacebook = (response) => {
    if (response.email) {
      dispatch(
        facebookSignin(response.id, response.name, response.email, 'facebook')
      );
    } else {
      setErrorMessage('Your facebook account does not contain an email id');
    }
  };

  useEffect(() => {
    if (userSignin.error && userSignin.msg && toastCount === 0) {
      setErrorMessage(userSignin.msg);
    } else if (
      userSignin.success &&
      userSignin?.userInfo?.message &&
      toastCount === 0
    ) {
      setSuccessMessage(userSignin?.userInfo?.message);
      closeModalBox(props);
    } else if (
      userSignin.success &&
      (props.showLogin || props.showRegister || props.showForgetPass)
    ) {
      closeModalBox(props);
    }
  });

  const responseFailureFacebook = (response) => {
    console.log(response);
  };

  return (
    <>
      <Modal
        show={props.showLogin}
        onHide={props.onHideLoginClick}
        centered
        keyboard={false}
      >
        <Modal.Body>
          <Col>
            <Col className="justify-content-md-center">
              <div className="">
                <div className="login-login-text d-flex justify-content-center">
                  Login
                </div>
                <div className="login-signup-text d-flex justify-content-center align-items-center">
                  New to Farmroots?
                  <Button
                    onClick={closeLoginOpenRegister}
                    className="login-signup-button"
                  >
                    Sign Up
                  </Button>
                </div>
                <FacebookLogin
                  appId={facebookAppId}
                  fields="name,email"
                  callback={responseSuccessFacebook}
                  onFailure={responseFailureFacebook}
                  textButton=" Continue with Facebook"
                  cssClass="facebook-button"
                  icon="fa-facebook-official"
                />
                <GoogleLogin
                  clientId={googleClientId}
                  onSuccess={responseSuccessGoogle}
                  onFailure={responseFailureGoogle}
                  cookiePolicy={'single_host_origin'}
                  icon={false}
                  theme="dark"
                  className="google-button"
                >
                  <i className="fa fa-google"></i>
                  <span style={{ fontWeight: 'bold' }}>
                    {' '}
                    Continue with Google
                  </span>
                </GoogleLogin>
                <h4 className="login-horizontal-line">
                  {' '}
                  or continue with email{' '}
                </h4>
                <Form onSubmit={loginHandler}>
                  <div className="d-flex flex-column">
                    <label className="login-email-text" htmlFor="email">
                      Email <span className="asterisk-mandatory">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      className="login-email-input"
                      type="email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <div className="d-flex justify-content-between">
                      <label className="login-password-text" htmlFor="password">
                        Password <span className="asterisk-mandatory">*</span>
                      </label>
                      <Button
                        type="button"
                        className="login-forget-password"
                        onClick={() => closeLoginOpenForgotPassword()}
                      >
                        Forgot your password?
                      </Button>
                    </div>
                    {passwordVisible ? (
                      <div className="d-flex justify-content-between">
                        <input
                          autoComplete="off"
                          className="login-password-input"
                          type="text"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <Button
                          type="button"
                          className="login-password-show-button"
                          onClick={() => setPasswordVisible(false)}
                        >
                          Hide
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-between">
                        <input
                          autoComplete="off"
                          className="login-password-input"
                          type="password"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <Button
                          type="button"
                          className="login-password-show-button"
                          onClick={() => setPasswordVisible(true)}
                        >
                          Show
                        </Button>
                      </div>
                    )}
                    <Button className="login-submit" type="submit">
                      Login
                    </Button>
                    <Button
                      className="close-btn"
                      onClick={props.onHideLoginClick}
                    >
                      Close
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Col>
        </Modal.Body>
      </Modal>
      <Modal
        show={props.showForgetPass}
        onHide={props.onHideForgetPassClick}
        centered
        keyboard={false}
      >
        <Modal.Body>
          <Col>
            <Col className="justify-content-md-center">
              <div className="">
                <div className="login-login-text d-flex justify-content-center">
                  Reset Your Password
                </div>
                <Form onSubmit={handlePassword}>
                  <div className="d-flex flex-column">
                    <label className="login-email-text" htmlFor="email">
                      Email Address{' '}
                      <span className="asterisk-mandatory">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      className="login-email-input"
                      type="email"
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <Button className="login-submit" type="submit">
                      Reset Password
                    </Button>
                    <Button
                      className="close-btn"
                      onClick={props.onHideForgetPassClick}
                    >
                      Close
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Col>
        </Modal.Body>
      </Modal>
      <Modal
        show={props.showRegister}
        onHide={props.onHideRegisterClick}
        centered
        keyboard={false}
      >
        <Modal.Body>
          <Col>
            <Col className="justify-content-md-center">
              <div className="">
                <div className="register-register-text d-flex justify-content-center">
                  Sign Up
                </div>
                <div className="register-login-text d-flex justify-content-center align-items-center">
                  Already registered?
                  <Button
                    onClick={closeRegisterOpenLogin}
                    className="register-login-button"
                  >
                    Login
                  </Button>
                </div>
                <FacebookLogin
                  appId={facebookAppId}
                  fields="name,email"
                  callback={responseSuccessFacebook}
                  onFailure={responseFailureFacebook}
                  textButton=" Continue with Facebook"
                  cssClass="facebook-button"
                  icon="fa-facebook-official"
                />
                <GoogleLogin
                  clientId={googleClientId}
                  onSuccess={responseSuccessGoogle}
                  onFailure={responseFailureGoogle}
                  cookiePolicy={'single_host_origin'}
                  icon={false}
                  theme="dark"
                  className="google-button"
                >
                  <i className="fa fa-google"></i>
                  <span style={{ fontWeight: 'bold' }}>
                    {' '}
                    Continue with Google
                  </span>
                </GoogleLogin>
                <h4 className="register-horizontal-line">
                  {' '}
                  or continue with email{' '}
                </h4>
                <Form onSubmit={registerHandler}>
                  <div className="d-flex flex-column">
                    <label className="register-email-text" htmlFor="name">
                      Your Name <span className="asterisk-mandatory">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      className="register-email-input"
                      type="text"
                      name="name"
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                    ></input>
                    <label className="register-email-text" htmlFor="email">
                      Email <span className="asterisk-mandatory">*</span>
                    </label>
                    <input
                      autoComplete="off"
                      className="register-email-input"
                      type="email"
                      name="email"
                      id="email"
                      onChange={(e) => setEmail(e.target.value)}
                    ></input>
                    <div className="d-flex justify-content-between">
                      {/* <Row>
                        <Col sm="4">
                          <label
                            className="register-email-text"
                            htmlFor="countryCode"
                          >
                            Country Code{" "}
                            <span className="asterisk-mandatory">*</span>
                          </label>
                        </Col>
                        <input
                          autoComplete="off"
                          className="register-country-input form-control"
                          type="text"
                          name="countryCode"
                          value={countryCode}
                          id="countryCode"
                          onChange={(e) => setCountryCode(e.target.value)}
                        ></input>
                      </Row> */}
                      <div className="codewidth">
                        <label
                          className="register-email-text"
                          htmlFor="countryCode"
                        >
                          Country Code{' '}
                          <span className="asterisk-mandatory">*</span>
                        </label>
                        <input
                          autoComplete="off"
                          className="register-country-input form-control"
                          type="text"
                          name="countryCode"
                          placeholder={countryCode}
                          value={countryCode}
                          id="countryCode"
                          onChange={(e) => setCountryCode(e.target.value)}
                        ></input>
                      </div>
                      <div className="d-flex align-items-start flex-column mobilewidth">
                        <label
                          className="register-mobile-text"
                          htmlFor="mobileNumber"
                        >
                          Mobile Number{' '}
                          <span className="asterisk-mandatory">*</span>
                        </label>
                        <input
                          autoComplete="off"
                          className="register-mobile-input form-control"
                          type="text"
                          name="mobileNumber"
                          value={mobileNumber}
                          id="mobileNumber"
                          onChange={(e) => {
                            let telephone = e.target.value;
                            if (telephone.length > 10) {
                              return;
                            }
                            if (
                              e.target.value.match(/^[1-9]\d*\.?\d*$/) ||
                              telephone === ''
                            ) {
                              telephone = telephone.replace(/\s/g, '');
                              setMobileNumber(telephone);
                            }
                          }}
                        ></input>
                      </div>
                    </div>
                    <label
                      className="register-password-text"
                      htmlFor="password"
                    >
                      Password <span className="asterisk-mandatory">*</span>
                    </label>
                    {passwordVisible ? (
                      <div className="d-flex justify-content-between">
                        <input
                          autoComplete="off"
                          className="register-password-input"
                          type="text"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <Button
                          type="button"
                          className="register-password-show-button"
                          onClick={() => setPasswordVisible(false)}
                        >
                          Hide
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-between">
                        <input
                          autoComplete="off"
                          className="register-password-input"
                          type="password"
                          name="password"
                          onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <Button
                          type="button"
                          className="register-password-show-button"
                          onClick={() => setPasswordVisible(true)}
                        >
                          Show
                        </Button>
                      </div>
                    )}
                    <label
                      className="register-password-text"
                      htmlFor="rePassword"
                    >
                      Confirm Password{' '}
                      <span className="asterisk-mandatory">*</span>
                    </label>
                    {rePasswordVisible ? (
                      <div className="d-flex justify-content-between">
                        <input
                          autoComplete="off"
                          className="register-password-input"
                          type="text"
                          id="rePassword"
                          name="rePassword"
                          onChange={(e) => setRePassword(e.target.value)}
                        ></input>
                        <Button
                          type="button"
                          className="register-password-show-button"
                          onClick={() => setRePasswordVisible(false)}
                        >
                          Hide
                        </Button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-between">
                        <input
                          autoComplete="off"
                          className="register-password-input"
                          type="password"
                          id="rePassword"
                          name="rePassword"
                          onChange={(e) => setRePassword(e.target.value)}
                        ></input>
                        <Button
                          type="button"
                          className="register-password-show-button"
                          onClick={() => setRePasswordVisible(true)}
                        >
                          Show
                        </Button>
                      </div>
                    )}
                    <Button className="register-submit" type="submit">
                      Sign Up
                    </Button>
                    <Button
                      className="close-btn"
                      onClick={props.onHideRegisterClick}
                    >
                      Close
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Col>
        </Modal.Body>
      </Modal>
      <ToastContainer limit={1} />
    </>
  );
}

export default withRouter(LoginRegister);
