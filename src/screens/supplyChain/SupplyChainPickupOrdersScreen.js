import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import {
  processOrder,
  listSupplyChainOrders,
} from "../../actions/orderActions";
import Header from "../../components/Header";
import SupplyChainSidebar from "../../components/SupplyChainSidebar";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

function SupplyChainPickupOrdersScreen(props) {
  const [id, setId] = useState("");

  const orderProcess = useSelector((state) => state.orderProcess);
  const { success: orderProcessSuccess } = orderProcess;

  const orderSupplyChainList = useSelector(
    (state) => state.orderSupplyChainList
  );
  const { loading, orders, error } = orderSupplyChainList;

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      listSupplyChainOrders({
        isAuthorized: true,
        isPickup: true,
        isProcessed: false,
        isCancelled: false,
      })
    );
    return () => {
      //
    };
  }, [orderProcessSuccess]);

  const confirmModalHandler = (orderId) => {
    setId(orderId);
    setConfirmModalVisible(true);
  };

  const orderProcessHandler = () => {
    dispatch(processOrder(id));
    setConfirmModalVisible(false);
  };

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
              Do you really want to process this order? This process cannot be
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
                onClick={orderProcessHandler}
                className="confirm-tick-button"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="main">
        <div className="d-flex">
          <SupplyChainSidebar value={"Pickup"}></SupplyChainSidebar>
          <div className="admin-content" style={{ paddingTop: "2rem" }}>
            {loading ? (
              <div></div>
            ) : error ? (
              <div>{error.message}</div>
            ) : (
              <>
                <div className="admin-header">
                  <div className="admin-header-text">{`Pickup Orders (${orders.length})`}</div>
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
                            onClick={() => confirmModalHandler(order._id)}
                            style={{ width: "21rem" }}
                            className="user-orders-view-details-button"
                          >
                            Process Order
                          </Button>
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
                                <th>Name</th>
                                <th>Net Wt.</th>
                                <th>Price</th>
                                <th>Qty</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.orderItems.map((item) => (
                                <tr key={item._id}>
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

export default SupplyChainPickupOrdersScreen;
