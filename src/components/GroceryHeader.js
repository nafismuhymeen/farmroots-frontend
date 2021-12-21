import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Nav, Navbar, Form, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { FiShoppingCart, FiUser, FiSearch, FiX } from "react-icons/fi";
import GroceryCart from "./GroceryCart";
import GroceryLoginRegister from "./GroceryLoginRegister";
import { listProductNames } from "../actions/productActions";
import { listCategories } from "../actions/productCategoryActions";
import { getEmployeeLogo } from "../actions/logoActions";
import { logout } from "../actions/userActions";
import { emptyCart } from "../actions/cartActions";
import {
  showLoginModal,
  showRegisterModal,
  showForgetPasswordModal,
  hideAllModal,
} from "../actions/loginActions";
import LoginRegister from "./LoginRegister";

function Header(props) {
  const [searchArray, setSearchArray] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productName = useSelector((state) => state.productName);
  const { loading, productNames, error } = productName;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = categoryList;

  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.modal);

  const logoGet = useSelector((state) => state.logoGet);
  const { logo } = logoGet;

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
    document.querySelector(".grocery-cart").classList.add("open");
  };
  const handleLogout = () => {
    dispatch(logout());
    dispatch(emptyCart());
    props.history.push("/");
  };

  // const openLogin = () => {
  //   document.querySelector(".grocery-login-modal").classList.add("open");
  // };

  // const openRegister = () => {
  //   document.querySelector(".grocery-register-modal").classList.add("open");
  // };
  const openLogin = () => dispatch(showLoginModal());

  const openRegister = () => dispatch(showRegisterModal());
  const searchHandler = (e) => {
    e.preventDefault();
    if (searchKeyword !== "") {
      props.history.push("/search/" + searchKeyword);
    }
  };

  const hoverContent = (e) => {
    e.target.style.display = "block";
  };

  const hoverContentout = (e) => {
    e.target.style.display = "none";
  };

  const searchCloseHandler = () => {
    setSearchKeyword("");
    setSearchArray([]);
    closeSearchDropdown();
  };

  const autoSearchHandler = (searchItem) => {
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
  if (a != undefined) {
    cc = a.farmrootsWhiteLogo;
  }
  return (
    <Fragment>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark stickytopheader">
        <Link class="navbar-brand" to="/">
          <img
            className="navbarImage"
            src={process.env.REACT_APP_IMG_BASEURL + cc}
            alt="Farmroots Logo"
          />
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto centernavbtn">
            <li class="nav-item dropdown header-dropdown">
              <Link
                class="nav-link headerbtnstyle headerbtnstyleblack"
                to="/all-products"
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
                class="dropdown-menu header-dropdown-content"
                aria-labelledby="navbarDropdown"
              >
                {categories.map((category) => (
                  <div
                    key={category._id}
                    className="header-categories-dropdown-category"
                  >
                    <Link
                      to={
                        "/grocery/category/" +
                        category.name.replace(" and ", " & ")
                      }
                      className="header-category-button btn"
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
                          className="header-dropdown-button btn "
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
            <div class="borderHeader"></div>
            <li class="nav-item dropdown header-dropdown">
              <Link
                class="nav-link headerbtnstyle headerbtnstyleblack"
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
                  className="dropdown-item"
                  to="/videos?scroll=cooking-videos"
                >
                  Cooking Videos{" "}
                </Link>
                <Link
                  className="dropdown-item"
                  to="/videos?scroll=kitchen-hacks"
                >
                  {" "}
                  Kitchen Hacks
                </Link>
                <Link className="dropdown-item" to="/videos?scroll=health-tips">
                  Health Tips
                </Link>
              </div>
            </li>
            <div class="borderHeader"></div>
            <li class="nav-item dropdown header-dropdown">
              <Link
                class="nav-link headerbtnstyle headerbtnstyleblack"
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
                class="dropdown-menu header-dropdown-content"
                aria-labelledby="navbarDropdown"
              >
                <Link
                  class="dropdown-item"
                  to="/about-us?scroll=about-farmroots"
                >
                  About Farmroots
                </Link>
                <Link class="dropdown-item" to="/about-us?scroll=vision">
                  Vision
                </Link>
                <Link class="dropdown-item" to="/about-us?scroll=management">
                  Management
                </Link>
                <Link class="dropdown-item" to="/about-us?scroll=factory">
                  Factory
                </Link>
              </div>
            </li>
            <div class="borderHeader notinmobile"></div>

            <li className="nav-item dropdown header-dropdown notinmobile">
              <Link
                className="nav-link headerbtnstyle headerbtnstyleblack"
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
                  className="dropdown-item"
                  to="/careers?scroll=life-at-farmroots"
                >
                  {" "}
                  Life at Farmroots{" "}
                </Link>
                <Link
                  className="dropdown-item"
                  to="/careers?scroll=job-openings"
                >
                  {" "}
                  Job Openings
                </Link>
                <Link className="dropdown-item" to="/careers?scroll=articles">
                  {" "}
                  Articles and Publications
                </Link>
              </div>
            </li>
          </ul>

          <div className="nav-item dropdown header-dropdown onlyinmobile">
            <Link
              className="nav-link headerbtnstyle headerbtnstyleblack"
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
                className="dropdown-item"
                to="/careers?scroll=life-at-farmroots"
                style={{ color: "black" }}
              >
                Life at Farmroots
              </Link>
              <Link
                style={{ color: "black" }}
                className="dropdown-item"
                to="/careers?scroll=job-openings"
              >
                Job Openings
              </Link>
              <Link
                style={{ color: "black" }}
                className="dropdown-item"
                to="/careers?scroll=articles"
                style={{ color: "black" }}
              >
                Articles and Publications
              </Link>
            </div>
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
                        style={{ color: "white" }}
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
                      style={{ color: "white" }}
                    >
                      Sign Up
                    </button>
                    <div
                      className="headerColorline"
                      style={{ color: "white" }}
                    ></div>
                    <button
                      className="btn my-2 my-sm-0 customHeaderBtn"
                      type="submit"
                      onClick={openLogin}
                      style={{ color: "white" }}
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
              <div className="dflex cartformobile">
                <Button
                  onClick={openCart}
                  style={{ color: "white" }}
                  className="header-login-cart-icon"
                >
                  <FiShoppingCart></FiShoppingCart>
                </Button>
                {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0) >
                0 ? (
                  <Button
                    className="header-login-cart-button"
                    type="button"
                    onClick={openCart}
                    style={{ color: "white" }}
                  >
                    Cart (
                    {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)})
                  </Button>
                ) : (
                  <Button
                    className="header-login-cart-button"
                    type="button"
                    onClick={openCart}
                    style={{ color: "white" }}
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
                style={{ color: "white" }}
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

          {/* <div className="row searchstyleBlack mr-4">
            <div className="dflex ">
              <div>
                {userInfo ? (
                  <div className="ml-1">
                    <div class="dropdown">
                      <button
                        class="btn ml-2 grocery-header-login-cart-icon headerUserNameText"
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
                          class="dropdown-item"
                          to="/user-profile/user-info"
                        >
                          User Info
                        </Link>
                        <Link class="dropdown-item" onClick={handleLogout}>
                          Log Out
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row searchstyleBlack ">
                    <button
                      className="btn my-2 my-sm-0 customHeaderBtnBlack"
                      type="submit"
                      onClick={openRegister}
                    >
                      Sign Up
                    </button>
                    <div className="headerColorline"></div>
                    <button
                      className="btn my-2 my-sm-0 customHeaderBtnBlack"
                      type="submit"
                      onClick={openLogin}
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
              <div className="dflex cartformobile">
                <Button
                  onClick={openCart}
                  className="header-login-cart-iconBlack"
                >
                  <FiShoppingCart></FiShoppingCart>
                </Button>
                {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0) >
                0 ? (
                  <Button
                    className="header-login-cart-buttonBlack"
                    type="button"
                    onClick={openCart}
                  >
                    Cart (
                    {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0)})
                  </Button>
                ) : (
                  <Button
                    className="header-login-cart-buttonBlack"
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
                className="form-control mr-sm-2 searchstyleBlack widthforSearch"
                type="search"
                placeholder="Search..."
                value={searchKeyword}
                onChange={(e) => autoCompleteSearch(e.target.value)}
                aria-label="Search"
              />
              {searchKeyword === "" ? (
                <Button type="submit" className="header-searchbar-submit">
                  <FiSearch></FiSearch>
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={searchCloseHandler}
                  className="header-searchbar-submit"
                >
                  <FiX></FiX>
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
          </div> */}
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
        <GroceryCart></GroceryCart>
      </div>
    </Fragment>
  );
}

export default withRouter(Header);
