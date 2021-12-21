import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiX } from "react-icons/fi";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { listDeliveryGuys } from "../../actions/employeeActions";
import {
  listSupplyChainOrders,
  assignDeliveryGuy,
  cancelOrderWithReason,
} from "../../actions/orderActions";
import { listZones } from "../../actions/orderDivisionActions";
import Header from "../../components/Header";
import SupplyChainSidebar from "../../components/SupplyChainSidebar";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";
import PrintInvoice from "./PrintInvoice";

function SupplyChainOutForDeliveryOrdersScreen(props) {
  const [orderStartNumber, setOrderStartNumber] = useState(0);
  const [orderEndNumber, setOrderEndNumber] = useState(0);
  const [deliveryGuy, setDeliveryGuy] = useState("");

  const [zone, setZone] = useState("");
  const [cancellationReason, setCancellationReason] = useState("");
  const [orderId, setgetOrderId] = useState("");

  const [cancelstate, setCancelState] = useState(false);
  const [reassignDeliveryGuy, setReassignDeliveryGuy] = useState("");
  const [assignModalVisible, setAssignModalVisible] = useState(false);

  const orderDeliveryGuyAssign = useSelector(
    (state) => state.orderDeliveryGuyAssign
  );
  const { success: deliveryGuyAssignSuccess } = orderDeliveryGuyAssign;

  const orderSupplyChainList = useSelector(
    (state) => state.orderSupplyChainList
  );
  const { loading, orders, error } = orderSupplyChainList;
  let ordersArr = orders;

  const deliveryGuysList = useSelector((state) => state.deliveryGuysList);
  const {
    loading: loadingDeliveryGuysList,
    deliveryGuys,
    error: errorDeliveryGuysList,
  } = deliveryGuysList;

  const zonesList = useSelector((state) => state.zonesList);
  const { loading: loadingZones, zones, error: errorZones } = zonesList;

  const dispatch = useDispatch();

  useEffect(() => {
    if (deliveryGuyAssignSuccess) {
      setAssignModalVisible(false);
    }
    dispatch(listZones());
    dispatch(listDeliveryGuys());
    dispatch(
      listSupplyChainOrders({
        isAuthorized: true,
        isProcessed: true,
        isOutForDelivery: true,
        isDelivered: false,
        isCancelled: cancelstate,
        zone: zone,
        deliveryGuy: reassignDeliveryGuy,
      })
    );
    return () => {
      //
    };
  }, [deliveryGuyAssignSuccess, zone, reassignDeliveryGuy]);

  const submitHandler = (e) => {
    e.preventDefault();
    for (var i = orderStartNumber - 1; i < orderEndNumber; i++) {
      dispatch(assignDeliveryGuy(orders[i]._id, deliveryGuy));
    }
  };

  const cancelorderFunction = (e) => {
    e.preventDefault();
    dispatch(cancelOrderWithReason({ orderId, cancellationReason }));
    window.location.reload();
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
              <label className="admin-uploads-label">Delivery Guy</label>
              <select
                name="category"
                value={deliveryGuy}
                onChange={(e) => setDeliveryGuy(e.target.value)}
                className="admin-uploads-select"
              >
                <option value="">Select Delivery Guy</option>
                {loadingDeliveryGuysList ? (
                  <div></div>
                ) : errorDeliveryGuysList ? (
                  <div>{errorDeliveryGuysList.message}</div>
                ) : (
                  deliveryGuys.map((deliveryGuy) => (
                    <option value={deliveryGuy.id}>
                      {deliveryGuy.username}
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
          <SupplyChainSidebar value={"Out For Delivery"}></SupplyChainSidebar>
          <div className="admin-content" style={{ paddingTop: "1rem" }}>
            {loading ? (
              <div></div>
            ) : error ? (
              <div>{error.message}</div>
            ) : (
              <>
                <div className="row">
                  <div className="col-sm-8">
                    <div className="admin-header-text ml-2">{`Out For Delivery Orders (${orders.length})`}</div>
                  </div>
                  <div className="col-sm-4 dflexEnd">
                    <PrintInvoice></PrintInvoice>
                  </div>
                </div>

                <div className="admin-header">
                  <div className="d-flex align-items-center">
                    <select
                      name="category"
                      value={reassignDeliveryGuy}
                      onChange={(e) => setReassignDeliveryGuy(e.target.value)}
                      className="admin-reassign-select"
                    >
                      <option value="">Select Delivery Guy</option>
                      {loadingDeliveryGuysList ? (
                        <div></div>
                      ) : errorDeliveryGuysList ? (
                        <div>{errorDeliveryGuysList.message}</div>
                      ) : (
                        deliveryGuys.map((deliveryGuy) => (
                          <option value={deliveryGuy.id}>
                            {deliveryGuy.username}
                          </option>
                        ))
                      )}
                    </select>

                    <select
                      className="admin-reassign-select"
                      value={zone}
                      onChange={(e) => setZone(e.target.value)}
                    >
                      <option value="">Select Zone </option>
                      {loadingZones ? (
                        <div></div>
                      ) : errorZones ? (
                        <div>{errorZones.message}</div>
                      ) : (
                        zones.map((zone) => (
                          <option
                            value={zone.number}
                          >{`Zone ${zone.number} - ${zone.name}`}</option>
                        ))
                      )}
                      <option value="Inside Dhaka">Inside Dhaka</option>
                      <option value="Outside Dhaka">Outside Dhaka</option>
                    </select>
                    <Button
                      onClick={() => setAssignModalVisible(true)}
                      className="admin-header-button"
                    >
                      Assign Delivery Guys
                    </Button>
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
                          <form onSubmit={cancelorderFunction}>
                            <div className="user-orders-info ml-3">
                              <div className="user-orders-info-heading">
                                Cancelled Due To
                              </div>
                              <select
                                className="admin-reassign-select"
                                onChange={(e) => {
                                  setgetOrderId(order._id);
                                  setCancellationReason(e.target.value);
                                }}
                              >
                                <option value="notCancelled">
                                  Cancellation Option{" "}
                                </option>
                                <option value="S - Didn't Receive Call">
                                  S - Didn't Receive Call
                                </option>
                                <option value="S - Wasn't Available During Delivery">
                                  S - Wasn't Available During Delivery
                                </option>
                                <option value="S - Didn't Have Enough Balance to Pay">
                                  S - Didn't Have Enough Balance to Pay
                                </option>
                                <option value="S - Payment Declined by Bank">
                                  S - Payment Declined by Bank
                                </option>
                                <option value="S - Fake Order">
                                  S - Fake Order
                                </option>
                                <option value="S - Not Needed Now">
                                  S - Not Needed Now
                                </option>
                                <option value="S - Already Purchased - It Was Urgent">
                                  S - Already Purchased - It Was Urgent
                                </option>
                                <option value="S - Already Purchased - Delivery Delay">
                                  S - Already Purchased - Delivery Delay
                                </option>
                                <option value="S - Customer Will Order Another Product">
                                  S - Customer Will Order Another Product
                                </option>
                                <option value="S - Got Offer From Another Shop">
                                  S - Got Offer From Another Shop
                                </option>
                                <option value="L - Delay Delivery">
                                  L - Delay Delivery
                                </option>
                                <option value="L - Delay Pickup">
                                  L - Delay Pickup
                                </option>
                                <option value="L - Didn't Contact to The Customer">
                                  L - Didn't Contact to The Customer
                                </option>
                                <option value="L - Broke/Torn a Product">
                                  L - Broke/Torn a Product
                                </option>
                                <option value="L - Lost a Product">
                                  L - Lost a Product
                                </option>
                                <option value="L - Lost Partially (Remarks Required)">
                                  L - Lost Partially (Remarks Required)
                                </option>
                                <option value="L - Wrong Booking">
                                  L - Wrong Booking
                                </option>
                                <option value="L - Sent to Wrong Area">
                                  L - Sent to Wrong Area
                                </option>
                                <option value="L - Asked Extra Payment">
                                  L - Asked Extra Payment
                                </option>
                                <option value="C - Wrong Instruction">
                                  C - Wrong Instruction
                                </option>
                                <option value="C - Authorization Delay">
                                  C - Authorization Delay
                                </option>
                                <option value="C - Wrong Commitment">
                                  C - Wrong Commitment
                                </option>
                                <option value="C - Wrong Address">
                                  C - Wrong Address
                                </option>
                                <option value="C - Wrong Phone Number">
                                  C - Wrong Phone Number
                                </option>
                                <option value="C - Wrong Payment Information">
                                  C - Wrong Payment Information
                                </option>
                                <option value="O - Packing Delay">
                                  O - Packing Delay
                                </option>
                                <option value="O - Sourcing Delay">
                                  O - Sourcing Delay
                                </option>
                                <option value="O - Wrong Instruction">
                                  O - Wrong Instruction
                                </option>
                                <option value="O - Date Expired">
                                  O - Date Expired
                                </option>
                                <option value="O - Damage or Torn Product">
                                  O - Damage or Torn Product
                                </option>
                                <option value="R - Time Shortage">
                                  R - Time Shortage
                                </option>
                              </select>
                            </div>
                            <div className="user-orders-info">
                              <div className="user-orders-info-heading">
                                <Button
                                  type="submit"
                                  className="admin-uploads-submit"
                                >
                                  Submit
                                </Button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div
                          className="admin-order-items"
                          style={{ width: "45%" }}
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
                          style={{ width: "54%" }}
                        >
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
                              {order.shipping.district === "Dhaka" && (
                                <tr>
                                  <th>Zone Name</th>
                                  <td>{order.shipping.zoneName}</td>
                                </tr>
                              )}
                              {order.shipping.district === "Dhaka" && (
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

export default SupplyChainOutForDeliveryOrdersScreen;
