import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  assignFeedbackGuy,
  listCallCenterBossOrders,
} from "../../actions/orderActions";
import Header from "../../components/Header";
import Moment from "react-moment";
import { Button, Modal } from "react-bootstrap";
import CallCenterBossSidebar from "../../components/CallCenterBossSidebar";
import { FiX } from "react-icons/fi";
import { listCallCenterGuys } from "../../actions/employeeActions";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";

function CancelledOrdersScreen(props) {
  const [orderStartNumber, setOrderStartNumber] = useState(0);
  const [orderEndNumber, setOrderEndNumber] = useState(0);
  const [callCenterGuy, setCallCenterGuy] = useState("");
  const [assignModalVisible, setAssignModalVisible] = useState(false);

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

  const orderFeedbackAssign = useSelector((state) => state.orderFeedbackAssign);
  const { success } = orderFeedbackAssign;

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setAssignModalVisible(false);
    }
    dispatch(listCallCenterGuys());
    dispatch(
      listCallCenterBossOrders({
        isCancelled: true,
        isAssignedFeedbackGuy: false,
      })
    );
    return () => {
      //
    };
  }, [success]);

  const submitHandler = (e) => {
    e.preventDefault();
    for (var i = orderStartNumber - 1; i < orderEndNumber; i++) {
      dispatch(assignFeedbackGuy(orders[i]._id, callCenterGuy));
    }
  };

  return (
    <div className="grid">
      <div className="grid-header">
        <Header></Header>
      </div>

      <Modal
        show={assignModalVisible}
        onHide={() => setAssignModalVisible(false)}
        dialogClassName="modal-35w"
        centered
      >
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div className="admin-uploads-modal-heading">
              Enter Assigning Details
            </div>
            <Button
              className="admin-uploads-modal-button"
              onClick={() => setAssignModalVisible(false)}
            >
              <FiX></FiX>
            </Button>
          </div>
          <form className="admin-uploads-form" onSubmit={submitHandler}>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100%", marginBottom: "2rem" }}
            >
              <label className="admin-uploads-label">Start Number</label>
              <input
                autoComplete="off"
                type="text"
                name="ID"
                value={orderStartNumber}
                onChange={(e) => setOrderStartNumber(e.target.value)}
                className="admin-uploads-input"
              ></input>
            </div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100%", marginBottom: "2rem" }}
            >
              <label className="admin-uploads-label">End Number</label>
              <input
                autoComplete="off"
                type="text"
                name="name"
                value={orderEndNumber}
                onChange={(e) => setOrderEndNumber(e.target.value)}
                className="admin-uploads-input"
              ></input>
            </div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100%" }}
            >
              <label className="admin-uploads-label">Call Center Guy</label>
              <select
                name="category"
                value={callCenterGuy}
                onChange={(e) => setCallCenterGuy(e.target.value)}
                className="admin-uploads-select"
              >
                <option value="">Select Call Center Guy</option>
                {loadingCallCenterGuysList ? (
                  <div></div>
                ) : errorCallCenterGuysList ? (
                  <div>{errorCallCenterGuysList.message}</div>
                ) : (
                  callCenterGuys.map((callCenterGuy) => (
                    <option value={callCenterGuy.id}>
                      {callCenterGuy.username}
                    </option>
                  ))
                )}
              </select>
            </div>
            <Button type="submit" className="admin-uploads-submit">
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <div className="main">
        <div className="d-flex">
          <CallCenterBossSidebar value={"Cancelled"}></CallCenterBossSidebar>
          <div className="admin-content" style={{ paddingTop: "1rem" }}>
            {loading ? (
              <div></div>
            ) : error ? (
              <div>{error.message}</div>
            ) : (
              <>
                <div className="admin-header">
                  <div className="admin-header-text">{`Cancelled Orders (${orders.length})`}</div>
                  <div className="d-flex align-items-center">
                    <Button
                      onClick={() => setAssignModalVisible(true)}
                      className="admin-header-button"
                    >
                      Assign Orders For Feedback
                    </Button>
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

export default CancelledOrdersScreen;
