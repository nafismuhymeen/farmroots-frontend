import React, { useEffect, useState } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductReview,
  editProductReview,
  listUserReviews,
} from "../../actions/reviewActions";
import Header from "../../components/Header";
import Rating from "../../components/Rating";
import UserSidebar from "../../components/UserSidebar";
import StarRatings from "react-star-ratings";
import { FiXCircle } from "react-icons/fi";

function MyReviewsScreen(props) {
  const [reviewEditModalVisible, setReviewEditModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [productId, setProductId] = useState("");
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const dispatch = useDispatch();

  const userListReview = useSelector((state) => state.userListReview);
  const { loading, reviews, error } = userListReview;

  const productEditReview = useSelector((state) => state.productEditReview);
  const { success: successEditReview } = productEditReview;

  const productDeleteReview = useSelector((state) => state.productDeleteReview);
  const { success: successDeleteReview } = productDeleteReview;

  useEffect(() => {
    dispatch(listUserReviews());
    return () => {
      //
    };
  }, [successEditReview, successDeleteReview]);

  const openReviewEditModal = (review) => {
    setRating(review.rating);
    setComment(review.comment);
    setReviewId(review._id);
    setProductId(review.product);
    setReviewEditModalVisible(true);
  };

  const changeRating = (newRating, name) => {
    setRating(newRating);
  };

  const reviewEditHandler = (e) => {
    dispatch(
      editProductReview({
        productId: productId,
        reviewId: reviewId,
        rating: rating,
        comment: comment,
      })
    );
    setReviewEditModalVisible(false);
  };

  const confirmModalHandler = (review) => {
    setReviewId(review._id);
    setProductId(review.product);
    setConfirmModalVisible(true);
  };

  const reviewDeleteHandler = () => {
    dispatch(deleteProductReview({ productId, reviewId }));
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
            <div className="confirm-no-icon">
              <FiXCircle></FiXCircle>
            </div>
            <div className="confirm-heading">Are you sure?</div>
            <div className="confirm-text">
              Do you really want to delete this review? This process cannot be
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
                onClick={reviewDeleteHandler}
                className="confirm-yes-button"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <div className="main">
        <Modal
          show={reviewEditModalVisible}
          onHide={() => setReviewEditModalVisible(false)}
          dialogClassName="modal-25w"
          centered
        >
          <Modal.Body>
            <div className="d-flex justify-content-end">
              <Button
                className="user-review-edit-modal-close"
                onClick={() => setReviewEditModalVisible(false)}
              >
                <MdClose></MdClose>
              </Button>
            </div>
            <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
              <div className="user-review-edit-modal-main-heading">
                Edit your Review
              </div>
              <div className="user-review-edit-modal-heading">
                Overall Rating
              </div>
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
              <form onSubmit={reviewEditHandler}>
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
        <Container fluid={true}>
          <Row>
            <Col sm="3">
              <UserSidebar value={"my-reviews"}></UserSidebar>
            </Col>
            <Col sm="9">
              <>
                <Row className="user-reviews-heading">My Reviews</Row>
                <Row className="user-reviews-content">
                  {loading ? (
                    <Row></Row>
                  ) : error ? (
                    <Row>{error.message}</Row>
                  ) : (
                    <>
                      {reviews.length === 0 && (
                        <Row className="user-reviews-empty-message">
                          You haven't given any reviews yet
                        </Row>
                      )}
                      {reviews.map((review) => (
                        <div key={review._id} className="user-reviews-box">
                          <div
                            style={{ width: "100%" }}
                            className="d-flex justify-content-between"
                          >
                            <div className="user-reviews-box-product">
                              {review.productName}
                            </div>
                            <Rating value={review.rating * 20}></Rating>
                          </div>
                          <div>
                            <hr className="user-reviews-box-horizontal-line"></hr>
                          </div>
                          <div className="user-reviews-box-review">
                            {review.comment}
                          </div>
                          <div>
                            <Button
                              className="user-reviews-box-edit-delete-button"
                              onClick={() => openReviewEditModal(review)}
                            >
                              Edit
                            </Button>
                            <Button
                              className="user-reviews-box-edit-delete-button"
                              onClick={() => confirmModalHandler(review)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </Row>
              </>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default MyReviewsScreen;
