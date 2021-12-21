import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FiX, FiPlus, FiMinus, FiSearch } from 'react-icons/fi';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  authorizeOrder,
  editOrder,
  editOrderItems,
  listCallCenterOrders,
} from '../../actions/orderActions';
import Header from '../../components/Header';
import { listCallCenterProductNames } from '../../actions/productActions';
import { listCallCenterDivision } from '../../actions/orderDivisionActions';
import { Icon } from '@iconify/react';
import currencyBdt from '@iconify-icons/mdi/currency-bdt';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { getPrice } from '../../actions/priceActions';

function PersonalPendingOrdersScreen(props) {
  const [id, setId] = useState('');
  const [userName, setUserName] = useState('');
  const [userMobileNumber, setUserMobileNumber] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [roadNo, setRoadNo] = useState('');
  const [landmark, setLandmark] = useState('');
  const [area, setArea] = useState('');
  const [zoneName, setZoneName] = useState('None');
  const [zoneNumber, setZoneNumber] = useState(0);
  const [district, setDistrict] = useState('');
  const [division, setDivision] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [instruction, setInstruction] = useState('');
  const [orderItems, setOrderItems] = useState([]);

  const [orderPromoCode, setOrderPromoCode] = useState({});
  const [productDiscounts, setProductDiscounts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [orderSearchNamesCheck, setOrderSearchNamesCheck] = useState(false);
  const [orderSearchArray, setOrderSearchArray] = useState([]);
  const [orderSearchKeyword, setOrderSearchKeyword] = useState('');

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const productCallCenterName = useSelector(
    (state) => state.productCallCenterName
  );
  const {
    loading: loadingProductCallCenterNames,
    productCallCenterNames,
    error: errorProductCallCenterNames,
  } = productCallCenterName;

  const orderAuthorize = useSelector((state) => state.orderAuthorize);
  const { success: orderAuthorizeSuccess } = orderAuthorize;

  const orderItemsEdit = useSelector((state) => state.orderItemsEdit);
  const { success: orderItemsEditSuccess } = orderItemsEdit;

  const orderEdit = useSelector((state) => state.orderEdit);
  const { success: orderEditSuccess } = orderEdit;

  const orderCallCenterList = useSelector((state) => state.orderCallCenterList);
  const { loading, orders, error } = orderCallCenterList;

  const divisionList = useSelector((state) => state.divisionList);
  const { divisions } = divisionList;

  const priceGet = useSelector((state) => state.priceGet);
  const { price } = priceGet;

  const [areaDropdownArray, setAreaDropdownArray] = useState([]);
  const [districtDropdownArray, setDistrictDropdownArray] = useState([]);
  const [divisionDropdownArray, setDivisionDropdownArray] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (orderEditSuccess) {
      closeModal();
    }
    dispatch(getPrice());
    dispatch(listCallCenterDivision());
    dispatch(
      listCallCenterOrders({
        isAuthorized: false,
      })
    );
    return () => {
      //
    };
  }, [orderAuthorizeSuccess, orderEditSuccess]);

  function calculateBill() {
    if (price.tax > -1) {
      var localShippingPrice = 0;
      var localDiscountPrice = 0;
      var localDeliveryTime = 0;
      var localTotalPrice = 0;
      var freeDelivery = false;

      // Setting Items Price
      var localItemsPrice = orderItems.reduce((a, c) => a + c.price * c.qty, 0);

      // Setting Tax Price
      var localTaxPrice = (price.tax * localItemsPrice) / 100;

      // Setting Shipping Price
      var totalWeight = 0;
      console.log('orderItems', orderItems);
      // for (const item of orderItems) {
      //   if (item.netWeight.toLowerCase().indexOf('gm') !== -1) {
      //     var weight = item.netWeight.split(' ').map((wt) => wt.trim());
      //     totalWeight = totalWeight + Number(weight[0]) * item.qty;
      //   } else if (item.netWeight.toLowerCase().indexOf('kg') !== -1) {
      //     var weight = item.netWeight.split(' ').map((wt) => wt.trim());
      //     totalWeight = totalWeight + Number(weight[0]) * 1000 * item.qty;
      //   } else if (item.netWeight.toLowerCase().indexOf('ml') !== -1) {
      //     var weight = item.netWeight.split(' ').map((wt) => wt.trim());
      //     totalWeight = totalWeight + Number(weight[0]) * item.qty;
      //   } else if (item.netWeight.toLowerCase().indexOf('lit') !== -1) {
      //     var weight = item.netWeight.split(' ').map((wt) => wt.trim());
      //     totalWeight = totalWeight + Number(weight[0]) * 1000 * item.qty;
      //   }
      // }
      let cti = 0;
      let gramvalue = 0;
      let totalgramvalue = 0;
      let totalWeight2 = 0;
      let subTotal = 0;
      orderItems.map((cart) => {
        if (cart.netWeight.toLowerCase().indexOf('gm') !== -1) {
          totalWeight2 = Number(cart.netWeight.match(/\d+/g)[0]) * cart.qty;
        } else if (cart.netWeight.toLowerCase().indexOf('kg') !== -1) {
          totalWeight2 =
            Number(cart.netWeight.match(/\d+/g)[0]) * cart.qty * 1000;
        } else if (cart.netWeight.toLowerCase().indexOf('ml') !== -1) {
          totalWeight2 = Number(cart.netWeight.match(/\d+/g)[0]) * cart.qty;
        } else if (cart.netWeight.toLowerCase().indexOf('lit') !== -1) {
          totalWeight2 =
            Number(cart.netWeight.match(/\d+/g)[0]) * cart.qty * 1000;
        }
        subTotal = +subTotal + totalWeight2;
        return subTotal;
      });

      var deliveryCharges = [];
      console.log('district', district);
      if (district === 'Dhaka') {
        for (const deliveryCharge of price.deliveryCharges) {
          if (deliveryCharge.district === 'Inside Dhaka') {
            deliveryCharges.push(deliveryCharge);
          }
        }
      } else {
        for (const deliveryCharge of price.deliveryCharges) {
          if (deliveryCharge.district === 'Outside Dhaka') {
            deliveryCharges.push(deliveryCharge);
          }
        }
      }
      console.log('price.deliveryCharges', price.deliveryCharges);
      deliveryCharges.map((x) => {
        cti = orderItems.map((cart) => {
          gramvalue = cart.netWeight.split(' ')[0];
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

      console.log('localShippingPrice167', localShippingPrice);

      deliveryCharges = deliveryCharges.sort(function (x, y) {
        return x.weight - y.weight;
      });
      console.log('deliveryCharges', deliveryCharges);
      for (const deliveryCharge of deliveryCharges) {
        if (totalWeight >= deliveryCharge.weight) {
          localShippingPrice = deliveryCharge.value;
        } else {
          break;
        }
      }

      // Setting User Discount
      if (orderPromoCode) {
        if (
          (orderPromoCode.condition === 'Order Items Price Greater' &&
            localItemsPrice > orderPromoCode.conditionValue) ||
          (orderPromoCode.condition === 'Order Items Price Less' &&
            localItemsPrice < orderPromoCode.conditionValue) ||
          orderPromoCode.condition === ''
        ) {
          if (orderPromoCode.discountType === 'Free Delivery') {
            localDiscountPrice = localShippingPrice;
            freeDelivery = true;
          } else if (orderPromoCode.discountType === 'Percentage') {
            var discount = (orderPromoCode.value * localItemsPrice) / 100;
            if (
              discount > orderPromoCode.maxDiscount &&
              orderPromoCode.maxDiscount !== 0
            ) {
              localDiscountPrice = orderPromoCode.maxDiscount;
            } else {
              localDiscountPrice = discount;
            }
          } else if (orderPromoCode.discountType === 'Flat') {
            localDiscountPrice = orderPromoCode.value;
          }
        }
      }

      // Setting Product Free Delivery Discount
      if (!freeDelivery && productDiscounts && productDiscounts.length > 0) {
        var deliveryCostSetFlag = 0;
        for (const item of orderItems) {
          for (const discount of productDiscounts) {
            if (
              discount.discountType === 'Free Delivery' &&
              item.product === discount.productId
            ) {
              if (!discount.district) {
                localDiscountPrice = localDiscountPrice + localShippingPrice;
                deliveryCostSetFlag = 1;
                break;
              } else if (
                district === 'Dhaka' &&
                discount.district === 'Inside Dhaka'
              ) {
                localDiscountPrice = localDiscountPrice + localShippingPrice;
                deliveryCostSetFlag = 1;
                break;
              } else if (
                district !== 'Dhaka' &&
                discount.district === 'Outside Dhaka'
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

      // Setting Delivery Time
      if (productDiscounts && productDiscounts.length > 0) {
        var minDeliveryTime = 1000;
        for (const item of orderItems) {
          for (const discount of productDiscounts) {
            if (
              discount.discountType === 'Delivery Time' &&
              item.product === discount.productId &&
              discount.value < minDeliveryTime
            ) {
              if (!discount.district) {
                minDeliveryTime = discount.value;
              } else if (
                district === 'Dhaka' &&
                discount.district === 'Inside Dhaka'
              ) {
                minDeliveryTime = discount.value;
              } else if (
                district !== 'Dhaka' &&
                discount.district === 'Outside Dhaka'
              ) {
                minDeliveryTime = discount.value;
              }
            }
          }
        }
        if (minDeliveryTime !== 1000) {
          localDeliveryTime = minDeliveryTime;
        }
      }

      // Final Calculation
      localTotalPrice =
        localItemsPrice +
        localTaxPrice +
        localShippingPrice -
        localDiscountPrice;
      setTotalPrice(localTotalPrice);

      console.log('localShippingPrice', localShippingPrice);

      return [
        localItemsPrice,
        localShippingPrice,
        localTaxPrice,
        localDiscountPrice,
        localTotalPrice,
        localDeliveryTime,
      ];
    }
  }

  const orderSearchNamesHandler = () => {
    if (!orderSearchNamesCheck) {
      dispatch(listCallCenterProductNames());
      setOrderSearchNamesCheck(true);
    }
  };

  const autoOrderSearchHandler = (searchItem) => {
    setOrderSearchKeyword(searchItem.name);
    setOrderSearchArray([]);
    closeOrderSearchDropdown();
    var tempOrderItems = orderItems;
    tempOrderItems.push({
      product: searchItem.product,
      name: searchItem.name,
      image: searchItem.image,
      price: searchItem.price,
      netWeight: searchItem.netWeight,
      vegan: searchItem.vegan,
      qty: 1,
    });
    setOrderItems(tempOrderItems);
    orderItemsEditHandler();
  };

  const openOrderSearchDropdown = () => {
    document
      .querySelector('.admin-order-searchbar-dropdown')
      .classList.add('open');
  };

  const closeOrderSearchDropdown = () => {
    document
      .querySelector('.admin-order-searchbar-dropdown')
      .classList.remove('open');
  };

  function getOrderProductNames(keyword) {
    keyword = keyword.toLowerCase();
    var array = [];
    for (const product of productCallCenterNames) {
      var temp = product.name.toLowerCase();
      if (temp.indexOf(keyword) !== -1) {
        array.push(product);
      }
      if (array.length === 6) {
        break;
      }
    }
    setOrderSearchArray(array);
  }

  const autoCompleteOrderSearch = (keyword) => {
    setOrderSearchKeyword(keyword);
    if (keyword === '') {
      closeOrderSearchDropdown();
    } else {
      openOrderSearchDropdown();
      getOrderProductNames(keyword);
    }
  };

  const confirmModalHandler = (orderId) => {
    setId(orderId);
    setConfirmModalVisible(true);
  };

  const orderAuthorizeHandler = () => {
    dispatch(authorizeOrder(id));
    setConfirmModalVisible(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    var editZoneName = zoneName;
    var editZoneNumber = zoneNumber;

    if (areaNames.indexOf(area) === -1) {
      editZoneName = 'None';
      editZoneNumber = 0;
    }
    const [
      itemsPrice,
      shippingPrice,
      taxPrice,
      discountPrice,
      totalPrice,
      deliveryTime,
    ] = calculateBill();
    console.log('shippingPrice', shippingPrice);

    var userMobile = userMobileNumber.split(' ').map((item) => item.trim());

    dispatch(
      editOrder({
        orderId: id,
        userName: userName,
        userEmail: userEmail,
        userCountryCode: userMobile[0],
        userMobileNumber: userMobile[1],
        houseNo: houseNo,
        roadNo: roadNo,
        landmark: landmark,
        area: area,
        zoneName: editZoneName,
        zoneNumber: editZoneNumber,
        district: district,
        division: division,
        postalCode: postalCode,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        discountPrice: discountPrice,
        totalPrice: totalPrice,
        deliveryTime: deliveryTime,
        instruction: instruction,
      })
    );
  };

  const orderItemsEditHandler = () => {
    const [
      itemsPrice,
      shippingPrice,
      taxPrice,
      discountPrice,
      totalPrice,
      deliveryTime,
    ] = calculateBill();
    dispatch(
      editOrderItems({
        orderId: id,
        orderItems: orderItems,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        discountPrice: discountPrice,
        totalPrice: totalPrice,
        deliveryTime: deliveryTime,
      })
    );
  };

  const minusQty = (itemId) => {
    var tempOrderItems = orderItems;
    for (var item of tempOrderItems) {
      if (item._id === itemId) {
        if (item.qty === 1) {
          removeItem(itemId);
        } else {
          item.qty = item.qty - 1;
        }
        break;
      }
    }
    setOrderItems(tempOrderItems);
    orderItemsEditHandler();
  };

  const addQty = (itemId) => {
    var tempOrderItems = orderItems;
    for (var item of tempOrderItems) {
      if (item._id === itemId) {
        item.qty = item.qty + 1;
        break;
      }
    }
    setOrderItems(tempOrderItems);
    orderItemsEditHandler();
  };

  const removeItem = (itemId) => {
    var tempOrderItems = orderItems;
    for (var index in tempOrderItems) {
      if (tempOrderItems[index]._id === itemId) {
        tempOrderItems.splice(index, 1);
      }
    }
    setOrderItems(tempOrderItems);
    orderItemsEditHandler();
  };

  var areaNames = [];

  function getAreaNamesArray() {
    for (const division of divisions) {
      if (areaNames.indexOf(division.area) === -1) {
        areaNames.push(division.area);
      }
    }
    areaNames = areaNames.sort();
  }

  const autoAreaHandler = (areaDropdownValue) => {
    setArea(areaDropdownValue);
    setAreaDropdownArray([]);
    for (const division of divisions) {
      if (division.area === areaDropdownValue) {
        setZoneName(division.zoneName);
        setZoneNumber(division.zoneNumber);
        setDistrict(division.district);
        setDivision(division.name);
        break;
      }
    }
    closeAreaDropdown();
  };

  const openAreaDropdown = () => {
    document
      .querySelector('.admin-order-edit-area-dropdown')
      .classList.add('open');
  };

  const closeAreaDropdown = () => {
    document
      .querySelector('.admin-order-edit-area-dropdown')
      .classList.remove('open');
  };

  function getAreaDropdowntNames(keyword) {
    keyword = keyword.toLowerCase();
    var array = [];
    for (const area of areaNames) {
      var temp = area.toLowerCase();
      if (temp.startsWith(keyword)) {
        array.push(area);
      }
      if (array.length === 7) {
        break;
      }
    }
    setAreaDropdownArray(array);
  }

  const autoCompleteArea = (keyword) => {
    setArea(keyword);
    if (keyword === '') {
      closeAreaDropdown();
    } else {
      openAreaDropdown();
      getAreaDropdowntNames(keyword);
    }
  };

  var districtNames = [];

  function getDistrictNamesArray() {
    for (const division of divisions) {
      if (districtNames.indexOf(division.district) === -1) {
        districtNames.push(division.district);
      }
    }
    districtNames = districtNames.sort();
  }

  const autoDistrictHandler = (districtDropdownValue) => {
    setDistrict(districtDropdownValue);
    setDistrictDropdownArray([]);
    for (const division of divisions) {
      if (division.district === districtDropdownValue) {
        setDivision(division.name);
        break;
      }
    }
    closeDistrictDropdown();
  };

  const openDistrictDropdown = () => {
    document
      .querySelector('.admin-order-edit-district-dropdown')
      .classList.add('open');
  };

  const closeDistrictDropdown = () => {
    document
      .querySelector('.admin-order-edit-district-dropdown')
      .classList.remove('open');
  };

  function getDistrictDropdowntNames(keyword) {
    keyword = keyword.toLowerCase();
    var array = [];
    for (const district of districtNames) {
      var temp = district.toLowerCase();
      if (temp.startsWith(keyword)) {
        array.push(district);
      }
      if (array.length === 7) {
        break;
      }
    }
    setDistrictDropdownArray(array);
  }

  const autoCompleteDistrict = (keyword) => {
    setDistrict(keyword);
    if (keyword === '') {
      closeDistrictDropdown();
    } else {
      openDistrictDropdown();
      getDistrictDropdowntNames(keyword);
    }
  };

  var divisionNames = [];

  function getDivisionNamesArray() {
    for (const division of divisions) {
      if (divisionNames.indexOf(division.name) === -1) {
        divisionNames.push(division.name);
      }
    }
    divisionNames = divisionNames.sort();
  }

  const autoDivisionHandler = (divisionDropdownValue) => {
    setDivision(divisionDropdownValue);
    setDivisionDropdownArray([]);
    closeDivisionDropdown();
  };

  const openDivisionDropdown = () => {
    document
      .querySelector('.admin-order-edit-division-dropdown')
      .classList.add('open');
  };

  const closeDivisionDropdown = () => {
    document
      .querySelector('.admin-order-edit-division-dropdown')
      .classList.remove('open');
  };

  function getDivisionDropdowntNames(keyword) {
    keyword = keyword.toLowerCase();
    var array = [];
    for (const division of divisionNames) {
      var temp = division.toLowerCase();
      if (temp.startsWith(keyword)) {
        array.push(division);
      }
      if (array.length === 7) {
        break;
      }
    }
    setDivisionDropdownArray(array);
  }

  const autoCompleteDivision = (keyword) => {
    setDivision(keyword);
    if (keyword === '') {
      closeDivisionDropdown();
    } else {
      openDivisionDropdown();
      getDivisionDropdowntNames(keyword);
    }
  };

  const openEditModal = (order) => {
    setId(order._id);
    setUserName(order.userName);
    setUserMobileNumber(`${order.userCountryCode} ${order.userMobileNumber}`);
    setUserEmail(order.userEmail);
    setHouseNo(order.shipping.houseNo);
    setRoadNo(order.shipping.roadNo);
    setLandmark(order.shipping.landmark);
    setArea(order.shipping.area);
    setZoneName(order.shipping.zoneName);
    setZoneNumber(order.shipping.zoneNumber);
    setDistrict(order.shipping.district);
    setDivision(order.shipping.division);
    setPostalCode(order.shipping.postalCode);
    setInstruction(order.instruction);
    setOrderItems(order.orderItems);
    setTotalPrice(order.totalPrice);
    setOrderPromoCode(order.promoCode);
    setProductDiscounts(order.productDiscounts);
    closeAreaDropdown();
    closeDistrictDropdown();
    closeDivisionDropdown();
    openModal();
  };

  const openModal = () => {
    document.querySelector('.admin-modal-background').classList.add('open');
  };

  const closeModal = () => {
    document.querySelector('.admin-modal-background').classList.remove('open');
  };
  console.log('orders', orders);

  return (
    <div className="grid">
      <div className="grid-header">
        <Header></Header>
      </div>

      <Modal
        show={confirmModalVisible}
        onHide={() => setConfirmModalVisible(false)}
        centered
        dialogClassName="modal-35w"
      >
        <Modal.Body>
          <div className="confirm-container">
            <div className="confirm-yes-icon">
              <IoIosCheckmarkCircleOutline></IoIosCheckmarkCircleOutline>
            </div>
            <div className="confirm-heading">Are you sure?</div>
            <div className="confirm-text">
              Do you really want to authorize this order? This process cannot be
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
                onClick={orderAuthorizeHandler}
                className="confirm-tick-button"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="admin-modal-background">
        <div className="admin-modal" style={{ width: '45%' }}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="admin-modal-heading">Edit Order</div>
            <Button onClick={closeModal} className="admin-modal-close-button">
              <FiX></FiX>
            </Button>
          </div>
          <form className="admin-order-search-form">
            <input
              autoComplete="off"
              className="admin-order-search-input"
              name="orderSearchKeyword"
              type="text"
              placeholder="Search for Products..."
              value={orderSearchKeyword}
              onChange={(e) => autoCompleteOrderSearch(e.target.value)}
              onClick={orderSearchNamesHandler}
            ></input>
            <Button type="submit" className="admin-order-search-button">
              <FiSearch></FiSearch>
            </Button>
          </form>
          <div className="admin-order-searchbar-dropdown">
            {loadingProductCallCenterNames ? (
              <div></div>
            ) : errorProductCallCenterNames ? (
              <div>{errorProductCallCenterNames.message}</div>
            ) : (
              <>
                {orderSearchArray.length === 0 ? (
                  <div className="admin-order-searchbar-dropdown-text">
                    No Results Found
                  </div>
                ) : (
                  orderSearchArray.map((searchItem) => (
                    <Button
                      onClick={() => autoOrderSearchHandler(searchItem)}
                      className="admin-order-searchbar-dropdown-button"
                    >{`${searchItem.name} (${searchItem.netWeight})`}</Button>
                  ))
                )}
              </>
            )}
          </div>
          <form onSubmit={submitHandler} className="admin-order-edit-form">
            <div className="admin-order-edit-items">
              <div className="admin-order-edit-items-heading">Order Items</div>
              {orderItems.map((item) => (
                <div
                  key={item._id}
                  className="d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center">
                    <Button
                      onClick={(e) => minusQty(item._id)}
                      className="admin-order-edit-items-icon"
                    >
                      <FiMinus></FiMinus>
                    </Button>
                    <div className="admin-order-edit-items-text">
                      {item.qty}
                    </div>
                    <Button
                      onClick={(e) => addQty(item._id)}
                      className="admin-order-edit-items-icon"
                    >
                      <FiPlus></FiPlus>
                    </Button>
                    <div className="admin-order-edit-items-text">{`${item.name} (${item.netWeight})`}</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="admin-order-edit-items-text d-flex align-items-center">
                      <Icon icon={currencyBdt} />
                      {item.price}
                    </div>
                    <Button
                      onClick={(e) => removeItem(item._id)}
                      className="admin-order-edit-items-icon"
                    >
                      <FiX></FiX>
                    </Button>
                  </div>
                </div>
              ))}
              <hr style={{ borderColor: '#c0c0c0' }}></hr>
              <div className="d-flex align-items-center justify-content-between">
                <div className="admin-order-edit-items-text">
                  <b>Total Price</b>
                </div>
                <div className="admin-order-edit-items-text d-flex align-items-center">
                  <Icon icon={currencyBdt} />
                  {totalPrice}
                </div>
              </div>
            </div>
            <div className="admin-order-edit-items-heading">User Details</div>
            <div className="admin-order-edit-form-div">
              <label className="admin-order-edit-form-label">User Name</label>
              <input
                autoComplete="off"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="admin-order-edit-form-input"
              ></input>
            </div>
            <div className="admin-order-edit-form-div">
              <label className="admin-order-edit-form-label">
                User Mobile Number
              </label>
              <input
                autoComplete="off"
                value={userMobileNumber}
                onChange={(e) => setUserMobileNumber(e.target.value)}
                className="admin-order-edit-form-input"
              ></input>
            </div>
            <div className="admin-order-edit-form-div">
              <label className="admin-order-edit-form-label">User Email</label>
              <input
                autoComplete="off"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="admin-order-edit-form-input"
              ></input>
            </div>
            <div className="admin-order-edit-form-div">
              <label className="admin-order-edit-form-label">House No.</label>
              <input
                autoComplete="off"
                value={houseNo}
                onChange={(e) => setHouseNo(e.target.value)}
                className="admin-order-edit-form-input"
              ></input>
            </div>
            <div className="admin-order-edit-form-div">
              <label className="admin-order-edit-form-label">Road No.</label>
              <input
                autoComplete="off"
                value={roadNo}
                onChange={(e) => setRoadNo(e.target.value)}
                className="admin-order-edit-form-input"
              ></input>
            </div>
            <div className="admin-order-edit-form-div">
              <label className="admin-order-edit-form-label">
                Nearby Landmark
              </label>
              <input
                autoComplete="off"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="admin-order-edit-form-input"
              ></input>
            </div>
            <div className="admin-order-edit-form-div">
              <label className="admin-order-edit-form-label">Area</label>
              <div className="d-flex flex-column" style={{ width: '60%' }}>
                <input
                  autoComplete="off"
                  className="admin-order-edit-form-input"
                  value={area}
                  name="area"
                  style={{ width: '100%' }}
                  onChange={(e) => autoCompleteArea(e.target.value)}
                  onClick={getAreaNamesArray()}
                ></input>
                <div className="admin-order-edit-area-dropdown">
                  {areaDropdownArray.length === 0 ? (
                    <div className="address-dropdown-text">
                      No Results Found
                    </div>
                  ) : (
                    areaDropdownArray.map((areaDropdownValue) => (
                      <Button
                        key={areaDropdownValue}
                        onClick={() => autoAreaHandler(areaDropdownValue)}
                        className="address-dropdown-button"
                      >
                        {areaDropdownValue}
                      </Button>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="admin-order-edit-form-div">
              <label className="admin-order-edit-form-label">District</label>
              <div className="d-flex flex-column" style={{ width: '60%' }}>
                <input
                  autoComplete="off"
                  className="admin-order-edit-form-input"
                  value={district}
                  name="district"
                  style={{ width: '100%' }}
                  onChange={(e) => autoCompleteDistrict(e.target.value)}
                  onClick={getDistrictNamesArray()}
                ></input>
                <div className="admin-order-edit-district-dropdown">
                  {districtDropdownArray.length === 0 ? (
                    <div className="address-dropdown-text">
                      No Results Found
                    </div>
                  ) : (
                    districtDropdownArray.map((districtDropdownValue) => (
                      <Button
                        key={districtDropdownValue}
                        onClick={() =>
                          autoDistrictHandler(districtDropdownValue)
                        }
                        className="address-dropdown-button"
                      >
                        {districtDropdownValue}
                      </Button>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="admin-order-edit-form-div">
              <label className="admin-order-edit-form-label">Division</label>
              <div className="d-flex flex-column" style={{ width: '60%' }}>
                <input
                  autoComplete="off"
                  className="admin-order-edit-form-input"
                  value={division}
                  name="division"
                  style={{ width: '100%' }}
                  onChange={(e) => autoCompleteDivision(e.target.value)}
                  onClick={getDivisionNamesArray()}
                ></input>
                <div className="admin-order-edit-division-dropdown">
                  {divisionDropdownArray.length === 0 ? (
                    <div className="address-dropdown-text">
                      No Results Found
                    </div>
                  ) : (
                    divisionDropdownArray.map((divisionDropdownValue) => (
                      <Button
                        key={divisionDropdownValue}
                        onClick={() =>
                          autoDivisionHandler(divisionDropdownValue)
                        }
                        className="address-dropdown-button"
                      >
                        {divisionDropdownValue}
                      </Button>
                    ))
                  )}
                </div>
              </div>
            </div>
            {district === 'Dhaka' && (
              <div className="admin-order-edit-form-div">
                <label className="admin-order-edit-form-label">Zone Name</label>
                <input
                  autoComplete="off"
                  value={zoneName}
                  onChange={(e) => setZoneName(e.target.value)}
                  className="admin-order-edit-form-input"
                ></input>
              </div>
            )}
            {district === 'Dhaka' && (
              <div className="admin-order-edit-form-div">
                <label className="admin-order-edit-form-label">
                  Zone Number
                </label>
                <input
                  autoComplete="off"
                  value={zoneNumber}
                  onChange={(e) => setZoneNumber(e.target.value)}
                  className="admin-order-edit-form-input"
                ></input>
              </div>
            )}
            <div className="admin-order-edit-form-div">
              <label className="admin-order-edit-form-label">Postal Code</label>
              <input
                autoComplete="off"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="admin-order-edit-form-input"
              ></input>
            </div>
            <div className="admin-order-edit-items-heading">
              Special Instruction
            </div>
            <div className="admin-order-edit-form-div">
              <label className="admin-order-edit-form-label">Instruction</label>
              <input
                autoComplete="off"
                value={instruction}
                onChange={(e) => setInstruction(e.target.value)}
                className="admin-order-edit-form-input"
              ></input>
            </div>
            <div className="d-flex justify-content-center">
              <Button
                className="admin-modal-form-submit"
                style={{ marginBottom: '1.5rem' }}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="main">
        {loading ? (
          <div></div>
        ) : error ? (
          <div>{error.message}</div>
        ) : (
          <>
            <div className="admin-header">
              <div className="admin-header-text">{`Pending Orders (${orders.length})`}</div>
              <div className="d-flex align-items-center">
                <Link
                  to="/6118131915162019/call-center/feedback"
                  className="admin-header-button"
                >
                  Feedback Orders
                </Link>
                <Link
                  to="/6118131915162019/call-center/authorized"
                  className="admin-header-button"
                >
                  Authorized Orders
                </Link>
              </div>
            </div>
            <div className="admin-orders">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="admin-orders-content-box"
                  style={{ width: '100%' }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div className="user-orders-info">
                        <div className="user-orders-info-heading">Order ID</div>
                        <div className="user-orders-info-data">
                          {order.orderNumber}
                        </div>
                      </div>
                      <div className="user-orders-info">
                        <div className="user-orders-info-heading">
                          Ordered on
                        </div>
                        <div className="user-orders-info-data">
                          <Moment format="MMM DD, YYYY">
                            {order.createdAt}
                          </Moment>
                        </div>
                      </div>
                      <div className="user-orders-info">
                        <div className="user-orders-info-heading">
                          Total Bill
                        </div>
                        <div className="user-orders-info-data d-flex">
                          <Icon icon={currencyBdt} />
                          <div>{order.totalPrice}</div>
                        </div>
                      </div>
                      {order.deliveryTime !== 0 ? (
                        <div className="user-orders-info">
                          <div className="user-orders-info-heading">
                            Will be delivered by
                          </div>
                          <div className="user-orders-info-data">
                            <Moment
                              add={{ hours: order.deliveryTime }}
                              format="MMM DD, YYYY"
                            >
                              {order.createdAt}
                            </Moment>
                          </div>
                        </div>
                      ) : order.shipping.district === 'Dhaka' ? (
                        <div className="user-orders-info">
                          <div className="user-orders-info-heading">
                            Will be delivered by
                          </div>
                          <div className="user-orders-info-data">
                            <Moment add={{ hours: 48 }} format="MMM DD, YYYY">
                              {order.createdAt}
                            </Moment>
                          </div>
                        </div>
                      ) : (
                        <div className="user-orders-info">
                          <div className="user-orders-info-heading">
                            Will be delivered between
                          </div>
                          <div className="user-orders-info-data">
                            <Moment add={{ days: 3 }} format="MMM DD, YYYY">
                              {order.createdAt}
                            </Moment>{' '}
                            &{' '}
                            <Moment add={{ days: 5 }} format="MMM DD, YYYY">
                              {order.createdAt}
                            </Moment>
                          </div>
                        </div>
                      )}
                      {/* <div className="user-orders-info">
                        <div className="user-orders-info-heading">Discount</div>
                        <div className="user-orders-info-data">
                          {order.discountPrice}
                        </div>
                      </div> */}
                    </div>
                    <div>
                      <Button
                        onClick={() => openEditModal(order)}
                        style={{ width: '18rem' }}
                        className="user-orders-cancel-order-button"
                      >
                        Edit Order
                      </Button>
                      <Button
                        onClick={() => confirmModalHandler(order._id)}
                        style={{ width: '21rem' }}
                        className="user-orders-view-details-button"
                      >
                        Authorize Order
                      </Button>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="admin-order-items" style={{ width: '40%' }}>
                      <div className="admin-order-items-heading">
                        Order Items
                      </div>
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>SL</th>
                            <th>Name</th>
                            <th>Net Wt.</th>
                            <th>Price</th>
                            <th>Qty</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.orderItems.map((item, index) => (
                            <tr key={item._id}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.netWeight}</td>
                              <td>{item.price}</td>
                              <td>{item.qty}</td>
                            </tr>
                          ))}
                          <tr>
                            <td colspan="2">Grand Total</td>
                            <td>{order.itemsPrice}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td colspan="2">Discount</td>
                            <td>{order.discountPrice}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td colspan="2">Shipping Fee</td>
                            <td>{order.shippingPrice}</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td colspan="2">Advance Payment</td>
                            <td>NULL</td>
                            <td></td>
                          </tr>
                          <tr>
                            <td colspan="2">To Be Paid</td>
                            <td>{order.totalPrice}</td>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="admin-order-items" style={{ width: '30%' }}>
                      <div className="admin-order-items-heading">User Info</div>
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <td>{order.userName}</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>Mobile No.</th>
                            {order.shipping.mobileNumber != null ? (
                              <>
                                <td>{`${order.userCountryCode} ${order.shipping.mobileNumber}`}</td>
                              </>
                            ) : (
                              <>
                                <td>{`${order.userCountryCode} ${order.userMobileNumber}`}</td>
                              </>
                            )}
                          </tr>
                          <tr>
                            <th>Email</th>
                            <td>{order.userEmail}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="admin-order-items" style={{ width: '30%' }}>
                      <div className="admin-order-items-heading">
                        Delivery Address
                      </div>
                      <table className="table table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>House No.</th>
                            <td>{order.shipping.houseNo}</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>Road No. / Road Name</th>
                            <td>{order.shipping.roadNo}</td>
                          </tr>
                          <tr>
                            <th>Nearby Landmark</th>
                            <td>{order.shipping.landmark}</td>
                          </tr>
                          <tr>
                            <th>Area</th>
                            <td>{order.shipping.area}</td>
                          </tr>
                          {order.shipping.district === 'Dhaka' && (
                            <tr>
                              <th>Zone Name</th>
                              <td>{order.shipping.zoneName}</td>
                            </tr>
                          )}
                          {order.shipping.district === 'Dhaka' && (
                            <tr>
                              <th>Zone Number</th>
                              <td>{order.shipping.zoneNumber}</td>
                            </tr>
                          )}
                          <tr>
                            <th>District</th>
                            <td>{order.shipping.district}</td>
                          </tr>
                          <tr>
                            <th>Division</th>
                            <td>{order.shipping.division}</td>
                          </tr>
                          <tr>
                            <th>Postal Code</th>
                            <td>{order.shipping.postalCode}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {order.instruction !== 'None' && (
                    <div className="admin-order-instruction">
                      <b>Instruction: </b>
                      {order.instruction}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PersonalPendingOrdersScreen;
