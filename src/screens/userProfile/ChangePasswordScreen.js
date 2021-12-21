import React, { useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { changePassword } from "../../actions/userActions";
import Header from "../../components/Header";
import UserSidebar from "../../components/UserSidebar";

function ChangePasswordScreen(props) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState(false);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (newPassword === confirmNewPassword) {
      dispatch(changePassword(oldPassword, newPassword)).then((res) => {
        toast.success("Password changed successfully");
      });
    } else {
      alert("Password is not confirmed");
    }
  };

  return (
    <>
      <Container fluid={true}>
        <Header></Header>
        <Row>
          <Col sm="3">
            <UserSidebar value={"change-password"}></UserSidebar>
          </Col>
          <Col sm="9" className="paddingforgetpass">
            <Row>
              <div className="user-change-password-heading">
                Change Password
              </div>
            </Row>
            <>
              <form
                onSubmit={submitHandler}
                className="user-change-password-form"
              >
                <Row className="d-flex justify-content-between align-items-center">
                  <Col sm="5">
                    <label
                      htmlFor="oldPassword"
                      className="user-change-password-label"
                    >
                      Old Password
                    </label>
                  </Col>
                  {oldPasswordVisible ? (
                    // <Col sm="7" className="user-change-password-input-div">
                    //   <input
                    //     autoComplete="off"
                    //     type="text"
                    //     name="oldPassword"
                    //     className="user-change-password-input form-control"
                    //     onChange={(e) => setOldPassword(e.target.value)}
                    //   ></input>
                    //   <Button
                    //     className="user-change-password-input-button"
                    //     onClick={() => setOldPasswordVisible(true)}
                    //   >
                    //     Hide
                    //   </Button>
                    // </Col>
                    <Col sm="7">
                      <div className="user-change-password-input-div">
                        <input
                          autoComplete="off"
                          type="text"
                          name="oldPassword"
                          className="user-change-password-input form-control"
                          onChange={(e) => setOldPassword(e.target.value)}
                        ></input>
                        <Button
                          className="user-change-password-input-button"
                          onClick={() => setOldPasswordVisible(false)}
                        >
                          Hide
                        </Button>
                      </div>
                    </Col>
                  ) : (
                    <Col sm="7">
                      <div className="user-change-password-input-div">
                        <input
                          autoComplete="off"
                          type="password"
                          name="oldPassword"
                          className="user-change-password-input form-control"
                          onChange={(e) => setOldPassword(e.target.value)}
                        ></input>
                        <Button
                          className="user-change-password-input-button"
                          onClick={() => setOldPasswordVisible(true)}
                        >
                          Show
                        </Button>
                      </div>
                    </Col>
                  )}
                </Row>
                <Row className="d-flex justify-content-between align-items-center">
                  <Col sm="5">
                    <label
                      htmlFor="newPassword"
                      className="user-change-password-label"
                    >
                      New Password
                    </label>
                  </Col>
                  {newPasswordVisible ? (
                    <Col sm="7">
                      <div className="user-change-password-input-div">
                        <input
                          autoComplete="off"
                          type="text"
                          name="newPassword"
                          className="user-change-password-input form-control"
                          onChange={(e) => setNewPassword(e.target.value)}
                        ></input>
                        <Button
                          className="user-change-password-input-button"
                          onClick={() => setNewPasswordVisible(false)}
                        >
                          Hide
                        </Button>
                      </div>
                    </Col>
                  ) : (
                    <Col sm="7">
                      <div className="user-change-password-input-div">
                        <input
                          autoComplete="off"
                          type="password"
                          name="newPassword"
                          className="user-change-password-input form-control"
                          onChange={(e) => setNewPassword(e.target.value)}
                        ></input>
                        <Button
                          className="user-change-password-input-button"
                          onClick={() => setNewPasswordVisible(true)}
                        >
                          Show
                        </Button>
                      </div>
                    </Col>
                  )}
                </Row>
                <Row className="d-flex justify-content-between align-items-center">
                  <Col sm="5">
                    <label
                      htmlFor="confirmNewPassword"
                      className="user-change-password-label"
                    >
                      Confirm New Password
                    </label>
                  </Col>
                  {confirmNewPasswordVisible ? (
                    <Col sm="7">
                      <div className="user-change-password-input-div">
                        <input
                          autoComplete="off"
                          type="text"
                          name="confirmNewPassword"
                          className="user-change-password-input form-control"
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                        ></input>
                        <Button
                          className="user-change-password-input-button"
                          onClick={() => setConfirmNewPasswordVisible(false)}
                        >
                          Hide
                        </Button>
                      </div>
                    </Col>
                  ) : (
                    <Col sm="7">
                      <div className="user-change-password-input-div">
                        <input
                          autoComplete="off"
                          type="password"
                          name="confirmNewPassword"
                          className="user-change-password-input form-control"
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                        ></input>
                        <Button
                          className="user-change-password-input-button"
                          onClick={() => setConfirmNewPasswordVisible(true)}
                        >
                          Show
                        </Button>
                      </div>
                    </Col>
                  )}
                </Row>
                <Row className="centerbtn mb-3">
                  <Button type="submit" className="user-change-password-button">
                    Change Account Password
                  </Button>
                </Row>
              </form>
            </>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ChangePasswordScreen;
