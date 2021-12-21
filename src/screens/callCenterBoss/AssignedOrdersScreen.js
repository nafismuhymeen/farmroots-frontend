import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  editOrderPrice,
  employeeCancelOrder,
  listCallCenterBossOrders,
} from '../../actions/orderActions';
import Header from '../../components/Header';
import Moment from 'react-moment';
import CallCenterBossSidebar from '../../components/CallCenterBossSidebar';
import { listCallCenterGuys } from '../../actions/employeeActions';
import { FiX, FiXCircle } from 'react-icons/fi';
import { Icon } from '@iconify/react';
import currencyBdt from '@iconify-icons/mdi/currency-bdt';
import { Button, Modal } from 'react-bootstrap';

function AssignedOrdersScreen(props) {
  const [orderId, setOrderId] = useState('');
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
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

  const orderEmployeeCancel = useSelector((state) => state.orderEmployeeCancel);
  const { success: orderCancelSuccess } = orderEmployeeCancel;

  const orderPriceEdit = useSelector((state) => state.orderPriceEdit);
  const { success: orderEditSuccess } = orderPriceEdit;

  const [callCenterGuy, setCallCenterGuy] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (orderEditSuccess) {
      closeModal();
    }
    dispatch(listCallCenterGuys());
    dispatch(
      listCallCenterBossOrders({
        isAssignedCallCenterGuy: true,
        isAuthorized: false,
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
  }, [callCenterGuy, orderCancelSuccess, orderEditSuccess]);

  const confirmModalHandler = (orderId) => {
    setOrderId(orderId);
    setConfirmModalVisible(true);
  };

  const cancelOrderHandler = () => {
    dispatch(employeeCancelOrder(orderId));
    setConfirmModalVisible(false);
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
    document.querySelector('.admin-modal-background').classList.add('open');
  };

  const closeModal = () => {
    document.querySelector('.admin-modal-background').classList.remove('open');
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

      <div className="admin-modal-background">
        <div className="admin-modal" style={{ width: '45%' }}>
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
                style={{ marginBottom: '1.5rem' }}
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
          <CallCenterBossSidebar value={'Assigned'}></CallCenterBossSidebar>
          <div className="admin-content" style={{ paddingTop: '1rem' }}>
            {loading ? (
              <div></div>
            ) : error ? (
              <div>{error.message}</div>
            ) : (
              <>
                <div className="admin-header">
                  <div className="admin-header-text">{`Assigned Orders (${orders.length})`}</div>
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
                    <div
                      key={order._id}
                      className="admin-orders-content-box"
                      style={{ width: '100%' }}
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
                            style={{ width: '18rem' }}
                            className="user-orders-cancel-order-button"
                          >
                            Cancel Order
                          </Button>
                          <Button
                            onClick={() => openEditModal(order)}
                            style={{ width: '18rem' }}
                            className="user-orders-view-details-button"
                          >
                            Edit Order
                          </Button>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div
                          className="admin-order-items"
                          style={{ width: '49%' }}
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
                          style={{ width: '50%' }}
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
                      {order.instruction !== 'None' && (
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

export default AssignedOrdersScreen;
