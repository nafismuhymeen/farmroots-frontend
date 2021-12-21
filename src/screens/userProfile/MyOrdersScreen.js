import React, { useEffect, useState } from "react";
import { Button, Container, Modal, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import UserSidebar from "../../components/UserSidebar";
import { HiCheckCircle } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import OrderDetails from "../../components/OrderDetails";
import { cancelOrder, listMyOrders } from "../../actions/orderActions";
import Moment from "react-moment";
import { addToBuyNow, emptyBuyNow, addToCart } from "../../actions/cartActions";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";
import { FiXCircle } from "react-icons/fi";

function MyOrdersScreen(props) {
  const [orderId, setOrderId] = useState("");
  const [completeOrdersVisible, setCompleteOrdersVisible] = useState(false);

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [orderCount, setorderCount] = useState(0);

  const myOrderList = useSelector((state) => state.myOrderList);
  const { loading, orders, error } = myOrderList;

  const orderCancel = useSelector((state) => state.orderCancel);
  const { success: orderCancelSuccess } = orderCancel;

  const openOrderDetailsModal = (orderId) => {
    setOrderId(orderId);
    document
      .querySelector(".order-details-modal-background")
      .classList.add("open");
    document.querySelector(".order-details-modal").classList.add("open");
  };

  console.log("orderorderorderorder", orders);

  function getPendingOrdersCount() {
    var count = 0;

    for (const order of orders) {
      if (
        order.hasFeedback === false &&
        order.isCancelled === false &&
        order.isDelivered === false
      ) {
        count = count + 1;
      }
    }
    return count;
  }

  function getPendingOrders() {
    const pendingOrders = orders.filter((order) => {
      return (
        order.hasFeedback === false &&
        order.isCancelled === false &&
        order.isDelivered === false
      );
    });

    return pendingOrders;
  }

  function getCompletedOrders() {
    const completedOrders = orders.filter((order) => {
      return (
        order.hasFeedback === true ||
        order.isCancelled === true ||
        order.isDelivered === true
      );
    });

    return completedOrders;
  }

  const openCart = () => {
    document.querySelector(".cart").classList.add("open");
  };

  const reorderHandler = (order) => {
    dispatch(emptyBuyNow());
    // for (const item of orderItems) {
    //   dispatch(addToBuyNow(item.product, item.qty));
    //   dispatch(addToCart(item.product, item.qty));
    // }
    order.orderItems.map((x) => {
      dispatch(addToCart(x.product, x.qty));
    });

    props.history.push("/checkout");
  };

  const allitemReorder = (order) => {
    order.orderItems.map((x) => {
      dispatch(addToCart(x.product, 1));
    });
    openCart();
  };
  const confirmModalHandler = (orderId) => {
    setOrderId(orderId);
    setConfirmModalVisible(true);
  };

  const cancelOrderHandler = () => {
    dispatch(cancelOrder(orderId));
    setConfirmModalVisible(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listMyOrders());
    return () => {
      //
    };
  }, [orderCancelSuccess]);
  // setTimeout(() => {
  //   console.log("orders", getPendingOrders());
  // }, 3000);

  return (
    <>
      <Header></Header>

      <OrderDetails value={orderId}></OrderDetails>

      <Modal
        show={confirmModalVisible}
        onHide={() => setConfirmModalVisible(false)}
        centered
        dialogClassName=""
      >
        <Modal.Body>
          <div className="confirm-container">
            <div className="confirm-no-icon">
              <FiXCircle></FiXCircle>
            </div>
            <div className="confirm-heading">Are you sure?</div>
            <div className="confirm-text">
              Do you really want to cancel this order? This process cannot be
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
                onClick={cancelOrderHandler}
                className="confirm-yes-button"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Container fluid={true}>
        {loading ? (
          <div></div>
        ) : error ? (
          <div>{error.message}</div>
        ) : (
          <Row>
            <Col sm="3">
              <UserSidebar value={"my-orders"}></UserSidebar>
            </Col>
            <Col sm="9">
              <>
                {completeOrdersVisible === false ? (
                  <>
                    <Row className="d-flex">
                      <Button className="user-orders-heading">{`Pending (${getPendingOrdersCount()})`}</Button>

                      <Button
                        onClick={() => setCompleteOrdersVisible(true)}
                        className="user-orders-heading-disabled"
                      >
                        Completed
                      </Button>
                    </Row>
                    <Row>
                      <hr className="user-orders-horizontal-line"></hr>
                    </Row>
                    {getPendingOrders().length === 0 && (
                      <Row className="user-no-orders-text">
                        No orders pending
                      </Row>
                    )}
                    {getPendingOrders()
                      .slice(0)
                      .reverse()
                      .map((order) => (
                        <Container
                          fluid={true}
                          key={order._id}
                          className="user-orders-content-box"
                        >
                          <Row className="d-flex justify-content-between">
                            <div className="d-flex gridimportant">
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
                              ) : order.shipping.district === "Dhaka" ? (
                                <div className="user-orders-info">
                                  <div className="user-orders-info-heading">
                                    Will be delivered by
                                  </div>
                                  <div className="user-orders-info-data">
                                    <Moment
                                      add={{ hours: 48 }}
                                      format="MMM DD, YYYY"
                                    >
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
                                    <Moment
                                      add={{ days: 3 }}
                                      format="MMM DD, YYYY"
                                    >
                                      {order.createdAt}
                                    </Moment>
                                    &
                                    <Moment
                                      add={{ days: 5 }}
                                      format="MMM DD, YYYY"
                                    >
                                      {order.createdAt}
                                    </Moment>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div class="marginleft">
                              {order.isAuthorized ? (
                                <></>
                              ) : (
                                <Button
                                  onClick={() => confirmModalHandler(order._id)}
                                  className="user-orders-cancel-order-button"
                                >
                                  Cancel Order
                                </Button>
                              )}

                              {/* <Button
                              onClick={() => confirmModalHandler(order._id)}
                              className="user-orders-cancel-order-button"
                            >
                              Cancel Order
                            </Button> */}
                              <Button
                                onClick={() => openOrderDetailsModal(order._id)}
                                className="user-orders-view-details-button"
                              >
                                View Details
                              </Button>
                            </div>
                          </Row>
                          <Row className="user-orders-status-bar">
                            {/* Placed */}
                            <div className="positionRel">
                              <div className="user-orders-status-complete-icon">
                                <div className="user-orders-status-check-icon">
                                  <HiCheckCircle></HiCheckCircle>
                                </div>
                              </div>
                              <div className="positionAbsol widthmax">
                                Order Placed
                              </div>
                            </div>

                            {order.isAuthorized === true ? (
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#00632c",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                ></div>
                              </div>
                            ) : (
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#00632c",
                                    height: "100%",
                                    width: "50%",
                                  }}
                                ></div>
                              </div>
                            )}
                            {/* Authorized */}
                            {order.isAuthorized === true ? (
                              <div className="positionRel">
                                <div className="user-orders-status-complete-icon">
                                  <div className="user-orders-status-check-icon">
                                    <HiCheckCircle></HiCheckCircle>
                                  </div>
                                </div>
                                <div className="positionAbsol widthmax">
                                  Order Authorized
                                </div>
                              </div>
                            ) : (
                              <div className="positionRel">
                                <div className="user-orders-status-pending-icon"></div>
                                <div className="positionAbsol widthmax">
                                  Order Authorized
                                </div>
                              </div>
                            )}
                            {order.isAuthorized === false ? (
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#00632c",
                                    height: "100%",
                                    width: "0%",
                                  }}
                                ></div>
                              </div>
                            ) : order.isProcessed === true ? (
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#00632c",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                ></div>
                              </div>
                            ) : (
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#00632c",
                                    height: "100%",
                                    width: "50%",
                                  }}
                                ></div>
                              </div>
                            )}
                            {/* Prepared */}
                            {order.isProcessed === true ? (
                              <div className="positionRel">
                                <div className="user-orders-status-complete-icon">
                                  <div className="user-orders-status-check-icon">
                                    <HiCheckCircle></HiCheckCircle>
                                  </div>
                                </div>
                                <div className="positionAbsol widthmax">
                                  Order Processed
                                </div>
                              </div>
                            ) : (
                              <div className="positionRel">
                                <div className="user-orders-status-pending-icon"></div>
                                <div className="positionAbsol widthmax">
                                  Order Processed
                                </div>
                              </div>
                            )}
                            {order.isProcessed === false ? (
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#00632c",
                                    height: "100%",
                                    width: "0%",
                                  }}
                                ></div>
                              </div>
                            ) : order.isOutForDelivery === true ? (
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#00632c",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                ></div>
                              </div>
                            ) : (
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#00632c",
                                    height: "100%",
                                    width: "50%",
                                  }}
                                ></div>
                              </div>
                            )}
                            {/* Our For Delivery */}
                            {order.isOutForDelivery === true ? (
                              <div className="positionRel">
                                <div className="user-orders-status-complete-icon">
                                  <div className="user-orders-status-check-icon">
                                    <HiCheckCircle></HiCheckCircle>
                                  </div>
                                </div>
                                <div
                                  className="positionAbsol widthmax"
                                  style={{ width: "auto" }}
                                >
                                  Order Out For Delivery
                                </div>
                              </div>
                            ) : (
                              <div className="positionRel">
                                <div className="user-orders-status-pending-icon"></div>
                                <div
                                  className="positionAbsol widthmax"
                                  style={{ width: "auto" }}
                                >
                                  Order Out For Delivery
                                </div>
                              </div>
                            )}
                            {order.isOutForDelivery === true ? (
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#00632c",
                                    height: "100%",
                                    width: "50%",
                                  }}
                                ></div>
                              </div>
                            ) : (
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#00632c",
                                    height: "100%",
                                    width: "0%",
                                  }}
                                ></div>
                              </div>
                            )}
                            {/* Delivered */}
                            <div className="positionRel">
                              <div className="user-orders-status-pending-icon"></div>
                              <div
                                className="positionAbsol widthmax "
                                style={{ width: "auto" }}
                              >
                                Order Delivered
                              </div>
                            </div>
                          </Row>
                          {/* <Row className="user-orders-status-bar-content">
                            <div className="user-orders-status-placed-text">
                              Order Placed
                            </div>
                            <div className="user-orders-status-line2">
                              <div></div>
                            </div>
                            <div className="user-orders-status-authorized-text">
                              Order Authorized
                            </div>
                            <div className="user-orders-status-line2">
                              <div></div>
                            </div>
                            <div className="user-orders-status-prepared-text">
                              Order Processed
                            </div>
                            <div className="user-orders-status-line2">
                              <div></div>
                            </div>
                            <div className="user-orders-status-delivery-text">
                              Order Out For Delivery
                            </div>
                            <div className="user-orders-status-line2">
                              <div></div>
                            </div>
                            <div className="user-orders-status-delivered-text">
                              Order Delivered
                            </div>
                          </Row> */}
                          <Row className="user-orders-order-items">
                            {order.orderItems.map((orderItem) => (
                              <Col
                                xs="12"
                                sm="6"
                                key={orderItem.product}
                                className="user-orders-order-item"
                              >
                                <img
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "https://farmroot.fourbrick.in/default.jpg";
                                  }}
                                  src={
                                    process.env.REACT_APP_IMG_BASEURL +
                                    orderItem.image
                                  }
                                  alt="Product Image"
                                  className="user-orders-order-item-image"
                                ></img>

                                <div className="user-orders-order-item-info">
                                  <div className="user-orders-order-item-name">
                                    {orderItem.name}
                                  </div>
                                  <div className="user-orders-order-item-price">
                                    <div className="mr-2 mb-1">Price: </div>
                                    <div className="d-flex align-items-start">
                                      <Icon icon={currencyBdt} />
                                      <div>
                                        <b>{orderItem.price}</b>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="user-orders-order-item-price">{`Qty: ${orderItem.qty}`}</div>
                                  <div className="user-orders-order-item-price">{`Weight: ${orderItem.netWeight}`}</div>
                                </div>
                              </Col>
                            ))}
                          </Row>
                        </Container>
                      ))}
                  </>
                ) : (
                  <div className="user-orders">
                    <div className="d-flex">
                      <Button
                        onClick={() => setCompleteOrdersVisible(false)}
                        className="user-orders-heading-disabled"
                      >{`Pending (${getPendingOrdersCount()})`}</Button>
                      <Button className="user-orders-heading">Completed</Button>
                    </div>
                    <div>
                      <hr className="user-orders-horizontal-line"></hr>
                    </div>
                    {getCompletedOrders().length === 0 && (
                      <div className="user-no-orders-text">
                        You haven't made any orders
                      </div>
                    )}
                    {getCompletedOrders()
                      .slice(0)
                      .reverse()
                      .map((order) => (
                        <div
                          key={order._id}
                          className="user-orders-content-box"
                        >
                          <Row className="d-flex justify-content-between">
                            <div className="d-flex gridimportant">
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
                              {order.isCancelled === true ? (
                                <div className="user-orders-info">
                                  <div className="user-orders-info-heading">
                                    Cancelled on
                                  </div>
                                  <div className="user-orders-info-data">
                                    <Moment format="MMM DD, YYYY">
                                      {order.cancelledAt}
                                    </Moment>
                                  </div>
                                </div>
                              ) : (
                                <div className="user-orders-info">
                                  <div className="user-orders-info-heading">
                                    Delivered on
                                  </div>
                                  <div className="user-orders-info-data">
                                    <Moment format="MMM DD, YYYY">
                                      {order.deliveredAt}
                                    </Moment>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div>
                              <Button
                                style={{ minWidth: 236 }}
                                onClick={() => allitemReorder(order)}
                                className="user-orders-cancel-order-button mr-1"
                              >
                                Add All Items to Cart
                              </Button>
                              <Button
                                onClick={() => reorderHandler(order)}
                                className="user-orders-cancel-order-button"
                              >
                                Reorder
                              </Button>
                              <Button
                                onClick={() => openOrderDetailsModal(order._id)}
                                className="user-orders-view-details-button"
                              >
                                View Details
                              </Button>
                            </div>
                          </Row>
                          {order.isCancelled === true ? (
                            <div className="user-orders-status-bar">
                              {/* Placed */}
                              <div className="positionRel">
                                <div className="user-orders-status-complete-icon">
                                  <div className="user-orders-status-cancel-icon">
                                    <MdCancel></MdCancel>
                                  </div>
                                </div>
                                <div className="positionAbsol widthmax">
                                  Order Placed
                                </div>
                              </div>
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#960000",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                ></div>
                              </div>
                              {/* Authorized */}
                              <div className="positionRel">
                                <div className="user-orders-status-complete-icon">
                                  <div className="user-orders-status-cancel-icon">
                                    <MdCancel></MdCancel>
                                  </div>
                                </div>
                                <div className="positionAbsol widthmax">
                                  Order Authorized
                                </div>
                              </div>
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#960000",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                ></div>
                              </div>
                              {/* Prepared */}
                              <div className="positionRel">
                                <div className="user-orders-status-complete-icon">
                                  <div className="user-orders-status-cancel-icon">
                                    <MdCancel></MdCancel>
                                  </div>
                                </div>
                                <div className="positionAbsol widthmax">
                                  Order Processed
                                </div>
                              </div>
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#960000",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                ></div>
                              </div>
                              {/* Our For Delivery */}
                              <div className="positionRel">
                                <div className="user-orders-status-complete-icon">
                                  <div className="user-orders-status-cancel-icon">
                                    <MdCancel></MdCancel>
                                  </div>
                                </div>
                                <div
                                  className="positionAbsol widthmax"
                                  style={{ width: "auto" }}
                                >
                                  Order Out For Delivery
                                </div>
                              </div>
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#960000",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                ></div>
                              </div>
                              {/* Delivered */}
                              <div className="positionRel">
                                <div className="user-orders-status-complete-icon">
                                  <div className="user-orders-status-cancel-icon">
                                    <MdCancel></MdCancel>
                                  </div>
                                </div>
                                <div
                                  className="positionAbsol widthmax"
                                  style={{ width: "auto" }}
                                >
                                  Order Delivered
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="user-orders-status-bar">
                              {/* Placed */}
                              <div className="user-orders-status-complete-icon">
                                <div className="user-orders-status-check-icon">
                                  <HiCheckCircle></HiCheckCircle>
                                </div>
                              </div>
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#00632c",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                ></div>
                              </div>
                              {/* Authorized */}
                              <div className="user-orders-status-complete-icon">
                                <div className="user-orders-status-check-icon">
                                  <HiCheckCircle></HiCheckCircle>
                                </div>
                              </div>
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#00632c",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                ></div>
                              </div>
                              {/* Prepared */}
                              <div className="user-orders-status-complete-icon">
                                <div className="user-orders-status-check-icon">
                                  <HiCheckCircle></HiCheckCircle>
                                </div>
                              </div>
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#00632c",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                ></div>
                              </div>
                              {/* Our For Delivery */}
                              <div className="user-orders-status-complete-icon">
                                <div className="user-orders-status-check-icon">
                                  <HiCheckCircle></HiCheckCircle>
                                </div>
                              </div>
                              <div className="user-orders-status-line">
                                <div
                                  style={{
                                    backgroundColor: "#00632c",
                                    height: "100%",
                                    width: "100%",
                                  }}
                                ></div>
                              </div>
                              {/* Delivered */}
                              <div className="user-orders-status-complete-icon">
                                <div className="user-orders-status-check-icon">
                                  <HiCheckCircle></HiCheckCircle>
                                </div>
                              </div>
                            </div>
                          )}
                          {/* <div className="user-orders-status-bar-content">
                            <div className="user-orders-status-placed-text">
                              Order Placed
                            </div>
                            <div className="user-orders-status-authorized-text">
                              Order Authorized
                            </div>
                            <div className="user-orders-status-prepared-text">
                              Order Processed
                            </div>
                            <div className="user-orders-status-delivery-text">
                              Order Out For Delivery
                            </div>
                            <div className="user-orders-status-delivered-text">
                              Order Delivered
                            </div>
                          </div> */}
                          <div className="user-orders-order-items">
                            {order.orderItems.map((orderItem) => (
                              <Col
                                xs="12"
                                sm="4"
                                key={orderItem.product}
                                className="user-orders-order-item"
                              >
                                <img
                                  src={
                                    process.env.REACT_APP_IMG_BASEURL +
                                    orderItem.image
                                  }
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "https://farmroot.fourbrick.in/default.jpg";
                                  }}
                                  alt="Product Image"
                                  className="user-orders-order-item-image"
                                ></img>

                                <div className="user-orders-order-item-info">
                                  <div className="user-orders-order-item-name">
                                    {orderItem.name}
                                  </div>
                                  <div className="user-orders-order-item-price">
                                    <div className="mr-2 mb-1">Price: </div>
                                    <div className="d-flex align-items-start">
                                      <Icon icon={currencyBdt} />
                                      <div>
                                        <b>{orderItem.price}</b>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="user-orders-order-item-price">{`Qty: ${orderItem.qty}`}</div>
                                </div>
                              </Col>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default MyOrdersScreen;
