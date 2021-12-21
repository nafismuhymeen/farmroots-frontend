import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Modal, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../actions/userActions";
import Header from "../../components/Header";
import UserSidebar from "../../components/UserSidebar";
import { FaUserCircle } from "react-icons/fa";
import { MdEdit, MdClose, MdDelete } from "react-icons/md";
import { CgSoftwareUpload } from "react-icons/cg";
import getCroppedImg from "../../actions/cropImage";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import { toast } from "react-toastify";

function UserInfoScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+880");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [anniversaryDate, setAnniversaryDate] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState("Nil");
  const [uploadedImage, setUploadedImage] = useState("Nil");

  const [userName, setUserName] = useState("");
  const [userMobileNumber, setUserMobileNumber] = useState("");

  const [uploading, setUploading] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [cropModalVisible, setCropModalVisible] = useState(false);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo.changeMobileNumber) {
      setMobileNumber(userInfo.changeMobileNumber);
      setUserMobileNumber(userInfo.changeMobileNumber);
    } else {
      setMobileNumber(userInfo.mobileNumber);
      setUserMobileNumber(userInfo.mobileNumber);
    }

    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setCountryCode(userInfo.countryCode);

      setDateOfBirth(userInfo.dateOfBirth);
      setAnniversaryDate(userInfo.anniversaryDate);
      setGender(userInfo.gender);
      setUserName(userInfo.name);

      setImage(userInfo.image);
    }
    return () => {
      //
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (userInfo.mobileNumber != mobileNumber) {
      setMobileNumber(userInfo.mobileNumber);
      toast.warning("MobileNumber can not be changed without admin permission");
    } else {
      dispatch(
        update({
          name,
          email,
          countryCode,
          mobileNumber,
          image,
          dateOfBirth,
          anniversaryDate,
          gender,
        })
      ).then((res) => {
        toast.success(res.message);
        setUserMobileNumber(userInfo.mobileNumber);
      });
      setUserName(name);
      setUserMobileNumber(userInfo.mobileNumber);
    }
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];

    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setUploading(true);
    axios
      .post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setUploadedImage(response.data);
        setUploading(false);
        setImageModalVisible(false);
        setCropModalVisible(true);
      })
      .catch((err) => {
        setUploading(false);
        setImageModalVisible(false);
      });
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        uploadedImage,
        croppedAreaPixels
      );
      axios
        .post("/api/uploads/crop", { croppedImage, uploadedImage })
        .then((response) => {
          const img = "/temp" + "\\" + response.data + ".jpg";
          setImage(img);
          setCropModalVisible(false);
        })
        .catch((err) => {
          setCropModalVisible(false);
        });
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  return (
    <>
      <Header></Header>
      <Container fluid={true}>
        <Modal
          show={imageModalVisible}
          onHide={() => setImageModalVisible(false)}
          dialogClassName=""
          centered
        >
          <Modal.Body>
            <div className="d-flex justify-content-end">
              <Button
                className="user-info-image-modal-close"
                onClick={() => setImageModalVisible(false)}
              >
                <MdClose></MdClose>
              </Button>
            </div>
            <div className="d-flex">
              <div className="user-info-image-upload">
                <div className="user-info-image-upload-div">
                  <CgSoftwareUpload className="user-info-image-upload-icon"></CgSoftwareUpload>
                  <div>Upload Image</div>
                </div>
                <input
                  autoComplete="off"
                  className="user-info-image-upload-input"
                  type="file"
                  onChange={uploadFileHandler}
                ></input>
                {uploading && <div>Up</div>}
              </div>
              <Button
                className="user-info-image-delete-button"
                onClick={() => (setImage("Nil"), setImageModalVisible(false))}
              >
                <MdDelete className="user-info-image-delete-icon"></MdDelete>{" "}
                Delete Image
              </Button>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={cropModalVisible}
          onHide={() => setCropModalVisible(false)}
          dialogClassName="modal-50w"
          centered
        >
          <Modal.Body>
            <div className="d-flex justify-content-end">
              <Button
                className="user-info-image-modal-close"
                onClick={() => setCropModalVisible(false)}
              >
                <MdClose></MdClose>
              </Button>
            </div>
            <div className="user-info-crop">
              <div className="user-info-crop-container">
                <Cropper
                  image={uploadedImage}
                  crop={crop}
                  zoom={zoom}
                  cropShape="round"
                  aspect={1}
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                />
              </div>
              <div
                style={{ width: "100%" }}
                className="d-flex justify-content-between align-items-center mt-4"
              >
                <div
                  style={{ width: "50%" }}
                  className="d-flex align-items-center mt-2"
                >
                  <div style={{ fontSize: "2rem" }} className="mr-4">
                    ZOOM
                  </div>
                  <div
                    style={{ width: "100%" }}
                    className="d-flex align-items-center"
                  >
                    <Slider
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e, zoom) => setZoom(zoom)}
                    />
                  </div>
                </div>
                <Button
                  className="user-info-crop-button mt-2"
                  onClick={showCroppedImage}
                >
                  Save Image
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Row>
          <Col sm="3">
            <UserSidebar value={"user-info"}></UserSidebar>
          </Col>
          <Col sm="9" className="paddingforbig">
            <Row>
              {image === "Nil" ? (
                <div className="user-info-image-icon">
                  <FaUserCircle></FaUserCircle>
                </div>
              ) : (
                <img
                  className="user-info-image"
                  src={process.env.REACT_APP_IMG_BASEURL + image}
                  alt="farmroots user"
                ></img>
              )}
              <Button
                onClick={() => setImageModalVisible(true)}
                className="user-info-image-edit-button"
              >
                <MdEdit></MdEdit>
              </Button>
              <div>
                <div className="user-info-name">{userName}</div>
                <div className="user-info-mobile">{userMobileNumber}</div>
              </div>
            </Row>
            <Row>
              <Col sm="6" className="mt-3">
                <label className="user-info-form-label" htmlFor="name">
                  Name
                </label>
                <input
                  autoComplete="off"
                  className=" form-control user-info-form-input"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    let telephone = e.target.value;
                    if (telephone.length > 25) {
                      return;
                    }
                    if (
                      e.target.value.match(/^([a-zA-Z0-9_]{1,25})$/) ||
                      telephone === ""
                    ) {
                      telephone = telephone.replace(/\s/g, "");
                      setName(telephone);
                    }
                    // e.target.value.match(/^([a-zA-Z0-9_]{1,25})$/);
                    // setName(e.target.value);
                  }}
                ></input>
              </Col>
              <Col sm="6" className="mt-3">
                <label className="user-info-form-label" htmlFor="email">
                  Email Address
                </label>
                <input
                  autoComplete="off"
                  className="form-control user-info-form-input"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </Col>
            </Row>
            <Row>
              <Col sm="6" className="mt-3">
                <label className="user-info-form-label" htmlFor="countryCode">
                  Country Code &nbsp; Mobile Number
                </label>
                {/* <label className="user-info-form-label" htmlFor="mobileNumber">
                  Mobile Number
                </label> */}
                <Col className="d-flex zeroPadding">
                  <input
                    autoComplete="off"
                    className="form-control user-info-form-input width-20"
                    type="text"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  ></input>

                  <input
                    autoComplete="off"
                    className="form-control user-info-form-input width-80"
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  ></input>
                </Col>
              </Col>
              <Col sm="6" className="mt-3">
                <label className="user-info-form-label" htmlFor="gender">
                  Gender
                </label>
                <select
                  value={gender}
                  className="user-info-form-input center-select admin-modal-form-select form-control"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male"> Male </option>
                  <option value="Female"> Female </option>
                  <option value="Other"> Other </option>
                </select>
              </Col>
            </Row>
            <Row>
              <Col sm="6" className="mt-3">
                <label
                  className="user-info-form-label paddingzero"
                  htmlFor="dateOfBirth"
                >
                  Date of Birth (dd-mm-yyyy)
                </label>
                {dateOfBirth === undefined ? (
                  <input
                    autoComplete="off"
                    className="form-control user-info-form-input height-6"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  ></input>
                ) : (
                  <input
                    autoComplete="off"
                    className="form-control user-info-form-input height-6"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  ></input>
                )}
              </Col>
              <Col sm="6" className="mt-3">
                <label
                  className="user-info-form-label"
                  htmlFor="anniversaryDate"
                >
                  Anniversary Date (dd-mm-yyyy)
                </label>
                {anniversaryDate === undefined ? (
                  <input
                    autoComplete="off"
                    className="form-control user-info-form-input paddingzero height-6"
                    type="date"
                    value={anniversaryDate}
                    onChange={(e) => setAnniversaryDate(e.target.value)}
                  ></input>
                ) : (
                  <input
                    autoComplete="off"
                    className="form-control user-info-form-input paddingzero height-6"
                    type="date"
                    value={anniversaryDate}
                    onChange={(e) => setAnniversaryDate(e.target.value)}
                  ></input>
                )}
              </Col>
            </Row>
            <Row className="centerbtn mb-3">
              <Button
                type="submit"
                onClick={submitHandler}
                className="user-info-form-button"
              >
                Save Changes
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default UserInfoScreen;
