import React, { useEffect, useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiX } from "react-icons/fi";
import Moment from "react-moment";
import { useDispatch, useSelector } from "react-redux";
import { listDeliveryGuys } from "../../actions/employeeActions";
import {
  listSupplyChainOrders,
  assignDeliveryGuy,
} from "../../actions/orderActions";
import { listZones } from "../../actions/orderDivisionActions";
import Header from "../../components/Header";
import SupplyChainSidebar from "../../components/SupplyChainSidebar";
import { useReactToPrint } from "react-to-print";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";
import { getPrice } from "../../actions/priceActions";
import farmrootsLogo from "./farmroots logo.jpg";

var Barcode = require("react-barcode");

function PrintInvoice(props) {
  const [zone, setZone] = useState("");
  //   const [orderStartNumber, setOrderStartNumber] = useState(0);
  //   const [orderEndNumber, setOrderEndNumber] = useState(0);
  //   const [deliveryGuy, setDeliveryGuy] = useState("");
  const [assignModalVisible, setAssignModalVisible] = useState(false);

  const orderDeliveryGuyAssign = useSelector(
    (state) => state.orderDeliveryGuyAssign
  );
  const { success: deliveryGuyAssignSuccess } = orderDeliveryGuyAssign;

  const orderSupplyChainList = useSelector(
    (state) => state.orderSupplyChainList
  );
  const { loading, orders, error } = orderSupplyChainList;

  //   const deliveryGuysList = useSelector((state) => state.deliveryGuysList);
  //   const {
  //     loading: loadingDeliveryGuysList,
  //     deliveryGuys,
  //     error: errorDeliveryGuysList,
  //   } = deliveryGuysList;

  const zonesList = useSelector((state) => state.zonesList);
  //   const { loading: loadingZones, zones, error: errorZones } = zonesList;

  const priceGet = useSelector((state) => state.priceGet);
  const { loading: loadingPrice, price, error: errorPrice } = priceGet;

  const dispatch = useDispatch();
  //   var minH =
  //     window.innerHeight ||
  //     document.documentElement.clientHeight ||
  //     document.body.clientHeight;

  //   useEffect(() => {
  //     if (deliveryGuyAssignSuccess) {
  //       setAssignModalVisible(false);
  //     }
  //     dispatch(getPrice());
  //     dispatch(listZones());
  //     dispatch(listDeliveryGuys());
  //     dispatch(
  //       listSupplyChainOrders({
  //         isAuthorized: true,
  //         isProcessed: true,
  //         isOutForDelivery: false,
  //         isCancelled: false,
  //         zone: zone,
  //       })
  //     );
  //     return () => {
  //       //
  //     };
  //   }, [deliveryGuyAssignSuccess, zone]);

  //   const submitHandler = (e) => {
  //     e.preventDefault();
  //     for (var i = orderStartNumber - 1; i < orderEndNumber; i++) {
  //       dispatch(assignDeliveryGuy(orders[i]._id, deliveryGuy));
  //     }
  //   };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      <div className="">
        <div className="admin-content" style={{ paddingTop: "1rem" }}>
          <Button onClick={handlePrint} className="admin-header-button">
            Print Invoices
          </Button>
          {loading ? (
            <div></div>
          ) : error ? (
            <div>{error.message}</div>
          ) : (
            <>
              {/* Invoice Format */}

              <div style={{ display: "None" }}>
                <div ref={componentRef}>
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="container"
                      style={{ minHeight: 1300 }}
                    >
                      <div
                        style={{
                          minHeight: 1300,
                          marginLeft: 50,
                          marginRight: 50,
                        }}
                      >
                        <div className=" mt-4">
                          {loadingPrice ? (
                            <div></div>
                          ) : errorPrice ? (
                            <div>{errorPrice.message}</div>
                          ) : (
                            <div className="row text-right" align="center">
                              <div className="col-sm-12">
                                <img
                                  alt="company logo"
                                  src={farmrootsLogo}
                                  className="admin-print-company-logo"
                                ></img>
                              </div>
                              <div align="right" className="col-sm-12">
                                {price.addressLine1}
                              </div>
                              <div align="right" className="col-sm-12">
                                {price.addressLine2}
                              </div>
                              <div align="left" className="col-sm-12 contactno">
                                <b>Customer Copy</b>
                              </div>
                            </div>
                          )}
                        </div>
                        <hr className="marg"></hr>
                        <div className="row mt-3 mb-3 ">
                          <br />
                          <div
                            className="col-sm-6"
                            style={{
                              fontSize: "2.2rem",
                              float: "left",
                              width: "50%",
                            }}
                          >
                            <b>{`To Be Paid: ${order.totalPrice}`}</b>
                          </div>
                          <div
                            className="col-sm-6"
                            align="right"
                            style={{
                              fontSize: "2.2rem",
                              float: "right",
                              width: "50%",
                            }}
                          >
                            <b>{order.paymentMethod}</b>
                          </div>
                        </div>
                        <hr className="mari"></hr>
                        <div style={{ marginTop: "1rem" }} className="row">
                          <div className="col-sm-6 p-2">
                            <div
                              class="rpsc"
                              style={{ float: "left", width: "45%" }}
                            >
                              <div>Order Date: {order.createdAt}</div>
                              <div>Ship To:</div>
                              <div className="mt-3">{order.userName}</div>
                              <div className="mt-1">
                                {order.shipping.mobileNumber != null ? (
                                  <>
                                    {`Phone#: ${order.userCountryCode} ${order.shipping.mobileNumber}`}
                                  </>
                                ) : (
                                  <>
                                    {`Phone#: ${order.userCountryCode}${order.userMobileNumber}`}
                                  </>
                                )}
                              </div>
                              {order.shipping.landmark === "" ? (
                                <div className="mt-1 ">{`${order.shipping.houseNo}, ${order.shipping.roadNo}, ${order.shipping.area}`}</div>
                              ) : (
                                <div className="mt-1 ">{`${order.shipping.houseNo}, ${order.shipping.roadNo}, ${order.shipping.landmark}, ${order.shipping.area}`}</div>
                              )}
                              {order.shipping.postalCode === "" ? (
                                <div>{`${order.shipping.district}, ${order.shipping.division}`}</div>
                              ) : (
                                <div>{`${order.shipping.district}, ${order.shipping.division}, ${order.shipping.postalCode}`}</div>
                              )}
                            </div>
                            <div
                              class="rpsc"
                              style={{ float: "right", width: "45%" }}
                            >
                              <div align="right" className="">{` `}</div>

                              <div align="right" className="">
                                Packing Date: {order.processedAt}
                              </div>
                              <div align="right" className="">
                                <Barcode
                                  value={order._id}
                                  margin={0}
                                  marginTop={15}
                                  width={1}
                                  height={15}
                                  displayValue={false}
                                ></Barcode>
                              </div>
                              <div
                                align="right"
                                className=" mt-4"
                              >{`Order No. ${order.orderNumber}`}</div>
                              <div align="right" className=" mt-3">{` `}</div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-sm-6 borderContainer p-2">
                            <div className="mt-3">
                              {" "}

                            </div>
                          </div> */}
                        <div className="row mt-4 mb-5">
                          <table
                            style={{ fontSize: "1.2rem" }}
                            className="table table-bordered invoicetable  mt-4 mb-5"
                          >
                            <thead>
                              <tr className="">
                                <th>SL</th>
                                <th class="leftalign" scope="col">
                                  Product Name{" "}
                                </th>
                                <th>Size</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Sub Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.orderItems.map((item, index) => (
                                <tr key={item._id} className="">
                                  <td>{Number(index) + 1}</td>
                                  <td class="leftalign">{item.name}</td>
                                  <td>{item.netWeight}</td>
                                  <td>{item.qty}</td>
                                  <td>{item.price}</td>
                                  <td>{item.qty * item.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="row mt-3">
                          <div className="col-sm-12">
                            <span>Grand Total : </span>
                            <span>{order.itemsPrice}</span>
                          </div>
                          <div className="col-sm-12">
                            <span>Discount : </span>
                            <span> {order.discountPrice}</span>
                          </div>
                          {/* <div className="col-sm-12">
                            <span>Tax:</span>
                            <span>{order.taxPrice}</span>
                          </div> */}
                          <div className="col-sm-12">
                            <span>Shipping Fee : </span>
                            <span>{order.shippingPrice}</span>
                          </div>
                          <div className="col-sm-12">
                            <span>Advance Payment : </span>
                            <span> 0</span>
                          </div>

                          <div className="col-sm-12">
                            <span>To Be paid : </span>
                            <span> {order.totalPrice}</span>
                          </div>
                        </div>
                        <div class="row mt-4 mb-4">
                          <span>
                            <b>Delivery Instructions: {order.instruction}</b>
                          </span>
                        </div>
                        <div className=" row py-4 my-5 ml-2">
                          <span>
                            I certify that I have received all the above
                            mentioned products in good condition.
                          </span>
                        </div>
                        <div className="row my-4">
                          <div
                            className="col-sm-6 "
                            style={{ float: "left", width: "50%" }}
                          >
                            <b>
                              Delivered By
                              (Courier).......................................
                            </b>
                          </div>
                          <div
                            className="col-sm-6 "
                            align="right"
                            style={{ float: "right", width: "50%" }}
                          >
                            <b>
                              Received By
                              (Customer).......................................
                            </b>
                          </div>
                        </div>
                      </div>
                      <hr className="admin-print-dividera"></hr>

                      {/* office copy */}
                      <div
                        style={{
                          minHeight: 1300,
                          marginLeft: 50,
                          marginRight: 50,
                        }}
                      >
                        <div className=" mt-4">
                          {loadingPrice ? (
                            <div></div>
                          ) : errorPrice ? (
                            <div>{errorPrice.message}</div>
                          ) : (
                            <div className="row text-right" align="center">
                              <div className="col-sm-12">
                                <img
                                  alt="company logo"
                                  src={farmrootsLogo}
                                  className="admin-print-company-logo"
                                ></img>
                              </div>
                              <div align="right" className="col-sm-12">
                                {price.addressLine1}
                              </div>
                              <div align="right" className="col-sm-12">
                                {price.addressLine2}
                              </div>
                              <div align="left" className="col-sm-12 contactno">
                                <b>Office Copy</b>
                              </div>
                            </div>
                          )}
                        </div>
                        <hr className="marg"></hr>
                        <div className="row mt-3 mb-3 ">
                          <br />
                          <div
                            className="col-sm-6"
                            style={{
                              fontSize: "2.2rem",
                              float: "left",
                              width: "50%",
                            }}
                          >
                            <b>{`To Be Received: ${order.totalPrice}`}</b>
                          </div>
                          <div
                            className="col-sm-6"
                            align="right"
                            style={{
                              fontSize: "2.2rem",
                              float: "right",
                              width: "50%",
                            }}
                          >
                            <b>{order.paymentMethod}</b>
                          </div>
                        </div>
                        <hr className="mari"></hr>
                        <div style={{ marginTop: "1rem" }} className="row">
                          <div className="col-sm-6 p-2">
                            <div
                              class="rpsc"
                              style={{ float: "left", width: "45%" }}
                            >
                              <div>Order Date: {order.createdAt}</div>
                              <div>Ship To:</div>
                              <div className="mt-3">{order.userName}</div>
                              <div className="mt-1">
                                {" "}
                                {order.shipping.mobileNumber != null ? (
                                  <>
                                    {`Phone#: ${order.userCountryCode} ${order.shipping.mobileNumber}`}
                                  </>
                                ) : (
                                  <>
                                    {`Phone#: ${order.userCountryCode}${order.userMobileNumber}`}
                                  </>
                                )}
                              </div>
                              {order.shipping.landmark === "" ? (
                                <div className="mt-1 ">{`${order.shipping.houseNo}, ${order.shipping.roadNo}, ${order.shipping.area}`}</div>
                              ) : (
                                <div className="mt-1 ">{`${order.shipping.houseNo}, ${order.shipping.roadNo}, ${order.shipping.landmark}, ${order.shipping.area}`}</div>
                              )}
                              {order.shipping.postalCode === "" ? (
                                <div>{`${order.shipping.district}, ${order.shipping.division}`}</div>
                              ) : (
                                <div>{`${order.shipping.district}, ${order.shipping.division}, ${order.shipping.postalCode}`}</div>
                              )}
                            </div>
                            <div
                              class="rpsc"
                              style={{ float: "right", width: "45%" }}
                            >
                              <div align="right" className="">{` `}</div>

                              <div align="right" className="">
                                Packing Date: {order.processedAt}
                              </div>
                              <div align="right" className="">
                                <Barcode
                                  value={order._id}
                                  margin={0}
                                  marginTop={15}
                                  width={1}
                                  height={15}
                                  displayValue={false}
                                ></Barcode>
                              </div>
                              <div
                                align="right"
                                className=" mt-4"
                              >{`Order No. ${order.orderNumber}`}</div>
                              <div align="right" className=" mt-3">{` `}</div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-sm-6 borderContainer p-2">
                            <div className="mt-3">
                              {" "}

                            </div>
                          </div> */}
                        <div className="row mt-4 mb-5">
                          <table
                            style={{ fontSize: "1.2rem" }}
                            className="table table-bordered invoicetable  mt-4 mb-5"
                          >
                            <thead>
                              <tr className="">
                                <th>SL</th>
                                <th class="leftalign" scope="col">
                                  Product Name{" "}
                                </th>
                                <th>Size</th>
                                <th>Qty</th>
                                <th>Price</th>
                                <th>Sub Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order.orderItems.map((item, index) => (
                                <tr key={item._id} className="">
                                  <td>{Number(index) + 1}</td>
                                  <td class="leftalign">{item.name}</td>
                                  <td>{item.netWeight}</td>
                                  <td>{item.qty}</td>
                                  <td>{item.price}</td>
                                  <td>{item.qty * item.price}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="row mt-3">
                          <div className="col-sm-12">
                            <span>Grand Total : </span>
                            <span>{order.itemsPrice}</span>
                          </div>
                          <div className="col-sm-12">
                            <span>Discount : </span>
                            <span> {order.discountPrice}</span>
                          </div>
                          {/* <div className="col-sm-12">
                            <span>Tax:</span>
                            <span>{order.taxPrice}</span>
                          </div> */}
                          <div className="col-sm-12">
                            <span>Shipping Fee : </span>
                            <span>{order.shippingPrice}</span>
                          </div>
                          <div className="col-sm-12">
                            <span>Advance Payment : </span>
                            <span> 0</span>
                          </div>

                          <div className="col-sm-12">
                            <span>To Be Received : </span>
                            <span> {order.totalPrice}</span>
                          </div>
                        </div>
                        <div class="row mt-4 mb-4">
                          <span>
                            <b>Delivery Instructions: {order.instruction}</b>
                          </span>
                        </div>
                        <div className=" row py-4 my-5 ml-2">
                          <span>
                            I certify that I have received all the above
                            mentioned products in good condition.
                          </span>
                        </div>
                        <div className="row my-4">
                          <div
                            className="col-sm-6 "
                            style={{ float: "left", width: "50%" }}
                          >
                            <b>
                              Delivered By
                              (Courier).......................................
                            </b>
                          </div>
                          <div
                            className="col-sm-6 "
                            align="right"
                            style={{ float: "right", width: "50%" }}
                          >
                            <b>
                              Received By
                              (Customer).......................................
                            </b>
                          </div>
                        </div>
                      </div>
                      {/* <hr className="admin-print-divider"></hr> */}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default PrintInvoice;
