import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  authorizeOrder,
  listFeedbackOrders,
  takeFeedback,
} from '../../actions/orderActions';
import Header from '../../components/Header';
import StarRatings from 'react-star-ratings';
import { Icon } from '@iconify/react';
import currencyBdt from '@iconify-icons/mdi/currency-bdt';

function PersonalFeedbackOrdersScreen(props) {
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [orderId, setOrderId] = useState('');

  const orderTakeFeedback = useSelector((state) => state.orderTakeFeedback);
  const { success: orderFeedbackSuccess } = orderTakeFeedback;

  const orderFeedbackList = useSelector((state) => state.orderFeedbackList);
  const { loading, orders, error } = orderFeedbackList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listFeedbackOrders());
    return () => {
      //
    };
  }, [orderFeedbackSuccess]);

  const openFeedbackModal = (orderId) => {
    setOrderId(orderId);
    setFeedbackModalVisible(true);
  };

  const changeRating = (newRating, name) => {
    setRating(newRating);
  };

  const feedbackHandler = (e) => {
    dispatch(takeFeedback(orderId, rating, comment));
  };

  return (
    <div className="grid">
      <div className="grid-header">
        <Header></Header>
      </div>

      <Modal
        show={feedbackModalVisible}
        onHide={() => setFeedbackModalVisible(false)}
        dialogClassName="modal-25w"
        centered
      >
        <Modal.Body>
          <div className="d-flex justify-content-end">
            <Button
              className="user-review-edit-modal-close"
              onClick={() => setFeedbackModalVisible(false)}
            >
              <MdClose></MdClose>
            </Button>
          </div>
          <div style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
            <div className="user-review-edit-modal-main-heading">
              Enter Feedback Details
            </div>
            <div className="user-review-edit-modal-heading">Overall Rating</div>
            <StarRatings
              rating={rating}
              starRatedColor="#ffc702"
              starHoverColor="#ffc702"
              starEmptyColor="#cccccc"
              changeRating={changeRating}
              name="rating"
              starDimension="3.5rem"
              starSpacing="0rem"
            />
            <div className="user-review-edit-modal-heading">Comment</div>
            <form onSubmit={feedbackHandler}>
              <textarea
                className="user-review-edit-modal-input"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <Button
                className="user-review-edit-modal-submit mb-1"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </div>
        </Modal.Body>
      </Modal>

      <div className="main">
        {loading ? (
          <div></div>
        ) : error ? (
          <div>{error.message}</div>
        ) : (
          <>
            <div className="admin-header">
              <div className="admin-header-text">{`Feedback Orders (${orders.length})`}</div>
              <div className="d-flex align-items-center">
                <Link
                  to="/6118131915162019/call-center/pending"
                  className="admin-header-button"
                >
                  Pending Orders
                </Link>
                <Link
                  to="/6118131915162019/call-center/authorized"
                  className="admin-header-button"
                >
                  Authorized Orders
                </Link>
              </div>
            </div>
            <div className="admin-orders">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="admin-orders-content-box"
                  style={{ width: '49.5%' }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <div className="user-orders-info">
                        <div className="user-orders-info-heading">Order ID</div>
                        <div className="user-orders-info-data">
                          {order.orderNumber}
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
                        <div className="user-orders-info-heading">Status</div>
                        {order.isCancelled ? (
                          <div className="user-orders-info-data">Cancelled</div>
                        ) : (
                          <div className="user-orders-info-data">Delivered</div>
                        )}
                      </div>
                    </div>
                    <div>
                      <Button
                        onClick={() => openFeedbackModal(order._id)}
                        style={{ width: '21rem' }}
                        className="user-orders-view-details-button"
                      >
                        Take Feedback
                      </Button>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="admin-order-items" style={{ width: '45%' }}>
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
                    <div className="admin-order-items" style={{ width: '54%' }}>
                      <div className="admin-order-items-heading">User Info</div>
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
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default PersonalFeedbackOrdersScreen;
