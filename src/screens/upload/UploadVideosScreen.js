import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FiX, FiXCircle } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import axios from "axios";
import UploadSidebar from "../../components/UploadSidebar";
import {
  createVideos,
  editVideos,
  getEmployeeVideos,
  addVideosCookingVideosContent,
  editVideosCookingVideosContent,
  deleteVideosCookingVideosContent,
  addVideosKitchenHacksContent,
  editVideosKitchenHacksContent,
  deleteVideosKitchenHacksContent,
  addVideosHealthTipsContent,
  editVideosHealthTipsContent,
  deleteVideosHealthTipsContent,
} from "../../actions/videosActions";

function UploadVideosScreen(props) {
  const [id, setId] = useState("");
  const [topImage, setTopImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [cookingVideosImage, setCookingVideosImage] = useState("");
  const [cookingVideosHeading, setCookingVideosHeading] = useState("");
  const [cookingVideosText, setCookingVideosText] = useState("");
  const [cookingVideosSloganText, setCookingVideosSloganText] = useState("");
  const [
    cookingVideosSloganBackgroundColor,
    setCookingVideosSloganBackgroundColor,
  ] = useState("");
  const [cookingVideosSloganColor, setCookingVideosSloganColor] = useState("");
  const [kitchenHacksSloganText, setKitchenHacksSloganText] = useState("");
  const [
    kitchenHacksSloganBackgroundColor,
    setKitchenHacksSloganBackgroundColor,
  ] = useState("");
  const [kitchenHacksSloganColor, setKitchenHacksSloganColor] = useState("");
  const [healthTipsSloganText, setHealthTipsSloganText] = useState("");
  const [healthTipsSloganBackgroundColor, setHealthTipsSloganBackgroundColor] =
    useState("");
  const [healthTipsSloganColor, setHealthTipsSloganColor] = useState("");

  const [cookingVideosName, setCookingVideosName] = useState("");
  const [cookingVideosYoutubeLink, setCookingVideosYoutubeLink] = useState("");
  const [cookingVideosRecipe, setCookingVideosRecipe] = useState("");
  const [cookingVideosModalVisible, setCookingVideosModalVisible] =
    useState(false);
  const [cookingVideosId, setCookingVideosId] = useState("");
  const [cookingVideosEdit, setCookingVideosEdit] = useState(false);

  const [kitchenHacksName, setKitchenHacksName] = useState("");
  const [kitchenHacksImage, setKitchenHacksImage] = useState("");
  const [kitchenHacksInfo, setKitchenHacksInfo] = useState("");
  const [kitchenHacksModalVisible, setKitchenHacksModalVisible] =
    useState(false);
  const [kitchenHacksId, setKitchenHacksId] = useState("");
  const [kitchenHacksEdit, setKitchenHacksEdit] = useState(false);

  const [healthTipsName, setHealthTipsName] = useState("");
  const [healthTipsImage, setHealthTipsImage] = useState("");
  const [healthTipsInfo, setHealthTipsInfo] = useState("");
  const [healthTipsModalVisible, setHealthTipsModalVisible] = useState(false);
  const [healthTipsId, setHealthTipsId] = useState("");
  const [healthTipsEdit, setHealthTipsEdit] = useState(false);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);

  const [
    confirmCookingVideosModalVisible,
    setConfirmCookingVideosModalVisible,
  ] = useState(false);
  const [confirmKitchenHacksModalVisible, setConfirmKitchenHacksModalVisible] =
    useState(false);
  const [confirmHealthTipsModalVisible, setConfirmHealthTipsModalVisible] =
    useState(false);

  const dispatch = useDispatch();

  const videosEmployeeGet = useSelector((state) => state.videosEmployeeGet);
  const { loading, videos, error } = videosEmployeeGet;

  const videosCreate = useSelector((state) => state.videosCreate);
  const { success: successCreate } = videosCreate;

  const videosEdit = useSelector((state) => state.videosEdit);
  const { success: successEdit } = videosEdit;

  const videosCookingVideosContentAdd = useSelector(
    (state) => state.videosCookingVideosContentAdd
  );
  const { success: successAddCookingVideosContent } =
    videosCookingVideosContentAdd;

  const videosCookingVideosContentEdit = useSelector(
    (state) => state.videosCookingVideosContentEdit
  );
  const { success: successEditCookingVideosContent } =
    videosCookingVideosContentEdit;

  const videosCookingVideosContentDelete = useSelector(
    (state) => state.videosCookingVideosContentDelete
  );
  const { success: successDeleteCookingVideosContent } =
    videosCookingVideosContentDelete;

  const videosKitchenHacksContentAdd = useSelector(
    (state) => state.videosKitchenHacksContentAdd
  );
  const { success: successAddKitchenHacksContent } =
    videosKitchenHacksContentAdd;

  const videosKitchenHacksContentEdit = useSelector(
    (state) => state.videosKitchenHacksContentEdit
  );
  const { success: successEditKitchenHacksContent } =
    videosKitchenHacksContentEdit;

  const videosKitchenHacksContentDelete = useSelector(
    (state) => state.videosKitchenHacksContentDelete
  );
  const { success: successDeleteKitchenHacksContent } =
    videosKitchenHacksContentDelete;

  const videosHealthTipsContentAdd = useSelector(
    (state) => state.videosHealthTipsContentAdd
  );
  const { success: successAddHealthTipsContent } = videosHealthTipsContentAdd;

  const videosHealthTipsContentEdit = useSelector(
    (state) => state.videosHealthTipsContentEdit
  );
  const { success: successEditHealthTipsContent } = videosHealthTipsContentEdit;

  const videosHealthTipsContentDelete = useSelector(
    (state) => state.videosHealthTipsContentDelete
  );
  const { success: successDeleteHealthTipsContent } =
    videosHealthTipsContentDelete;

  useEffect(() => {
    dispatch(getEmployeeVideos());
    if (successEdit) {
      setEditModalVisible(false);
    }
    if (
      successAddCookingVideosContent ||
      successEditCookingVideosContent ||
      successDeleteCookingVideosContent
    ) {
      setCookingVideosModalVisible(false);
      setCookingVideosEdit(false);
      setCookingVideosId("");
      setCookingVideosYoutubeLink("");
      setCookingVideosRecipe("");
      setCookingVideosName("");
    }
    if (
      successAddKitchenHacksContent ||
      successEditKitchenHacksContent ||
      successDeleteKitchenHacksContent
    ) {
      setKitchenHacksModalVisible(false);
      setKitchenHacksEdit(false);
      setKitchenHacksId("");
      setKitchenHacksImage("");
      setKitchenHacksInfo("");
      setKitchenHacksName("");
    }
    if (
      successAddHealthTipsContent ||
      successEditHealthTipsContent ||
      successDeleteHealthTipsContent
    ) {
      setHealthTipsModalVisible(false);
      setHealthTipsEdit(false);
      setHealthTipsId("");
      setHealthTipsImage("");
      setHealthTipsInfo("");
      setHealthTipsName("");
    }
    return () => {
      //
    };
  }, [
    successCreate,
    successEdit,
    successAddCookingVideosContent,
    successEditCookingVideosContent,
    successDeleteCookingVideosContent,
    successAddKitchenHacksContent,
    successEditKitchenHacksContent,
    successDeleteKitchenHacksContent,
    successAddHealthTipsContent,
    successEditHealthTipsContent,
    successDeleteHealthTipsContent,
  ]);

  const saveChanges = () => {
    if (edit) {
      dispatch(
        editVideos({
          _id: id,
          topImage,
          cookingVideosImage,
          cookingVideosHeading,
          cookingVideosText,
          cookingVideosSloganText,
          cookingVideosSloganBackgroundColor,
          cookingVideosSloganColor,
          kitchenHacksSloganText,
          kitchenHacksSloganBackgroundColor,
          kitchenHacksSloganColor,
          healthTipsSloganText,
          healthTipsSloganBackgroundColor,
          healthTipsSloganColor,
        })
      );
    } else {
      dispatch(
        createVideos({
          topImage,
          cookingVideosImage,
          cookingVideosHeading,
          cookingVideosText,
          cookingVideosSloganText,
          cookingVideosSloganBackgroundColor,
          cookingVideosSloganColor,
          kitchenHacksSloganText,
          kitchenHacksSloganBackgroundColor,
          kitchenHacksSloganColor,
          healthTipsSloganText,
          healthTipsSloganBackgroundColor,
          healthTipsSloganColor,
        })
      );
    }
    window.location.reload();
  };

  const openModal = (videos) => {
    if (videos._id) {
      setId(videos._id);
      setTopImage(videos.topImage);
      setCookingVideosImage(videos.cookingVideosImage);
      setCookingVideosHeading(videos.cookingVideosHeading);
      setCookingVideosText(videos.cookingVideosText);
      setCookingVideosSloganText(videos.cookingVideosSloganText);
      setCookingVideosSloganBackgroundColor(
        videos.cookingVideosSloganBackgroundColor
      );
      setCookingVideosSloganColor(videos.cookingVideosSloganColor);
      setKitchenHacksSloganText(videos.kitchenHacksSloganText);
      setKitchenHacksSloganBackgroundColor(
        videos.kitchenHacksSloganBackgroundColor
      );
      setKitchenHacksSloganColor(videos.kitchenHacksSloganColor);
      setHealthTipsSloganText(videos.healthTipsSloganText);
      setHealthTipsSloganBackgroundColor(
        videos.healthTipsSloganBackgroundColor
      );
      setHealthTipsSloganColor(videos.healthTipsSloganColor);

      setEdit(true);
      setEditModalVisible(true);
    }
  };

  const uploadImage1Handler = (e) => {
    const file = e.target.files[0];
    setUploading(true);
    setTopImage(file.name);
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
        // setImage1(response.data);
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
      });
  };
  const uploadImage2Handler = (e) => {
    const file = e.target.files[0];
    setUploading(true);
    setCookingVideosImage(file.name);
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
        // setImage1(response.data);
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
      });
  };

  const uploadImage3Handler = (e) => {
    const file = e.target.files[0];
    setUploading(true);
    setKitchenHacksImage(file.name);
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
        // setImage1(response.data);
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
      });
  };

  const uploadImage4Handler = (e) => {
    const file = e.target.files[0];
    setUploading(true);
    setHealthTipsImage(file.name);
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
        // setImage1(response.data);
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
      });
  };

  const uploadImage5Handler = (e) => {
    const file = e.target.files[0];
    setUploading(true);
    setCookingVideosRecipe(file.name);
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
        // setImage1(response.data);
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
      });
  };
  const openCookingVideosEditModal = (cookingVideos) => {
    setCookingVideosName(cookingVideos.name);
    setCookingVideosId(cookingVideos._id);
    setCookingVideosYoutubeLink(cookingVideos.youtubeLink);
    // setCookingVideosRecipe(cookingVideos.recipe);
    setCookingVideosEdit(true);
    setCookingVideosModalVisible(true);
  };

  const confirmCookingVideosModalHandler = (cookingVideos) => {
    setCookingVideosId(cookingVideos._id);
    setConfirmCookingVideosModalVisible(true);
  };

  const deleteCookingVideosHandler = () => {
    dispatch(deleteVideosCookingVideosContent({ id: cookingVideosId }));
    setConfirmCookingVideosModalVisible(false);
  };

  const cookingVideosHandler = (e) => {
    e.preventDefault();
    if (!cookingVideosEdit) {
      dispatch(
        addVideosCookingVideosContent({
          name: cookingVideosName,
          youtubeLink: cookingVideosYoutubeLink,
          recipe: cookingVideosRecipe.split(";").map((item) => item.trim()),
        })
      );
    } else {
      dispatch(
        editVideosCookingVideosContent({
          id: cookingVideosId,
          name: cookingVideosName,
          youtubeLink: cookingVideosYoutubeLink,
          recipe: cookingVideosRecipe.split(";").map((item) => item.trim()),
        })
      );
    }
    window.location.reload();
  };

  const openKitchenHacksEditModal = (kitchenHacks) => {
    setKitchenHacksName(kitchenHacks.name);
    setKitchenHacksId(kitchenHacks._id);
    setKitchenHacksImage(kitchenHacks.image);
    setKitchenHacksInfo(kitchenHacks.info);
    setKitchenHacksEdit(true);
    setKitchenHacksModalVisible(true);
  };

  const confirmKitchenHacksModalHandler = (kitchenHacks) => {
    setKitchenHacksId(kitchenHacks._id);
    setConfirmKitchenHacksModalVisible(true);
  };

  const deleteKitchenHacksHandler = () => {
    dispatch(deleteVideosKitchenHacksContent({ id: kitchenHacksId }));
    setConfirmKitchenHacksModalVisible(false);
  };

  const kitchenHacksHandler = (e) => {
    e.preventDefault();
    if (!kitchenHacksEdit) {
      dispatch(
        addVideosKitchenHacksContent({
          name: kitchenHacksName,
          image: kitchenHacksImage,
          info: kitchenHacksInfo,
        })
      );
    } else {
      dispatch(
        editVideosKitchenHacksContent({
          id: kitchenHacksId,
          name: kitchenHacksName,
          image: kitchenHacksImage,
          info: kitchenHacksInfo,
        })
      );
    }
    window.location.reload();
  };

  const openHealthTipsEditModal = (healthTips) => {
    setHealthTipsName(healthTips.name);
    setHealthTipsId(healthTips._id);
    setHealthTipsImage(healthTips.image);
    setHealthTipsInfo(healthTips.info);
    setHealthTipsEdit(true);
    setHealthTipsModalVisible(true);
  };

  const confirmHealthTipsModalHandler = (healthTips) => {
    setHealthTipsId(healthTips._id);
    setConfirmHealthTipsModalVisible(true);
  };

  const deleteHealthTipsHandler = () => {
    dispatch(deleteVideosHealthTipsContent({ id: healthTipsId }));
    setConfirmHealthTipsModalVisible(false);
  };

  const healthTipsHandler = (e) => {
    e.preventDefault();
    if (!healthTipsEdit) {
      dispatch(
        addVideosHealthTipsContent({
          name: healthTipsName,
          image: healthTipsImage,
          info: healthTipsInfo,
        })
      );
    } else {
      dispatch(
        editVideosHealthTipsContent({
          id: healthTipsId,
          name: healthTipsName,
          image: healthTipsImage,
          info: healthTipsInfo,
        })
      );
    }
    window.location.reload();
  };

  return (
    <div className="grid">
      <div className="grid-header">
        <Header></Header>
      </div>

      <Modal
        show={confirmCookingVideosModalVisible}
        onHide={() => setConfirmCookingVideosModalVisible(false)}
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
              Do you really want to delete this cooking video? This process
              cannot be undone.
            </div>
            <div className="confirm-buttons">
              <Button
                onClick={() => setConfirmCookingVideosModalVisible(false)}
                className="confirm-no-button"
              >
                No
              </Button>
              <Button
                onClick={deleteCookingVideosHandler}
                className="confirm-yes-button"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={confirmKitchenHacksModalVisible}
        onHide={() => setConfirmKitchenHacksModalVisible(false)}
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
              Do you really want to delete this kitchen hack? This process
              cannot be undone.
            </div>
            <div className="confirm-buttons">
              <Button
                onClick={() => setConfirmKitchenHacksModalVisible(false)}
                className="confirm-no-button"
              >
                No
              </Button>
              <Button
                onClick={deleteKitchenHacksHandler}
                className="confirm-yes-button"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={confirmHealthTipsModalVisible}
        onHide={() => setConfirmHealthTipsModalVisible(false)}
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
              Do you really want to delete this health tip? This process cannot
              be undone.
            </div>
            <div className="confirm-buttons">
              <Button
                onClick={() => setConfirmHealthTipsModalVisible(false)}
                className="confirm-no-button"
              >
                No
              </Button>
              <Button
                onClick={deleteHealthTipsHandler}
                className="confirm-yes-button"
              >
                Yes
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={cookingVideosModalVisible}
        onHide={() => setCookingVideosModalVisible(false)}
        dialogClassName="modal-50w"
        centered
      >
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div className="admin-uploads-modal-heading">
              Enter Cooking Video Details
            </div>
            <Button
              className="admin-uploads-modal-button"
              onClick={() => setCookingVideosModalVisible(false)}
            >
              <FiX></FiX>
            </Button>
          </div>
          <form className="admin-uploads-form" onSubmit={cookingVideosHandler}>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100%", marginBottom: "2rem" }}
            >
              <label className="admin-uploads-label">Video Name</label>
              <input
                autoComplete="off"
                className="admin-uploads-input"
                type="text"
                name="cookingVideosName"
                value={cookingVideosName}
                onChange={(e) => setCookingVideosName(e.target.value)}
              ></input>
            </div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100%", marginBottom: "2rem" }}
            >
              <label className="admin-uploads-label">Video Link</label>
              <input
                autoComplete="off"
                placeholder="https://www.youtube.com/embed/jnkjnckjn"
                className="admin-uploads-input"
                type="text"
                name="cookingVideosYoutubeLink"
                value={cookingVideosYoutubeLink}
                onChange={(e) => setCookingVideosYoutubeLink(e.target.value)}
              ></input>
            </div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100%" }}
            >
              <label className="admin-uploads-label">Video Recipe</label>
              {/* <textarea placeholder="Boil water; Put 1 table spoon salt" className="admin-uploads-textarea" type="text" name="cookingVideosRecipe" value={cookingVideosRecipe} onChange={(e) => setCookingVideosRecipe(e.target.value)}></textarea> */}
              {/* <input
                placeholder="Boil water; Put 1 table spoon salt"
                className="admin-uploads-textarea"
                type="file"
                name="cookingVideosRecipe"
                value={cookingVideosRecipe}
                onChange={uploadImage5Handler}
              ></input> */}

              <input
                autoComplete="off"
                type="file"
                name="image1"
                onChange={uploadImage5Handler}
                className="admin-modal-form-input"
              ></input>


            </div>
            <Button type="submit" className="admin-uploads-submit">
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal
        show={kitchenHacksModalVisible}
        onHide={() => setKitchenHacksModalVisible(false)}
        dialogClassName="modal-50w"
        centered
      >
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div className="admin-uploads-modal-heading">
              Enter Kitchen Hack Details
            </div>
            <Button
              className="admin-uploads-modal-button"
              onClick={() => setKitchenHacksModalVisible(false)}
            >
              <FiX></FiX>
            </Button>
          </div>
          <form className="admin-uploads-form" onSubmit={kitchenHacksHandler}>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100%", marginBottom: "2rem" }}
            >
              <label className="admin-uploads-label">Kitchen Hack Name</label>
              <input
                autoComplete="off"
                className="admin-uploads-input"
                type="text"
                name="kitchenHacksName"
                value={kitchenHacksName}
                onChange={(e) => setKitchenHacksName(e.target.value)}
              ></input>
            </div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100%", marginBottom: "2rem" }}
            >
              <label className="admin-uploads-label">Kitchen Hack Image</label>
              <input
                autoComplete="off"
                type="file"
                name="image1"
                onChange={uploadImage3Handler}
                className="admin-modal-form-input admin-form-div-input"
              ></input>
              {/* <input autoComplete="off" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg" className="admin-uploads-input" type="text" name="kitchenHacksImage" value={kitchenHacksImage} onChange={(e) => setKitchenHacksImage(e.target.value)}></input> */}
            </div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100%" }}
            >
              <label className="admin-uploads-label">Kitchen Hack Info</label>
              <textarea
                className="admin-uploads-textarea"
                type="text"
                name="kitchenHacksInfo"
                value={kitchenHacksInfo}
                onChange={(e) => setKitchenHacksInfo(e.target.value)}
              ></textarea>
            </div>
            <Button type="submit" className="admin-uploads-submit">
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <Modal
        show={healthTipsModalVisible}
        onHide={() => setHealthTipsModalVisible(false)}
        dialogClassName="modal-50w"
        centered
      >
        <Modal.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div className="admin-uploads-modal-heading">
              Enter Health Tip Details
            </div>
            <Button
              className="admin-uploads-modal-button"
              onClick={() => setHealthTipsModalVisible(false)}
            >
              <FiX></FiX>
            </Button>
          </div>
          <form className="admin-uploads-form" onSubmit={healthTipsHandler}>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100%", marginBottom: "2rem" }}
            >
              <label className="admin-uploads-label">Health Tip Name</label>
              <input
                autoComplete="off"
                className="admin-uploads-input"
                type="text"
                name="healthTipsName"
                value={healthTipsName}
                onChange={(e) => setHealthTipsName(e.target.value)}
              ></input>
            </div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100%", marginBottom: "2rem" }}
            >
              <label className="admin-uploads-label">Health Tip Image</label>
              <input
                autoComplete="off"
                type="file"
                name="image1"
                onChange={uploadImage4Handler}
                className="admin-modal-form-input admin-form-div-input"
              ></input>
              {/* <input autoComplete="off" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg" className="admin-uploads-input" type="text" name="healthTipsImage" value={healthTipsImage} onChange={(e) => setHealthTipsImage(e.target.value)}></input> */}
            </div>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "100%" }}
            >
              <label className="admin-uploads-label">Health Tip Info</label>
              <textarea
                className="admin-uploads-textarea"
                type="text"
                name="healthTipsInfo"
                value={healthTipsInfo}
                onChange={(e) => setHealthTipsInfo(e.target.value)}
              ></textarea>
            </div>
            <Button type="submit" className="admin-uploads-submit">
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      <div className="main">
        <div className="d-flex">
          <UploadSidebar value="Videos"></UploadSidebar>
          <div className="admin-content">
            {loading ? (
              <div></div>
            ) : error ? (
              <div>{error.message}</div>
            ) : (
              <>
                {!videos._id ? (
                  <div>
                    <div className="admin-header">
                      <div
                        className="admin-header-text"
                        style={{ marginLeft: "1rem" }}
                      >
                        Videos Data
                      </div>
                      <div className="d-flex align-items-center">
                        <Button
                          onClick={saveChanges}
                          className="admin-header-button"
                        >
                          Create Videos
                        </Button>
                      </div>
                    </div>
                    <form className="admin-form">
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">Top Image</label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={topImage}
                          onChange={(e) => setTopImage(e.target.value)}
                          type="text"
                          placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Image
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={cookingVideosImage}
                          onChange={(e) =>
                            setCookingVideosImage(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Heading
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={cookingVideosHeading}
                          onChange={(e) =>
                            setCookingVideosHeading(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Videos"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Text
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={cookingVideosText}
                          onChange={(e) => setCookingVideosText(e.target.value)}
                          type="text"
                          placeholder="Eg. We present here..."
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Slogan Text
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={cookingVideosSloganText}
                          onChange={(e) =>
                            setCookingVideosSloganText(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Explore the foodie in you"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Slogan Background Color
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={cookingVideosSloganBackgroundColor}
                          onChange={(e) =>
                            setCookingVideosSloganBackgroundColor(
                              e.target.value
                            )
                          }
                          type="text"
                          placeholder="Eg. 000000 (Color hex code)"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Slogan Color
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={cookingVideosSloganColor}
                          onChange={(e) =>
                            setCookingVideosSloganColor(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. ffffff (Color hex code)"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          KitchenHacks Slogan Text
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={kitchenHacksSloganText}
                          onChange={(e) =>
                            setKitchenHacksSloganText(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. The finest flavors explored"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Kitchen Hacks Slogan Background Color
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={kitchenHacksSloganBackgroundColor}
                          onChange={(e) =>
                            setKitchenHacksSloganBackgroundColor(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. 000000 (Color hex code)"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Kitchen Hacks Slogan Color
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={kitchenHacksSloganColor}
                          onChange={(e) =>
                            setKitchenHacksSloganColor(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. ffffff (Color hex code)"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Health Tips Slogan Text
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={healthTipsSloganText}
                          onChange={(e) =>
                            setHealthTipsSloganText(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Eat the best, leave the rest"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Health Tips Slogan Background Color
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={healthTipsSloganBackgroundColor}
                          onChange={(e) =>
                            setHealthTipsSloganBackgroundColor(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. 000000 (Color hex code)"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Health Tips Slogan Color
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={healthTipsSloganColor}
                          onChange={(e) =>
                            setHealthTipsSloganColor(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. ffffff (Color hex code)"
                        ></input>
                      </div>
                    </form>
                  </div>
                ) : editModalVisible ? (
                  <div>
                    <div className="admin-header">
                      <div
                        className="admin-header-text"
                        style={{ marginLeft: "1rem" }}
                      >
                        Videos Data
                      </div>
                      <div className="d-flex align-items-center">
                        <Button
                          onClick={saveChanges}
                          className="admin-header-button"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                    <form className="admin-form">
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">Top Image</label>
                        <input
                          autoComplete="off"
                          type="file"
                          name="image1"
                          onChange={uploadImage1Handler}
                          className="admin-modal-form-input admin-form-div-input"
                        ></input>
                        {/* <input autoComplete="off" className="admin-form-input" value={topImage} onChange={(e) => setTopImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input> */}
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Image
                        </label>
                        <input
                          autoComplete="off"
                          type="file"
                          name="image1"
                          onChange={uploadImage2Handler}
                          className="admin-modal-form-input admin-form-div-input"
                        ></input>
                        {/* <input autoComplete="off" className="admin-form-input" value={cookingVideosImage} onChange={(e) => setCookingVideosImage(e.target.value)} type="text" placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"></input> */}
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Heading
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={cookingVideosHeading}
                          onChange={(e) =>
                            setCookingVideosHeading(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Videos"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Text
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={cookingVideosText}
                          onChange={(e) => setCookingVideosText(e.target.value)}
                          type="text"
                          placeholder="Eg. We present here..."
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Slogan Text
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={cookingVideosSloganText}
                          onChange={(e) =>
                            setCookingVideosSloganText(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Explore the foodie in you"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Slogan Background Color
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={cookingVideosSloganBackgroundColor}
                          onChange={(e) =>
                            setCookingVideosSloganBackgroundColor(
                              e.target.value
                            )
                          }
                          type="text"
                          placeholder="Eg. 000000 (Color hex code)"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Slogan Color
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={cookingVideosSloganColor}
                          onChange={(e) =>
                            setCookingVideosSloganColor(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. ffffff (Color hex code)"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          KitchenHacks Slogan Text
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={kitchenHacksSloganText}
                          onChange={(e) =>
                            setKitchenHacksSloganText(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. The finest flavors explored"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Kitchen Hacks Slogan Background Color
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={kitchenHacksSloganBackgroundColor}
                          onChange={(e) =>
                            setKitchenHacksSloganBackgroundColor(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. 000000 (Color hex code)"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Kitchen Hacks Slogan Color
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={kitchenHacksSloganColor}
                          onChange={(e) =>
                            setKitchenHacksSloganColor(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. ffffff (Color hex code)"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Health Tips Slogan Text
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={healthTipsSloganText}
                          onChange={(e) =>
                            setHealthTipsSloganText(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Eat the best, leave the rest"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Health Tips Slogan Background Color
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={healthTipsSloganBackgroundColor}
                          onChange={(e) =>
                            setHealthTipsSloganBackgroundColor(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. 000000 (Color hex code)"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Health Tips Slogan Color
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={healthTipsSloganColor}
                          onChange={(e) =>
                            setHealthTipsSloganColor(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. ffffff (Color hex code)"
                        ></input>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div>
                    <div className="admin-header">
                      <div
                        className="admin-header-text"
                        style={{ marginLeft: "1rem" }}
                      >
                        Videos Data
                      </div>
                      <div className="d-flex align-items-center">
                        <Button
                          onClick={() => setHealthTipsModalVisible(true)}
                          className="admin-header-button"
                        >
                          Add Health Tips
                        </Button>
                        <Button
                          onClick={() => setKitchenHacksModalVisible(true)}
                          className="admin-header-button"
                        >
                          Add Kitchen Hacks
                        </Button>
                        <Button
                          onClick={() => setCookingVideosModalVisible(true)}
                          className="admin-header-button"
                        >
                          Add Cooking Videos
                        </Button>
                        <Button
                          onClick={() => openModal(videos)}
                          className="admin-header-button"
                        >
                          Edit Videos
                        </Button>
                      </div>
                    </div>
                    <table
                      style={{ marginTop: "2rem" }}
                      className="table table-striped table-bordered"
                    >
                      <thead style={{ fontSize: "1.8rem" }}>
                        <tr>
                          <th>Cooking Video ID</th>
                          <th>Name</th>
                          <th>Youtube Link</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {videos.cookingVideosContent.map(
                          (cookingVideos, index) => (
                            <tr key={cookingVideos._id}>
                              <td>{Number(index) + 1}</td>
                              <td>{cookingVideos.name}</td>
                              <td>{cookingVideos.youtubeLink}</td>
                              <td className="d-flex">
                                <Button
                                  onClick={() =>
                                    openCookingVideosEditModal(cookingVideos)
                                  }
                                  className="admin-table-button"
                                >
                                  Edit
                                </Button>
                                <Button
                                  onClick={() =>
                                    confirmCookingVideosModalHandler(
                                      cookingVideos
                                    )
                                  }
                                  className="admin-table-button"
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                    <table
                      style={{ marginTop: "2rem" }}
                      className="table table-striped table-bordered"
                    >
                      <thead style={{ fontSize: "1.8rem" }}>
                        <tr>
                          <th>Kitchen Hack ID</th>
                          <th>Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {videos.kitchenHacksContent.map(
                          (kitchenHacks, index) => (
                            <tr key={kitchenHacks._id}>
                              <td>{Number(index) + 1}</td>
                              <td>{kitchenHacks.name}</td>
                              <td className="d-flex">
                                <Button
                                  onClick={() =>
                                    openKitchenHacksEditModal(kitchenHacks)
                                  }
                                  className="admin-table-button"
                                >
                                  Edit
                                </Button>
                                <Button
                                  onClick={() =>
                                    confirmKitchenHacksModalHandler(
                                      kitchenHacks
                                    )
                                  }
                                  className="admin-table-button"
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                    <table
                      style={{ marginTop: "2rem" }}
                      className="table table-striped table-bordered"
                    >
                      <thead style={{ fontSize: "1.8rem" }}>
                        <tr>
                          <th>Health Tip ID</th>
                          <th>Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {videos.healthTipsContent.map((healthTips, index) => (
                          <tr key={healthTips._id}>
                            <td>{Number(index) + 1}</td>
                            <td>{healthTips.name}</td>
                            <td className="d-flex">
                              <Button
                                onClick={() =>
                                  openHealthTipsEditModal(healthTips)
                                }
                                className="admin-table-button"
                              >
                                Edit
                              </Button>
                              <Button
                                onClick={() =>
                                  confirmHealthTipsModalHandler(healthTips)
                                }
                                className="admin-table-button"
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <form className="admin-form">
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">Top Image</label>
                        <div className="admin-form-div-input">
                          {videos.topImage}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Image
                        </label>
                        <div className="admin-form-div-input">
                          {videos.cookingVideosImage}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Heading
                        </label>
                        <div className="admin-form-div-input">
                          {videos.cookingVideosHeading}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Text
                        </label>
                        <div className="admin-form-textarea">
                          {videos.cookingVideosText}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Slogan Text
                        </label>
                        <div className="admin-form-div-input">
                          {videos.cookingVideosSloganText}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Slogan Background Color
                        </label>
                        <div className="admin-form-div-input">
                          {videos.cookingVideosSloganBackgroundColor}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Cooking Videos Slogan Color
                        </label>
                        <div className="admin-form-div-input">
                          {videos.cookingVideosSloganColor}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Kitchen Hacks Slogan Text
                        </label>
                        <div className="admin-form-div-input">
                          {videos.kitchenHacksSloganText}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Kitchen Hacks Slogan Background Color
                        </label>
                        <div className="admin-form-div-input">
                          {videos.kitchenHacksSloganBackgroundColor}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Kitchen Hacks Slogan Color
                        </label>
                        <div className="admin-form-div-input">
                          {videos.kitchenHacksSloganColor}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Health Tips Slogan Text
                        </label>
                        <div className="admin-form-div-input">
                          {videos.healthTipsSloganText}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Health Tips Slogan Background Color
                        </label>
                        <div className="admin-form-div-input">
                          {videos.healthTipsSloganBackgroundColor}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Health Tips Slogan Color
                        </label>
                        <div className="admin-form-div-input">
                          {videos.healthTipsSloganColor}
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadVideosScreen;
