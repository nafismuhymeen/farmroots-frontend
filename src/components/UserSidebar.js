import React from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdPersonOutline } from "react-icons/md";
import { FiTruck, FiHeart, FiMapPin } from "react-icons/fi";
import { BsCreditCard } from "react-icons/bs";
import { BiMessageRoundedDetail, BiLogOutCircle } from "react-icons/bi";
import { VscKey } from "react-icons/vsc";
import { withRouter } from "react-router-dom";
import { logout } from "../actions/userActions";
import { useDispatch } from "react-redux";
import { emptyCart } from "../actions/cartActions";
function UserSidebar(props) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(emptyCart());
    props.history.push("/");
  };

  return (
    <>
      <div className="user-sidebar">
        <h1 className="user-sidebar-heading">User Profile</h1>
        {props.value === "user-info" ? (
          <Link
            to="/user-profile/user-info"
            className="user-sidebar-button user-sidebar-highlighted btn"
          >
            <div className="user-sidebar-icon-user">
              <MdPersonOutline></MdPersonOutline>
            </div>
            <div>User Info</div>
          </Link>
        ) : (
          <Link
            to="/user-profile/user-info"
            className="user-sidebar-button btn"
          >
            <div className="user-sidebar-icon-user">
              <MdPersonOutline></MdPersonOutline>
            </div>
            <div>User Info</div>
          </Link>
        )}

        {props.value === "my-orders" ? (
          <Link
            to="/user-profile/my-orders"
            className="user-sidebar-button user-sidebar-highlighted btn"
          >
            <div className="user-sidebar-icon-order">
              <FiTruck></FiTruck>
            </div>
            <div>My Orders</div>
          </Link>
        ) : (
          <Link
            to="/user-profile/my-orders"
            className="user-sidebar-button btn"
          >
            <div className="user-sidebar-icon-order">
              <FiTruck></FiTruck>
            </div>
            <div>My Orders</div>
          </Link>
        )}

        {props.value === "wishlist" ? (
          <Link
            to="/user-profile/wishlist"
            className="user-sidebar-button user-sidebar-highlighted btn"
          >
            <div className="user-sidebar-icon-wishlist">
              <FiHeart></FiHeart>
            </div>
            <div>Wishlist</div>
          </Link>
        ) : (
          <Link to="/user-profile/wishlist" className="user-sidebar-button btn">
            <div className="user-sidebar-icon-wishlist">
              <FiHeart></FiHeart>
            </div>
            <div>Wishlist</div>
          </Link>
        )}

        {props.value === "address" ? (
          <Link
            to="/user-profile/addresses"
            className="user-sidebar-button user-sidebar-highlighted btn"
          >
            <div className="user-sidebar-icon-address">
              <FiMapPin></FiMapPin>
            </div>
            <div>Addresses</div>
          </Link>
        ) : (
          <Link
            to="/user-profile/addresses"
            className="user-sidebar-button btn"
          >
            <div className="user-sidebar-icon-address">
              <FiMapPin></FiMapPin>
            </div>
            <div>Addresses</div>
          </Link>
        )}

        {props.value === "my-reviews" ? (
          <Link
            to="/user-profile/my-reviews"
            className="user-sidebar-button user-sidebar-highlighted btn"
          >
            <div className="user-sidebar-icon-review">
              <BiMessageRoundedDetail></BiMessageRoundedDetail>
            </div>
            <div>My Reviews</div>
          </Link>
        ) : (
          <Link
            to="/user-profile/my-reviews"
            className="user-sidebar-button btn"
          >
            <div className="user-sidebar-icon-review">
              <BiMessageRoundedDetail></BiMessageRoundedDetail>
            </div>
            <div>My Reviews</div>
          </Link>
        )}

        {props.value === "change-password" ? (
          <Link
            to="/user-profile/change-password"
            className="user-sidebar-button user-sidebar-highlighted btn"
          >
            <div className="user-sidebar-icon-password">
              <VscKey></VscKey>
            </div>
            <div>Change Password</div>
          </Link>
        ) : (
          <Link
            to="/user-profile/change-password"
            className="user-sidebar-button btn"
          >
            <div className="user-sidebar-icon-password">
              <VscKey></VscKey>
            </div>
            <div>Change Password</div>
          </Link>
        )}

        <Link onClick={handleLogout} className="user-sidebar-button btn">
          <div className="user-sidebar-icon-logout">
            <BiLogOutCircle></BiLogOutCircle>
          </div>
          <div>Log Out</div>
        </Link>
      </div>
    </>
  );
}

export default withRouter(UserSidebar);
