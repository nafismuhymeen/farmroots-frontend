import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { listDeliveryGuys } from "../../actions/employeeActions";
import { listSupplyChainOrders } from "../../actions/orderActions";
import Header from "../../components/Header";
import SupplyChainSidebar from "../../components/SupplyChainSidebar";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";
import PrintInvoice from "./PrintInvoice";

function SupplyChainDeliveredOrdersScreen(props) {
  const orderSupplyChainList = useSelector(
    (state) => state.orderSupplyChainList
  );
  const { loading, orders, error } = orderSupplyChainList;

  const deliveryGuysList = useSelector((state) => state.deliveryGuysList);
  const {
    loading: loadingDeliveryGuysList,
    deliveryGuys,
    error: errorDeliveryGuysList,
  } = deliveryGuysList;

  const [deliveryGuy, setDeliveryGuy] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDeliveryGuys());
    dispatch(
      listSupplyChainOrders({
        isAuthorized: true,
        isProcessed: true,
        isOutForDelivery: true,
        isDelivered: true,
        hasFeedback: false,
        isCancelled: false,
        deliveryGuy: deliveryGuy,
      })
    );
    return () => {
      //
    };
  }, [deliveryGuy]);

  return (
    <div className="grid">
      <div className="grid-header">
        <Header></Header>
      </div>

      <div className="main">
        <div className="d-flex">
          <SupplyChainSidebar value={"Delivered"}></SupplyChainSidebar>
          <div className="admin-content" style={{ paddingTop: "1rem" }}>
            {loading ? (
              <div></div>
            ) : error ? (
              <div>{error.message}</div>
            ) : (
              <>
                <div className="admin-header">
                  <div className="admin-header-text">{`Delivered Orders (${orders.length})`}</div>
                  <PrintInvoice />
                  <div className="d-flex align-items-center">
                    <select
                      name="category"
                      value={deliveryGuy}
                      onChange={(e) => setDeliveryGuy(e.target.value)}
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

export default SupplyChainDeliveredOrdersScreen;
