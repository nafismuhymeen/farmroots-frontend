import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Nav,
  Navbar,
  Form,
  Button,
  FormControl,
  NavDropdown,
  Row,
  Col,
} from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { FiShoppingCart, FiUser, FiSearch, FiX } from "react-icons/fi";
import Cart from "./Cart";
import LoginRegister from "./LoginRegister";
import { listProductNames } from "../actions/productActions";
import { createLogo, editLogo, getEmployeeLogo } from "../actions/logoActions";
import { listCategories } from "../actions/productCategoryActions";
import {
  showLoginModal,
  showRegisterModal,
  showForgetPasswordModal,
  hideAllModal,
} from "../actions/loginActions";
import { logout } from "../actions/userActions";
import { emptyCart } from "../actions/cartActions";

function Header(props) {
  const [searchArray, setSearchArray] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [farmrootsLogo, setFarmrootsLogo] = useState("");
  const [farmrootsWhiteLogo, setFarmrootsWhiteLogo] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const productName = useSelector((state) => state.productName);
  const { loading, productNames, error } = productName;

  const logoGet = useSelector((state) => state.logoGet);
  const { logo } = logoGet;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = categoryList;

  const modalStatus = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProductNames());
    dispatch(listCategories());
    dispatch(getEmployeeLogo());
    let mounted = true;

    return () => {
      //
    };
  }, []);

  const openCart = () => {
    document.querySelector(".cart").classList.add("open");
  };

  const openLogin = () => dispatch(showLoginModal());

  const openRegister = () => dispatch(showRegisterModal());

  // const openForgotPassword = () => dispatch(showForgetPasswordModal());
  const handleLogout = () => {
    dispatch(logout());
    dispatch(emptyCart());
    localStorage.removeItem("timer");
    props.history.push("/");
  };

  const searchHandler = (e) => {
    setSearchArray([]);
    closeSearchDropdown();
    e.preventDefault();
    if (searchKeyword !== "") {
      props.history.push("/search/" + searchKeyword);
    }
  };

  const searchCloseHandler = () => {
    setSearchKeyword("");
    setSearchArray([]);
    closeSearchDropdown();
  };

  const autoSearchHandler = (searchItem) => {
    let str = searchItem.split("(");

    setSearchKeyword(searchItem);
    setSearchArray([]);
    closeSearchDropdown();

    props.history.push("/search/" + searchItem);
  };

  const openSearchDropdown = () => {
    document.querySelector(".header-searchbar-dropdown").classList.add("open");
  };

  const closeSearchDropdown = () => {
    document
      .querySelector(".header-searchbar-dropdown")
      .classList.remove("open");
  };

  function getProductNames(keyword) {
    keyword = keyword.toLowerCase();
    var array = [];
    for (var name of productNames) {
      var temp = name.toLowerCase();
      if (temp.indexOf(keyword) !== -1) {
        array.push(name);
      }
      if (array.length === 6) {
        break;
      }
    }
    setSearchArray(array);
  }

  const autoCompleteSearch = (keyword) => {
    setSearchKeyword(keyword);
    if (keyword === "") {
      closeSearchDropdown();
    } else {
      openSearchDropdown();
      getProductNames(keyword);
    }
  };
  let a = logoGet.logo;
  let cc = "";
  if (a !== undefined) {
    cc = a.farmrootsLogo;
  }
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light stickytopheader">
        <Link
          className="navbar-brand"
          to="/"
          onClick={() => window.scroll(0, 0)}
        >
          <img
            className="navbarImage"
            src={process.env.REACT_APP_IMG_BASEURL + cc}
            alt="Farmroots logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto centernavbtn">
            <li className="nav-item dropdown header-dropdown">
              <Link
                className="nav-link headerbtnstyle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => {
                  window.location.pathname = "/all-products";
                }}
              >
                Categories
              </Link>
              <div
                className="dropdown-menu header-dropdown-content"
                aria-labelledby="navbarDropdown"
              >
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="header-categories-dropdown-category  "
                  >
                    <Link
                      to={
                        "/grocery/category/" +
                        category.name.replace(" and ", " & ")
                      }
                      className="header-category-button dropdown-itemwhite btn"
                    >
                      {category.name.replace(" and ", " & ")}
                    </Link>
                    <div className="header-categories-dropdown-subcategory">
                      {category.subCategories.map((subcategory) => (
                        <Link
                          to={
                            "/grocery/category/" +
                            category.name.replace(" and ", " & ") +
                            "?sub-category=" +
                            subcategory.name.replace(" and ", " & ")
                          }
                          style={{
                            borderTopColor: "#f5f5f5",
                            borderBottomColor: "#f5f5f5",
                          }}
                          className="header-dropdown-button dropdown-itemwhite btn"
                          key={subcategory._id}
                        >
                          {subcategory.name.replace(" and ", " & ")}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </li>
            <div className="borderHeader"></div>
            <li className="nav-item dropdown header-dropdown">
              <Link
                className="nav-link headerbtnstyle"
                to="/videos"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => {
                  window.location.pathname = "/videos";
                }}
              >
                Videos
              </Link>
              <div
                className="dropdown-menu header-dropdown-content"
                aria-labelledby="navbarDropdown"
              >
                <Link
                  className="dropdown-item dropdown-itemwhite "
                  to="/videos?scroll=cooking-videos"
                >
                  Cooking Videos
                </Link>
                <Link
                  className="dropdown-item dropdown-itemwhite "
                  to="/videos?scroll=kitchen-hacks"
                >
                  Kitchen Hacks
                </Link>
                <Link
                  className="dropdown-item dropdown-itemwhite "
                  to="/videos?scroll=health-tips"
                >
                  Health Tips
                </Link>
              </div>
            </li>
            <div className="borderHeader"></div>

            <li className="nav-item dropdown header-dropdown">
              <Link
                className="nav-link headerbtnstyle"
                to="/about-us"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => {
                  window.location.pathname = "/about-us";
                }}
              >
                About Us
              </Link>
              <div
                className="dropdown-menu header-dropdown-content"
                aria-labelledby="navbarDropdown"
              >
                <Link
                  className="dropdown-item dropdown-itemwhite "
                  to="/about-us?scroll=about-farmroots"
                >
                  About Farmroots
                </Link>
                <Link
                  className="dropdown-item dropdown-itemwhite "
                  to="/about-us?scroll=vision"
                >
                  Vision
                </Link>
                <Link
                  className="dropdown-item dropdown-itemwhite "
                  to="/about-us?scroll=management"
                >
                  Management
                </Link>
                <Link
                  className="dropdown-item dropdown-itemwhite "
                  to="/about-us?scroll=factory"
                >
                  Factory
                </Link>
              </div>
            </li>
            <div className="borderHeader notinmobile"></div>

            <li className="nav-item dropdown header-dropdown notinmobile">
              <Link
                className="nav-link headerbtnstyle"
                to="/careers"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => {
                  window.location.pathname = "/careers";
                }}
              >
                Careers
              </Link>
              <div
                className="dropdown-menu header-dropdown-content"
                aria-labelledby="navbarDropdown"
              >
                <Link
                  className="dropdown-item dropdown-itemwhite "
                  to="/careers?scroll=life-at-farmroots"
                >
                  Life at Farmroots
                </Link>
                <Link
                  className="dropdown-item dropdown-itemwhite "
                  to="/careers?scroll=job-openings"
                >
                  Job Openings
                </Link>
                <Link
                  className="dropdown-item dropdown-itemwhite "
                  to="/careers?scroll=articles"
                >
                  Articles and Publications
                </Link>
              </div>
            </li>
          </ul>
          <div className="nav-item dropdown header-dropdown onlyinmobile">
            <>
              <Link
                className="nav-link headerbtnstyle"
                to="/careers"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                onClick={() => {
                  window.location.pathname = "/careers";
                }}
              >
                Careers
              </Link>
              <div
                className="dropdown-menu header-dropdown-content"
                aria-labelledby="navbarDropdown"
              >
                <Link
                  className="dropdown-item dropdown-itemwhite "
                  to="/careers?scroll=life-at-farmroots"
                >
                  Life at Farmroots
                </Link>
                <Link
                  className="dropdown-item dropdown-itemwhite "
                  to="/careers?scroll=job-openings"
                >
                  Job Openings
                </Link>
                <Link
                  className="dropdown-item dropdown-itemwhite "
                  to="/careers?scroll=articles"
                >
                  Articles and Publications
                </Link>
              </div>
            </>
          </div>

          <div className="row searchstyle">
            <div className="dflex">
              <div>
                {userInfo ? (
                  <div className="ml-1">
                    <div class="dropdown">
                      <button
                        class="btn ml-2 mr-2 header-login-cart-icon headerUserNameText"
                        type="button"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {userInfo.name}
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <Link
                          class="dropdown-item colorBlack"
                          to="/user-profile/user-info"
                        >
                          User Info
                        </Link>
                        <Link
                          class="dropdown-item colorBlack"
                          onClick={handleLogout}
                        >
                          Log Out
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="dflexMaxcontent">
                    <button
                      className="btn my-2 my-sm-0 customHeaderBtn"
                      type="submit"
                      onClick={openRegister}
                    >
                      Sign Up
                    </button>
                    <div className="headerColorline"></div>
                    <button
                      className="btn my-2 my-sm-0 customHeaderBtn"
                      type="submit"
                      onClick={openLogin}
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
              <div className="dflex cartformobile">
                <Button onClick={openCart} className="header-login-cart-icon">
                  <FiShoppingCart></FiShoppingCart>
                </Button>
                {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0) >
                0 ? (
                  <Button
                    className="header-login-cart-button"
                    style={{ color: "black" }}
                    type="button"
                    onClick={openCart}
                  >
                    Cart (
                    {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)})
                  </Button>
                ) : (
                  <Button
                    className="header-login-cart-button"
                    style={{ color: "black" }}
                    type="button"
                    onClick={openCart}
                  >
                    Cart
                  </Button>
                )}
              </div>
            </div>
            <form
              className="form-inline my-2 mx-2 my-lg-0"
              onSubmit={searchHandler}
            >
              <input
                style={{ color: "black" }}
                className="form-control mr-2 ml-2 searchstyleblack searchstylewhite"
                type="input"
                placeholder="Search..."
                value={searchKeyword}
                onChange={(e) => {
                  autoCompleteSearch(e.target.value);
                }}
                aria-label="Search"
              />
              {searchKeyword === "" ? (
                <Button type="submit" className="header-searchbar-submit">
                  <FiSearch className="alignright"></FiSearch>
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={searchCloseHandler}
                  className="header-searchbar-submit"
                >
                  <FiX className="alignright"></FiX>
                </Button>
              )}
            </form>
            <div className="header-searchbar-dropdown">
              {loading ? (
                <div></div>
              ) : error ? (
                <div>{error.message}</div>
              ) : (
                <>
                  {searchArray.length === 0 ? (
                    <div>
                      <div className="header-searchbar-dropdown-text">
                        No Results Found
                      </div>
                      <Button
                        href="/suggest-product"
                        className="header-searchbar-suggest-product"
                      >
                        Suggest a Product?
                      </Button>
                    </div>
                  ) : (
                    searchArray.map((searchItem) => (
                      <Button
                        onClick={() => autoSearchHandler(searchItem)}
                        className="header-searchbar-dropdown-button"
                      >
                        {searchItem}
                      </Button>
                    ))
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div>
        <LoginRegister
          showLogin={modalStatus.login}
          onHideLoginClick={() => dispatch(hideAllModal())}
          onShowLoginClick={() => dispatch(showLoginModal())}
          showRegister={modalStatus.register}
          onHideRegisterClick={() => dispatch(hideAllModal())}
          onShowRegisterClick={() => dispatch(showRegisterModal())}
          showForgetPass={modalStatus.forgetPassword}
          onShowForgetPassClick={() => dispatch(showForgetPasswordModal())}
          onHideForgetPassClick={() => dispatch(hideAllModal())}
        />
        <Cart></Cart>
      </div>
    </Fragment>
  );
}

export default withRouter(Header);
