import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPartialOrder,
  editOrderPrice,
  editSplitOrderItems,
  listCallCenterBossOrders,
} from "../../actions/orderActions";
import Header from "../../components/Header";
import Moment from "react-moment";
import CallCenterBossSidebar from "../../components/CallCenterBossSidebar";
import { listCallCenterGuys } from "../../actions/employeeActions";
import { FiX } from "react-icons/fi";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";
import { Button, Modal } from "react-bootstrap";
import { getPrice } from "../../actions/priceActions";

function AuthorizedOrdersScreen(props) {
  const [orderId, setOrderId] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const [newOrderNumber, setNewOrderNumber] = useState("");
  const [itemquantity, setquantity] = useState([]);
  const [originalitemquantity, setoriginalitemquantity] = useState(0);
  const [orginalSplitArray, setorginalSplitArray] = useState([]);
  // const [newSplitArray, setnewSplitArray] = useState([]);

  const [shippingPrice, setShippingPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

  const [district, setDistrict] = useState("");
  const [orderPromoCode, setOrderPromoCode] = useState({});
  const [productDiscounts, setProductDiscounts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [partialOrderItems, setPartialOrderItems] = useState([]);
  const [splitModalVisible, setSplitModalVisible] = useState(false);
  // const [selectcounter, setSelectcounter] = useState(0);

  const orderCallCenterBossList = useSelector(
    (state) => state.orderCallCenterBossList
  );
  const { loading, orders, error } = orderCallCenterBossList;

  const callCenterGuysList = useSelector((state) => state.callCenterGuysList);
  const {
    loading: loadingCallCenterGuysList,
    callCenterGuys,
    error: errorCallCenterGuysList,
  } = callCenterGuysList;

  const orderPriceEdit = useSelector((state) => state.orderPriceEdit);
  const { success: orderEditSuccess } = orderPriceEdit;

  const orderPartialCreate = useSelector((state) => state.orderPartialCreate);
  const { success: orderPartialCreateSuccess } = orderPartialCreate;

  const priceGet = useSelector((state) => state.priceGet);
  const { price } = priceGet;
  let finalqty;
  const [callCenterGuy, setCallCenterGuy] = useState("");

  const dispatch = useDispatch();
  let abc = [];
  let items = [];
  let updateOriginalArray;

  useEffect(() => {}, [itemquantity]);
  useEffect(() => {
    if (orderPartialCreateSuccess) {
      setSplitModalVisible(false);
    }
    if (orderEditSuccess) {
      closeModal();
    }
    dispatch(getPrice());
    dispatch(listCallCenterGuys());
    dispatch(
      listCallCenterBossOrders({
        isAssignedCallCenterGuy: true,
        isAuthorized: true,
        isProcessed: false,
        isOutForDelivery: false,
        isDelivered: false,
        isCancelled: false,
        isAssignedFeedbackGuy: false,
        callCenterGuy: callCenterGuy,
      })
    );
    return () => {
      //
    };
  }, [callCenterGuy, orderEditSuccess, orderPartialCreateSuccess]);

  function calculateBill(orderItems) {
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
      // for (const item of orderItems) {
      //   if (item.netWeight.toLowerCase().indexOf("gm") !== -1) {
      //     var weight = item.netWeight.split(" ").map((wt) => wt.trim());
      //     totalWeight = totalWeight + Number(weight[0]) * item.qty;
      //   } else if (item.netWeight.toLowerCase().indexOf("kg") !== -1) {
      //     var weight = item.netWeight.split(" ").map((wt) => wt.trim());
      //     totalWeight = totalWeight + Number(weight[0]) * 1000 * item.qty;
      //   } else if (item.netWeight.toLowerCase().indexOf("ml") !== -1) {
      //     var weight = item.netWeight.split(" ").map((wt) => wt.trim());
      //     totalWeight = totalWeight + Number(weight[0]) * item.qty;
      //   } else if (item.netWeight.toLowerCase().indexOf("lit") !== -1) {
      //     var weight = item.netWeight.split(" ").map((wt) => wt.trim());
      //     totalWeight = totalWeight + Number(weight[0]) * 1000 * item.qty;
      //   }
      // }

      var deliveryCharges = [];

      if (district === "Dhaka") {
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
            var discount = (orderPromoCode.value * localItemsPrice) / 100;
            if (
              discount > orderPromoCode.maxDiscount &&
              orderPromoCode.maxDiscount !== 0
            ) {
              localDiscountPrice = orderPromoCode.maxDiscount;
            } else {
              localDiscountPrice = discount;
            }
          } else if (orderPromoCode.discountType === "Flat") {
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
              discount.discountType === "Free Delivery" &&
              item.product === discount.productId
            ) {
              if (!discount.district) {
                localDiscountPrice = localDiscountPrice + localShippingPrice;
                deliveryCostSetFlag = 1;
                break;
              } else if (
                district === "Dhaka" &&
                discount.district === "Inside Dhaka"
              ) {
                localDiscountPrice = localDiscountPrice + localShippingPrice;
                deliveryCostSetFlag = 1;
                break;
              } else if (
                district !== "Dhaka" &&
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

      // Setting Delivery Time
      if (productDiscounts && productDiscounts.length > 0) {
        var minDeliveryTime = 1000;
        for (const item of orderItems) {
          for (const discount of productDiscounts) {
            if (
              discount.discountType === "Delivery Time" &&
              item.product === discount.productId &&
              discount.value < minDeliveryTime
            ) {
              if (!discount.district) {
                minDeliveryTime = discount.value;
              } else if (
                district === "Dhaka" &&
                discount.district === "Inside Dhaka"
              ) {
                minDeliveryTime = discount.value;
              } else if (
                district !== "Dhaka" &&
                discount.district === "Outside Dhaka"
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

  const orderItemsEditHandler = (orderItems) => {
    orderItems.map((x) => {
      itemquantity.map((y) => {
        if (y.id == x._id) {
          x.qty = y.originalqty - y.newqty;
        }
      });
    });

    const [
      itemsPrice,
      shippingPrice,
      taxPrice,
      discountPrice,
      totalPrice,
      deliveryTime,
    ] = calculateBill(orderItems);
    dispatch(
      editSplitOrderItems({
        orderId: orderId,
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

  const partialOrderItemsHandler = (checked, orderItem) => {
    items = partialOrderItems;

    if (checked == true) {
      items.push(orderItem);

      abc = orginalSplitArray.map((v) => {
        if (orderItem._id == v._id) {
          // v.qty = v.qty - itemquantity;
        }
        return v;
      });
    }
    if (checked !== true) {
      items.pop(orderItem);
    }

    // else {
    //   for (const index in items) {
    //     if (items[index]._id.toString() === orderItem._id.toString()) {
    //       items.splice(index, 1);
    //     }
    //   }
    // }

    setPartialOrderItems(items);
  };

  const splitHandler = (e) => {
    let abcappend = [];

    let abcnew = abc.map((old) => {
      itemquantity.map((newPrice) => {
        if (old._id == newPrice.id) {
          old.qty = newPrice.newqty;
        }
      });
      abcappend = [...abcappend, old];

      return abcappend;
    });

    updateOriginalArray = abcnew[abcnew.length - 1];

    e.preventDefault();

    var oldOrderItems = [];

    for (const item of orderItems) {
      const found = partialOrderItems.find(function (element) {
        return element._id.toString() === item._id.toString();
      });
      if (found) {
        oldOrderItems.push(item);
      }
    }
    setTimeout(() => {
      partialOrderItems.map((x) => {
        itemquantity.map((y) => {
          if (y.id == x._id) {
            x.qty = y.newqty;
          }
        });
      });

      let newOrderNo;
      newOrderNo = `${orderNumber}_1`;
      const [
        itemsPrice,
        shippingPrice,
        taxPrice,
        discountPrice,
        totalPrice,
        deliveryTime,
      ] = calculateBill(partialOrderItems);
      setNewOrderNumber(`${orderNumber}_1`);
      dispatch(
        createPartialOrder({
          orderId: orderId,
          orderNumber: newOrderNo,
          quantity: itemquantity,
          orderItems: partialOrderItems,
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          discountPrice: discountPrice,
          totalPrice: totalPrice,
          deliveryTime: deliveryTime,
          finalqty: finalqty,
        })
      );
    }, 3000);

    setPartialOrderItems([]);
    orderItemsEditHandler(updateOriginalArray);
    setSplitModalVisible(false);
    abcappend = [];
  };

  const orderEditHandler = (e) => {
    e.preventDefault();
    dispatch(
      editOrderPrice({
        orderId: orderId,
        shippingPrice: shippingPrice,
        discountPrice: discountPrice,
      })
    );
  };

  const openEditModal = (order) => {
    setOrderId(order._id);
    setShippingPrice(order.shippingPrice);
    setDiscountPrice(order.discountPrice);
    openModal();
  };

  const openModal = () => {
    document.querySelector(".admin-modal-background").classList.add("open");
  };

  const closeModal = () => {
    document.querySelector(".admin-modal-background").classList.remove("open");
  };

  const runCallback = (cb) => {
    return cb();
  };

  const openSplitModalFunction = (order) => {
    let ord = order.orderItems;

    order.orderItems.map((x) => {
      if (x.qty > 1 || order.orderItems.length > 1) {
        // openSplitModal(true);
        setorginalSplitArray(ord);
        setOrderId(order._id);
        setOrderNumber(order.orderNumber);
        setOrderItems(order.orderItems);
        setDistrict(order.shipping.district);
        setOrderPromoCode(order.promoCode);
        setProductDiscounts(order.productDiscounts);
        setSplitModalVisible(true);
      }
    });
  };

  return (
    <div className="grid">
      <div className="grid-header">
        <Header></Header>
      </div>

      <Modal
        show={splitModalVisible}
        onHide={() => {
          setSplitModalVisible(false);
          items = [];
        }}
        centered
        dialogClassName="modal-35w"
      >
        <Modal.Body>
          <div style={{ fontSize: "2.2rem" }} className="ml-1 mt-3 mb-4">
            <b>Choose the items of partial order</b>
          </div>
          <form onSubmit={splitHandler} className="pt-2">
            {orderItems.map((item) => (
              <>
                <div key={item._id} className="d-flex mb-3">
                  <input
                    style={{ cursor: "pointer", marginTop: ".3rem" }}
                    type="checkbox"
                    name={item.name}
                    onChange={(e) =>
                      partialOrderItemsHandler(e.target.checked, item)
                    }
                  ></input>
                  <label
                    style={{ fontSize: "1.8rem" }}
                    className="ml-3"
                  >{`${item.name} (${item.netWeight})`}</label>
                </div>
                <select
                  onChange={(e) => {
                    setoriginalitemquantity(item.qty);
                    let xyz = e.target.value;
                    setquantity((itemquantity) => [
                      ...itemquantity,
                      {
                        id: item._id,
                        originalqty: item.qty,
                        newqty: Number(xyz),
                      },
                    ]);
                  }}
                  className="form-control customSelect"
                >
                  {runCallback(() => {
                    const row = [];
                    for (var i = 1; i <= item.qty; ++i) {
                      row.push(
                        <option value={i} key={i}>
                          {i}
                        </option>
                      );
                    }
                    return row;
                  })}
                </select>
              </>
            ))}
            <div className="d-flex justify-content-center">
              <Button
                className="admin-modal-form-submit"
                style={{ marginBottom: "1.5rem" }}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <div className="admin-modal-background">
        <div className="admin-modal" style={{ width: "45%" }}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="admin-modal-heading">Edit Order</div>
            <Button onClick={closeModal} className="admin-modal-close-button">
              <FiX></FiX>
            </Button>
          </div>
          <form onSubmit={orderEditHandler} className="admin-order-edit-form">
            <div className="admin-order-edit-form-div">
              <label className="admin-order-edit-form-label">
                Shipping Price
              </label>
              <input
                autoComplete="off"
                value={shippingPrice}
                onChange={(e) => setShippingPrice(e.target.value)}
                className="admin-order-edit-form-input"
              ></input>
            </div>
            <div className="admin-order-edit-form-div">
              <label className="admin-order-edit-form-label">
                Discount Price
              </label>
              <input
                autoComplete="off"
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
                className="admin-order-edit-form-input"
              ></input>
            </div>
            <div className="d-flex justify-content-center">
              <Button
                className="admin-modal-form-submit"
                style={{ marginBottom: "1.5rem" }}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="main">
        <div className="d-flex">
          <CallCenterBossSidebar value={"Authorized"}></CallCenterBossSidebar>
          <div className="admin-content" style={{ paddingTop: "1rem" }}>
            {loading ? (
              <div></div>
            ) : error ? (
              <div>{error.message}</div>
            ) : (
              <>
                <div className="admin-header">
                  <div className="admin-header-text">{`Authorized Orders (${orders.length})`}</div>
                  <div className="d-flex align-items-center">
                    <select
                      className="admin-reassign-select"
                      value={callCenterGuy}
                      onChange={(e) => setCallCenterGuy(e.target.value)}
                    >
                      <option value="">Select Call Center Guy</option>
                      {loadingCallCenterGuysList ? (
                        <div></div>
                      ) : errorCallCenterGuysList ? (
                        <div>{error.message}</div>
                      ) : (
                        callCenterGuys.map((callCenterGuy) => (
                          <option
                            key={callCenterGuy.id}
                            value={callCenterGuy.id}
                          >
                            {callCenterGuy.username}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>
                <div className="admin-orders">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="admin-orders-content-box"
                      style={{ width: "100%" }}
                    >
                      <div className="d-flex justify-content-between">
                        <div className="d-flex">
                          <div className="user-orders-info">
                            <div className="user-orders-info-heading">
                              Order ID
                            </div>
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
                        </div>
                        <div>
                          <Button
                            onClick={() => openSplitModalFunction(order)}
                            style={{ width: "18rem" }}
                            className="user-orders-cancel-order-button"
                          >
                            Split Order
                          </Button>
                          <Button
                            onClick={() => openEditModal(order)}
                            style={{ width: "18rem" }}
                            className="user-orders-view-details-button"
                          >
                            Edit Order
                          </Button>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div
                          className="admin-order-items"
                          style={{ width: "49%" }}
                        >
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
                            </tbody>
                          </table>
                        </div>
                        <div
                          className="admin-order-items"
                          style={{ width: "50%" }}
                        >
                          <div className="admin-order-items-heading">
                            User Info
                          </div>
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
                      </div>
                      {order.instruction !== "None" && (
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
      </div>
    </div>
  );
}

export default AuthorizedOrdersScreen;
