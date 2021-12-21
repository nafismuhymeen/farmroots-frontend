import React, { Fragment, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import {
  Button,
  Modal,
  Container,
  Row,
  Col,
  Image,
  Card,
} from "react-bootstrap";
import Header from "../components/Header";
import { ImQuotesLeft } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { getHomeScreen } from "../actions/homeScreenActions";
import { getEmployeePrice } from "../actions/priceActions";
import Rating from "../components/Rating";
import { Link } from "react-router-dom";
import { listPopularCategories } from "../actions/productCategoryActions";
import { addToCart, addToBuyNow } from "../actions/cartActions";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";
import { FiX } from "react-icons/fi";
import { getPrice } from "../actions/priceActions";
import LoginRegister from "../components/LoginRegister";
import {
  showLoginModal,
  showRegisterModal,
  showForgetPasswordModal,
  hideAllModal,
} from "../actions/loginActions";

function HomeScreen(props) {
  // const [id, setId] = useState('');
  const [popupmodalvisible, setPopupModalVisible] = useState(true);
  const [popup1modalvisible, setPopup1ModalVisible] = useState(false);

  const homeScreenGet = useSelector((state) => state.homeScreenGet);
  const { loading, homeScreen, error } = homeScreenGet;

  const popularCategoryList = useSelector((state) => state.popularCategoryList);
  const {
    popularCategories,
    loading: loadingCategories,
    error: errorCategories,
  } = popularCategoryList;

  const [count, setCount] = useState(1);
  // const [items, setItems] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const modalStatus = useSelector((state) => state.modal);

  const priceGet = useSelector((state) => state.priceGet);
  const { loading: loadingPrice, price, error: errorPrice } = priceGet;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(listPopularCategories());
    dispatch(getHomeScreen());
    dispatch(getPrice());

    cookies.get("myCat") === "Pacman"
      ? setPopupModalVisible(false)
      : setPopupModalVisible(true);

    if (userInfo) {
      localStorage.setItem("currenttime", ``);
      cookies.set("myCat", "Pacman", { maxAge: 21600 });
    }

    return () => {
      //
    };
  }, []);

  var x = [];

  const openRegister = () => dispatch(showRegisterModal());
  const openLogin = () => dispatch(showLoginModal());

  const handleAddToCart = (productId, ct) => {
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

  const handleBuyNow = (productId) => {
    dispatch(addToCart(productId, 1));
    setTimeout(() => {
      props.history.push("/checkout");
    }, 1000);
  };

  const openCart = () => {
    document.querySelector(".cart").classList.add("open");
  };

  const sliderCategory = (products) => {
    return products.map((product) => (
      <Col className="mb-3" sm="2" md="2" lg="2" xs="6" key={product.id}>
        <Card className="cardwidthHeight">
          <Link
            className="imgContainer"
            to={
              "/product/" +
              product.category +
              "/" +
              product.subCategory +
              "/" +
              product.id
            }
          >
            <Card.Img
              className="product-image"
              variant="top"
              src={process.env.REACT_APP_IMG_BASEURL + product.image}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "default.jpg";
              }}
            />
            {product.price === product.discountPrice ? (
              <></>
            ) : (
              <div className="discountPer">
                {Math.round(
                  ((product.price - product.discountPrice) / product.price) *
                    100
                )}
                %
              </div>
            )}
          </Link>
          <Card.Body>
            <Card.Title className="product-name product-nameHome">
              <Link
                to={
                  "/product/" +
                  product.category.replace(" ", "-") +
                  "/" +
                  product.subCategory.replace(" ", "-") +
                  "/" +
                  product.id
                }
              >
                {product.name}
              </Link>
            </Card.Title>
            <Col className="pl-0">
              <div className="card-text">
                <div className="dflex">
                  <Rating value={product.rating * 20}></Rating>
                  <div className="ml-2 mt-2">({product.numReviews})</div>
                </div>
              </div>
              <Row className="fontSize">
                <Col xs="8" sm="6">
                  Price:
                </Col>
                <Col xs="4" sm="6" className="dflexEnd">
                  {product.price === product.discountPrice ? (
                    <>
                      <Icon icon={currencyBdt} /> <b>{product.price}</b>
                    </>
                  ) : (
                    <>
                      <Icon icon={currencyBdt} />
                      <b>{Math.round(product.discountPrice)}</b>
                      <div className="textLinethrough">
                        <Icon icon={currencyBdt} />
                        {product.price}
                      </div>
                    </>
                  )}
                </Col>
              </Row>
              <Row className="fontSize">
                <Col className="paddingnetweight" xs="8" sm="6">
                  Net Weight:
                </Col>
                <Col xs="4" sm="6" className="dflexEnd">
                  {product.netWeight}
                </Col>
              </Row>
            </Col>
            <Button
              className="btn btn-success greenbtn biggreenbtn mt-2 grocery-product-buttonhome"
              key={`btn2${product.id}`}
              onClick={() => {
                handleAddToCart(product.id, 1);
              }}
            >
              Add To Cart
            </Button>
            <Button
              className="btn btn-success greenbtn biggreenbtn mt-2 grocery-product-buttonhome"
              onClick={() => handleBuyNow(product.id)}
            >
              Buy Now
            </Button>
          </Card.Body>
        </Card>
      </Col>
    ));
  };
  const cookies = new Cookies();

  return (
    <Fragment>
      <Header></Header>
      <LoginRegister></LoginRegister>
      {loadingPrice ? (
        <div></div>
      ) : errorPrice ? (
        <div>{errorPrice.message}</div>
      ) : userInfo ? (
        <Modal
          show={popupmodalvisible}
          onHide={() => setPopupModalVisible(false)}
          centered
          dialogClassName=""
        >
          <div className="d-flex">
            <img
              src={
                process.env.REACT_APP_IMG_BASEURL +
                price.registeredUserPopupImage
              }
              alt=""
              className="home-popup-image"
            ></img>
            <div style={{ width: "50%" }}>
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => setPopupModalVisible(false)}
                  className="home-popup-close-button"
                >
                  <FiX></FiX>
                </Button>
              </div>
              <div className="home-popup-content">
                <div className="home-popup-heading">
                  {price.registeredUserPopupHeading}
                </div>
                <div className="home-popup-text">
                  {price.registeredUserPopupText}
                </div>
                <Button href="/all-products" className="home-popup-button">
                  Order Now
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      ) : (
        <Modal
          show={popupmodalvisible}
          onHide={() => setPopupModalVisible(false)}
          centered
          dialogClassName=""
        >
          <div className="d-flex">
            <img
              src={process.env.REACT_APP_IMG_BASEURL + price.newUserPopupImage}
              alt=""
              className="home-popup-image"
            ></img>
            <div style={{ width: "50%" }}>
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => setPopupModalVisible(false)}
                  className="home-popup-close-button"
                >
                  <FiX></FiX>
                </Button>
              </div>
              <div className="home-popup-content">
                <div className="home-popup-heading">
                  {price.newUserPopupHeading}
                </div>
                <div className="home-popup-text">{price.newUserPopupText}</div>
                <Button onClick={openRegister} className="home-popup-button">
                  Sign Up
                </Button>
                <div className="">
                  Already Registered?{" "}
                  <a
                    onClick={openLogin}
                    style={{ color: "green" }}
                    className="home-popup-a"
                  >
                    Login
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
      {/* MY CODE */}
      <Container fluid>
        {loading ? (
          <div></div>
        ) : error ? (
          <div>{error.message}</div>
        ) : (
          <>
            <Row>
              <Col sm="12" className="paddingZero">
                <Image
                  className="img-fluid widthofbanner"
                  alt="Responsive image"
                  src={
                    process.env.REACT_APP_IMG_BASEURL + homeScreen.firstImage
                  }
                />
              </Col>
            </Row>
            {homeScreen.promotionBanners !== undefined &&
              homeScreen.promotionBanners.length > 0 && (
                <>
                  <Row className="threeImageBackground">
                    {homeScreen.promotionBanners
                      .slice(0, -1)
                      .map((p, index) => (
                        <Col sm="4" className="threeImage" key={index}>
                          <Link
                            to={`/product/${homeScreen.category[index]}/${homeScreen.subCategory[index]}/${homeScreen.promotionBannersLink[index]}`}
                          >
                            <Image
                              src={`${process.env.REACT_APP_IMG_BASEURL}${p}`}
                              thumbnail={true}
                              className="promationSection"
                              fluid
                            />
                          </Link>
                        </Col>
                      ))}
                    {/* <Col sm="4" className="threeImage">
                      <Link
                        to={
                          "/grocery/product/" +
                          homeScreen.promotionBanners[0].product
                        }
                      >
                        <Image
                          src={`${homeScreen.promotionBanners[0].image}`}
                          thumbnail={true}
                          className="promationSection"
                          fluid
                        />
                      </Link>
                    </Col>
                    <Col sm="4" className="threeImage">
                      <Link
                        to={
                          "/grocery/product/" +
                          homeScreen.promotionBanners[1]
                            ? homeScreen.promotionBanners[1].product
                            : homeScreen.promotionBanners[0].product
                        }
                      >
                        <Image
                          src={`${homeScreen.promotionBanners[1].image}`}
                          thumbnail={true}
                          className="promationSection"
                          fluid
                        />
                      </Link>
                    </Col>
                    <Col sm="4" className="threeImage">
                      <Link
                        to={
                          "/grocery/product/" +
                          homeScreen.promotionBanners[2]
                            ? homeScreen.promotionBanners[2].product
                            : homeScreen.promotionBanners[0].product
                        }
                      >
                        <Image
                          src={`${homeScreen.promotionBanners[2].image}`}
                          thumbnail={true}
                          className="promationSection"
                          fluid
                        />
                      </Link>
                    </Col> */}
                  </Row>
                </>
              )}
            {popularCategories.map(
              (category, index) =>
                category.products.length > 0 && (
                  <Fragment key={index}>
                    <Row key={category.name} className="categorySection">
                      <Col className="padL0" sm="8" xs="8">
                        <h1 className="underlineandsize">
                          {category.name.replace(" and ", " & ")}
                        </h1>
                      </Col>
                      <Col className="padR0" sm="4" xs="4">
                        <Button
                          href={
                            "/grocery/category/" +
                            category.name.replace(" and ", " & ")
                          }
                          className="btn btn-success greenbtn marginbtm"
                          size="lg"
                        >
                          View All
                        </Button>
                      </Col>
                    </Row>
                    <Row>{sliderCategory(category.products)}</Row>
                  </Fragment>
                )
            )}
            <Row>
              <Col>
                <h1 className="home-reviews-heading">
                  {homeScreen.reviewHeading}
                </h1>
              </Col>
            </Row>
            <Container fluid={true} className="justify-content-md-center">
              {homeScreen.reviewContent && (
                <Row className="justify-content-md-center mb-3">
                  <Col xs="12" sm="6" className="home-reviews-item1">
                    <div className="d-flex justify-content-between">
                      <ImQuotesLeft className="home-reviews-icon"></ImQuotesLeft>
                      <img
                        className="home-reviews-item1-image"
                        src={
                          process.env.REACT_APP_IMG_BASEURL +
                          homeScreen.reviewContent[0].image
                        }
                        alt="Review"
                      ></img>
                    </div>
                    <div className="home-reviews-item-data">
                      <p>{homeScreen.reviewContent[0].comment}</p>
                      <h2>{homeScreen.reviewContent[0].name}</h2>
                      <h4>{`${homeScreen.reviewContent[0].age},`}</h4>
                      <h4>{homeScreen.reviewContent[0].location}</h4>
                    </div>
                  </Col>
                  <Col xs="12" sm="5" className="home-reviews-item2">
                    <div className="home-reviews-item-data">
                      <p>{homeScreen.reviewContent[1].comment}</p>
                      <h2>{homeScreen.reviewContent[1].name}</h2>
                      <h4>{`${homeScreen.reviewContent[1].age},`}</h4>
                      <h4>{homeScreen.reviewContent[1].location}</h4>
                    </div>
                    <div className="d-flex justify-content-end">
                      <img
                        src={
                          process.env.REACT_APP_IMG_BASEURL +
                          homeScreen.reviewContent[1].image
                        }
                        alt="Review"
                        className="home-reviews-item2-image"
                      ></img>
                    </div>
                  </Col>
                </Row>
              )}
            </Container>
            <Container fluid={true} className="justify-content-md-center mb-5">
              {homeScreen.reviewContent && (
                <Row className="justify-content-md-center">
                  <Col xs="12" sm="5" className="home-reviews-item3 ">
                    <div className="home-reviews-item-data">
                      <p>{homeScreen.reviewContent[2].comment}</p>
                      <h2>{homeScreen.reviewContent[2].name}</h2>
                      <h4>{`${homeScreen.reviewContent[2].age},`}</h4>
                      <h4>{homeScreen.reviewContent[2].location}</h4>
                    </div>
                    <div className="d-flex justify-content-start">
                      <img
                        src={
                          process.env.REACT_APP_IMG_BASEURL +
                          homeScreen.reviewContent[2].image
                        }
                        alt="Review"
                        className="home-reviews-item3-image"
                      ></img>
                    </div>
                  </Col>
                  <Col xs="12" sm="6" className="home-reviews-item4 ">
                    <div className="d-flex justify-content-start">
                      <img
                        src={
                          process.env.REACT_APP_IMG_BASEURL +
                          homeScreen.reviewContent[3].image
                        }
                        alt="Review"
                        className="home-reviews-item4-image"
                      ></img>
                    </div>
                    <div className="home-reviews-item-data">
                      <p>{homeScreen.reviewContent[3].comment}</p>
                      <h2>{homeScreen.reviewContent[3].name}</h2>
                      <h4>{`${homeScreen.reviewContent[3].age},`}</h4>
                      <h4>{homeScreen.reviewContent[3].location}</h4>
                    </div>
                  </Col>
                </Row>
              )}
            </Container>
            <Container fluid={true}>
              <Row>
                {homeScreen.partnerLogoImages && (
                  <>
                    <Col sm="12" className="paddingZero">
                      {/* <Image
                        className="img-fluid widthofbanner"
                        alt="Responsive image"
                        src={homeScreen.firstImage}
                      /> */}
                      {homeScreen.partnerLogoImages.map(
                        (partnerLogo, index) => (
                          <Fragment key={index}>
                            {index === 0 ? (
                              <img
                                className="img-fluid widthofbanner widthofpartners"
                                alt="Responsive"
                                key={partnerLogo}
                                src={
                                  process.env.REACT_APP_IMG_BASEURL +
                                  partnerLogo
                                }
                                alt={index}
                              ></img>
                            ) : (
                              <></>
                            )}
                          </Fragment>
                        )
                      )}
                    </Col>
                  </>
                )}

                {/* <Col className="home-partners">
                  <h1 className="home-partners-heading">
                    {homeScreen.partnerHeading}
                  </h1>
                  {homeScreen.partnerLogoImages && (
                    <div className="home-partners-content">
                      {homeScreen.partnerLogoImages.map(
                        (partnerLogo, index) => (
                          <>
                            {index != homeScreen.partnerLogoImages.length}
                            <img
                              key={partnerLogo}
                              src={partnerLogo}
                              alt={index}
                            ></img>
                          </>
                        )
                      )}
                    </div>
                  )}
                </Col> */}
              </Row>
            </Container>
            <Row className="justify-content-md-center home-joinus mb-4">
              {homeScreen.careerContent && (
                <>
                  <Col md="4" sm="6" xs="12" className="home-joinus-item mt-4">
                    <img
                      className="home-joinus-item-image"
                      src={
                        process.env.REACT_APP_IMG_BASEURL +
                        homeScreen.careerContent[0].image
                      }
                      alt="Delivery Man"
                    ></img>
                    <div className="home-joinus-item-content home-joinus-rider">
                      <h1 className="home-joinus-item-content-heading">
                        {homeScreen.careerContent[0].name}
                      </h1>
                      <p>{homeScreen.careerContent[0].information}</p>
                      <Button
                        color="success"
                        href="/blogs"
                        className="home-joinus-item-content-button"
                      >
                        {homeScreen.careerContent[0].buttonText}
                      </Button>
                    </div>
                  </Col>
                  <Col md="4" sm="6" xs="12" className="home-joinus-item  mt-4">
                    <img
                      className="home-joinus-item-image"
                      src={
                        process.env.REACT_APP_IMG_BASEURL +
                        homeScreen.careerContent[1].image
                      }
                      alt="Delivery Man"
                    ></img>
                    <div className="home-joinus-item-content home-joinus-chef">
                      <h1 className="home-joinus-item-content-heading">
                        {homeScreen.careerContent[1].name}
                      </h1>
                      <p>{homeScreen.careerContent[1].information}</p>
                      <Button
                        href="/exports"
                        className="home-joinus-item-content-button"
                      >
                        {homeScreen.careerContent[1].buttonText}
                      </Button>
                    </div>
                  </Col>
                  <Col md="4" sm="6" xs="12" className="home-joinus-item  mt-4">
                    <img
                      className="home-joinus-item-image"
                      src={
                        process.env.REACT_APP_IMG_BASEURL +
                        homeScreen.careerContent[2].image
                      }
                      alt="Delivery Man"
                    ></img>
                    <div className="home-joinus-item-content home-joinus-career">
                      <h1 className="home-joinus-item-content-heading">
                        {homeScreen.careerContent[2].name}
                      </h1>
                      <p>{homeScreen.careerContent[2].information}</p>
                      <Button
                        href="/partners"
                        className="home-joinus-item-content-button"
                      >
                        {homeScreen.careerContent[2].buttonText}
                      </Button>
                    </div>
                  </Col>
                </>
              )}
            </Row>
          </>
        )}
      </Container>
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
    </Fragment>
  );
}

export default HomeScreen;
