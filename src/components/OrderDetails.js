import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { FiX, FiMapPin, FiAlertTriangle, FiCheck } from "react-icons/fi";
import { BsHouseDoor, BsBriefcase } from "react-icons/bs";
import { VscLoading } from "react-icons/vsc";
import { BiFoodTag } from "react-icons/bi";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { detailsOrder } from "../actions/orderActions";
import Moment from "react-moment";
import { Icon } from "@iconify/react";
import currencyBdt from "@iconify-icons/mdi/currency-bdt";
import { getPrice } from "../actions/priceActions";

function OrderDetails(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.value) {
      dispatch(detailsOrder(props.value));
      dispatch(getPrice());
    }
    return () => {
      //
    };
  }, [props.value]);

  const priceGet = useSelector((state) => state.priceGet);
  const { loading: loadingPrice, price, error: errorPrice } = priceGet;

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const closeOrderDetailsModal = () => {
    document
      .querySelector(".order-details-modal-background")
      .classList.remove("open");
    document.querySelector(".order-details-modal").classList.remove("open");
  };

  return (
    <div>
      <div className="order-details-modal-background"></div>
      <div className="order-details-modal">
        {loading ? (
          <div></div>
        ) : error ? (
          <div>{error.message}</div>
        ) : (
          <>
            <div className="d-flex align-items-center">
              <Button
                onClick={closeOrderDetailsModal}
                className="order-close-button"
              >
                <FiX></FiX>
              </Button>
              <div className="order-heading-id">{`Order #${order.orderNumber}`}</div>
            </div>
            <div
              className="d-flex"
              style={{ marginTop: "3rem", paddingRight: "1rem" }}
            >
              <div>
                <div className="order-address-icon">
                  <FiMapPin></FiMapPin>
                </div>
                <div className="order-address-vertical-line"></div>
                {order.shipping.type === "HOME" ? (
                  <div className="order-address-icon">
                    <BsHouseDoor></BsHouseDoor>
                  </div>
                ) : order.shipping.type === "WORK" ? (
                  <div className="order-address-icon">
                    <BsBriefcase></BsBriefcase>
                  </div>
                ) : (
                  <div className="order-address-icon">
                    <FiMapPin></FiMapPin>
                  </div>
                )}
              </div>
              <div>
                {loadingPrice ? (
                  <div></div>
                ) : errorPrice ? (
                  <div>{errorPrice.message}</div>
                ) : (
                  <>
                    <div className="order-address-name">
                      {price.addressLine1}
                    </div>
                    <div className="order-address-location">
                      {price.addressLine2}
                    </div>
                  </>
                )}
                <div
                  className="order-address-name"
                  style={{ marginTop: "3.5rem" }}
                >
                  {order.shipping.type}
                </div>
                {order.shipping.landmark === "" &&
                  order.shipping.postalCode === "" && (
                    <div className="order-address-location">
                      {order.shipping.houseNo +
                        ", " +
                        order.shipping.roadNo +
                        ", " +
                        order.shipping.area +
                        ", " +
                        order.shipping.district +
                        ", " +
                        order.shipping.division +
                        ", " +
                        order.shipping.country}
                    </div>
                  )}
                {order.shipping.landmark !== "" &&
                  order.shipping.postalCode === "" && (
                    <div className="order-address-location">
                      {order.shipping.houseNo +
                        ", " +
                        order.shipping.roadNo +
                        ", " +
                        order.shipping.landmark +
                        ", " +
                        order.shipping.area +
                        ", " +
                        order.shipping.district +
                        ", " +
                        order.shipping.division +
                        ", " +
                        order.shipping.country}
                    </div>
                  )}
                {order.shipping.landmark === "" &&
                  order.shipping.postalCode !== "" && (
                    <div className="order-address-location">
                      {order.shipping.houseNo +
                        ", " +
                        order.shipping.roadNo +
                        ", " +
                        order.shipping.area +
                        ", " +
                        order.shipping.district +
                        ", " +
                        order.shipping.division +
                        ", " +
                        order.shipping.country +
                        ", " +
                        order.shipping.postalCode}
                    </div>
                  )}
                {order.shipping.landmark !== "" &&
                  order.shipping.postalCode !== "" && (
                    <div className="order-address-location">
                      {order.shipping.houseNo +
                        ", " +
                        order.shipping.roadNo +
                        ", " +
                        order.shipping.landmark +
                        ", " +
                        order.shipping.area +
                        ", " +
                        order.shipping.district +
                        ", " +
                        order.shipping.division +
                        ", " +
                        order.shipping.country +
                        ", " +
                        order.shipping.postalCode}
                    </div>
                  )}
              </div>
            </div>
            <hr className="order-delivery-horizontal-line"></hr>
            {order.isCancelled === true ? (
              <div className="d-flex align-items-center">
                <div className="order-cancel-icon">
                  <FiAlertTriangle></FiAlertTriangle>
                </div>
                <div>
                  <div className="order-delivery-info">
                    Cancelled on{" "}
                    <Moment format="ddd, MMM DD, YYYY, hh:mm A">
                      {order.cancelledAt}
                    </Moment>
                  </div>
                </div>
              </div>
            ) : order.isDelivered === true ? (
              <div className="d-flex">
                <div className="order-delivery-icon">
                  <FiCheck></FiCheck>
                </div>
                <div>
                  <div className="order-delivery-info">
                    Delivered on{" "}
                    <Moment format="ddd, MMM DD, YYYY, hh:mm A">
                      {order.deliveredAt}
                    </Moment>
                  </div>
                  <div className="order-delivery-info">By Amrit Kumar</div>
                </div>
              </div>
            ) : (
              <div className="d-flex">
                <div className="order-delivery-pending-icon">
                  <VscLoading></VscLoading>
                </div>
                {order.deliveryTime !== 0 ? (
                  <div>
                    <div className="order-delivery-info">
                      Will be delivered by
                    </div>
                    <div className="order-delivery-info">
                      <Moment
                        add={{ hours: order.deliveryTime }}
                        format="ddd, MMM DD, YYYY"
                      >
                        {order.createdAt}
                      </Moment>
                    </div>
                  </div>
                ) : order.shipping.district === "Dhaka" ? (
                  <div>
                    <div className="order-delivery-info">
                      Will be delivered by
                    </div>
                    <div className="order-delivery-info">
                      <Moment add={{ days: 2 }} format="ddd, MMM DD, YYYY">
                        {order.createdAt}
                      </Moment>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="order-delivery-info">
                      Will be delivered between
                    </div>
                    <div className="order-delivery-info">
                      <Moment add={{ days: 3 }} format="ddd, MMM DD, YYYY">
                        {order.createdAt}
                      </Moment>{" "}
                      &{" "}
                      <Moment add={{ days: 5 }} format="ddd, MMM DD, YYYY">
                        {order.createdAt}
                      </Moment>
                    </div>
                  </div>
                )}
              </div>
            )}
            <hr className="order-bill-upper-horizontal-line"></hr>
            <div className="order-bill-total-items">{`${order.orderItems.length} ITEMS`}</div>
            <div className="order-items">
              {order.orderItems.map((orderItem) => (
                <div
                  key={orderItem.product}
                  className="d-flex justify-content-between align-items-center"
                  style={{ marginTop: "1rem" }}
                >
                  <div className="d-flex align-items-center">
                    {orderItem.vegan.toLowerCase() === "true" ? (
                      <BiFoodTag className="order-vegan-icon"></BiFoodTag>
                    ) : (
                      <BiFoodTag className="order-non-vegan-icon"></BiFoodTag>
                    )}
                    <div className="order-item-name">{`${orderItem.name} ${orderItem.netWeight}  x ${orderItem.qty}`}</div>
                  </div>
                  <div className="order-item-price">
                    <Icon icon={currencyBdt} />
                    <div>{orderItem.price}</div>
                  </div>
                </div>
              ))}
            </div>
            <hr className="order-bill-middle-horizontal-line"></hr>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ marginBottom: "1rem" }}
            >
              <div
                className="order-bill-price-type"
                style={{ fontWeight: "bold" }}
              >
                Item Total
              </div>
              <div className="order-bill-price-value">
                <Icon icon={currencyBdt} />
                <div>{order.itemsPrice}</div>
              </div>
            </div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ marginBottom: "1rem" }}
            >
              <div className="order-bill-price-type">Delivery Fee</div>
              <div className="order-bill-price-value">
                <Icon icon={currencyBdt} />
                <div>{order.shippingPrice}</div>
              </div>
            </div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ marginBottom: "1rem" }}
            >
              <div className="order-bill-price-type">Taxes and Charges</div>
              <div className="order-bill-price-value">
                <Icon icon={currencyBdt} />
                <div>{order.taxPrice}</div>
              </div>
            </div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ marginBottom: "1rem" }}
            >
              <div className="order-bill-price-type">Discount</div>
              <div className="order-bill-price-value">
                <Icon icon={currencyBdt} />
                <div>{order.discountPrice}</div>
              </div>
            </div>
            <hr className="order-bill-lower-horizontal-line"></hr>
            <div className="d-flex justify-content-between">
              {order.paymentMethod === "Cash on Delivery" ? (
                <div className="order-payment-method">Paid Via Cash</div>
              ) : (
                <div className="order-payment-method">{`Paid Via ${order.paymentMethod}`}</div>
              )}
              <div className="d-flex">
                <div className="order-total-bill-text">BILL TOTAL</div>
                <div className="order-total-bill-price">
                  <Icon icon={currencyBdt} />
                  <div>{order.totalPrice}</div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default withRouter(OrderDetails);
