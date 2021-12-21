import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listProductNames, listProducts } from "../../actions/productActions";
import GroceryRating from "../../components/GroceryRating";
import GroceryHeader from "../../components/GroceryHeader";
import { Button, Carousel, Container, Row, Col, Card } from "react-bootstrap";
import { InputGroup, InputGroupText, InputGroupAddon, Input } from "reactstrap";
import {
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiX,
  FiChevronRight,
} from "react-icons/fi";
import GroceryCart from "../../components/GroceryCart";
import { addToCart } from "../../actions/cartActions";
import {
  addToWishlist,
  deleteFromWishlist,
  listProductWishlist,
} from "../../actions/wishlistActions";
import { IoMdHeart } from "react-icons/io";
import { listCategories } from "../../actions/productCategoryActions";
import { listCarousel } from "../../actions/productCarouselActions";
import Dropdown from "react-dropdown";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";
import $ from "jquery";

function GroceryCategoryScreen(props) {
  const [searchArray, setSearchArray] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [sortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [products2, setproducts2] = useState([]);

  const [category, setCategory] = useState("");
  const [carosol, setCarosol] = useState(false);
  const [selecteditem, setselecteditem] = useState(false);
  const [screencount, setScreencount] = useState(0);

  const productName = useSelector((state) => state.productName);
  const {
    loading: loadingNames,
    productNames,
    error: errorNames,
  } = productName;

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  const categoryList = useSelector((state) => state.categoryList);
  const {
    categories,
    loading: loadingCategories,
    error: errorCategories,
  } = categoryList;

  const carouselList = useSelector((state) => state.carouselList);
  const {
    carousels,
    loading: loadingCarousel,
    error: errorCarousel,
  } = carouselList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productWishlist = useSelector((state) => state.productWishlist);
  const {
    wishlist,
    loading: loadingWishlist,
    error: errorWishlist,
  } = productWishlist;

  const addWishlist = useSelector((state) => state.addWishlist);
  const { success: wishlistAddSuccess } = addWishlist;

  const deleteWishlist = useSelector((state) => state.deleteWishlist);
  const { success: wishlistDeleteSuccess } = deleteWishlist;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  var categoryId = props.match.params.id;
  categoryId = categoryId.replace("%20", " ");
  categoryId = categoryId.replace(" & ", " and ");
  var subCategory = props.location.search
    ? props.location.search.split("=")[1]
    : "/";
  subCategory = subCategory.replace("%20", " ");
  subCategory = subCategory.replace("&", "and");

  useEffect(() => {
    console.log("carouselscarousels", carousels);
    if (screencount === 0) {
      window.scroll(0, 0);
    }
    setScreencount(1);
    if (subCategory === "/") {
      dispatch(listProducts("", "", categoryId));
      dispatch(listProductNames(categoryId));
    } else {
      dispatch(listProducts("", "", categoryId, subCategory));
      dispatch(listProductNames(categoryId, subCategory));
    }
    dispatch(listCategories());
    dispatch(listCarousel());
    if (userInfo) {
      dispatch(listProductWishlist());
    }
    const hi = () => {};
    hi();
    return () => {
      //
    };
  }, [
    wishlistAddSuccess,
    wishlistDeleteSuccess,
    userInfo,
    categoryId,
    subCategory,
  ]);

  const wishlistAddHandler = (productId) => {
    dispatch(addToWishlist(productId));
  };

  const wishlistDeleteHandler = (wishlistId) => {
    dispatch(deleteFromWishlist(wishlistId));
  };

  function checkProductWishlist(productId) {
    if (wishlist.indexOf(productId) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  const searchHandler = (e) => {
    e.preventDefault();
    if (subCategory === "/") {
      dispatch(listProducts(searchKeyword, sortOrder, categoryId));
    } else {
      dispatch(listProducts(searchKeyword, sortOrder, categoryId, subCategory));
    }
    setSearchArray([]);
    closeSearchDropdown();
  };

  const searchCloseHandler = (searchKeyword) => {
    if (subCategory === "/") {
      dispatch(listProducts(searchKeyword, sortOrder, categoryId));
    } else {
      dispatch(listProducts(searchKeyword, sortOrder, categoryId, subCategory));
    }
    setSearchKeyword(searchKeyword);
    setSearchArray([]);
    closeSearchDropdown();
  };

  const autoSearchHandler = (searchKeyword) => {
    dispatch(listProducts(searchKeyword, sortOrder));
    setSearchKeyword(searchKeyword);
    setSearchArray([]);
    closeSearchDropdown();
  };

  const openSearchDropdown = () => {
    document.querySelector(".grocery-search-dropdown").classList.add("open");
  };

  const closeSearchDropdown = () => {
    document.querySelector(".grocery-search-dropdown").classList.remove("open");
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

  const sortHandler = (sortOrder) => {
    if (subCategory === "/") {
      dispatch(listProducts(searchKeyword, sortOrder, categoryId));
    } else {
      dispatch(listProducts(searchKeyword, sortOrder, categoryId, subCategory));
    }
    setSortOrder(sortOrder);
    closeSortDropdown();
  };

  const openSortDropdown = () => {
    document.querySelector(".grocery-sort-dropdown-list").classList.add("open");
    setSortDropdownVisible(true);
  };

  const closeSortDropdown = () => {
    document
      .querySelector(".grocery-sort-dropdown-list")
      .classList.remove("open");
    setSortDropdownVisible(false);
  };

  const handleAddToCart = (productId) => {
    let pdincart = false;
    let qantity = 1;
    cartItems.map((x) => {
      if (x.product === productId) {
        qantity = x.qty;
        pdincart = true;
      }
    });
    if (pdincart) {
      dispatch(addToCart(productId, qantity + 1));
    } else {
      dispatch(addToCart(productId, qantity));
    }

    openCart();
  };

  const openCart = () => {
    document.querySelector(".grocery-cart").classList.add("open");
  };

  function getSubCategoriesFromArray(category) {
    var subCategories = [];
    for (const subCategory of category.subCategories) {
      subCategories.push(subCategory.name.replace(" and ", " & "));
    }

    subCategories = subCategories.map((x) => <Link to="">{x}</Link>);
    return subCategories;
  }

  const _onSelect = (option, e, i) => {
    setCarosol(true);
    props.history.push(`/grocery/category/${option.name}?sub-category=${i}`);
  };
  const handleBuyNow = (productId) => {
    dispatch(addToCart(productId, 1));
    setTimeout(() => {
      props.history.push("/checkout");
    }, 1000);
  };

  const setselectedFunction = () => {
    setselecteditem(true);
  };

  let arr = [];
  let arr2 = [];
  products.map((x) => {
    let y = x.name.split(" ");
    if (y[0] == "Farmroots") {
      arr.push(x);
    } else {
      arr2.push(x);
    }
    return 0;
  });

  console.log("productsproductsproductsproductsproducts", products);

  setTimeout(() => {
    setproducts2(arr.concat(arr2));
  }, 1000);

  return (
    <Fragment>
      <GroceryHeader></GroceryHeader>
      <Container fluid="true" className="categoryContainerBackground">
        <Row className="margin-LR">
          {loadingCategories ? (
            <Row></Row>
          ) : errorCategories ? (
            <Row>{errorCategories.message}</Row>
          ) : (
            <Col sm="3" className="grocery-sidebar">
              <h1 className="grocery-sidebar-heading">Categories</h1>
              {categories.map((category, index) => (
                <>
                  <div class="dropdown">
                    <button
                      onClick={(e) => {
                        $(".dropdown-arrows").css("transform", "rotate(0deg)");
                        $(".dropdown-content").css("display", "none");
                        $(e.target).siblings().css("display", "block");
                        $(`#${index}.dropdown-arrows`).css(
                          "transform",
                          "rotate(90deg)"
                        );
                      }}
                      class="dropbtn"
                      key={category._id}
                      value={category.name.replace(" and ", " & ")}
                      onFocus={() => {
                        setCategory(category.name.replace(" and ", " & "));
                      }}
                    >
                      {category.name.replace(" and ", " & ")}
                      <FiChevronRight
                        id={index}
                        className="grocery-sidebar-dropdown-arrows dropdown-arrows"
                      ></FiChevronRight>
                    </button>

                    <div
                      // onClick={(e, i) => _onSelect(category, e, i)}
                      className="dropdown-content"
                    >
                      <p
                        onClick={(e) => {
                          setselectedFunction();
                          _onSelect(category, e, e.target.firstChild.data);
                        }}
                      >
                        {getSubCategoriesFromArray(category)}
                      </p>
                    </div>
                  </div>
                  {/* <Dropdown
                    key={category._id}
                    value={category.name.replace(" and ", " & ")}
                    options={getSubCategoriesFromArray(category)}
                    onFocus={() =>
                      setCategory(category.name.replace(" and ", " & "))
                    }
                    onChange={_onSelect}
                    controlClassName="grocery-sidebar-dropdown-control"
                    className="grocery-sidebar-dropdown fourbrick1"
                    menuClassName="grocery-sidebar-dropdown-menu"
                    optionClassname="grocery-sidebar-dropdown-options"
                    arrowOpen={
                      <FiChevronDown className="grocery-sidebar-dropdown-arrows"></FiChevronDown>
                    }
                    arrowClosed={
                      <FiChevronRight className="grocery-sidebar-dropdown-arrows"></FiChevronRight>
                    }
                  /> */}
                </>
              ))}
            </Col>
          )}
          {/* {carosol ? null : */}
          <Col sm="9">
            {props.location.search !== "" ? null : (
              <Row className="grocery-main">
                <Carousel className="grocery-carousel">
                  {loadingCarousel ? (
                    <div></div>
                  ) : errorCarousel ? (
                    <div>{errorCarousel.message}</div>
                  ) : (
                    carousels.map((carousel) => (
                      <Carousel.Item key={carousel._id} interval={2000}>
                        <Link
                          to={`/product/${carousel.category.replace(
                            " ",
                            ""
                          )}/${carousel.subCategory.replace(" ", "")}/${
                            carousel.productId
                          }`}
                        >
                          <img
                            className="grocery-carousel-image poaspdop"
                            src={
                              process.env.REACT_APP_IMG_BASEURL + carousel.image
                            }
                            alt="Carousel"
                          ></img>
                        </Link>

                        {/* {carousel.position === "Right" ? (
                          <div className="grocery-carousel-content-right">
                            <h1 className="grocery-carousel-text">
                              {carousel.productName}
                            </h1>
                            <Link
                              to={`/grocery/product/${carousel.productId}`}
                   
                              className="grocery-carousel-button"
                            >
                              Order Now
                            </Link>
                          </div>
                        ) : (
                          <div className="grocery-carousel-content-left">
                            <h1 className="grocery-carousel-text">
                              {carousel.productName}
                            </h1>
                            <Link
                              to={`/grocery/product/${carousel.productId}`}
                 
                              className="grocery-carousel-button"
                            >
                              Order Now
                            </Link>
                          </div>
                        )} */}
                      </Carousel.Item>
                    ))
                  )}
                </Carousel>
              </Row>
            )}

            <Row className="mb-3 mt-3">
              {/* <Col sm="12" className="grocery-search-sort"> */}
              {subCategory === "/" ? (
                <Col sm="12" lg={{ size: 4 }}>
                  <h1 className="grocery-search-sort-heading">
                    {categoryId.split("%20").join(" ").replace(" and ", " & ")}
                  </h1>
                </Col>
              ) : (
                <Col sm="12" lg={{ size: 4 }}>
                  <h1 className="grocery-search-sort-heading">
                    {subCategory.split("%20").join(" ").replace(" and ", " & ")}
                  </h1>
                </Col>
              )}
              <>
                <Col
                  xs="12"
                  sm="6"
                  lg={{ size: 4 }}
                  className="grocery-sort paddingZero "
                >
                  <span className="grocery-search-sort-heading sortby">
                    Sort By
                  </span>
                  <div className="grocery-sort-dropdown">
                    {sortDropdownVisible ? (
                      <>
                        {sortOrder === "" && (
                          <Button
                            onClick={closeSortDropdown}
                            className="grocery-sort-dropdown-select"
                          >
                            Latest <FiChevronUp></FiChevronUp>
                          </Button>
                        )}
                        {sortOrder === "highestPrice" && (
                          <Button
                            onClick={closeSortDropdown}
                            className="grocery-sort-dropdown-select"
                          >
                            Price: Highest First <FiChevronUp></FiChevronUp>
                          </Button>
                        )}
                        {sortOrder === "lowestPrice" && (
                          <Button
                            onClick={closeSortDropdown}
                            className="grocery-sort-dropdown-select"
                          >
                            Price: Lowest First <FiChevronUp></FiChevronUp>
                          </Button>
                        )}
                        {sortOrder === "highestRating" && (
                          <Button
                            onClick={closeSortDropdown}
                            className="grocery-sort-dropdown-select"
                          >
                            Rating: Highest First <FiChevronUp></FiChevronUp>
                          </Button>
                        )}
                        {sortOrder === "lowestRating" && (
                          <Button
                            onClick={closeSortDropdown}
                            className="grocery-sort-dropdown-select"
                          >
                            Rating: Lowest First <FiChevronUp></FiChevronUp>
                          </Button>
                        )}
                      </>
                    ) : (
                      <>
                        {sortOrder === "" && (
                          <Button
                            onClick={openSortDropdown}
                            className="grocery-sort-dropdown-select"
                          >
                            Latest <FiChevronDown></FiChevronDown>
                          </Button>
                        )}
                        {sortOrder === "highestPrice" && (
                          <Button
                            onClick={openSortDropdown}
                            className="grocery-sort-dropdown-select"
                          >
                            Price: Highest First <FiChevronDown></FiChevronDown>
                          </Button>
                        )}
                        {sortOrder === "lowestPrice" && (
                          <Button
                            onClick={openSortDropdown}
                            className="grocery-sort-dropdown-select"
                          >
                            Price: Lowest First <FiChevronDown></FiChevronDown>
                          </Button>
                        )}
                        {sortOrder === "highestRating" && (
                          <Button
                            onClick={openSortDropdown}
                            className="grocery-sort-dropdown-select"
                          >
                            Rating: Highest First
                            <FiChevronDown></FiChevronDown>
                          </Button>
                        )}
                        {sortOrder === "lowestRating" && (
                          <Button
                            onClick={openSortDropdown}
                            className="grocery-sort-dropdown-select"
                          >
                            Rating: Lowest First <FiChevronDown></FiChevronDown>
                          </Button>
                        )}
                      </>
                    )}
                    <div className="grocery-sort-dropdown-list">
                      <Button
                        className="grocery-sort-dropdown-list-button"
                        onClick={() => sortHandler("")}
                      >
                        Latest
                      </Button>
                      <Button
                        className="grocery-sort-dropdown-list-button"
                        onClick={() => sortHandler("highestPrice")}
                      >
                        Price: Highest First
                      </Button>
                      <Button
                        className="grocery-sort-dropdown-list-button"
                        onClick={() => sortHandler("lowestPrice")}
                      >
                        Price: Lowest First
                      </Button>
                      <Button
                        className="grocery-sort-dropdown-list-button"
                        onClick={() => sortHandler("highestRating")}
                      >
                        Rating: Highest First
                      </Button>
                      <Button
                        className="grocery-sort-dropdown-list-button"
                        onClick={() => sortHandler("lowestRating")}
                      >
                        Rating: Lowest First
                      </Button>
                    </div>
                  </div>
                </Col>
                {/* <div> */}
                <Col xs="12" sm="6" lg={{ size: 4 }} className="dflexandCenter">
                  <Row className="grocery-search">
                    <form onSubmit={searchHandler}>
                      <input
                        autoComplete="off"
                        className="grocery-search-input "
                        name="searchKeyword"
                        value={searchKeyword}
                        placeholder="Search..."
                        onChange={(e) => autoCompleteSearch(e.target.value)}
                      ></input>
                      {searchKeyword === "" ? (
                        <Button className="grocery-search-submit" type="submit">
                          <FiSearch></FiSearch>
                        </Button>
                      ) : (
                        <Button
                          onClick={() => searchCloseHandler("")}
                          className="grocery-search-submit"
                          type="button"
                        >
                          <FiX></FiX>
                        </Button>
                      )}
                    </form>
                    <div className="grocery-search-dropdown">
                      {loadingNames ? (
                        <div></div>
                      ) : errorNames ? (
                        <div>{error.message}</div>
                      ) : (
                        <>
                          {searchArray.length === 0 ? (
                            <div>
                              <div className="grocery-search-dropdown-text">
                                No Results Found
                              </div>
                              <Button
                                href="/suggest-product"
                                className="grocery-search-suggest-product"
                              >
                                Suggest a Product?
                              </Button>
                            </div>
                          ) : (
                            searchArray.map((searchItem) => (
                              <Button
                                onClick={() => autoSearchHandler(searchItem)}
                                className="grocery-search-dropdown-button"
                              >
                                {searchItem}
                              </Button>
                            ))
                          )}
                        </>
                      )}
                    </div>
                  </Row>
                </Col>

                {/* </div> */}
              </>
              {/* </Col> */}
            </Row>
            <Row>
              <>
                {loading ? (
                  <Col>.</Col>
                ) : error ? (
                  <Col>{error}</Col>
                ) : (
                  <>
                    {/* <ul className="grocery-products"> */}
                    {products2.map((product) => (
                      <Col xs="6" className="col-lg-25" key={product.id}>
                        <Card className="grocery-product">
                          <>
                            <Link
                              className="imgContainer"
                              to={`/product/${product.category}/${product.subCategory}/${product.id}`}
                            >
                              <Card.Img
                                className="grocery-product-image"
                                src={
                                  process.env.REACT_APP_IMG_BASEURL +
                                  product.image1
                                }
                                alt="Grocery Product"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://farmroot.fourbrick.in/default.jpg";
                                }}
                              />
                              {product.price === product.discountPrice ? (
                                <></>
                              ) : (
                                <div className="discountPer">
                                  {Math.round(
                                    ((product.price - product.discountPrice) /
                                      product.price) *
                                      100
                                  )}
                                  %
                                </div>
                              )}
                            </Link>
                            {userInfo && (
                              <>
                                {loadingWishlist ? (
                                  <Row></Row>
                                ) : errorWishlist ? (
                                  <Row>{error}</Row>
                                ) : checkProductWishlist(product.id) ===
                                  true ? (
                                  <Button
                                    onClick={() =>
                                      wishlistDeleteHandler(product.id)
                                    }
                                    className="grocery-product-wishlist-remove"
                                  >
                                    <IoMdHeart></IoMdHeart>
                                  </Button>
                                ) : (
                                  <Button
                                    onClick={() =>
                                      wishlistAddHandler(product.id)
                                    }
                                    className="grocery-product-wishlist"
                                  >
                                    <IoMdHeart></IoMdHeart>
                                  </Button>
                                )}
                              </>
                            )}
                            {product.specialDeliveryOffer &&
                              product.specialDeliveryOffer.type ===
                                "Free Delivery" &&
                              product.specialDeliveryOffer.value === 0 && (
                                <div className="grocery-product-free-delivery">
                                  Free Delivery
                                </div>
                              )}
                          </>
                          <Card.Title className="grocery-product-name">
                            {product.name}
                          </Card.Title>
                          <Row className="grocery-product-rating">
                            <GroceryRating
                              value={product.rating * 20}
                            ></GroceryRating>
                            <Row className="ml-2">({product.numReviews})</Row>
                          </Row>
                          <Row className="grocery-product-price">
                            <span>Price :</span>
                            {product.price === product.discountPrice ? (
                              <div className="d-flex align-items-center">
                                <Icon icon={currencyBdt} />
                                <span>
                                  <b>{product.price}</b>
                                </span>
                              </div>
                            ) : (
                              <Row className="d-flex align-items-center flexdirectionrow">
                                <Row className="d-flex align-items-center mr-3">
                                  <Icon icon={currencyBdt} />
                                  <span>
                                    <b>{Math.round(product.discountPrice)}</b>
                                  </span>
                                </Row>
                                <Row
                                  className="d-flex align-items-center mr-3"
                                  style={{ fontSize: "1.7rem" }}
                                >
                                  <Icon icon={currencyBdt} />
                                  <span className="cutprice">
                                    {product.price}
                                  </span>
                                  <hr className="grocery-product-discount-price-cut-line"></hr>
                                </Row>
                              </Row>
                            )}
                          </Row>
                          <Row className="grocery-product-price">
                            <span>Net Weight :</span>
                            <span>{product.netWeight}</span>
                          </Row>
                          {!product.outOfStock ? (
                            <Row className="contentcenter margin0">
                              <Button
                                className="grocery-product-button mt-2"
                                onClick={() => handleBuyNow(product.id)}
                              >
                                Buy Now
                              </Button>
                              <Button
                                onClick={() => handleAddToCart(product.id)}
                                className="grocery-product-button"
                              >
                                Add To Cart
                              </Button>
                            </Row>
                          ) : (
                            <Row className="grocery-product-out-of-stock">
                              Out of Stock
                            </Row>
                          )}
                        </Card>
                      </Col>
                    ))}
                    {/* </ul> */}
                  </>
                )}
              </>
            </Row>
          </Col>
          {/* } */}
        </Row>
      </Container>
      <div className="grocery grid"></div>
    </Fragment>
  );
}

export default GroceryCategoryScreen;
