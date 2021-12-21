import React, { useEffect, useState } from "react";
import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import { HiHome, HiLocationMarker } from "react-icons/hi";
import { IoMdBriefcase } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress, listMyAddresses } from "../../actions/addressActions";
import Address from "../../components/Address";
import EditAddress from "../../components/EditAddress";
import Header from "../../components/Header";
import UserSidebar from "../../components/UserSidebar";
import { FiXCircle } from "react-icons/fi";

function AddressScreen(props) {
  const [addressId, setAddressId] = useState("");
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);

  const userListAddress = useSelector((state) => state.userListAddress);
  const { loading, addresses, error } = userListAddress;

  const userSaveAddress = useSelector((state) => state.userSaveAddress);
  const { success: successAddressSave } = userSaveAddress;

  const userEditAddress = useSelector((state) => state.userEditAddress);
  const { success: successAddressEdit } = userEditAddress;

  const userDeleteAddress = useSelector((state) => state.userDeleteAddress);
  const { success: successAddressDelete } = userDeleteAddress;

  const [address, setAddress] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listMyAddresses());
    return () => {
      //
    };
  }, [successAddressSave, successAddressEdit, successAddressDelete]);

  const openAddress = () => {
    document.querySelector(".address-modal").classList.add("open");
  };

  const openEditAddress = (address) => {
    setAddress(address);
    document.querySelector(".address-edit-modal").classList.add("open");
  };

  const confirmModalHandler = (addressId) => {
    setAddressId(addressId);
    setConfirmModalVisible(true);
  };

  const deleteAdressHandler = () => {
    dispatch(deleteAddress(addressId));
    setConfirmModalVisible(false);
  };

  return (
    <div className="grid">
      <div className="grid-header">
        <Header></Header>
      </div>

      <Address></Address>
      <EditAddress value={address}></EditAddress>

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
              Do you really want to delete this address? This process cannot be
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
                onClick={deleteAdressHandler}
                className="confirm-yes-button"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Container fluid={true}>
        <Row>
          <Col sm="3">
            <UserSidebar value={"address"}></UserSidebar>
          </Col>
          <Col sm="9">
            <Row>
              <div className="user-address-heading">Manage Addresses</div>
            </Row>
            <Row className="cardsincenter">
              <Button className="user-add-address-button" onClick={openAddress}>
                <i className="fa fa-plus mr-1"></i> Add new address
              </Button>
            </Row>
            <Row className="cardsincenter">
              {loading ? (
                <Col></Col>
              ) : error ? (
                <Col>{error.message}</Col>
              ) : (
                <>
                  {addresses.map((address) => (
                    <Col
                      sm="6"
                      md="4"
                      lg="3"
                      key={address._id}
                      className="user-address-box"
                    >
                      {address.type === "HOME" ? (
                        <div className="user-address-box-icon">
                          <HiHome></HiHome>
                        </div>
                      ) : address.type === "WORK" ? (
                        <div className="user-address-box-icon">
                          <IoMdBriefcase></IoMdBriefcase>
                        </div>
                      ) : (
                        <div className="user-address-box-icon">
                          <HiLocationMarker></HiLocationMarker>
                        </div>
                      )}
                      <div>
                        <div className="user-address-box-type">
                          {address.type}
                        </div>
                        <div className="user-address-box-address">
                          {address.name}
                          {address.mobileNumber && (
                            <span className="user-address-box-address">
                              {address.mobileNumber}
                            </span>
                          )}
                        </div>
                        {address.postalCode === "" &&
                          address.landmark === "" && (
                            <div className="user-address-box-address">
                              {address.houseNo +
                                ", " +
                                address.roadNo +
                                ", " +
                                address.area +
                                ", " +
                                address.district +
                                ", " +
                                address.division +
                                ", " +
                                address.country}
                            </div>
                          )}
                        {address.postalCode !== "" &&
                          address.landmark === "" && (
                            <div className="user-address-box-address">
                              {address.houseNo +
                                ", " +
                                address.roadNo +
                                ", " +
                                address.area +
                                ", " +
                                address.district +
                                ", " +
                                address.division +
                                ", " +
                                address.country +
                                ", " +
                                address.postalCode}
                            </div>
                          )}
                        {address.postalCode === "" &&
                          address.landmark !== "" && (
                            <div className="user-address-box-address">
                              {address.houseNo +
                                ", " +
                                address.roadNo +
                                ", " +
                                address.landmark +
                                ", " +
                                address.area +
                                ", " +
                                address.district +
                                ", " +
                                address.division +
                                ", " +
                                address.country}
                            </div>
                          )}
                        {address.postalCode !== "" &&
                          address.landmark !== "" && (
                            <div className="user-address-box-address">
                              {address.houseNo +
                                ", " +
                                address.roadNo +
                                ", " +
                                address.landmark +
                                ", " +
                                address.area +
                                ", " +
                                address.district +
                                ", " +
                                address.division +
                                ", " +
                                address.country +
                                ", " +
                                address.postalCode}
                            </div>
                          )}
                        <div className="user-address-box-edit-delete">
                          <Button
                            className="user-address-box-edit-delete-button"
                            onClick={() => openEditAddress(address)}
                          >
                            Edit
                          </Button>
                          <Button
                            className="user-address-box-edit-delete-button"
                            onClick={() => confirmModalHandler(address._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </Col>
                  ))}
                </>
              )}
            </Row>

          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AddressScreen;
