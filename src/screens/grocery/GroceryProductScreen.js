import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToBuyNow, addToCart, emptyBuyNow } from "../../actions/cartActions";
import { detailsProduct } from "../../actions/productActions";
import GroceryHeader from "../../components/GroceryHeader";
import Vegan from "../../components/Vegan";
import GroceryRating from "../../components/GroceryRating";
import GroceryTastesBetter from "./GroceryTastesBetter";
import GroceryDetailedInfo from "./GroceryDetailedInfo";
import {
  deleteProductReview,
  editProductReview,
  listProductReviews,
  listMyReview,
  saveProductReview,
} from "../../actions/reviewActions";
import GroceryReviewsRating from "../../components/GroceryReviewsRating";
import { FiChevronDown, FiChevronUp, FiSearch, FiX } from "react-icons/fi";
import StarRatings from "react-star-ratings";
import Moment from "react-moment";
import "moment-timezone";
import GroceryCart from "../../components/GroceryCart";
import GroceryLoginRegister from "../../components/GroceryLoginRegister";
import ReactImageMagnify from "react-image-magnify";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";
import { FaUserCircle } from "react-icons/fa";
import Header from "../../components/Header";
import { showLoginModal, showRegisterModal } from "../../actions/loginActions";
function GroceryProduct(props) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [image, setImage] = useState("");

  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  // const [popupVisible, setPopupVisible] = useState(true);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [tastesBetterVisible, setTastesBetterVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);
  const [screencount, setScreencount] = useState(0);
  const [detailedInfoVisible, setDetailedInfoVisible] = useState(true);
  const [myReviewVisible, setMyReviewVisible] = useState(false);
  const [reviewsSortDropdownVisible, setReviewsSortDropdownVisible] =
    useState(false);
  const [reviewsFilterDropdownVisible, setReviewsFilterDropdownVisible] =
    useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const productListReview = useSelector((state) => state.productListReview);
  const {
    loading: loadingReview,
    reviews,
    error: errorReview,
  } = productListReview;

  const productSaveReview = useSelector((state) => state.productSaveReview);
  const { success: successSaveReview } = productSaveReview;

  const productEditReview = useSelector((state) => state.productEditReview);
  const { success: successEditReview } = productEditReview;

  const productDeleteReview = useSelector((state) => state.productDeleteReview);
  const {
    loading: loadingDeleteReview,
    success: successDeleteReview,
    error: errorDeleteReview,
  } = productDeleteReview;

  const myListReview = useSelector((state) => state.myListReview);
  const {
    loading: loadingMyReview,
    review: myReview,
    error: errorMyReview,
  } = myListReview;

  const dispatch = useDispatch();

  useEffect(() => {
    if (screencount === 0) {
      window.scroll(0, 0);
    }
    setScreencount(1);
    dispatch(detailsProduct(props.match.params.id));
    dispatch(listProductReviews(props.match.params.id));
    dispatch(listMyReview(props.match.params.id));
    setImage("");
    return () => {
      //
    };
  }, [successSaveReview, successEditReview, successDeleteReview, props]);

  const searchHandler = (e) => {
    e.preventDefault();
    dispatch(
      listProductReviews(
        props.match.params.id,
        sortOrder,
        filter,
        searchKeyword
      )
    );
  };

  const searchCloseHandler = () => {
    dispatch(listProductReviews(props.match.params.id, sortOrder, filter));
    setSearchKeyword("");
  };

  const sortHandler = (sortOrder) => {
    dispatch(
      listProductReviews(
        props.match.params.id,
        sortOrder,
        filter,
        searchKeyword
      )
    );
    setSortOrder(sortOrder);
    closeReviewsSortDropdown();
  };

  const filterHandler = (filter) => {
    dispatch(
      listProductReviews(
        props.match.params.id,
        sortOrder,
        filter,
        searchKeyword
      )
    );
    setFilter(filter);
    closeReviewsFilterDropdown();
  };

  const handleAddToCart = () => {
    dispatch(addToCart(props.match.params.id, 1));
    openCart();
  };

  const handleBuyNow = () => {
    dispatch(addToCart(props.match.params.id, 1));
    setTimeout(() => {
      props.history.push("/checkout");
    }, 1000);
  };

  const reviewSaveHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProductReview(props.match.params.id, {
        rating: rating,
        comment: comment,
      })
    );
  };

  const reviewEditHandler = (e) => {
    e.preventDefault();
    dispatch(
      editProductReview({
        productId: props.match.params.id,
        reviewId: myReview[0]._id,
        rating: rating,
        comment: comment,
      })
    );
  };

  const reviewDeleteHandler = (review) => {
    dispatch(
      deleteProductReview({
        productId: props.match.params.id,
        reviewId: review._id,
      })
    );
  };

  const openModal = (review) => {
    setMyReviewVisible(true);
    setRating(review.rating);
    setComment(review.comment);
  };

  const changeRating = (newRating, name) => {
    setRating(newRating);
  };

  const openReviewsSortDropdown = () => {
    document
      .querySelector(".grocery-reviews-sort-dropdown")
      .classList.add("open");
    setReviewsSortDropdownVisible(true);
  };

  const closeReviewsSortDropdown = () => {
    document
      .querySelector(".grocery-reviews-sort-dropdown")
      .classList.remove("open");
    setReviewsSortDropdownVisible(false);
  };

  const openReviewsFilterDropdown = () => {
    document
      .querySelector(".grocery-reviews-filter-dropdown")
      .classList.add("open");
    setReviewsFilterDropdownVisible(true);
  };

  const closeReviewsFilterDropdown = () => {
    document
      .querySelector(".grocery-reviews-filter-dropdown")
      .classList.remove("open");
    setReviewsFilterDropdownVisible(false);
  };

  const openCart = () => {
    document.querySelector(".grocery-cart").classList.add("open");
  };

  const openLogin = () => dispatch(showLoginModal());

  const openRegister = () => dispatch(showRegisterModal());

  // const openLogin = () => {
  //   document.querySelector(".grocery-login-modal").classList.add("open");
  // };

  // const openRegister = () => {
  //   document.querySelector(".grocery-register-modal").classList.add("open");
  // };

  // const openPopup = () => {
  //     if(popupVisible === true)
  //     {
  //         document.querySelector(".grocery-product-popup").classList.add("open");
  //         setPopupVisible(false);
  //     }
  // }

  // const closePopup = () => {
  //     document.querySelector(".grocery-product-popup").classList.remove("open");
  //     setPopupVisible(false);
  // }

  // const handlePopupAddToCart = () => {
  //     closePopup();
  //     dispatch(addToCart(product.popupProductId, 1));
  //     openCart();
  // };

  return (
    <div className="grocery">
      <Header></Header>

      <GroceryCart></GroceryCart>
      <GroceryLoginRegister></GroceryLoginRegister>

      {/* {loading ? <div></div>:
        error ? <div>{error}</div>:
        <div className="grocery-product-popup">
            <video width="480" height="270" autoPlay="true" loop="true" muted="true">
                <source src={product.popupVideo} type="video/mp4"></source>
            </video>
            <div className="grocery-product-popup-button-div">
                <Button className="grocery-product-popup-add-button" onClick={handlePopupAddToCart}>Add To Cart</Button>
                <Button className="grocery-product-popup-close-button" onClick={closePopup}>Close</Button>
            </div>
        </div>} */}

      <Container className="grocery">
        {loading ? (
          <Row></Row>
        ) : error ? (
          <Row>{error}</Row>
        ) : (
          <>
            <Row className="grocery-product-details">
              <Col
                md="6"
                sm="12"
                xs="12"
                className="grocery-product-details-image-div"
              >
                <div className="grocery-product-details-side-image-div">
                  {image === "" ? (
                    <img
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                      }}
                      onMouseEnter={() => setImage("")}
                      className="grocery-product-details-side-image-selected "
                      src={process.env.REACT_APP_IMG_BASEURL + product.image1}
                      alt="Grocery Product"
                    ></img>
                  ) : (
                    <img
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                      }}
                      onMouseEnter={() => setImage("")}
                      className="grocery-product-details-side-image "
                      src={process.env.REACT_APP_IMG_BASEURL + product.image1}
                      alt="Grocery Product"
                    ></img>
                  )}
                  {image === product.image2 ? (
                    <img
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                      }}
                      onMouseEnter={() => setImage(product.image2)}
                      className="grocery-product-details-side-image-selected "
                      src={process.env.REACT_APP_IMG_BASEURL + product.image2}
                      alt="Grocery Product"
                    ></img>
                  ) : (
                    <img
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                      }}
                      onMouseEnter={() => setImage(product.image2)}
                      className="grocery-product-details-side-image "
                      src={process.env.REACT_APP_IMG_BASEURL + product.image2}
                      alt="Grocery Product"
                    ></img>
                  )}
                  {image === product.image3 ? (
                    <img
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                      }}
                      onMouseEnter={() => setImage(product.image3)}
                      className="grocery-product-details-side-image-selected "
                      src={process.env.REACT_APP_IMG_BASEURL + product.image3}
                      alt="Grocery Product"
                    ></img>
                  ) : (
                    <img
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                      }}
                      onMouseEnter={() => setImage(product.image3)}
                      className="grocery-product-details-side-image "
                      src={process.env.REACT_APP_IMG_BASEURL + product.image3}
                      alt="Grocery Product"
                    ></img>
                  )}
                  {image === product.image4 ? (
                    <img
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                      }}
                      onMouseEnter={() => setImage(product.image4)}
                      className="grocery-product-details-side-image-selected "
                      src={process.env.REACT_APP_IMG_BASEURL + product.image4}
                      alt="Grocery Product"
                    ></img>
                  ) : (
                    <img
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                      }}
                      onMouseEnter={() => setImage(product.image4)}
                      className="grocery-product-details-side-image "
                      src={process.env.REACT_APP_IMG_BASEURL + product.image4}
                      alt="Grocery Product"
                    ></img>
                  )}
                </div>
                {image === "" ? (
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Grocery Product",

                        isFluidWidth: true,
                        src: process.env.REACT_APP_IMG_BASEURL + product.image1,
                      },
                      largeImage: {
                        src: process.env.REACT_APP_IMG_BASEURL + product.image1,
                        width: 1000,
                        height: 1000,
                      },
                      imageClassName: "grocery-product-details-image",
                      enlargedImageContainerClassName:
                        "grocery-product-details-image-enlarged",
                    }}
                  />
                ) : (
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Grocery Product",
                        isFluidWidth: true,
                        src: process.env.REACT_APP_IMG_BASEURL + image,
                        width: 100,
                      },
                      largeImage: {
                        src: process.env.REACT_APP_IMG_BASEURL + image,
                        width: 1000,
                        height: 1000,
                      },
                      imageClassName: "grocery-product-details-image",
                      enlargedImageContainerClassName:
                        "grocery-product-details-image-enlarged",
                    }}
                  />
                )}
              </Col>
              <Col
                md="6"
                sm="12"
                xs="12"
                className="grocery-product-details-content"
              >
                <Row className="grocery-product-details-name margin0">
                  {product.name}
                </Row>
                <Row className="grocery-product-details-rating margin0">
                  <GroceryRating value={product.rating * 20}></GroceryRating>
                  <span className="ml-3">({product.numReviews})</span>
                </Row>
                <Row className="grocery-product-details-description margin0">
                  {product.smallDescription}
                </Row>
                <Row className="grocery-product-details-vegan">
                  <Col xs="6" sm="6" className="padding0">
                    <Vegan value={product.vegan}></Vegan>
                  </Col>
                  <Col xs="6" sm="6" className="padding0">
                    {product.category && (
                      <Button
                        href={`/grocery/category/${product.category.replace(
                          " and ",
                          " & "
                        )}`}
                        className="grocery-product-details-category"
                      >
                        {product.category.replace(" and ", " & ")}
                      </Button>
                    )}
                  </Col>
                </Row>
                <div className="grocery-product-details-price">
                  <div>Price</div>
                  {product.price === product.discountPrice ? (
                    <div
                      style={{ fontSize: "2.5rem" }}
                      className="d-flex align-items-center"
                    >
                      <Icon icon={currencyBdt} />
                      <div>
                        <b>{product.price}</b>
                      </div>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center">
                      <div
                        style={{ fontSize: "2.5rem" }}
                        className="d-flex align-items-center mr-3"
                      >
                        <Icon icon={currencyBdt} />
                        <div>
                          <b>{product.discountPrice}</b>
                        </div>
                      </div>
                      <div
                        className="d-flex align-items-center"
                        style={{ fontSize: "1.7rem" }}
                      >
                        <Icon icon={currencyBdt} />
                        <div className="textLinethrough">{product.price}</div>
                        <hr className="grocery-product-discount-price-cut-line"></hr>
                      </div>
                    </div>
                  )}
                </div>
                <div className="grocery-product-details-netwt">
                  <div>Net Wt.</div>
                  <div>{product.netWeight}</div>
                </div>
                <div>
                  {product.specialDeliveryOffer &&
                    product.specialDeliveryOffer.type === "Free Delivery" &&
                    product.specialDeliveryOffer.value === 0 && (
                      <div className="grocery-product-details-special-offer">
                        *Order Now to get Free Delivery
                      </div>
                    )}
                  {product.specialDeliveryOffer &&
                    product.specialDeliveryOffer.type === "Delivery Time" && (
                      <div className="grocery-product-details-special-offer">{`*Order Now to get delivery within ${product.specialDeliveryOffer.value} Hours`}</div>
                    )}
                  {product.specialDeliveryOffer &&
                    product.specialDeliveryOffer.district ===
                      "Inside Dhaka" && (
                      <div className="grocery-product-details-special-offer mt-1">
                        (<b>Note:</b> Only for orders placed within Dhaka)
                      </div>
                    )}
                  {product.specialDeliveryOffer &&
                    product.specialDeliveryOffer.district ===
                      "Outside Dhaka" && (
                      <div className="grocery-product-details-special-offer mt-1">
                        (<b>Note:</b> Only for orders placed outside Dhaka)
                      </div>
                    )}
                </div>
                {product.outOfStock ? (
                  <div className="grocery-product-details-out-of-stock">
                    Out of Stock
                  </div>
                ) : (
                  <Row className="width100">
                    <Col xs="12" sm="6" className="mt-2">
                      <Button
                        onClick={handleBuyNow}
                        className="grocery-product-details-button width100 "
                      >
                        Buy Now
                      </Button>
                    </Col>
                    <Col xs="12" sm="6" className="mt-2">
                      <Button
                        onClick={handleAddToCart}
                        className="grocery-product-details-button width100 "
                      >
                        Add To Cart
                      </Button>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>

            {tastesBetterVisible && (
              <Row className="grocery-details">
                <Col sm="12" className="grocery-details-bar">
                  <>
                    <>
                      {" "}
                      <Button
                        onClick={() => (
                          setTastesBetterVisible(false),
                          setDetailedInfoVisible(true)
                        )}
                        className="grocery-details-bar-button width100"
                      >
                        Detailed Info
                      </Button>
                    </>
                    <>
                      {" "}
                      <Button className="grocery-details-bar-button grocery-details-bar-selected width100">
                        Tastes Better With
                      </Button>
                    </>
                    <>
                      <Button
                        onClick={() => (
                          setTastesBetterVisible(false), setReviewsVisible(true)
                        )}
                        className="grocery-details-bar-button width100"
                      >
                        Customer Reviews
                      </Button>
                    </>
                  </>
                </Col>
                <hr className="grocery-details-horizontal-line"></hr>
                <Row>
                  <GroceryTastesBetter value={product}></GroceryTastesBetter>
                </Row>
              </Row>
            )}
            {reviewsVisible && (
              <div className="grocery-details">
                <div className="grocery-details-bar">
                  <Button
                    onClick={() => (
                      setReviewsVisible(false), setDetailedInfoVisible(true)
                    )}
                    className="grocery-details-bar-button"
                  >
                    Detailed Info
                  </Button>
                  <Button
                    onClick={() => (
                      setReviewsVisible(false), setTastesBetterVisible(true)
                    )}
                    className="grocery-details-bar-button"
                  >
                    Tastes Better With
                  </Button>
                  <Button className="grocery-details-bar-button grocery-details-bar-selected">
                    Customer Reviews
                  </Button>
                </div>
                {/* <hr className="grocery-details-horizontal-line"></hr> */}
                <>
                  <Row className="grocery-reviews-bar-write-review">
                    <Col sm="8">
                      {" "}
                      <>
                        {loading ? (
                          <div></div>
                        ) : error ? (
                          <div>{error}</div>
                        ) : (
                          <Row>
                            <Col
                              xs="12"
                              sm="2"
                              className="grocery-reviews-bar-data"
                            >
                              <div className="grocery-reviews-rating">
                                {product.rating.toFixed(1)}
                              </div>
                              <GroceryReviewsRating
                                value={product.rating * 20}
                              ></GroceryReviewsRating>
                              <div className="grocery-reviews-number">
                                {product.numReviews} Ratings
                              </div>
                            </Col>
                            <Col
                              xs="12"
                              sm="10"
                              className="grocery-reviews-bar-strips"
                            >
                              <div className="grocery-reviews-bar-strip">
                                <i className="fa fa-star grocery-reviews-bar-strip-star"></i>
                                <div className="grocery-reviews-bar-strip-value">
                                  5
                                </div>
                                <div className="grocery-reviews-bar-inner-strip">
                                  {product.numReviews === 0 ? (
                                    <div
                                      style={{
                                        backgroundColor: "#ffc702",
                                        width: "0%",
                                        height: "2rem",
                                      }}
                                    ></div>
                                  ) : (
                                    <div
                                      style={{
                                        backgroundColor: "#ffc702",
                                        width: `${
                                          (product.rating_5 /
                                            product.numReviews) *
                                          100
                                        }%`,
                                        height: "2rem",
                                      }}
                                    ></div>
                                  )}
                                </div>
                                {product.numReviews === 0 ? (
                                  <div className="grocery-reviews-bar-strip-value">
                                    0.0%
                                  </div>
                                ) : (
                                  <div className="grocery-reviews-bar-strip-value">
                                    {(
                                      (product.rating_5 / product.numReviews) *
                                      100
                                    ).toFixed(1)}
                                    %
                                  </div>
                                )}
                              </div>
                              <div className="grocery-reviews-bar-strip">
                                <i className="fa fa-star grocery-reviews-bar-strip-star"></i>
                                <div className="grocery-reviews-bar-strip-value">
                                  4
                                </div>
                                <div className="grocery-reviews-bar-inner-strip">
                                  {product.numReviews === 0 ? (
                                    <div
                                      style={{
                                        backgroundColor: "#ffc702",
                                        width: "0%",
                                        height: "2rem",
                                      }}
                                    ></div>
                                  ) : (
                                    <div
                                      style={{
                                        backgroundColor: "#ffc702",
                                        width: `${
                                          (product.rating_4 /
                                            product.numReviews) *
                                          100
                                        }%`,
                                        height: "2rem",
                                      }}
                                    ></div>
                                  )}
                                </div>
                                {product.numReviews === 0 ? (
                                  <div className="grocery-reviews-bar-strip-value">
                                    0.0%
                                  </div>
                                ) : (
                                  <div className="grocery-reviews-bar-strip-value">
                                    {(
                                      (product.rating_4 / product.numReviews) *
                                      100
                                    ).toFixed(1)}
                                    %
                                  </div>
                                )}
                              </div>
                              <div className="grocery-reviews-bar-strip">
                                <i className="fa fa-star grocery-reviews-bar-strip-star"></i>
                                <div className="grocery-reviews-bar-strip-value">
                                  3
                                </div>
                                <div className="grocery-reviews-bar-inner-strip">
                                  {product.numReviews === 0 ? (
                                    <div
                                      style={{
                                        backgroundColor: "#ffc702",
                                        width: "0%",
                                        height: "2rem",
                                      }}
                                    ></div>
                                  ) : (
                                    <div
                                      style={{
                                        backgroundColor: "#ffc702",
                                        width: `${
                                          (product.rating_3 /
                                            product.numReviews) *
                                          100
                                        }%`,
                                        height: "2rem",
                                      }}
                                    ></div>
                                  )}
                                </div>
                                {product.numReviews === 0 ? (
                                  <div className="grocery-reviews-bar-strip-value">
                                    0.0%
                                  </div>
                                ) : (
                                  <div className="grocery-reviews-bar-strip-value">
                                    {(
                                      (product.rating_3 / product.numReviews) *
                                      100
                                    ).toFixed(1)}
                                    %
                                  </div>
                                )}
                              </div>
                              <div className="grocery-reviews-bar-strip">
                                <i className="fa fa-star grocery-reviews-bar-strip-star"></i>
                                <div className="grocery-reviews-bar-strip-value">
                                  2
                                </div>
                                <div className="grocery-reviews-bar-inner-strip">
                                  {product.numReviews === 0 ? (
                                    <div
                                      style={{
                                        backgroundColor: "#ffc702",
                                        width: "0%",
                                        height: "2rem",
                                      }}
                                    ></div>
                                  ) : (
                                    <div
                                      style={{
                                        backgroundColor: "#ffc702",
                                        width: `${
                                          (product.rating_2 /
                                            product.numReviews) *
                                          100
                                        }%`,
                                        height: "2rem",
                                      }}
                                    ></div>
                                  )}
                                </div>
                                {product.numReviews === 0 ? (
                                  <div className="grocery-reviews-bar-strip-value">
                                    0.0%
                                  </div>
                                ) : (
                                  <div className="grocery-reviews-bar-strip-value">
                                    {(
                                      (product.rating_2 / product.numReviews) *
                                      100
                                    ).toFixed(1)}
                                    %
                                  </div>
                                )}
                              </div>
                              <div className="grocery-reviews-bar-strip">
                                <i className="fa fa-star grocery-reviews-bar-strip-star"></i>
                                <div className="grocery-reviews-bar-strip-value">
                                  1
                                </div>
                                <div className="grocery-reviews-bar-inner-strip">
                                  {product.numReviews === 0 ? (
                                    <div
                                      style={{
                                        backgroundColor: "#ffc702",
                                        width: "0%",
                                        height: "2rem",
                                      }}
                                    ></div>
                                  ) : (
                                    <div
                                      style={{
                                        backgroundColor: "#ffc702",
                                        width: `${
                                          (product.rating_1 /
                                            product.numReviews) *
                                          100
                                        }%`,
                                        height: "2rem",
                                      }}
                                    ></div>
                                  )}
                                </div>
                                {product.numReviews === 0 ? (
                                  <div className="grocery-reviews-bar-strip-value">
                                    0.0%
                                  </div>
                                ) : (
                                  <div className="grocery-reviews-bar-strip-value">
                                    {(
                                      (product.rating_1 / product.numReviews) *
                                      100
                                    ).toFixed(1)}
                                    %
                                  </div>
                                )}
                              </div>
                            </Col>
                          </Row>
                        )}
                        <Row className="d-flex justify-content-start align-items-center">
                          <Col sm="3" className="grocery-reviews-sort">
                            {reviewsSortDropdownVisible ? (
                              <Button
                                onClick={closeReviewsSortDropdown}
                                className="grocery-reviews-sort-button"
                              >
                                <div className="d-flex flex-column align-items-start">
                                  <div className="grocery-reviews-sort-button-sort">
                                    Sort
                                  </div>
                                  {sortOrder === "" && (
                                    <div style={{ fontSize: "1.4rem" }}>
                                      Most Recent
                                    </div>
                                  )}
                                  {sortOrder === "oldest" && (
                                    <div style={{ fontSize: "1.4rem" }}>
                                      Oldest
                                    </div>
                                  )}
                                  {sortOrder === "highest" && (
                                    <div style={{ fontSize: "1.4rem" }}>
                                      Highest Rated
                                    </div>
                                  )}
                                  {sortOrder === "lowest" && (
                                    <div style={{ fontSize: "1.4rem" }}>
                                      Lowest Rated
                                    </div>
                                  )}
                                </div>
                                <FiChevronUp className="grocery-reviews-sort-button-icon"></FiChevronUp>
                              </Button>
                            ) : (
                              <Button
                                onClick={openReviewsSortDropdown}
                                className="grocery-reviews-sort-button"
                              >
                                <div className="d-flex flex-column align-items-start">
                                  <div className="grocery-reviews-sort-button-sort">
                                    Sort
                                  </div>
                                  {sortOrder === "" && (
                                    <div style={{ fontSize: "1.4rem" }}>
                                      Most Recent
                                    </div>
                                  )}
                                  {sortOrder === "oldest" && (
                                    <div style={{ fontSize: "1.4rem" }}>
                                      Oldest
                                    </div>
                                  )}
                                  {sortOrder === "highest" && (
                                    <div style={{ fontSize: "1.4rem" }}>
                                      Highest Rated
                                    </div>
                                  )}
                                  {sortOrder === "lowest" && (
                                    <div style={{ fontSize: "1.4rem" }}>
                                      Lowest Rated
                                    </div>
                                  )}
                                </div>
                                <FiChevronDown className="grocery-reviews-sort-button-icon"></FiChevronDown>
                              </Button>
                            )}
                            <div className="grocery-reviews-sort-dropdown">
                              <Button
                                className="grocery-reviews-sort-dropdown-button"
                                onClick={() => sortHandler("")}
                              >
                                Most Recent
                              </Button>
                              <Button
                                className="grocery-reviews-sort-dropdown-button"
                                onClick={() => sortHandler("oldest")}
                              >
                                Oldest
                              </Button>
                              <Button
                                className="grocery-reviews-sort-dropdown-button"
                                onClick={() => sortHandler("highest")}
                              >
                                Highest Rated
                              </Button>
                              <Button
                                className="grocery-reviews-sort-dropdown-button"
                                onClick={() => sortHandler("lowest")}
                              >
                                Lowest Rated
                              </Button>
                            </div>
                          </Col>
                          <Col sm="4" className="grocery-reviews-filter">
                            {reviewsFilterDropdownVisible ? (
                              <Button
                                onClick={closeReviewsFilterDropdown}
                                className="grocery-reviews-filter-button"
                              >
                                <div className="d-flex flex-column align-items-start">
                                  <div className="grocery-reviews-filter-button-filter">
                                    Filter
                                  </div>
                                  {filter === "" && <div>Star Ratings</div>}
                                  {filter === "5" && <div>5 Stars</div>}
                                  {filter === "4" && <div>4 Stars</div>}
                                  {filter === "3" && <div>3 Stars</div>}
                                  {filter === "2" && <div>2 Stars</div>}
                                  {filter === "1" && <div>1 Stars</div>}
                                </div>
                                <FiChevronUp className="grocery-reviews-filter-button-icon"></FiChevronUp>
                              </Button>
                            ) : (
                              <Button
                                onClick={openReviewsFilterDropdown}
                                className="grocery-reviews-filter-button"
                              >
                                <div className="d-flex flex-column align-items-start">
                                  <div className="grocery-reviews-filter-button-filter">
                                    Filter
                                  </div>
                                  {filter === "" && <div>Star Ratings</div>}
                                  {filter === "5" && <div>5 Stars</div>}
                                  {filter === "4" && <div>4 Stars</div>}
                                  {filter === "3" && <div>3 Stars</div>}
                                  {filter === "2" && <div>2 Stars</div>}
                                  {filter === "1" && <div>1 Stars</div>}
                                </div>
                                <FiChevronDown className="grocery-reviews-filter-button-icon"></FiChevronDown>
                              </Button>
                            )}
                            <div className="grocery-reviews-filter-dropdown">
                              <Button
                                className="grocery-reviews-sort-dropdown-button"
                                onClick={() => filterHandler("")}
                              >
                                All Ratings
                              </Button>
                              <Button
                                className="grocery-reviews-filter-dropdown-button"
                                onClick={() => filterHandler("5")}
                              >
                                <GroceryRating value={100}></GroceryRating>
                              </Button>
                              <Button
                                className="grocery-reviews-filter-dropdown-button"
                                onClick={() => filterHandler("4")}
                              >
                                <GroceryRating value={80}></GroceryRating>
                              </Button>
                              <Button
                                className="grocery-reviews-filter-dropdown-button"
                                onClick={() => filterHandler("3")}
                              >
                                <GroceryRating value={60}></GroceryRating>
                              </Button>
                              <Button
                                className="grocery-reviews-filter-dropdown-button"
                                onClick={() => filterHandler("2")}
                              >
                                <GroceryRating value={40}></GroceryRating>
                              </Button>
                              <Button
                                className="grocery-reviews-filter-dropdown-button"
                                onClick={() => filterHandler("1")}
                              >
                                <GroceryRating value={20}></GroceryRating>
                              </Button>
                            </div>
                          </Col>
                          <Col sm="4" className="grocery-reviews-search">
                            <form onSubmit={searchHandler}>
                              <input
                                autoComplete="off"
                                className="grocery-reviews-search-input"
                                name="searchKeyword"
                                value={searchKeyword}
                                placeholder="Search reviews..."
                                onChange={(e) =>
                                  setSearchKeyword(e.target.value)
                                }
                              ></input>
                              {searchKeyword === "" ? (
                                <Button
                                  className="grocery-reviews-search-submit"
                                  type="submit"
                                >
                                  <FiSearch></FiSearch>
                                </Button>
                              ) : (
                                <Button
                                  onClick={() => searchCloseHandler()}
                                  className="grocery-reviews-search-submit"
                                  type="button"
                                >
                                  <FiX></FiX>
                                </Button>
                              )}
                            </form>
                          </Col>
                        </Row>
                      </>
                    </Col>
                    <Col sm="4">
                      {!userInfo ? (
                        <div className="grocery-write-review">
                          <div className="grocery-write-review-heading">
                            Write Your Review
                          </div>
                          <div className="grocery-write-review-login-heading">
                            New to Farmroots? Sign up to get started! Or log in
                            to your existing account.
                          </div>
                          <Button
                            onClick={openLogin}
                            className="grocery-write-review-submit mt-4 mb-1"
                          >
                            Log In
                          </Button>
                          <Button
                            onClick={openRegister}
                            className="grocery-write-review-delete mt-3"
                          >
                            Sign Up
                          </Button>
                        </div>
                      ) : loadingMyReview ? (
                        <div></div>
                      ) : errorMyReview ? (
                        <div>{errorMyReview.message}</div>
                      ) : !myReview.length ? (
                        <div className="grocery-write-review">
                          <div className="grocery-write-review-heading">
                            Write Your Review
                          </div>
                          <div className="grocery-write-review-rating-heading">
                            Overall Rating
                          </div>
                          <StarRatings
                            rating={rating}
                            starRatedColor="#ffc702"
                            starHoverColor="#ffc702"
                            starEmptyColor="#505050"
                            changeRating={changeRating}
                            name="rating"
                            starDimension="3.5rem"
                            starSpacing="0rem"
                          />
                          <div className="grocery-write-review-comment-heading">
                            Comment
                          </div>
                          <form onSubmit={reviewSaveHandler}>
                            <textarea
                              className="grocery-write-review-comment-input form-control"
                              name="comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <Button
                              className="grocery-write-review-submit mt-1"
                              type="submit"
                            >
                              Submit
                            </Button>
                          </form>
                        </div>
                      ) : (
                        <>
                          {!myReviewVisible ? (
                            <div className="grocery-write-review">
                              <div className="grocery-write-review-heading">
                                Your Review
                              </div>
                              <div className="grocery-write-review-rating-heading">
                                Overall Rating
                              </div>
                              <StarRatings
                                rating={myReview[0].rating}
                                starRatedColor="#ffc702"
                                starEmptyColor="#505050"
                                starDimension="3.5rem"
                                starSpacing="0rem"
                              />
                              <div className="grocery-write-review-comment-heading">
                                Comment
                              </div>
                              <div className="grocery-write-review-comment">
                                {myReview[0].comment}
                              </div>
                              <Button
                                onClick={() => openModal(myReview[0])}
                                className="grocery-write-review-submit mb-1"
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() => reviewDeleteHandler(myReview[0])}
                                className="grocery-write-review-delete mt-3"
                              >
                                Delete
                              </Button>
                              {loadingDeleteReview && <div></div>}
                              {errorDeleteReview && (
                                <div>{errorDeleteReview.message}</div>
                              )}
                            </div>
                          ) : (
                            <div className="grocery-write-review">
                              <div className="grocery-write-review-heading">
                                Edit Your Review
                              </div>
                              <div className="grocery-write-review-rating-heading">
                                Overall Rating
                              </div>
                              <StarRatings
                                rating={rating}
                                starRatedColor="#ffc702"
                                starHoverColor="#ffc702"
                                starEmptyColor="#505050"
                                changeRating={changeRating}
                                name="rating"
                                starDimension="3.5rem"
                                starSpacing="0rem"
                              />
                              <div className="grocery-write-review-comment-heading">
                                Comment
                              </div>
                              <form onSubmit={reviewEditHandler}>
                                <textarea
                                  className="grocery-write-review-comment-input"
                                  name="comment"
                                  value={comment}
                                  onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                                <Button
                                  className="grocery-write-review-submit mb-1"
                                  type="submit"
                                >
                                  Submit
                                </Button>
                              </form>
                              <Button
                                onClick={() => setMyReviewVisible(false)}
                                className="grocery-write-review-delete mt-3"
                              >
                                Back
                              </Button>
                            </div>
                          )}
                        </>
                      )}
                    </Col>
                  </Row>
                  <hr className="grocery-reviews-horizontal-line"></hr>
                  <Row className="grocery-reviews-heading">Reviews</Row>
                  {loadingReview ? (
                    <div></div>
                  ) : errorReview ? (
                    <div>{errorReview.message}</div>
                  ) : (
                    <>
                      {!reviews.length && (
                        <Row className="ml-2 grocery-review-comment">
                          There are no reviews
                        </Row>
                      )}
                      <ul className="grocery-reviews-list">
                        {reviews.map((review) => (
                          <li key={review._id} className="grocery-review">
                            {review.userImage === "Nil" ? (
                              <div className="grocery-review-image-icon">
                                <FaUserCircle></FaUserCircle>
                              </div>
                            ) : (
                              <img
                                className="grocery-review-image"
                                src={
                                  process.env.REACT_APP_IMG_BASEURL +
                                  review.userImage
                                }
                                alt="farmroots Review"
                              ></img>
                            )}
                            <div className="grocery-review-content">
                              <div className="grocery-review-name-rating">
                                <div className="grocery-review-name">
                                  {review.userName}
                                </div>
                                <GroceryRating
                                  value={review.rating * 20}
                                ></GroceryRating>
                              </div>
                              <div className="grocery-review-comment">
                                {review.comment}
                              </div>
                              <div className="grocery-review-date">
                                <Moment format="MMM DD, YYYY">
                                  {review.updatedAt}
                                </Moment>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
              </div>
            )}
            {detailedInfoVisible && (
              <Row className="grocery-details">
                <div className="grocery-details-bar">
                  <Button className="grocery-details-bar-button grocery-details-bar-selected">
                    Detailed Info
                  </Button>
                  <Button
                    onClick={() => (
                      setDetailedInfoVisible(false),
                      setTastesBetterVisible(true)
                    )}
                    className="grocery-details-bar-button"
                  >
                    Tastes Better With
                  </Button>
                  <Button
                    onClick={() => (
                      setDetailedInfoVisible(false), setReviewsVisible(true)
                    )}
                    className="grocery-details-bar-button"
                  >
                    Customer Reviews
                  </Button>
                </div>
                <hr className="grocery-details-horizontal-line"></hr>
                <GroceryDetailedInfo value={product}></GroceryDetailedInfo>
              </Row>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default GroceryProduct;
