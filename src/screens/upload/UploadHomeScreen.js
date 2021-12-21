import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import UploadSidebar from "../../components/UploadSidebar";
import {
  createHomeScreen,
  editHomeScreen,
  getEmployeeHomeScreen,
} from "../../actions/homeScreenActions";
import axios from "axios";

function UploadHomeScreen(props) {
  const [id, setId] = useState("");
  const [topMostImage, setTopMostImage] = useState("");
  const [promotionBanners, setPromotionBanners] = useState("");
  const [promotionBannersLink, setPromotionBannersLink] = useState("");

  const [reviewHeading, setReviewHeading] = useState("");
  const [review1Image, setReview1Image] = useState("");
  const [review1Comment, setReview1Comment] = useState("");
  const [review1UserDetails, setReview1UserDetails] = useState("");
  const [review2Image, setReview2Image] = useState("");
  const [review2Comment, setReview2Comment] = useState("");
  const [review2UserDetails, setReview2UserDetails] = useState("");
  const [review3Image, setReview3Image] = useState("");
  const [review3Comment, setReview3Comment] = useState("");
  const [review3UserDetails, setReview3UserDetails] = useState("");
  const [review4Image, setReview4Image] = useState("");
  const [review4Comment, setReview4Comment] = useState("");
  const [review4UserDetails, setReview4UserDetails] = useState("");
  const [partnerHeading, setPartnerHeading] = useState("");
  const [partnerLogoImages, setPartnerLogoImages] = useState("");
  const [career1Image, setCareer1Image] = useState("");
  const [career1Name, setCareer1Name] = useState("");
  const [career1Information, setCareer1Information] = useState("");
  const [career1ButtonText, setCareer1ButtonText] = useState("");
  const [career2Image, setCareer2Image] = useState("");
  const [career2Name, setCareer2Name] = useState("");
  const [career2Information, setCareer2Information] = useState("");
  const [career2ButtonText, setCareer2ButtonText] = useState("");
  const [career3Image, setCareer3Image] = useState("");
  const [career3Name, setCareer3Name] = useState("");
  const [career3Information, setCareer3Information] = useState("");
  const [career3ButtonText, setCareer3ButtonText] = useState("");
  const [uploading, setUploading] = useState(false);
  // const [image1, setImage1] = useState("");

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [edit, setEdit] = useState(false);

  const dispatch = useDispatch();

  const homeScreenGet = useSelector((state) => state.homeScreenGet);
  const { loading, homeScreen, error } = homeScreenGet;

  const homeScreenCreate = useSelector((state) => state.homeScreenCreate);
  const { success: successCreate } = homeScreenCreate;

  const homeScreenEdit = useSelector((state) => state.homeScreenEdit);
  const { success: successEdit } = homeScreenEdit;

  useEffect(() => {
    dispatch(getEmployeeHomeScreen());
    if (successEdit) {
      setEditModalVisible(false);
    }
    return () => {
      //
    };
  }, [successCreate, successEdit]);

  const saveChanges = () => {


    var reviewContent = [];

    var reviewUserDetails = review1UserDetails
      .split(",")
      .map((item) => item.trim());
    reviewContent.push({
      image: review1Image,
      comment: review1Comment,
      name: reviewUserDetails[0],
      age: reviewUserDetails[1],
      location: reviewUserDetails[2],
    });
    var reviewUserDetails = review2UserDetails
      .split(",")
      .map((item) => item.trim());
    reviewContent.push({
      image: review2Image,
      comment: review2Comment,
      name: reviewUserDetails[0],
      age: reviewUserDetails[1],
      location: reviewUserDetails[2],
    });
    var reviewUserDetails = review3UserDetails
      .split(",")
      .map((item) => item.trim());
    reviewContent.push({
      image: review3Image,
      comment: review3Comment,
      name: reviewUserDetails[0],
      age: reviewUserDetails[1],
      location: reviewUserDetails[2],
    });
    var reviewUserDetails = review4UserDetails
      .split(",")
      .map((item) => item.trim());
    reviewContent.push({
      image: review4Image,
      comment: review4Comment,
      name: reviewUserDetails[0],
      age: reviewUserDetails[1],
      location: reviewUserDetails[2],
    });

    var careerContent = [];

    careerContent.push({
      image: career1Image,
      name: career1Name,
      information: career1Information,
      buttonText: career1ButtonText,
    });
    careerContent.push({
      image: career2Image,
      name: career2Name,
      information: career2Information,
      buttonText: career2ButtonText,
    });
    careerContent.push({
      image: career3Image,
      name: career3Name,
      information: career3Information,
      buttonText: career3ButtonText,
    });

    dispatch(
      editHomeScreen({
        _id: id,
        firstImage: topMostImage,
        promotionBanners: promotionBanners
          .split(",")
          .map((item) => item.trim()),
        reviewHeading: reviewHeading,
        reviewContent: reviewContent,
        partnerHeading: partnerHeading,
        partnerLogoImages: partnerLogoImages
          .split(",")
          .map((item) => item.trim()),
        careerContent: careerContent,
        promotionBannersLink: promotionBannersLink
          .split(",")
          .map((item) => item.trim()),
      })
    );

    if (edit) {
      dispatch(
        editHomeScreen({
          _id: id,
          firstImage: topMostImage,
          promotionBanners: promotionBanners
            .split(",")
            .map((item) => item.trim()),
          reviewHeading: reviewHeading,
          reviewContent: reviewContent,
          partnerHeading: partnerHeading,
          partnerLogoImages: partnerLogoImages
            .split(",")
            .map((item) => item.trim()),
          careerContent: careerContent,
          promotionBannersLink: promotionBannersLink
            .split(",")
            .map((item) => item.trim()),
        })
      );
    } else {
      dispatch(
        createHomeScreen({
          firstImage: topMostImage,
          promotionBanners: promotionBanners
            .split(",")
            .map((item) => item.trim()),
          reviewHeading: reviewHeading,
          reviewContent: reviewContent,
          partnerHeading: partnerHeading,
          partnerLogoImages: partnerLogoImages
            .split(",")
            .map((item) => item.trim()),
          careerContent: careerContent,
          promotionBannersLink: promotionBannersLink
            .split(",")
            .map((item) => item.trim()),
        })
      );
    }

    window.location.reload();
  };

  // function getPromotionBannerString(promotionBanners) {
  //   var promotionBannersString = "";
  //   for (const promotionBanner of promotionBanners) {
  //     promotionBannersString =
  //       promotionBannersString +
  //       promotionBanner.product +
  //       ", " +
  //       promotionBanner.image +
  //       "; ";
  //   }
  //   promotionBannersString = promotionBannersString.substr(
  //     0,
  //     promotionBannersString.length - 2
  //   );

  //   return promotionBannersString;
  // }

  const openModal = (homeScreen) => {
    if (homeScreen._id) {
      setId(homeScreen._id);
      setTopMostImage(homeScreen.firstImage);
      setPromotionBanners(homeScreen.promotionBanners.join(", "));
      setPromotionBanners(homeScreen.promotionBannersLink.join(", "));
      // getPromotionBannerString(homeScreen.promotionBanners),
      setReviewHeading(homeScreen.reviewHeading);
      setReview1Image(homeScreen.reviewContent[0].image);
      setReview1Comment(homeScreen.reviewContent[0].comment);
      var reviewUserDetails =
        homeScreen.reviewContent[0].name +
        ", " +
        homeScreen.reviewContent[0].age +
        ", " +
        homeScreen.reviewContent[0].location;
      setReview1UserDetails(reviewUserDetails);
      setReview2Image(homeScreen.reviewContent[1].image);
      setReview2Comment(homeScreen.reviewContent[1].comment);
      var reviewUserDetails =
        homeScreen.reviewContent[1].name +
        ", " +
        homeScreen.reviewContent[1].age +
        ", " +
        homeScreen.reviewContent[1].location;
      setReview2UserDetails(reviewUserDetails);
      setReview3Image(homeScreen.reviewContent[2].image);
      setReview3Comment(homeScreen.reviewContent[2].comment);
      var reviewUserDetails =
        homeScreen.reviewContent[2].name +
        ", " +
        homeScreen.reviewContent[2].age +
        ", " +
        homeScreen.reviewContent[2].location;
      setReview3UserDetails(reviewUserDetails);
      setReview4Image(homeScreen.reviewContent[3].image);
      setReview4Comment(homeScreen.reviewContent[3].comment);
      var reviewUserDetails =
        homeScreen.reviewContent[3].name +
        ", " +
        homeScreen.reviewContent[3].age +
        ", " +
        homeScreen.reviewContent[3].location;
      setReview4UserDetails(reviewUserDetails);
      setPartnerHeading(homeScreen.partnerHeading);
      setPartnerLogoImages(homeScreen.partnerLogoImages.join(", "));
      setCareer1Image(homeScreen.careerContent[0].image);
      setCareer1Name(homeScreen.careerContent[0].name);
      setCareer1Information(homeScreen.careerContent[0].information);
      setCareer1ButtonText(homeScreen.careerContent[0].buttonText);
      setCareer2Image(homeScreen.careerContent[1].image);
      setCareer2Name(homeScreen.careerContent[1].name);
      setCareer2Information(homeScreen.careerContent[1].information);
      setCareer2ButtonText(homeScreen.careerContent[1].buttonText);
      setCareer3Image(homeScreen.careerContent[2].image);
      setCareer3Name(homeScreen.careerContent[2].name);
      setCareer3Information(homeScreen.careerContent[2].information);
      setCareer3ButtonText(homeScreen.careerContent[2].buttonText);
      setEdit(true);
      setEditModalVisible(true);
    }
  };

  const uploadImage1Handler = (e) => {
    const file = e.target.files[0];
    setUploading(true);
    setTopMostImage(file.name);
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
        console.log(err);
        setUploading(false);
      });
  };
  const uploadImage2Handler = (e) => {
    const file = e.target.files[0];
    setUploading(true);
    setReview1Image(file.name);
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
        console.log(err);
        setUploading(false);
      });
  };
  var image = "";
  const uploadImagePormotionalHandler1 = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      setUploading(true);
      image = image + file.name + ",";
      setPromotionBanners(image);
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
          console.log(err);
          setUploading(false);
        });
    }
  };

  const uploadImag3Handler = (e) => {
    const file = e.target.files[0];
    setUploading(true);
    setReview2Image(file.name);
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
        console.log(err);
        setUploading(false);
      });
  };
  const uploadImageReviewHandler = (e) => {
    const file = e.target.files[0];
    setUploading(true);
    setReview4Image(file.name);
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
        console.log(err);
        setUploading(false);
      });
  };

  const uploadImage4Handler = (e) => {
    const file = e.target.files[0];
    setUploading(true);
    setReview3Image(file.name);
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
        console.log(err);
        setUploading(false);
      });
  };

  var image = "";
  const uploadImage6multipleHandler = (e) => {
    for (var i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      setUploading(true);
      image = image + file.name + ",";
      setPartnerLogoImages(image);
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
          console.log(err);
          setUploading(false);
        });
    }
  };
  const uploadImage7Handler = (e) => {
    const file = e.target.files[0];
    setUploading(true);
    setCareer1Image(file.name);
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
        console.log(err);
        setUploading(false);
      });
  };
  const uploadImage8Handler = (e) => {
    const file = e.target.files[0];
    setUploading(true);
    setCareer2Image(file.name);
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
  const uploadImage9Handler = (e) => {
    const file = e.target.files[0];
    setUploading(true);
    setCareer3Image(file.name);
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
        console.log(err);
        setUploading(false);
      });
  };
  return (
    <div className="grid">
      <div className="grid-header">
        <Header></Header>
      </div>
      <div className="main">
        <div className="d-flex">
          <UploadSidebar value="HomeScreen"></UploadSidebar>
          <div className="admin-content">
            {loading ? (
              <div></div>
            ) : error ? (
              <div>{error.message}</div>
            ) : (
              <>
                {!homeScreen._id ? (
                  <div>
                    <div className="admin-header">
                      <div
                        className="admin-header-text"
                        style={{ marginLeft: "1rem" }}
                      >
                        Home Screen Data
                      </div>
                      <div className="d-flex align-items-center">
                        <Button
                          onClick={saveChanges}
                          className="admin-header-button"
                        >
                          Create Home Screen
                        </Button>
                      </div>
                    </div>
                    <form
                      action=""
                      encType="/multipart/form-data"
                      className="admin-form"
                    >
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Top most image
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={topMostImage}
                          onChange={(e) => setTopMostImage(e.target.value)}
                          type="text"
                          placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Promotional Banners
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={promotionBanners}
                          onChange={(e) => setPromotionBanners(e.target.value)}
                          type="text"
                          placeholder="Eg. farmroots1, C:/Users/Admin/Desktop/test1.jpg; farmroots2, C:/Users/Admin/Desktop/test2.jpg"
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Promotional Banners Links
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={promotionBannersLink}
                          onChange={(e) =>
                            setPromotionBannersLink(e.target.value)
                          }
                          type="text"
                          placeholder="Enter Something seperated by commas"
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review Section Heading
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={reviewHeading}
                          onChange={(e) => setReviewHeading(e.target.value)}
                          type="text"
                          placeholder="Eg. He said; She said"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 1 Image
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={review1Image}
                          onChange={(e) => setReview1Image(e.target.value)}
                          type="text"
                          placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 1 Comment
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={review1Comment}
                          onChange={(e) => setReview1Comment(e.target.value)}
                          type="text"
                          placeholder="Eg. Farmroots has been extremely useful with reference to getting things done in an unknown city. Delhi is sometimes too cumbersome to deal with - Farmroots makes this easier."
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 1 User Details
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={review1UserDetails}
                          onChange={(e) =>
                            setReview1UserDetails(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Surya V, 26, Delhi"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 2 Image
                        </label>
                        {/* <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={review2Image}
                          onChange={(e) => setReview2Image(e.target.value)}
                          type="text"
                          placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"
                        ></input> */}
                        <input
                          autoComplete="off"
                          type="file"
                          name="image1"
                          onChange={uploadImag3Handler}
                          className="admin-modal-form-input admin-form-div-input"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 2 Comment
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={review2Comment}
                          onChange={(e) => setReview2Comment(e.target.value)}
                          type="text"
                          placeholder="Eg. Farmroots has been extremely useful with reference to getting things done in an unknown city. Delhi is sometimes too cumbersome to deal with - Farmroots makes this easier."
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 2 User Details
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={review2UserDetails}
                          onChange={(e) =>
                            setReview2UserDetails(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Surya V, 26, Delhi"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 3 Image
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={review3Image}
                          onChange={(e) => setReview3Image(e.target.value)}
                          type="text"
                          placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 3 Comment
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={review3Comment}
                          onChange={(e) => setReview3Comment(e.target.value)}
                          type="text"
                          placeholder="Eg. Farmroots has been extremely useful with reference to getting things done in an unknown city. Delhi is sometimes too cumbersome to deal with - Farmroots makes this easier."
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 3 User Details
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={review3UserDetails}
                          onChange={(e) =>
                            setReview3UserDetails(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Surya V, 26, Delhi"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 4 Image
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={review4Image}
                          onChange={(e) => setReview4Image(e.target.value)}
                          type="text"
                          placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 4 Comment
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={review4Comment}
                          onChange={(e) => setReview4Comment(e.target.value)}
                          type="text"
                          placeholder="Eg. Farmroots has been extremely useful with reference to getting things done in an unknown city. Delhi is sometimes too cumbersome to deal with - Farmroots makes this easier."
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 4 User Details
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={review4UserDetails}
                          onChange={(e) =>
                            setReview4UserDetails(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Surya V, 26, Delhi"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Partner Heading
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={partnerHeading}
                          onChange={(e) => setPartnerHeading(e.target.value)}
                          type="text"
                          placeholder="Eg. Our Partners"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Partner Logo Images
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={partnerLogoImages}
                          onChange={(e) => setPartnerLogoImages(e.target.value)}
                          type="text"
                          placeholder="Eg. C:/Users/Admin/Desktop/test1.jpg, C:/Users/Admin/Desktop/test2.jpg"
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 1 Name
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={career1Name}
                          onChange={(e) => setCareer1Name(e.target.value)}
                          type="text"
                          placeholder="Eg. Blog"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 1 Image
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={career1Image}
                          onChange={(e) => setCareer1Image(e.target.value)}
                          type="text"
                          placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 1 Information
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={career1Information}
                          onChange={(e) =>
                            setCareer1Information(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Read our blogs..."
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 1 Button Text
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={career1ButtonText}
                          onChange={(e) => setCareer1ButtonText(e.target.value)}
                          type="text"
                          placeholder="Eg. Ride with us"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 2 Name
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={career2Name}
                          onChange={(e) => setCareer2Name(e.target.value)}
                          type="text"
                          placeholder="Eg. Export"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 2 Image
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={career2Image}
                          onChange={(e) => setCareer2Image(e.target.value)}
                          type="text"
                          placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 2 Information
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={career2Information}
                          onChange={(e) =>
                            setCareer2Information(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Learn about our export"
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 2 Button Text
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={career2ButtonText}
                          onChange={(e) => setCareer2ButtonText(e.target.value)}
                          type="text"
                          placeholder="Eg. Ride with us"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 3 Name
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={career3Name}
                          onChange={(e) => setCareer3Name(e.target.value)}
                          type="text"
                          placeholder="Eg. Partners"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 3 Image
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={career3Image}
                          onChange={(e) => setCareer3Image(e.target.value)}
                          type="text"
                          placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 3 Information
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={career3Information}
                          onChange={(e) =>
                            setCareer3Information(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Learn about our partners"
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 3 Button Text
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={career3ButtonText}
                          onChange={(e) => setCareer3ButtonText(e.target.value)}
                          type="text"
                          placeholder="Eg. Ride with us"
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
                        Home Screen Data
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
                    <form action="/multipart/form-data" className="admin-form">
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Top most image
                        </label>
                        {/* <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={topMostImage}
                          onChange={(e) => setTopMostImage(e.target.value)}
                          type="text"
                          placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"
                        ></input> */}
                        <input
                          autoComplete="off"
                          type="file"
                          name="image1"
                          onChange={uploadImage1Handler}
                          className="admin-modal-form-input"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Promotional Banners
                        </label>
                        {/* <textarea
                          className="admin-form-textarea"
                          value={promotionBanners}
                          onChange={(e) => setPromotionBanners(e.target.value)}
                          type="text"
                          placeholder="Eg. farmroots1, C:/Users/Admin/Desktop/test1.jpg; farmroots2, C:/Users/Admin/Desktop/test2.jpg"
                        ></textarea> */}
                        <input
                          autoComplete="off"
                          type="file"
                          name="image1"
                          onChange={uploadImagePormotionalHandler1}
                          className="admin-modal-form-input"
                          accept="image/*"
                          multiple
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Promotional Banners Links
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={promotionBannersLink}
                          onChange={(e) =>
                            setPromotionBannersLink(e.target.value)
                          }
                          type="text"
                          placeholder="Enter Something seperated by commas"
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review Section Heading
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={reviewHeading}
                          onChange={(e) => setReviewHeading(e.target.value)}
                          type="text"
                          placeholder="Eg. He said; She said"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 1 Image
                        </label>
                        {/* <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={review1Image}
                          onChange={(e) => setReview1Image(e.target.value)}
                          type="text"
                          placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"
                        ></input>  */}
                        <input
                          autoComplete="off"
                          type="file"
                          name="image1"
                          onChange={uploadImage2Handler}
                          className="admin-modal-form-input"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 1 Comment
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={review1Comment}
                          onChange={(e) => setReview1Comment(e.target.value)}
                          type="text"
                          placeholder="Eg. Farmroots has been extremely useful with reference to getting things done in an unknown city. Delhi is sometimes too cumbersome to deal with - Farmroots makes this easier."
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 1 User Details
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={review1UserDetails}
                          onChange={(e) =>
                            setReview1UserDetails(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Surya V, 26, Delhi"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 2 Image
                        </label>
                        <input
                          autoComplete="off"
                          type="file"
                          name="image1"
                          onChange={uploadImag3Handler}
                          className="admin-modal-form-input"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 2 Comment
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={review2Comment}
                          onChange={(e) => setReview2Comment(e.target.value)}
                          type="text"
                          placeholder="Eg. Farmroots has been extremely useful with reference to getting things done in an unknown city. Delhi is sometimes too cumbersome to deal with - Farmroots makes this easier."
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 2 User Details
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={review2UserDetails}
                          onChange={(e) =>
                            setReview2UserDetails(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Surya V, 26, Delhi"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 3 Image
                        </label>
                        {/* <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={review3Image}
                          onChange={(e) => setReview3Image(e.target.value)}
                          type="text"
                          placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"
                        ></input> */}
                        <input
                          autoComplete="off"
                          type="file"
                          name="image1"
                          onChange={uploadImage4Handler}
                          className="admin-modal-form-input"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 3 Comment
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={review3Comment}
                          onChange={(e) => setReview3Comment(e.target.value)}
                          type="text"
                          placeholder="Eg. Farmroots has been extremely useful with reference to getting things done in an unknown city. Delhi is sometimes too cumbersome to deal with - Farmroots makes this easier."
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 3 User Details
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={review3UserDetails}
                          onChange={(e) =>
                            setReview3UserDetails(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Surya V, 26, Delhi"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 4 Image
                        </label>
                        {/* <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={review4Image}
                          onChange={(e) => setReview4Image(e.target.value)}
                          type="text"
                          placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"
                        ></input> */}
                        <input
                          autoComplete="off"
                          type="file"
                          name="image1"
                          onChange={uploadImageReviewHandler}
                          className="admin-modal-form-input"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 4 Comment
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={review4Comment}
                          onChange={(e) => setReview4Comment(e.target.value)}
                          type="text"
                          placeholder="Eg. Farmroots has been extremely useful with reference to getting things done in an unknown city. Delhi is sometimes too cumbersome to deal with - Farmroots makes this easier."
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 4 User Details
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={review4UserDetails}
                          onChange={(e) =>
                            setReview4UserDetails(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Surya V, 26, Delhi"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Partner Heading
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={partnerHeading}
                          onChange={(e) => setPartnerHeading(e.target.value)}
                          type="text"
                          placeholder="Eg. Our Partners"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Partner Logo Images
                        </label>
                        <input
                          autoComplete="off"
                          type="file"
                          name="image1"
                          onChange={uploadImage6multipleHandler}
                          className="admin-modal-form-input"
                          accept="image/*"
                          multiple
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 1 Name
                        </label>

                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={career1Name}
                          onChange={(e) => setCareer1Name(e.target.value)}
                          type="text"
                          placeholder="Eg. News & Blogs"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 1 Image
                        </label>
                        <input
                          autoComplete="off"
                          type="file"
                          name="image1"
                          onChange={uploadImage7Handler}
                          className="admin-modal-form-input"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 1 Information
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={career1Information}
                          onChange={(e) =>
                            setCareer1Information(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Read our blogs..."
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 1 Button Text
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={career1ButtonText}
                          onChange={(e) => setCareer1ButtonText(e.target.value)}
                          type="text"
                          placeholder="Eg. Ride with us"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 2 Name
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={career2Name}
                          onChange={(e) => setCareer2Name(e.target.value)}
                          type="text"
                          placeholder="Eg. Export"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 2 Image
                        </label>
                        <input
                          autoComplete="off"
                          type="file"
                          name="image1"
                          onChange={uploadImage8Handler}
                          className="admin-modal-form-input"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 2 Information
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={career2Information}
                          onChange={(e) =>
                            setCareer2Information(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Learn about our export"
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 2 Button Text
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={career2ButtonText}
                          onChange={(e) => setCareer2ButtonText(e.target.value)}
                          type="text"
                          placeholder="Eg. Ride with us"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 3 Name
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={career3Name}
                          onChange={(e) => setCareer3Name(e.target.value)}
                          type="text"
                          placeholder="Eg. Partners"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 3 Image
                        </label>
                        <input
                          autoComplete="off"
                          type="file"
                          name="image1"
                          onChange={uploadImage9Handler}
                          className="admin-modal-form-input"
                        ></input>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 3 Information
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={career3Information}
                          onChange={(e) =>
                            setCareer3Information(e.target.value)
                          }
                          type="text"
                          placeholder="Eg. Learn about our partners"
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 3 Button Text
                        </label>
                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={career3ButtonText}
                          onChange={(e) => setCareer3ButtonText(e.target.value)}
                          type="text"
                          placeholder="Eg. Ride with us"
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
                        Home Screen Data
                      </div>
                      <div className="d-flex align-items-center">
                        <Button
                          onClick={() => openModal(homeScreen)}
                          className="admin-header-button"
                        >
                          Edit HomeScreen
                        </Button>
                      </div>
                    </div>
                    <form action="/multipart/form-data" className="admin-form">
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Top most image
                        </label>

                        <input
                          autoComplete="off"
                          className="admin-form-input"
                          value={topMostImage}
                          onChange={(e) => setTopMostImage(e.target.value)}
                          type="text"
                          placeholder="Eg. C:/Users/Admin/Desktop/test.jpg"
                        ></input>
                      </div>

                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Promotional Banners
                        </label>
                        <div className="admin-form-textarea">
                          {homeScreen.promotionBanners.join(", ")}
                        </div>
                        {/* <input
                          autoComplete="off"
                          type="file"
                          name="image1"
                          onChange={uploadImage1Handler}
                          className="admin-modal-form-input admin-form-div-input"
                        ></input> */}
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Promotional Banners Links
                        </label>
                        <textarea
                          className="admin-form-textarea"
                          value={promotionBannersLink}
                          onChange={(e) =>
                            setPromotionBannersLink(e.target.value)
                          }
                          type="text"
                          placeholder="Enter Something seperated by commas"
                        ></textarea>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review Section Heading
                        </label>
                        <div className="admin-form-div-input">
                          {homeScreen.reviewHeading}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 1 Image
                        </label>
                        <div className="admin-form-div-input">
                          {homeScreen.reviewContent[0].image}
                        </div>
                        {/* <input
                          autoComplete="off"
                          type="file"
                          name="image1"
                          // onChange={uploadImage1Handler}
                          className="admin-modal-form-input admin-form-div-input"
                        ></input> */}
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 1 Comment
                        </label>
                        <div className="admin-form-textarea">
                          {homeScreen.reviewContent[0].comment}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 1 User Details
                        </label>
                        <div className="admin-form-div-input">{`${homeScreen.reviewContent[0].name}, ${homeScreen.reviewContent[0].age}, ${homeScreen.reviewContent[0].location}`}</div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 2 Image
                        </label>
                        <div className="admin-form-div-input">
                          {homeScreen.reviewContent[1].image}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 2 Comment
                        </label>
                        <div className="admin-form-textarea">
                          {homeScreen.reviewContent[1].comment}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 2 User Details
                        </label>
                        <div className="admin-form-div-input">{`${homeScreen.reviewContent[1].name}, ${homeScreen.reviewContent[1].age}, ${homeScreen.reviewContent[1].location}`}</div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 3 Image
                        </label>
                        <div className="admin-form-div-input">
                          {homeScreen.reviewContent[2].image}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 3 Comment
                        </label>
                        <div className="admin-form-textarea">
                          {homeScreen.reviewContent[2].comment}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 3 User Details
                        </label>
                        <div className="admin-form-div-input">{`${homeScreen.reviewContent[2].name}, ${homeScreen.reviewContent[2].age}, ${homeScreen.reviewContent[2].location}`}</div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 4 Image
                        </label>
                        <div className="admin-form-div-input">
                          {homeScreen.reviewContent[3].image}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 4 Comment
                        </label>
                        <div className="admin-form-textarea">
                          {homeScreen.reviewContent[3].comment}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Review 4 User Details
                        </label>
                        <div className="admin-form-div-input">{`${homeScreen.reviewContent[3].name}, ${homeScreen.reviewContent[3].age}, ${homeScreen.reviewContent[3].location}`}</div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Partner Heading
                        </label>
                        <div className="admin-form-div-input">
                          {homeScreen.partnerHeading}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Partner Logo Images
                        </label>
                        <div className="admin-form-textarea">
                          {homeScreen.partnerLogoImages.join(", ")}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 1 Name
                        </label>
                        <div className="admin-form-div-input">
                          {homeScreen.careerContent[0].name}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 1 Image
                        </label>
                        <div className="admin-form-div-input">
                          {homeScreen.careerContent[0].image}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 1 Information
                        </label>
                        <div className="admin-form-textarea">
                          {homeScreen.careerContent[0].information}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 1 Button Text
                        </label>
                        <div className="admin-form-div-input">
                          {homeScreen.careerContent[0].buttonText}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 2 Name
                        </label>
                        <div className="admin-form-div-input">
                          {homeScreen.careerContent[1].name}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 2 Image
                        </label>
                        <div className="admin-form-div-input">
                          {homeScreen.careerContent[1].image}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 2 Information
                        </label>
                        <div className="admin-form-textarea">
                          {homeScreen.careerContent[1].information}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 2 Button Text
                        </label>
                        <div className="admin-form-div-input">
                          {homeScreen.careerContent[1].buttonText}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 3 Name
                        </label>
                        <div className="admin-form-div-input">
                          {homeScreen.careerContent[2].name}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 3 Image
                        </label>
                        <div className="admin-form-div-input">
                          {homeScreen.careerContent[2].image}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 3 Information
                        </label>
                        <div className="admin-form-textarea">
                          {homeScreen.careerContent[2].information}
                        </div>
                      </div>
                      <div className="admin-form-input-div">
                        <label className="admin-form-label">
                          Career 3 Button Text
                        </label>
                        <div className="admin-form-div-input">
                          {homeScreen.careerContent[2].buttonText}
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

export default UploadHomeScreen;
