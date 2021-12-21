import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listCallCenterBossOrders } from "../../actions/orderActions";
import Header from "../../components/Header";
import Moment from "react-moment";
import CallCenterBossSidebar from "../../components/CallCenterBossSidebar";
import { listCallCenterGuys } from "../../actions/employeeActions";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";

function FeedbackOrdersScreen(props) {
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

  const [callCenterGuy, setCallCenterGuy] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listCallCenterGuys());
    dispatch(
      listCallCenterBossOrders({
        isAssignedFeedbackGuy: true,
        hasFeedback: false,
        feedbackGuy: callCenterGuy,
      })
    );
    return () => {
      //
    };
  }, [callCenterGuy]);

  return (
    <div className="grid">
      <div className="grid-header">
        <Header></Header>
      </div>

      <div className="main">
        <div className="d-flex">
          <CallCenterBossSidebar value={"Feedback"}></CallCenterBossSidebar>
          <div className="admin-content" style={{ paddingTop: "1rem" }}>
            {loading ? (
              <div></div>
            ) : error ? (
              <div>{error.message}</div>
            ) : (
              <>
                <div className="admin-header">
                  <div className="admin-header-text">{`Feedback Orders (${orders.length})`}</div>
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
                          <div className="user-orders-info">
                            <div className="user-orders-info-heading">
                              Status
                            </div>
                            {order.isCancelled ? (
                              <div className="user-orders-info-data">
                                Cancelled
                              </div>
                            ) : (
                              <div className="user-orders-info-data">
                                Pending
                              </div>
                            )}
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
                      {order.hasFeedback ? <div>
                        <div className="admin-order-instruction"> <b>Feedback Rating: </b>{order.feedbackRating}</div>
                        <div className="admin-order-instruction"> <b>Feedback Comment: </b>{order.feedbackComment}</div>
                      </div> : <></>}
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

export default FeedbackOrdersScreen;
