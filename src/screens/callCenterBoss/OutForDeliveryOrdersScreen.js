import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editOrderPrice,
  listCallCenterBossOrders,
} from "../../actions/orderActions";
import Header from "../../components/Header";
import Moment from "react-moment";
import CallCenterBossSidebar from "../../components/CallCenterBossSidebar";
import { listCallCenterGuys } from "../../actions/employeeActions";
import { FiX } from "react-icons/fi";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";
import { Button } from "react-bootstrap";

function OutForDeliveryOrdersScreen(props) {
  const [orderId, setOrderId] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

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

  const [callCenterGuy, setCallCenterGuy] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (orderEditSuccess) {
      closeModal();
    }
    dispatch(listCallCenterGuys());
    dispatch(
      listCallCenterBossOrders({
        isAssignedCallCenterGuy: true,
        isAuthorized: true,
        isProcessed: true,
        isOutForDelivery: true,
        isDelivered: false,
        isCancelled: false,
        isAssignedFeedbackGuy: false,
        callCenterGuy: callCenterGuy,
      })
    );
    return () => {
      //
    };
  }, [callCenterGuy, orderEditSuccess]);

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

  return (
    <div className="grid">
      <div className="grid-header">
        <Header></Header>
      </div>

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
          <CallCenterBossSidebar
            value={"Out For Delivery"}
          ></CallCenterBossSidebar>
          <div className="admin-content" style={{ paddingTop: "1rem" }}>
            {loading ? (
              <div></div>
            ) : error ? (
              <div>{error.message}</div>
            ) : (
              <>
                <div className="admin-header">
                  <div className="admin-header-text">{`Out For Delivery Orders (${orders.length})`}</div>
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
                          <option value={callCenterGuy.id}>
                            {callCenterGuy.username}
                          </option>
                        ))
                      )}
                    </select>
                  </div>
                </div>
                <div className="admin-orders">
                  {orders.map((order) => (
                    <div key={order._id} className="admin-orders-content-box">
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
                        {/* <div>
                          <Button
                            onClick={() => openEditModal(order)}
                            style={{ width: "12rem" }}
                            className="user-orders-view-details-button"
                          >
                            Edit Order
                          </Button>
                        </div> */}
                      </div>
                      <div>
                        <div
                          className="admin-order-items"
                          style={{ width: "100%", marginBottom: "1.5rem" }}
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

export default OutForDeliveryOrdersScreen;
