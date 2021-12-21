import React, { useEffect, useState } from "react";
import { Button, Modal, Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBuyNow,
  addToCart,
  emptyBuyNow,
  emptyCart,
  removeFromBuyNow,
  removeFromCart,
} from "../actions/cartActions";
import { saveShipping, deleteShipping } from "../actions/shippingActions";
import Header from "../components/Header";
import LoginRegister from "../components/LoginRegister";
import {
  HiOutlinePencilAlt,
  HiCheckCircle,
  HiHome,
  HiLocationMarker,
} from "react-icons/hi";
import { useLocation } from "react-router-dom";
import {
  IoMdBriefcase,
  IoIosCheckmarkCircleOutline,
  IoIosPricetags,
} from "react-icons/io";
import { MdClose } from "react-icons/md";
import { FiXCircle } from "react-icons/fi";
import Address from "../components/Address";
import { listMyAddresses } from "../actions/addressActions";
import { createOrder, createOrderPayNow } from "../actions/orderActions";
import { update } from "../actions/userActions";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";
import { getPrice } from "../actions/priceActions";
import {
  showLoginModal,
  showRegisterModal,
  showForgetPasswordModal,
  hideAllModal,
} from "../actions/loginActions";
import axios from "axios";

function CheckoutScreen(props) {
  const query = new URLSearchParams(useLocation().search);
  const [promoCode, setPromoCode] = useState("");
  const [instruction, setInstruction] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmOrderCOD, setconfirmOrderCOD] = useState(false);

  const [productDiscounts, setProductDiscounts] = useState([]);
  const [promoCodeModalVisible, setPromoCodeModalVisible] = useState(false);
  const [promoCodeModalNotAvailable, setpromoCodeModalNotAvailable] =
    useState(false);
  const [cashondelivery, setcashondelivery] = useState(false);
  const [promoCodeSet, setPromoCodeSet] = useState(false);
  const [orderPromoCode, setOrderPromoCode] = useState({});
  const [promoCodeArray, setPromoCodeArray] = useState([]);
  const [deliveryTime, setDeliveryTime] = useState(0);
  const [itemsPrice, setItemsPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [promocodeValue, setpromocodeValue] = useState(0);
  const [priceRun, setPriceRun] = useState(true);
  const [addresscount, setAddresscount] = useState(false);
  const [screencount, setScreencount] = useState(0);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const buyNow = useSelector((state) => state.buyNow);
  const { buyNowItems } = buyNow;

  const shippingInfo = useSelector((state) => state.shippingInfo);
  const { shipping } = shippingInfo;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const userSaveAddress = useSelector((state) => state.userSaveAddress);
  const { success: successAddressSave } = userSaveAddress;

  const priceGet = useSelector((state) => state.priceGet);
  const { loading: loadingPrice, price, error: errorPrice } = priceGet;

  const userListAddress = useSelector((state) => state.userListAddress);
  const { loading, addresses, error } = userListAddress;

  const orderCreate = useSelector((state) => state.orderCreate);
  const { success: orderCreateSuccess } = orderCreate;

  const dispatch = useDispatch();
  const modalStatus = useSelector((state) => state.modal);

  const openLogin = () => dispatch(showLoginModal());

  const openRegister = () => dispatch(showRegisterModal());

  const selectedAdd = () => {
    console.log("line 103 inside selectedAdd", addresses);
    if (addresses !== undefined && addresses.length > 0) {
      if (successAddressSave === true) {
        console.log("line 106 inside selectedAdd if1");

        selectAddress(addresses[addresses.length - 1]);
        console.log("line 109 inside selectedAdd if2");
      } else if (addresses && addresses.length > 0) {
        console.log("line 111 inside selectedAdd else");

        selectAddress(addresses[0]);
        console.log("line 114 inside selectedAdd else 2");
      }
    }
  };

  // Promo code value variable

  useEffect(() => {
    if (screencount === 0) {
      window.scroll(0, 0);
    }
    setScreencount(1);

    selectedAdd();
    dispatch(listMyAddresses());
    dispatch(getPrice());
    setPriceRun(true);

    if (orderCreateSuccess && confirmOrderCOD) {
      dispatch(emptyBuyNow());
      if (buyNowItems.length === 0) {
        dispatch(emptyCart());
      }
      dispatch(deleteShipping());
      props.history.push("/user-profile/my-orders");
      setconfirmOrderCOD(false);
    }
    return () => {
      //
    };
  }, [
    successAddressSave,
    orderCreateSuccess,
    userInfo,
    cartItems,
    buyNowItems,
  ]);
  const promoCodeHandler = (e) => {
    e.preventDefault();

    var codeFound = false;

    for (const code of promoCodeArray) {
      setpromocodeValue(code.conditionValue);
      if (code.promoCode.toLowerCase() === promoCode.toLowerCase()) {
        setOrderPromoCode({
          _id: code._id,
          userType: code.userType,
          promoCode: code.promoCode,
          discountType: code.discountType,
          value: code.value,
          condition: code.condition,
          conditionValue: code.conditionValue,
          maxDiscount: code.maxDiscount,
        });

        if (itemsPrice > code.conditionValue) {
          setPromoCodeSet(true);
          setPromoCodeModalVisible(true);
        }
        if (itemsPrice < code.conditionValue) {
          setPromoCodeSet(false);
          setPromoCodeModalVisible(true);
          // if (itemsPrice < promoCode.conditionValue) {
          // setpromoCodeModalNotAvailable(true);
        }

        setPriceRun(true);
        codeFound = true;
        break;
      }
    }
    if (!codeFound) {
      setPromoCodeSet(false);
      setpromoCodeModalNotAvailable(true);
    }
  };

  const removePromoCodeHandler = (e) => {
    e.preventDefault();
    setPromoCode("");
    setOrderPromoCode({});
    setPromoCodeSet(false);
    setPromoCodeModalVisible(false);
    setPriceRun(true);
  };

  const calculateBill = (price, cartItems, buyNowItems) => {
    if (price.tax > -1 && priceRun) {
      var localShippingPrice = 0;
      var localDiscountPrice = 0;
      var freeDelivery = false;
      var localPromoCodeArray = [];
      var localProductDiscounts = [];

      // Setting Promo Code Array
      if (userInfo && price.userDiscounts && price.userDiscounts.length > 0) {
        for (const userDiscount of price.userDiscounts) {
          if (userDiscount.userType === "Registered") {
            var userFound = false;
            if (
              userDiscount.allowedUsersList &&
              userDiscount.allowedUsersList.length > 0
            ) {
              for (const allowedUser of userDiscount.allowedUsersList) {
                if (allowedUser.user === userInfo._id) {
                  userFound = true;
                }
              }
            }
            if (!userFound) {
              localPromoCodeArray.push(userDiscount);
            }
          } else {
            if (
              userDiscount.allowedUsersList &&
              userDiscount.allowedUsersList.length > 0
            ) {
              for (const allowedUser of userDiscount.allowedUsersList) {
                if (allowedUser.user === userInfo._id) {
                  localPromoCodeArray.push(userDiscount);
                }
              }
            }
          }
        }
        setPromoCodeArray(localPromoCodeArray);
      }

      // Setting Items Price
      var localItemsPrice =
        buyNowItems.length === 0
          ? cartItems.reduce((a, c) => a + c.price * c.qty, 0)
          : buyNowItems.reduce((a, c) => a + c.price * c.qty, 0);

      // Setting Tax Price
      var localTaxPrice = (price.tax * localItemsPrice) / 100;

      // Setting Shipping Price
      if (shipping.houseNo) {
        let totalWeight = 0;

        if (buyNowItems.length === 0) {
          for (const item of cartItems) {
            let weight12 = Number(item.netWeight.split(" ")[0]);
            totalWeight += weight12;

            if (item.netWeight.toLowerCase().indexOf("gm") !== -1) {
              var weight = item.netWeight.split(" ").map((wt) => wt.trim());
              totalWeight = totalWeight + Number(weight[0]) * item.qty;
            } else if (item.netWeight.toLowerCase().indexOf("kg") !== -1) {
              var weight = item.netWeight.split(" ").map((wt) => wt.trim());
              totalWeight = totalWeight + Number(weight[0]) * 1000 * item.qty;
            } else if (item.netWeight.toLowerCase().indexOf("ml") !== -1) {
              var weight = item.netWeight.split(" ").map((wt) => wt.trim());
              totalWeight = totalWeight + Number(weight[0]) * item.qty;
            } else if (item.netWeight.toLowerCase().indexOf("lit") !== -1) {
              var weight = item.netWeight.split(" ").map((wt) => wt.trim());
              totalWeight = totalWeight + Number(weight[0]) * 1000 * item.qty;
            }
          }
        } else {
          for (const item of buyNowItems) {
            if (item.netWeight.toLowerCase().indexOf("gm") !== -1) {
              var weight = item.netWeight.split(" ").map((wt) => wt.trim());
              totalWeight = totalWeight + Number(weight[0]);
            } else if (item.netWeight.toLowerCase().indexOf("kg") !== -1) {
              var weight = item.netWeight.split(" ").map((wt) => wt.trim());
              totalWeight = totalWeight + Number(weight[0]) * 1000;
            } else if (item.netWeight.toLowerCase().indexOf("ml") !== -1) {
              var weight = item.netWeight.split(" ").map((wt) => wt.trim());
              totalWeight = totalWeight + Number(weight[0]);
            } else if (item.netWeight.toLowerCase().indexOf("lit") !== -1) {
              var weight = item.netWeight.split(" ").map((wt) => wt.trim());
              totalWeight = totalWeight + Number(weight[0]) * 1000;
            }
          }
        }

        var deliveryCharges = [];

        if (shipping.district == "Dhaka") {
          for (const deliveryCharge of price.deliveryCharges) {
            if (deliveryCharge.district === "Inside Dhaka") {
              deliveryCharges.push(deliveryCharge);
            }
          }
        } else {
          for (const deliveryCharge of price.deliveryCharges) {
            if (deliveryCharge.district === "Outside Dhaka") {
              deliveryCharges.push(deliveryCharge);
            }
          }
        }

        deliveryCharges = deliveryCharges.sort(function (x, y) {
          return x.weight - y.weight;
        });
        let cti = 0;
        let gramvalue = 0;
        let totalgramvalue = 0;
        let getdeliverycharge = 0;

        let totalWeight2 = 0;
        let subTotal = 0;
        cartItems.map((cart) => {
          if (cart.netWeight.toLowerCase().indexOf("gm") !== -1) {
            totalWeight2 = Number(cart.netWeight.match(/\d+/g)[0]) * cart.qty;
          } else if (cart.netWeight.toLowerCase().indexOf("kg") !== -1) {
            totalWeight2 =
              Number(cart.netWeight.match(/\d+/g)[0]) * cart.qty * 1000;
          } else if (cart.netWeight.toLowerCase().indexOf("ml") !== -1) {
            totalWeight2 = Number(cart.netWeight.match(/\d+/g)[0]) * cart.qty;
          } else if (cart.netWeight.toLowerCase().indexOf("lit") !== -1) {
            totalWeight2 =
              Number(cart.netWeight.match(/\d+/g)[0]) * cart.qty * 1000;
          }
          subTotal = +subTotal + totalWeight2;
          return subTotal;
        });

        deliveryCharges.map((x) => {
          cti = cartItems.map((cart) => {
            gramvalue = cart.netWeight.split(" ")[0];
            gramvalue = parseInt(gramvalue);
            gramvalue = gramvalue * cart.qty;
            totalgramvalue += gramvalue;
            return gramvalue;
          });

          if (subTotal >= x.weight) {
            localShippingPrice = x.value;
          }
          return 0;
        });
        setShippingPrice(localShippingPrice);

        totalgramvalue = 0;
        let localsparray = deliveryCharges.map((x) => {});
        let dcharge = deliveryCharges.map((dcharge) => dcharge.value);
        let minweightdcharge = deliveryCharges.map((dcharge) => dcharge.weight);
        let totalwwe = cti.map((x) => {
          totalgramvalue += x;
        });
        if (shipping.district === "Dhaka") {
          for (let i = 0; i < dcharge.length; i++) {
            if (totalgramvalue >= minweightdcharge[i]) {
              localShippingPrice = dcharge[i];
            }
          }
        } else if (shipping.district != "Dhaka") {
          for (let i = 0; i < dcharge.length; i++) {
            if (totalgramvalue >= minweightdcharge[i]) {
              localShippingPrice = dcharge[i];
            }
          }
        }
      }

      // Setting User Discount
      if (shipping.houseNo && orderPromoCode._id) {
        if (
          (orderPromoCode.condition === "Order Items Price Greater" &&
            localItemsPrice > orderPromoCode.conditionValue) ||
          (orderPromoCode.condition === "Order Items Price Less" &&
            localItemsPrice < orderPromoCode.conditionValue) ||
          orderPromoCode.condition === ""
        ) {
          if (orderPromoCode.discountType === "Free Delivery") {
            localDiscountPrice = localShippingPrice;
            freeDelivery = true;
          } else if (orderPromoCode.discountType === "Percentage") {
            localDiscountPrice = localItemsPrice * (orderPromoCode.value / 100);

            if (
              localDiscountPrice > orderPromoCode.maxDiscount &&
              orderPromoCode.maxDiscount !== 0
            ) {
              localDiscountPrice = orderPromoCode.maxDiscount;
            }
          } else if (orderPromoCode.discountType === "Flat") {
            localDiscountPrice = orderPromoCode.value;
          }
        }
      }

      // Setting Product Free Delivery Discount
      if (
        shipping.houseNo &&
        !freeDelivery &&
        price.productDiscounts &&
        price.productDiscounts.length > 0
      ) {
        var deliveryCostSetFlag = 0;
        if (buyNowItems.length === 0) {
          for (const item of cartItems) {
            for (const discount of price.productDiscounts) {
              if (
                discount.discountType === "Free Delivery" &&
                item.product === discount.productId
              ) {
                if (!discount.district) {
                  localDiscountPrice = localDiscountPrice + localShippingPrice;
                  deliveryCostSetFlag = 1;
                  break;
                } else if (
                  shipping.district === "Dhaka" &&
                  discount.district === "Inside Dhaka"
                ) {
                  localDiscountPrice = localDiscountPrice + localShippingPrice;
                  deliveryCostSetFlag = 1;
                  break;
                } else if (
                  shipping.district !== "Dhaka" &&
                  discount.district === "Outside Dhaka"
                ) {
                  localDiscountPrice = localDiscountPrice + localShippingPrice;
                  deliveryCostSetFlag = 1;
                  break;
                }
              }
            }
            if (deliveryCostSetFlag === 1) {
              break;
            }
          }
        } else {
          for (const item of buyNowItems) {
            for (const discount of price.productDiscounts) {
              if (
                discount.discountType === "Free Delivery" &&
                item.product === discount.productId
              ) {
                if (!discount.district) {
                  localDiscountPrice = localDiscountPrice + localShippingPrice;
                  deliveryCostSetFlag = 1;
                  break;
                } else if (
                  shipping.district === "Dhaka" &&
                  discount.district === "Inside Dhaka"
                ) {
                  localDiscountPrice = localDiscountPrice + localShippingPrice;
                  deliveryCostSetFlag = 1;
                  break;
                } else if (
                  shipping.district !== "Dhaka" &&
                  discount.district === "Outside Dhaka"
                ) {
                  localDiscountPrice = localDiscountPrice + localShippingPrice;
                  deliveryCostSetFlag = 1;
                  break;
                }
              }
            }
            if (deliveryCostSetFlag === 1) {
              break;
            }
          }
        }
      }

      // Setting Delivery Time
      if (
        shipping.houseNo &&
        price.productDiscounts &&
        price.productDiscounts.length > 0
      ) {
        var minDeliveryTime = 1000;
        if (buyNowItems.length === 0) {
          for (const item of cartItems) {
            for (const discount of price.productDiscounts) {
              if (
                discount.discountType === "Delivery Time" &&
                item.product === discount.productId &&
                discount.value < minDeliveryTime
              ) {
                if (!discount.district) {
                  minDeliveryTime = discount.value;
                } else if (
                  shipping.district === "Dhaka" &&
                  discount.district === "Inside Dhaka"
                ) {
                  minDeliveryTime = discount.value;
                } else if (
                  shipping.district !== "Dhaka" &&
                  discount.district === "Outside Dhaka"
                ) {
                  minDeliveryTime = discount.value;
                }
              }
            }
          }
          if (minDeliveryTime !== 1000) {
            setDeliveryTime(minDeliveryTime);
          }
        } else {
          for (const item of buyNowItems) {
            for (const discount of price.productDiscounts) {
              if (
                discount.discountType === "Delivery Time" &&
                item.product === discount.productId &&
                discount.value < minDeliveryTime
              ) {
                if (!discount.district) {
                  minDeliveryTime = discount.value;
                } else if (
                  shipping.district === "Dhaka" &&
                  discount.district === "Inside Dhaka"
                ) {
                  minDeliveryTime = discount.value;
                } else if (
                  shipping.district !== "Dhaka" &&
                  discount.district === "Outside Dhaka"
                ) {
                  minDeliveryTime = discount.value;
                }
              }
            }
          }
          if (minDeliveryTime !== 1000) {
            setDeliveryTime(minDeliveryTime);
          }
        }
      }

      // Product Discounts Array
      if (price.productDiscounts && price.productDiscounts.length > 0) {
        for (const productDiscount of price.productDiscounts) {
          if (
            productDiscount.discountType === "Delivery Time" ||
            productDiscount.discountType === "Free Delivery"
          ) {
            localProductDiscounts.push(productDiscount);
          }
        }
      }

      setProductDiscounts(localProductDiscounts);
      setItemsPrice(localItemsPrice);
      setTaxPrice(localTaxPrice);
      // setShippingPrice(localShippingPrice);
      // setDiscountPrice(localDiscountPrice);
      // const findRightPromo = () => {
      //   promoCodeArray.map((x) => {
      //     if (x.promoCode === promoCode) {
      //       return promoCode;
      //     }
      //   });
      // };
      let enteredPromoCode = "notvalid";
      let enteredPromoCodeConditionValue = null;
      promoCodeArray.map((x) => {
        if (x.promoCode == promoCode) {
          enteredPromoCode = promoCode;
          enteredPromoCodeConditionValue = x.conditionValue;
        }
      });

      // allpromos.map((x) => {
      //   if (x == promoCode) {
      //     enteredPromoCode = promoCode;
      //   }
      // });

      if (localItemsPrice >= enteredPromoCodeConditionValue) {
        setDiscountPrice(localDiscountPrice);
      } else {
        setDiscountPrice(0);
      }
      let totalbeforeDiscount =
        localItemsPrice + localTaxPrice + localShippingPrice;
      let totalAfterDiscount = totalbeforeDiscount - localDiscountPrice;
      setTotalPrice(totalAfterDiscount);

      // setTotalPrice(
      //   localItemsPrice +
      //   localTaxPrice +
      //   localShippingPrice -
      //   (localItemsPrice >= 1000 ? localDiscountPrice : 0)
      // );
      setPriceRun(false);
    }
  };

  const cashPaymentHandler = (deliveryType) => {
    if (buyNowItems.length === 0) {
      dispatch(
        createOrder({
          orderItems: cartItems,
          shipping,
          paymentMethod: deliveryType,
          itemsPrice,
          shippingPrice,
          discountPrice,
          taxPrice,
          totalPrice,
          instruction,
          deliveryTime,
          productDiscounts,
          promoCode: orderPromoCode,
          isPaid: false,
        })
      );
    } else {
      dispatch(
        createOrder({
          orderItems: buyNowItems,
          shipping,
          paymentMethod: deliveryType,
          itemsPrice,
          shippingPrice,
          discountPrice,
          taxPrice,
          totalPrice,
          instruction,
          deliveryTime,
          productDiscounts,
          promoCode: orderPromoCode,
          isPaid: false,
        })
      );
    }
    setConfirmModalVisible(false);
    setconfirmOrderCOD(true);
  };

  const payNowHandler = (deliveryType) => {
    if (buyNowItems.length === 0) {
      dispatch(
        createOrderPayNow({
          orderItems: cartItems,
          shipping,
          paymentMethod: deliveryType,
          itemsPrice,
          shippingPrice,
          discountPrice,
          taxPrice,
          totalPrice,
          instruction,
          deliveryTime,
          productDiscounts,
          promoCode: orderPromoCode,
          isPaid: false,
        })
      );
    } else {
      dispatch(
        createOrderPayNow({
          orderItems: buyNowItems,
          shipping,
          paymentMethod: deliveryType,
          itemsPrice,
          shippingPrice,
          discountPrice,
          taxPrice,
          totalPrice,
          instruction,
          deliveryTime,
          productDiscounts,
          promoCode: orderPromoCode,
          isPaid: false,
        })
      );
    }
    setconfirmOrderCOD(true);
  };

  const selectAddress = (address) => {
    dispatch(
      saveShipping({
        houseNo: address.houseNo,
        roadNo: address.roadNo,
        landmark: address.landmark,
        area: address.area,
        zoneName: address.zoneName,
        zoneNumber: address.zoneNumber,
        division: address.division,
        district: address.district,
        country: address.country,
        postalCode: address.postalCode,
        type: address.type,
        name: address.name,
        mobileNumber: address.mobileNumber,
      })
    );
    setPriceRun(true);
  };

  const unselectAddress = () => {
    dispatch(deleteShipping());
    setPriceRun(true);
  };

  // const openLogin = () => dispatch(showLoginModal());

  // const openRegister = () => dispatch(showRegisterModal());

  const openAddress = () => {
    document.querySelector(".address-modal").classList.add("open");
  };

  const addToCartHandler = (productId, qty) => {
    dispatch(addToCart(productId, qty));
    setPriceRun(true);
  };

  const addToBuyNowHandler = (productId, qty) => {
    dispatch(addToBuyNow(productId, qty));
    setPriceRun(true);
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
    setPriceRun(true);
  };

  const removeFromBuyNowHandler = (productId) => {
    dispatch(removeFromBuyNow(productId));
    setPriceRun(true);
  };

  const checkoutMobileHandler = (e) => {
    e.preventDefault();
    dispatch(
      update({
        name: userInfo.name,
        email: userInfo.email,
        countryCode,
        mobileNumber,
        image: userInfo.image,
        dateOfBirth: userInfo.dateOfBirth,
        anniversaryDate: userInfo.anniversaryDate,
        gender: userInfo.gender,
      })
    );
    props.history.push("/checkout");
  };

  // const helpFunc = async () => {
  //   const result = await axios.get("/api/ssl");
  //   console.log(result.data);

  //   window.location.href = result.data;
  // };

  return (
    <>
      <Header></Header>
      <Container fluid={true} className="checkout-background">
        <LoginRegister></LoginRegister>
        <Address></Address>
        <Row>
          <Col xs="12" sm="8">
            <>
              {userInfo &&
                userInfo.changeMobileNumber == undefined &&
                userInfo.mobileNumber == undefined && (
                  <Row className="checkout-mobile-number-popup-background">
                    <div className="checkout-mobile-number-popup">
                      <div className="checkout-mobile-number-popup-heading">
                        Checkout
                      </div>
                      <div className="checkout-mobile-number-popup-text">
                        Enter your mobile number
                      </div>
                      <form
                        onSubmit={checkoutMobileHandler}
                        className="d-flex align-items-center flex-column"
                      >
                        <div className="d-flex justify-content-center">
                          <input
                            autoComplete="off"
                            className="checkout-mobile-number-popup-country-code-input"
                            name="countryCode"
                            type="text"
                            placeholder="+880"
                            onChange={(e) => setCountryCode(e.target.value)}
                          ></input>
                          <input
                            autoComplete="off"
                            className="checkout-mobile-number-popup-mobile-number-input"
                            name="mobileNumber"
                            type="text"
                            placeholder="1111-111111"
                            onChange={(e) => {
                              let telephone = e.target.value;
                              if (telephone.length > 10) {
                                return;
                              }
                              if (
                                e.target.value.match(/^[1-9]\d*\.?\d*$/) ||
                                telephone === ""
                              ) {
                                telephone = telephone.replace(/\s/g, "");
                                setMobileNumber(telephone);
                              }
                            }}
                          ></input>
                        </div>
                        <Button
                          className="checkout-mobile-number-popup-button"
                          type="submit"
                        >
                          Submit
                        </Button>
                      </form>
                    </div>
                  </Row>
                )}
            </>

            <Row className="checkout-component">
              <div className="checkout-checkbox">
                <div className="checkout-checkbox-outer-circle login-outer-circle">
                  {userInfo ? (
                    <div className="checkout-checkbox-checked-inner-circle">
                      <div className="checkout-checkbox-checked-icon">
                        <HiCheckCircle></HiCheckCircle>
                      </div>
                    </div>
                  ) : (
                    <div className="checkout-checkbox-inner-circle"></div>
                  )}
                </div>
                <div className="checkout-checkbox-line"></div>
              </div>
              {userInfo ? (
                <>
                  {loading ? (
                    <div></div>
                  ) : error ? (
                    <div>{error.message}</div>
                  ) : (
                    <div className="checkout-content">
                      <div className="checkout-heading">Logged in</div>
                      <div className="checkout-login">
                        <div>{userInfo.name}</div>
                        <div className="checkout-login-divider">|</div>
                        <div>{userInfo.mobileNumber}</div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="checkout-content">
                  <div className="checkout-heading">
                    Log in to place your order
                  </div>
                  <div className="checkout-text">
                    New to Farmroots? Sign up now to get started! Or log in to
                    your existing account
                  </div>
                  <div>
                    <Button
                      onClick={openLogin}
                      className="checkout-login-button"
                    >
                      Log In
                    </Button>
                    <Button
                      onClick={openRegister}
                      className="checkout-signup-button"
                    >
                      Sign Up
                    </Button>
                  </div>
                </div>
              )}
            </Row>
            <Row className="checkout-component">
              <div className="checkout-checkbox">
                <div className="checkout-checkbox-upper-line address-upper-line"></div>
                <div className="checkout-checkbox-outer-circle">
                  {shipping.houseNo ? (
                    <div className="checkout-checkbox-checked-inner-circle">
                      <div className="checkout-checkbox-checked-icon">
                        <HiCheckCircle></HiCheckCircle>
                      </div>
                    </div>
                  ) : (
                    <div className="checkout-checkbox-inner-circle"></div>
                  )}
                </div>
                <div className="checkout-checkbox-line"></div>
              </div>
              {!userInfo ? (
                <div className="checkout-content">
                  <div className="checkout-heading checkout-heading-light">
                    Add delivery address
                  </div>
                  <div className="checkout-text checkout-text-light">
                    Choose your delivery address from address book or add a new
                    one
                  </div>
                </div>
              ) : (
                <>
                  {" "}
                  {loading ? (
                    <div></div>
                  ) : error ? (
                    <div>{error.message}</div>
                  ) : (
                    <>
                      {!shipping.houseNo ? (
                        <div className="checkout-content">
                          <div className="checkout-heading">
                            Add delivery address
                          </div>
                          <div className="checkout-text">
                            Choose your delivery address from address book or
                            add a new one
                          </div>
                          <Row className="checkout-address">
                            <Col xs="12" sm="4">
                              {" "}
                              <Button
                                className="checkout-add-address-button"
                                onClick={openAddress}
                              >
                                <i className="fa fa-plus mr-1"></i> Add new
                                address
                              </Button>
                            </Col>
                            {addresses?.map((address) => (
                              <Col xs="12" sm="4">
                                <Button
                                  key={address._id}
                                  onClick={() => {
                                    setAddresscount(true);
                                    selectAddress(address);
                                  }}
                                  className="checkout-address-box"
                                >
                                  {address.type === "HOME" ? (
                                    <Col
                                      sm="2"
                                      className="checkout-address-box-icon"
                                    >
                                      <HiHome></HiHome>
                                    </Col>
                                  ) : address.type === "WORK" ? (
                                    <Col
                                      sm="2"
                                      className="checkout-address-box-icon"
                                    >
                                      <IoMdBriefcase></IoMdBriefcase>
                                    </Col>
                                  ) : (
                                    <Col
                                      sm="2"
                                      className="checkout-address-box-icon"
                                    >
                                      <HiLocationMarker></HiLocationMarker>
                                    </Col>
                                  )}
                                  <>
                                    <Col
                                      sm="8"
                                      className="checkout-address-box-type"
                                    >
                                      {address.type}
                                    </Col>
                                    <Row className="checkout-address-box-address">
                                      {address.name}
                                      {address.mobileNumber && (
                                        <span className="checkout-address-box-address">
                                          {address.mobileNumber}
                                        </span>
                                      )}
                                    </Row>
                                    {address.postalCode === "" && (
                                      <Row className="checkout-address-box-address">
                                        {address.houseNo +
                                          ", " +
                                          address.roadNo +
                                          ", " +
                                          address.area +
                                          ", " +
                                          address.district +
                                          ", " +
                                          address.division +
                                          ", " +
                                          address.country}
                                      </Row>
                                    )}
                                    {address.postalCode !== "" && (
                                      <Row className="checkout-address-box-address">
                                        {address.houseNo +
                                          ", " +
                                          address.roadNo +
                                          ", " +
                                          address.area +
                                          ", " +
                                          address.district +
                                          ", " +
                                          address.division +
                                          ", " +
                                          address.country +
                                          ", " +
                                          address.postalCode}
                                      </Row>
                                    )}
                                  </>
                                </Button>
                              </Col>
                            ))}
                          </Row>
                        </div>
                      ) : (
                        <div className="checkout-content">
                          <div
                            style={{ width: "100%" }}
                            className="d-flex justify-content-between align-items-center"
                          >
                            <div className="checkout-heading">
                              Delivery address
                            </div>
                            <Button
                              onClick={() => unselectAddress()}
                              className="checkout-address-change"
                            >
                              Change
                            </Button>
                          </div>
                          <div className="d-flex align-items-center mt-4">
                            {shipping.type === "HOME" ? (
                              <div className="checkout-address-box-icon ml-0">
                                <HiHome></HiHome>
                              </div>
                            ) : shipping.type === "WORK" ? (
                              <div className="checkout-address-box-icon ml-0">
                                <IoMdBriefcase></IoMdBriefcase>
                              </div>
                            ) : (
                              <div className="checkout-address-box-icon ml-0">
                                <HiLocationMarker></HiLocationMarker>
                              </div>
                            )}
                            <div className="checkout-address-box-type">
                              {shipping.type}
                            </div>
                          </div>
                          <div className="checkout-address-box-address ml-0 mt-3">
                            {shipping.name}
                            {shipping.mobileNumber && (
                              <span className="checkout-address-box-address">
                                {shipping.mobileNumber}
                              </span>
                            )}
                          </div>
                          {shipping.postalCode === "" &&
                            shipping.landmark === "" && (
                              <div className="checkout-address-box-address ml-0 mt-3">
                                {shipping.houseNo +
                                  ", " +
                                  shipping.roadNo +
                                  ", " +
                                  shipping.area +
                                  ", " +
                                  shipping.district +
                                  ", " +
                                  shipping.division +
                                  ", " +
                                  shipping.country}
                              </div>
                            )}
                          {shipping.postalCode !== "" &&
                            shipping.landmark === "" && (
                              <div className="checkout-address-box-address ml-0 mt-3">
                                {shipping.houseNo +
                                  ", " +
                                  shipping.roadNo +
                                  ", " +
                                  shipping.area +
                                  ", " +
                                  shipping.district +
                                  ", " +
                                  shipping.division +
                                  ", " +
                                  shipping.country +
                                  ", " +
                                  shipping.postalCode}
                              </div>
                            )}
                          {shipping.postalCode === "" &&
                            shipping.landmark !== "" && (
                              <div className="checkout-address-box-address ml-0 mt-3">
                                {shipping.houseNo +
                                  ", " +
                                  shipping.roadNo +
                                  ", " +
                                  shipping.landmark +
                                  ", " +
                                  shipping.area +
                                  ", " +
                                  shipping.district +
                                  ", " +
                                  shipping.division +
                                  ", " +
                                  shipping.country}
                              </div>
                            )}
                          {shipping.postalCode !== "" &&
                            shipping.landmark !== "" && (
                              <div className="checkout-address-box-address ml-0 mt-3">
                                {shipping.houseNo +
                                  ", " +
                                  shipping.roadNo +
                                  ", " +
                                  shipping.landmark +
                                  ", " +
                                  shipping.area +
                                  ", " +
                                  shipping.district +
                                  ", " +
                                  shipping.division +
                                  ", " +
                                  shipping.country +
                                  ", " +
                                  shipping.postalCode}
                              </div>
                            )}
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </Row>
            <Row className="checkout-component">
              <div className="checkout-checkbox">
                <div className="checkout-checkbox-upper-line payment-upper-line"></div>
                <div className="checkout-checkbox-outer-circle">
                  <div className="checkout-checkbox-inner-circle"></div>
                </div>
              </div>
              {!shipping.houseNo ? (
                <div className="checkout-content">
                  <div className="checkout-heading checkout-heading-light">
                    Select Payment Method
                  </div>
                  <div className="checkout-text checkout-text-light">
                    Select your payment method from existing ones or add a new
                    one
                  </div>
                </div>
              ) : (
                <>
                  {" "}
                  {loading ? (
                    <div></div>
                  ) : error ? (
                    <div>{error.message}</div>
                  ) : (
                    <>
                      {" "}
                      <div className="checkout-content">
                        <div className="checkout-heading">
                          Select Payment Method
                        </div>
                        <div className="checkout-text">
                          Select your payment method from existing ones or add a
                          new one
                        </div>
                        <div>
                          <Button
                            onClick={() => {
                              cartItems.length > 0
                                ? setConfirmModalVisible(true)
                                : setcashondelivery(true);
                            }}
                            className="checkout-login-button mt-3"
                          >
                            Cash On Delivery
                          </Button>
                          {/* <Button
                            className="checkout-login-button mt-3"
                            onClick={() => payNowHandler("Pay Now")}
                          >
                            {" "}
                            Pay Now
                          </Button> */}
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </Row>
          </Col>
          <Col xs="12" sm="4">
            {" "}
            <>
              {!query.get("cart") ? (
                <div className="checkout-cart">
                  <div className="checkout-cart-box">
                    <div className="checkout-cart-your-cart">Your Cart</div>
                    {cartItems.reduce((a, c) => Number(a) + Number(c.qty), 0) >
                    1 ? (
                      <div className="checkout-cart-number-items">{`(${cartItems.reduce(
                        (a, c) => Number(a) + Number(c.qty),
                        0
                      )} items)`}</div>
                    ) : (
                      <div className="checkout-cart-number-items">{`(${cartItems.reduce(
                        (a, c) => Number(a) + Number(c.qty),
                        0
                      )} item)`}</div>
                    )}
                  </div>
                  {cartItems.map((item) => (
                    <div key={item.product} className="checkout-cart-items">
                      <div className="d-flex align-items-center flex-row">
                        {item.qty > 1 ? (
                          <Button
                            className="cart-button"
                            onClick={() =>
                              addToCartHandler(item.product, item.qty - 1)
                            }
                          >
                            <i className="fa fa-minus"></i>
                          </Button>
                        ) : (
                          <Button
                            className="cart-button"
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <i className="fa fa-minus"></i>
                          </Button>
                        )}
                        <div className="cart-qty">{item.qty}</div>
                        <Button
                          className="cart-button"
                          onClick={() =>
                            addToCartHandler(item.product, item.qty + 1)
                          }
                        >
                          <i className="fa fa-plus"></i>
                        </Button>
                        <div className="ml-2 pt-3 cart-name">
                          {item.name}-{item.netWeight}
                        </div>
                      </div>
                      <div className="d-flex align-items-center flex-row">
                        <div className="mr-1 cart-price">
                          <Icon icon={currencyBdt} />
                          <div>{item.price * item.qty}</div>
                        </div>
                        <Button
                          className="ml-1 cart-remove-button"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <MdClose></MdClose>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="checkout-cart buy-now-section">
                  <div className="checkout-cart-box">
                    <div className="checkout-cart-your-cart">Your Cart</div>
                    {buyNowItems.reduce(
                      (a, c) => Number(a) + Number(c.qty),
                      0
                    ) > 1 ? (
                      <div className="checkout-cart-number-items">{`(${buyNowItems.reduce(
                        (a, c) => Number(a) + Number(c.qty),
                        0
                      )} items)`}</div>
                    ) : (
                      <div className="checkout-cart-number-items">{`(${buyNowItems.reduce(
                        (a, c) => Number(a) + Number(c.qty),
                        0
                      )} item)`}</div>
                    )}
                  </div>
                  {buyNowItems.map((item) => (
                    <div key={item.product} className="checkout-cart-items">
                      <div className="d-flex align-items-center flex-row">
                        {item.qty > 1 ? (
                          <Button
                            className="cart-button"
                            onClick={() =>
                              addToBuyNowHandler(item.product, item.qty - 1)
                            }
                          >
                            <i className="fa fa-minus"></i>
                          </Button>
                        ) : (
                          <Button
                            className="cart-button"
                            onClick={() =>
                              removeFromBuyNowHandler(item.product)
                            }
                          >
                            <i className="fa fa-minus"></i>
                          </Button>
                        )}
                        <div className="cart-qty">{item.qty}</div>
                        <Button
                          className="cart-button"
                          onClick={() =>
                            addToBuyNowHandler(item.product, item.qty + 1)
                          }
                        >
                          <i className="fa fa-plus"></i>
                        </Button>
                        <div className="ml-2 pt-3 cart-name">
                          {item.name}-{item.netWeight}
                        </div>
                      </div>
                      <div className="d-flex align-items-center flex-row">
                        <div className="mr-1 cart-price">
                          <Icon icon={currencyBdt} />
                          <div>{item.price * item.qty}</div>
                        </div>
                        <Button
                          className="ml-1 cart-remove-button"
                          onClick={() => removeFromBuyNowHandler(item.product)}
                        >
                          <MdClose></MdClose>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="checkout-instructions">
                <div className="checkout-instructions-icon">
                  <HiOutlinePencilAlt></HiOutlinePencilAlt>
                </div>
                <form>
                  <textarea
                    className="checkout-instructions-input"
                    name="instruction"
                    onChange={(e) => setInstruction(e.target.value)}
                    value={instruction}
                    placeholder="Any special instructions for the delivery guy?"
                  />
                </form>
              </div>
              {userInfo && (
                <div className="checkout-promo-code">
                  <div className="checkout-promo-code-icon">
                    <IoIosPricetags></IoIosPricetags>
                  </div>
                  <input
                    className="checkout-promo-code-input"
                    name="promoCode"
                    onChange={(e) => setPromoCode(e.target.value)}
                    value={promoCode}
                    placeholder="Apply Promo Code"
                    autoComplete="off"
                  />
                  <button
                    className="promo-code-button btn btn-primary"
                    type="submit"
                    onClick={(e) => {
                      if (discountPrice == 0) {
                        promoCodeHandler(e);
                      } else {
                        removePromoCodeHandler(e);
                      }
                    }}
                  >
                    {discountPrice == 0 ? "Apply" : "REMOVE"}
                  </button>
                </div>
              )}
              <div className="checkout-order-summary">
                <div className="checkout-order-summary-text">Order Summary</div>
                <div className="checkout-order-summary-price">
                  <div>Item total</div>
                  <div className="d-flex">
                    <Icon icon={currencyBdt} />
                    <div>{itemsPrice}</div>
                  </div>
                </div>
                <div className="checkout-order-summary-price">
                  <div>Delivery fee</div>
                  {shipping.houseNo ? (
                    <div className="d-flex">
                      <Icon icon={currencyBdt} />
                      <div>{shippingPrice}</div>
                    </div>
                  ) : (
                    <div style={{ fontSize: "1.7rem" }}>TBD</div>
                  )}
                </div>
                <div className="checkout-order-summary-price">
                  <div>Taxes and Charges</div>
                  <div className="d-flex">
                    <Icon icon={currencyBdt} />
                    <div>{taxPrice}</div>
                  </div>
                </div>
                <hr className="checkout-order-summary-horizontal-line"></hr>
                <div className="checkout-order-summary-price">
                  <div>Discount</div>
                  <div className="d-flex">
                    <div className="mr-1">-</div>
                    <Icon icon={currencyBdt} />
                    <div>{Number(discountPrice).toFixed(2)}</div>
                  </div>
                </div>
                <hr className="checkout-order-summary-horizontal-line-bold"></hr>
                <div className="checkout-order-summary-price">
                  <div>
                    <b>TO PAY</b>
                  </div>
                  {shipping.houseNo ? (
                    <div className="d-flex">
                      <Icon icon={currencyBdt} />
                      <div>
                        <b>{Number(totalPrice).toFixed(2)}</b>
                      </div>
                    </div>
                  ) : (
                    <div style={{ fontSize: "1.7rem" }}>TBD</div>
                  )}
                </div>
              </div>
              <div className="checkout-cancel-order">
                <div className="checkout-cancel-order-box">
                  <div className="checkout-cancel-order-text">
                    <b>
                      Review your order and address details to avoid
                      cancellations
                    </b>
                  </div>
                  <div className="checkout-cancel-order-text">
                    <b style={{ color: "#00632c" }}>Note: </b>If you choose to
                    cancel you can do it within 1 hour after placing order. Post
                    which you will be charged 100% cancellation fee.
                  </div>
                  <div className="d-flex align-items-center">
                    <Button
                      href="/help/Terms and Conditions"
                      className="checkout-cancel-order-button"
                    >
                      Read Policy
                    </Button>
                  </div>
                </div>
              </div>
            </>
          </Col>
        </Row>
      </Container>

      <Modal
        show={confirmModalVisible}
        onHide={() => setConfirmModalVisible(false)}
        centered
        dialogClassName=""
      >
        <Modal.Body>
          <div className="confirm-container">
            <div className="confirm-yes-icon">
              <IoIosCheckmarkCircleOutline></IoIosCheckmarkCircleOutline>
            </div>
            <div className="confirm-heading">Are you sure?</div>
            <div className="confirm-text">
              Do you really want to place this order? This process cannot be
              undone.
            </div>
            <div className="confirm-buttons">
              <Button
                onClick={() => setConfirmModalVisible(false)}
                className="confirm-no-button"
              >
                No
              </Button>
              <Button
                onClick={() => cashPaymentHandler("Cash on Delivery")}
                className="confirm-tick-button"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={promoCodeModalVisible}
        onHide={() => setPromoCodeModalVisible(false)}
        centered
        dialogClassName=""
      >
        <Modal.Body>
          {promoCodeSet ? (
            <div className="confirm-container">
              <div className="confirm-yes-icon">
                <IoIosCheckmarkCircleOutline></IoIosCheckmarkCircleOutline>
              </div>
              <div className="confirm-heading">Congratulations</div>
              <div className="confirm-text">
                Your Promo Code has been successfully applied
              </div>
              <div className="confirm-buttons">
                <Button
                  onClick={() => setPromoCodeModalVisible(false)}
                  className="confirm-tick-button"
                >
                  Ok
                </Button>
              </div>
            </div>
          ) : (
            <div className="confirm-container">
              <div className="confirm-no-icon">
                <FiXCircle></FiXCircle>
              </div>
              <div className="confirm-heading">Sorry</div>
              <div className="confirm-text">
                Minimum value should be greater than {promocodeValue}
              </div>
              <div className="confirm-buttons">
                <Button
                  onClick={() => setPromoCodeModalVisible(false)}
                  className="confirm-yes-button"
                >
                  Ok
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* MY MODALS */}
      <Modal
        show={cashondelivery}
        onHide={() => setcashondelivery(false)}
        centered
        dialogClassName=""
      >
        <Modal.Body>
          <div className="confirm-container">
            <div className="confirm-no-icon">
              <FiXCircle></FiXCircle>
            </div>
            <div className="confirm-heading">Sorry</div>
            <div className="confirm-text">Your Cart is Empty</div>
            <div className="confirm-buttons">
              <Button
                onClick={() => setcashondelivery(false)}
                className="confirm-yes-button"
              >
                Ok
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={promoCodeModalNotAvailable}
        onHide={() => setpromoCodeModalNotAvailable(false)}
        centered
        dialogClassName=""
      >
        <Modal.Body>
          {promoCodeSet ? (
            <div className="confirm-container">
              <div className="confirm-no-icon">
                <FiXCircle></FiXCircle>
              </div>
              <div className="confirm-heading">Sorry</div>
              <div className="confirm-text">You Entered A Wrong Coupon</div>
              <div className="confirm-buttons">
                <Button
                  onClick={() => setpromoCodeModalNotAvailable(false)}
                  className="confirm-yes-button"
                >
                  Ok
                </Button>
              </div>
            </div>
          ) : (
            <div className="confirm-container">
              <div className="confirm-no-icon">
                <FiXCircle></FiXCircle>
              </div>
              <div className="confirm-heading">Sorry</div>
              <div className="confirm-text">You Entered A Wrong Coupon</div>
              <div className="confirm-buttons">
                <Button
                  onClick={() => setpromoCodeModalNotAvailable(false)}
                  className="confirm-yes-button"
                >
                  Ok
                </Button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <div className="main checkout-background">
        {loading ? <div></div> : error ? <div>{error.message}</div> : ""}
        <div className="checkout">
          {/* Left Section */}

          <div className="checkout-login-address-payment">
            {/* Login Component */}

            {/* Connect */}

            <div className="checkout-connect">
              <div className="checkout-connect-line"></div>
            </div>

            {/* Address Component */}

            {/* Connect */}

            <div className="checkout-connect">
              <div className="checkout-connect-line"></div>
            </div>

            {/* Payment Component */}
          </div>

          {/* Price Model Loading */}

          {loadingPrice ? (
            <div></div>
          ) : errorPrice ? (
            <div>{errorPrice.message}</div>
          ) : (
            calculateBill(price, cartItems, buyNowItems)
          )}

          {/* Right Section */}
        </div>
      </div>
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
    </>
  );
}

export default CheckoutScreen;
