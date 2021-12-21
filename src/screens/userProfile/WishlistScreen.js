import React, { useEffect } from "react";
import { Button, Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import UserSidebar from "../../components/UserSidebar";
import {
  deleteFromWishlist,
  listUserWishlist,
} from "../../actions/wishlistActions";
import { Link } from "react-router-dom";
import Rating from "../../components/Rating";
import { IoMdHeart } from "react-icons/io";
import { addToCart } from "../../actions/cartActions";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";

function WishlistScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userWishlist = useSelector((state) => state.userWishlist);
  const { wishlist, loading, error } = userWishlist;

  const deleteWishlist = useSelector((state) => state.deleteWishlist);
  const { success } = deleteWishlist;

  const dispatch = useDispatch();

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId, 1));
    openCart();
  };
  const handleBuyNow = (productId) => {
    dispatch(addToCart(productId, 1));
    setTimeout(() => {
      props.history.push("/checkout");
    }, 1000);
  };

  const openCart = () => {
    document.querySelector(".cart").classList.add("open");
  };

  const wishlistDeleteHandler = (wishlistId) => {
    dispatch(deleteFromWishlist(wishlistId));
  };

  useEffect(() => {
    dispatch(listUserWishlist());
    return () => {
      //
    };
  }, [success]);

  return (
    <>
      <Header></Header>
      <Container fluid={true}>
        <Row>
          <Col sm="3">
            <UserSidebar value={"wishlist"}></UserSidebar>
          </Col>
          <Col sm="9">
            <Row>
              {" "}
              <div
                className="user-reviews-heading"
                style={{ marginLeft: "2.7rem" }}
              >
                Wishlist
              </div>
            </Row>
            <Row>
              {loading ? (
                <Col>.</Col>
              ) : error ? (
                <Col>{error}</Col>
              ) : (
                <>
                  {wishlist.length === 0 && (
                    <Col sm="12" className="user-reviews-empty-message">
                      Your wishlist is empty
                    </Col>
                  )}
                  <>
                    {wishlist.map((wishlistProduct) => (
                      <Col sm="3" xs="12" key={wishlistProduct._id}>
                        <Card
                          className="search-product"
                          style={{ width: "23rem" }}
                        >
                          <>
                            <Link
                              className="imgContainer"
                              to={"/grocery/product/" + wishlistProduct.product}
                            >
                              <Card.Img
                                className="search-product-image"
                                src={
                                  process.env.REACT_APP_IMG_BASEURL +
                                  wishlistProduct.productImage
                                }
                                alt="Grocery Product"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = "../default.jpg";
                                }}
                              />
                            </Link>
                            <Button
                              onClick={() =>
                                wishlistDeleteHandler(wishlistProduct.product)
                              }
                              className="search-product-wishlist-remove"
                            >
                              <IoMdHeart></IoMdHeart>
                            </Button>
                            {wishlistProduct.productSpecialDeliveryOffer &&
                              wishlistProduct.productSpecialDeliveryOffer
                                .type === "Free Delivery" &&
                              wishlistProduct.productSpecialDeliveryOffer
                                .value === 0 && (
                                <div className="search-product-free-delivery">
                                  Free Delivery
                                </div>
                              )}
                          </>
                          <div className="search-product-content">
                            <div
                              className="search-product-name"
                              onClick={() =>
                                props.history.push(
                                  "/grocery/product/" + wishlistProduct.product
                                )
                              }
                            >
                              {wishlistProduct.productName}
                            </div>
                            <div className="search-product-rating">
                              <Rating
                                value={wishlistProduct.productRating * 20}
                              ></Rating>
                              <div className="ml-2">
                                ({wishlistProduct.productNumReviews})
                              </div>
                            </div>
                            <div className="search-product-price">
                              <div>Price</div>
                              {wishlistProduct.productPrice ===
                              wishlistProduct.productDiscountPrice ? (
                                <div className="d-flex align-items-center">
                                  <Icon icon={currencyBdt} />
                                  <div>
                                    <b>{wishlistProduct.productPrice}</b>
                                  </div>
                                </div>
                              ) : (
                                <div className="d-flex align-items-center">
                                  <div className="d-flex align-items-center mr-3">
                                    <Icon icon={currencyBdt} />
                                    <div>
                                      <b>
                                        {wishlistProduct.productDiscountPrice}
                                      </b>
                                    </div>
                                  </div>
                                  <div
                                    className="d-flex align-items-center"
                                    style={{ fontSize: "1.7rem" }}
                                  >
                                    <Icon icon={currencyBdt} />
                                    <div>{wishlistProduct.productPrice}</div>
                                    <hr className="search-product-discount-price-cut-line"></hr>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="search-product-price">
                              <div>Net Wt.</div>
                              <div>{wishlistProduct.productNetWeight}</div>
                            </div>
                            {!wishlistProduct.productOutOfStock ? (
                              <Row className="contentcenter margin0">
                                <Button
                                  className="grocery-product-button mt-2"
                                  onClick={() =>
                                    handleBuyNow(wishlistProduct.product)
                                  }
                                >
                                  Buy Now
                                </Button>
                                <Button
                                  onClick={() =>
                                    handleAddToCart(wishlistProduct.product)
                                  }
                                  className="grocery-product-button"
                                >
                                  Add To Cart
                                </Button>
                              </Row>
                            ) : (
                              // <Button
                              //   onClick={() =>
                              //     handleAddToCart(wishlistProduct.product)
                              //   }
                              //   className="search-product-button"
                              // >
                              //   Add To Cart
                              // </Button>
                              <div className="search-product-out-of-stock">
                                Out of Stock
                              </div>
                            )}
                          </div>
                        </Card>
                      </Col>
                    ))}
                  </>
                </>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default WishlistScreen;
