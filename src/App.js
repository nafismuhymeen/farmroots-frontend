import React from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookSquare, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import GroceryScreen from "./screens/grocery/GroceryScreen";
import GroceryProductScreen from "./screens/grocery/GroceryProductScreen";
import GroceryCategoryScreen from "./screens/grocery/GroceryCategoryScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import UserInfoScreen from "./screens/userProfile/UserInfoScreen";
import MyOrdersScreen from "./screens/userProfile/MyOrdersScreen";
import WishlistScreen from "./screens/userProfile/WishlistScreen";
import AddressScreen from "./screens/userProfile/AddressScreen";
import MyReviewsScreen from "./screens/userProfile/MyReviewsScreen";
import ChangePasswordScreen from "./screens/userProfile/ChangePasswordScreen";
import UploadProductCategoryScreen from "./screens/upload/UploadProductCategoryScreen";
import UploadProductCarouselScreen from "./screens/upload/UploadProductCarouselScreen";
import UploadOrderDivisionScreen from "./screens/upload/UploadOrderDivisionScreen";
import UploadLogoScreen from "./screens/upload/UploadLogoScreen";
import UploadProductScreen from "./screens/upload/UploadProductScreen";
import UploadHomeScreen from "./screens/upload/UploadHomeScreen";
import PersonalAuthorizedOrdersScreen from "./screens/callCenter/PersonalAuthorizedOrdersScreen";
import PersonalPendingOrdersScreen from "./screens/callCenter/PersonalPendingOrdersScreen";
import DeliveryHomeScreen from "./screens/delivery/DeliveryHomeScreen";
import SupplyChainUnprocessedOrdersScreen from "./screens/supplyChain/SupplyChainUnprocessedOrdersScreen";
import PersonalFeedbackOrdersScreen from "./screens/callCenter/PersonalFeedbackOrdersScreen";
import EmployeeSignInScreen from "./screens/EmployeeSignInScreen";
import EmployeeRegisterScreen from "./screens/EmployeeRegisterScreen";
import UnassignedOrdersScreen from "./screens/callCenterBoss/UnassignedOrdersScreen";
import AssignedOrdersScreen from "./screens/callCenterBoss/AssignedOrdersScreen";
import AuthorizedOrdersScreen from "./screens/callCenterBoss/AuthorizedOrdersScreen";
import ProcessedOrdersScreen from "./screens/callCenterBoss/ProcessedOrdersScreen";
import OutForDeliveryOrdersScreen from "./screens/callCenterBoss/OutForDeliveryOrdersScreen";
import DeliveredOrdersScreen from "./screens/callCenterBoss/DeliveredOrdersScreen";
import CancelledOrdersScreen from "./screens/callCenterBoss/CancelledOrdersScreen";
import ReAssignAuthorizedOrdersScreen from "./screens/callCenterBoss/ReAssignAuthorizedOrdersScreen";
import FeedbackOrdersScreen from "./screens/callCenterBoss/FeedbackOrdersScreen";
import SupplyChainProcessedOrdersScreen from "./screens/supplyChain/SupplyChainProcessedOrdersScreen";
import SupplyChainOutForDeliveryOrdersScreen from "./screens/supplyChain/SupplyChainOutForDeliveryOrdersScreen";
import SupplyChainDeliveredOrdersScreen from "./screens/supplyChain/SupplyChainDeliveredOrdersScreen";
import SupplyChainFeedbackOrdersScreen from "./screens/supplyChain/SupplyChainFeedbackOrdersScreen";
import SupplyChainCancelledOrdersScreen from "./screens/supplyChain/SupplyChainCancelledOrdersScreen";
import AboutUsScreen from "./screens/AboutUsScreen";
import CareerScreen from "./screens/CareerScreen";
import VideoScreen from "./screens/VideoScreen";
import HelpScreen from "./screens/HelpScreen";
import UploadAboutScreen from "./screens/upload/UploadAboutScreen";
import UploadVideosScreen from "./screens/upload/UploadVideosScreen";
import UploadCareersScreen from "./screens/upload/UploadCareersScreen";
import UploadHelpScreen from "./screens/upload/UploadHelpScreen";
import SuggestProductScreen from "./screens/SuggestProductScreen";
import UploadBlogScreen from "./screens/upload/UploadBlogScreen";
import UploadExportsScreen from "./screens/upload/UploadExportsScreen";
import UploadPartnerScreen from "./screens/upload/UploadPartnerScreen";
import BlogScreen from "./screens/BlogScreen";
import ExportsScreen from "./screens/ExportsScreen";
import PartnerScreen from "./screens/PartnerScreen";
import UploadPriceScreen from "./screens/upload/UploadPriceScreen";
import SupplyChainPickupOrdersScreen from "./screens/supplyChain/SupplyChainPickupOrdersScreen";
import SupplyChainPartialOrdersScreen from "./screens/supplyChain/SupplyChainPartialOrdersScreen";
import MessengerCustomerChat from "react-messenger-customer-chat";
import PaymentSuccess from "./screens/PaymentSuccess";
import PaymentCancel from "./screens/PaymentCancel";
import PaymentFail from "./screens/PaymentFail";

function App() {
  const location = useLocation();
  return (
    <Switch>
      <React.Fragment>
        <div className="grid-container">
          <div className="main">
            <div className="content">
              <Route path="/payment/success" component={PaymentSuccess} exact />
              <Route path="/payment/cancel" component={PaymentCancel} exact />
              <Route path="/payment/fail" component={PaymentFail} exact />
              <Route
                path="/2025815/8101169/2117105/27913198"
                component={EmployeeSignInScreen}
                exact
              />
              <Route
                path="/2025815/8101169/2117105/9519182038"
                component={EmployeeRegisterScreen}
                exact
              />
              <Route
                path="/6118131915162019/upload/partner"
                component={UploadPartnerScreen}
                exact
              />
              <Route
                path="/6118131915162019/upload/exports"
                component={UploadExportsScreen}
                exact
              />
              <Route
                path="/6118131915162019/upload/blog"
                component={UploadBlogScreen}
                exact
              />
              <Route
                path="/6118131915162019/upload/help"
                component={UploadHelpScreen}
                exact
              />
              <Route
                path="/6118131915162019/upload/careers"
                component={UploadCareersScreen}
                exact
              />
              <Route
                path="/6118131915162019/upload/videos"
                component={UploadVideosScreen}
                exact
              />
              <Route
                path="/6118131915162019/upload/about"
                component={UploadAboutScreen}
                exact
              />
              <Route
                path="/6118131915162019/upload/order/division"
                component={UploadOrderDivisionScreen}
                exact
              />
              <Route
                path="/6118131915162019/upload/products"
                component={UploadProductScreen}
                exact
              />
              <Route
                path="/6118131915162019/upload/product/category"
                component={UploadProductCategoryScreen}
                exact
              />
              <Route
                path="/6118131915162019/upload/product/carousel"
                component={UploadProductCarouselScreen}
                exact
              />
              <Route
                path="/6118131915162019/upload/price"
                component={UploadPriceScreen}
                exact
              />
              <Route
                path="/6118131915162019/upload/logo"
                component={UploadLogoScreen}
                exact
              />
              <Route
                path="/6118131915162019/upload/homescreen"
                component={UploadHomeScreen}
                exact
              />
              <Route
                path="/6118131915162019/call-center/authorized"
                component={PersonalAuthorizedOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/call-center/feedback"
                component={PersonalFeedbackOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/call-center/pending"
                component={PersonalPendingOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/call-center-boss/unassigned"
                component={UnassignedOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/call-center-boss/assigned"
                component={AssignedOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/call-center-boss/authorized"
                component={AuthorizedOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/call-center-boss/processed"
                component={ProcessedOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/call-center-boss/out-for-delivery"
                component={OutForDeliveryOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/call-center-boss/delivered"
                component={DeliveredOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/call-center-boss/cancelled"
                component={CancelledOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/call-center-boss/feedback"
                component={FeedbackOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/call-center-boss/re-assign"
                component={ReAssignAuthorizedOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/supply-chain/unprocessed"
                component={SupplyChainUnprocessedOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/supply-chain/pickup"
                component={SupplyChainPickupOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/supply-chain/partial"
                component={SupplyChainPartialOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/supply-chain/processed"
                component={SupplyChainProcessedOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/supply-chain/out-for-delivery"
                component={SupplyChainOutForDeliveryOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/supply-chain/delivered"
                component={SupplyChainDeliveredOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/supply-chain/feedback"
                component={SupplyChainFeedbackOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/supply-chain/cancelled"
                component={SupplyChainCancelledOrdersScreen}
                exact
              />
              <Route
                path="/6118131915162019/delivery"
                exact={true}
                component={DeliveryHomeScreen}
              />
              <Route path="/search/:id" component={SearchScreen} />
              <Route path="/checkout" component={CheckoutScreen} />
              <Route
                path="/user-profile/user-info"
                component={UserInfoScreen}
              />
              <Route
                path="/user-profile/my-orders"
                component={MyOrdersScreen}
              />
              <Route path="/user-profile/wishlist" component={WishlistScreen} />
              <Route path="/user-profile/addresses" component={AddressScreen} />
              <Route
                path="/user-profile/my-reviews"
                component={MyReviewsScreen}
              />
              <Route
                path="/user-profile/change-password"
                component={ChangePasswordScreen}
              />
              <Route
                path="/all-products"
                exact={true}
                component={GroceryScreen}
              />
              <Route
                path="/grocery/category/:id"
                component={GroceryCategoryScreen}
              />
              <Route
                path="/product/:cat/:subcat/:id"
                component={GroceryProductScreen}
              />
              <Route path="/videos" component={VideoScreen} />
              <Route path="/about-us" component={AboutUsScreen} />
              <Route path="/careers" component={CareerScreen} />
              <Route path="/blogs" component={BlogScreen} />
              <Route path="/exports" component={ExportsScreen} />
              <Route path="/partners" component={PartnerScreen} />
              <Route path="/help/:id" component={HelpScreen} />
              <Route path="/suggest-product" component={SuggestProductScreen} />
              <Route path="/" exact={true} component={HomeScreen} />
            </div>
          </div>
          <MessengerCustomerChat
            pageId="331066097714556"
            appId="2055814074568769"
          />
          {location.pathname === "/payment/success" ||
          location.pathname === "/payment/cancel" ||
          location.pathname === "/payment/fail" ? null : (
            <Container fluid className="Footer">
              <Row>
                <Col sm="3" xs="6">
                  <div className="card fottercardcolor">
                    <div className="card-body">
                      <h5 className="card-title">About Us</h5>
                      <div className="gridstyle">
                        <Link
                          to="/about-us?scroll=about-farmroots"
                          className="card-link"
                        >
                          About Farmroots
                        </Link>
                        <Link
                          to="/about-us?scroll=vision"
                          className="card-link"
                        >
                          Vision
                        </Link>
                        <Link
                          to="/about-us?scroll=management"
                          className="card-link"
                        >
                          Management
                        </Link>
                        <Link
                          to="/about-us?scroll=factory"
                          className="card-link"
                        >
                          Factory
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs="6" sm="3">
                  <div className="card fottercardcolor">
                    <div className="card-body">
                      <h5 className="card-title">Legal</h5>
                      <div className="gridstyle">
                        <a
                          href="/help/Terms and Conditions"
                          className="card-link"
                        >
                          Terms and Conditions
                        </a>
                        <a href="/help/Privacy" className="card-link">
                          Privacy Policy
                        </a>
                        <a href="/help/Customer Service" className="card-link">
                          Return & Refund Policy
                        </a>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs="6" sm="3">
                  <div className="card fottercardcolor">
                    <div className="card-body">
                      <h5 className="card-title">Careers</h5>
                      <div className="gridstyle">
                        <Link
                          to="/careers?scroll=life-at-farmroots"
                          className="card-link"
                        >
                          Life at Farmroots
                        </Link>
                        <Link
                          to="/careers?scroll=job-openings"
                          className="card-link"
                        >
                          Job Openings
                        </Link>
                        <Link
                          to="/careers?scroll=articles"
                          className="card-link"
                        >
                          Articles and Publications
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs="6" sm="3">
                  <div className="card fottercardcolor">
                    <div className="card-body">
                      <h5 className="card-title">Help</h5>
                      <div className="gridstyle">
                        <a href="/help/Contact Us" className="card-link">
                          Contact Us
                        </a>
                        <a href="/help/FAQs" className="card-link">
                          FAQs
                        </a>
                        {/* <Link to="/help/Customer Service" className="card-link">
                        Customer Service
                      </Link> */}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <div className="social-media">
                  <a
                    href="https://www.facebook.com/Farmrootsltd"
                    className="footer-facebook btn btn-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"></path>
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/farmroots-limited/"
                    className="footer-linkedin btn btn-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/farmrootsltd"
                    className="footer-instagram btn btn-primary"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                    </svg>
                  </a>
                </div>
              </Row>
            </Container>
          )}
        </div>
      </React.Fragment>
    </Switch>
  );
}

export default App;
