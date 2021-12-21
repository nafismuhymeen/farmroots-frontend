import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import {
  FaHome,
  FaBoxes,
  FaClipboardList,
  FaTrash,
  FaUserFriends,
  FaUserTie,
} from "react-icons/fa";
import { BiCarousel, BiMapPin, BiNews, BiExport } from "react-icons/bi";
import { BsInfoCircleFill } from "react-icons/bs";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { IoIosPricetag, IoIosVideocam, IoMdHelpCircle } from "react-icons/io";
import { useSelector } from "react-redux";
import axios from "axios";

function UploadSidebar(props) {
  const employeeSignin = useSelector((state) => state.employeeSignin);
  const { employeeInfo } = employeeSignin;

  const imagesDeleteHandler = () => {
    axios
      .post(
        "/api/uploads/delete",
        { employeeInfo },
        {
          headers: {
            Authorization: "Bearer " + employeeInfo.token,
          },
        }
      )
      .then((response) => {
        alert(response.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar-heading">Uploads</div>
      {props.value === "HomeScreen" ? (
        <Link
          className="admin-sidebar-button admin-sidebar-button-selected"
          to="/6118131915162019/upload/homescreen"
        >
          <FaHome className="admin-sidebar-button-icon"></FaHome>
          <div>Home Screen</div>
        </Link>
      ) : (
        <Link
          className="admin-sidebar-button"
          to="/6118131915162019/upload/homescreen"
        >
          <FaHome className="admin-sidebar-button-icon"></FaHome>
          <div>Home Screen</div>
        </Link>
      )}
      {props.value === "Logo" ? (
        <Link
          className="admin-sidebar-button admin-sidebar-button-selected"
          to="/6118131915162019/upload/logo"
        >
          <HiOutlineOfficeBuilding className="admin-sidebar-button-icon"></HiOutlineOfficeBuilding>
          <div>Logos</div>
        </Link>
      ) : (
        <Link
          className="admin-sidebar-button"
          to="/6118131915162019/upload/logo"
        >
          <HiOutlineOfficeBuilding className="admin-sidebar-button-icon"></HiOutlineOfficeBuilding>
          <div>Logos</div>
        </Link>
      )}
      {props.value === "Price" ? (
        <Link
          className="admin-sidebar-button admin-sidebar-button-selected"
          to="/6118131915162019/upload/price"
        >
          <IoIosPricetag className="admin-sidebar-button-icon"></IoIosPricetag>
          <div>Price</div>
        </Link>
      ) : (
        <Link
          className="admin-sidebar-button"
          to="/6118131915162019/upload/price"
        >
          <IoIosPricetag className="admin-sidebar-button-icon"></IoIosPricetag>
          <div>Price</div>
        </Link>
      )}
      {props.value === "Product" ? (
        <Link
          className="admin-sidebar-button admin-sidebar-button-selected"
          to="/6118131915162019/upload/products"
        >
          <FaBoxes className="admin-sidebar-button-icon"></FaBoxes>
          <div>Products</div>
        </Link>
      ) : (
        <Link
          className="admin-sidebar-button"
          to="/6118131915162019/upload/products"
        >
          <FaBoxes className="admin-sidebar-button-icon"></FaBoxes>
          <div>Products</div>
        </Link>
      )}
      {props.value === "Category" ? (
        <Link
          className="admin-sidebar-button admin-sidebar-button-selected"
          to="/6118131915162019/upload/product/category"
        >
          <FaClipboardList className="admin-sidebar-button-icon"></FaClipboardList>
          <div>Product Categories</div>
        </Link>
      ) : (
        <Link
          className="admin-sidebar-button"
          to="/6118131915162019/upload/product/category"
        >
          <FaClipboardList className="admin-sidebar-button-icon"></FaClipboardList>
          <div>Product Categories</div>
        </Link>
      )}
      {props.value === "Carousel" ? (
        <Link
          className="admin-sidebar-button admin-sidebar-button-selected"
          to="/6118131915162019/upload/product/carousel"
        >
          <BiCarousel className="admin-sidebar-button-icon"></BiCarousel>
          <div>Product Carousel</div>
        </Link>
      ) : (
        <Link
          className="admin-sidebar-button"
          to="/6118131915162019/upload/product/carousel"
        >
          <BiCarousel className="admin-sidebar-button-icon"></BiCarousel>
          <div>Product Carousel</div>
        </Link>
      )}
      {props.value === "Division" ? (
        <Link
          className="admin-sidebar-button admin-sidebar-button-selected"
          to="/6118131915162019/upload/order/division"
        >
          <BiMapPin className="admin-sidebar-button-icon"></BiMapPin>
          <div>Address</div>
        </Link>
      ) : (
        <Link
          className="admin-sidebar-button"
          to="/6118131915162019/upload/order/division"
        >
          <BiMapPin className="admin-sidebar-button-icon"></BiMapPin>
          <div>Address</div>
        </Link>
      )}
      {props.value === "Blog" ? (
        <Link
          className="admin-sidebar-button admin-sidebar-button-selected"
          to="/6118131915162019/upload/blog"
        >
          <BiNews className="admin-sidebar-button-icon"></BiNews>
          <div>Blog</div>
        </Link>
      ) : (
        <Link
          className="admin-sidebar-button"
          to="/6118131915162019/upload/blog"
        >
          <BiNews className="admin-sidebar-button-icon"></BiNews>
          <div>Blog</div>
        </Link>
      )}
      {props.value === "Exports" ? (
        <Link
          className="admin-sidebar-button admin-sidebar-button-selected"
          to="/6118131915162019/upload/exports"
        >
          <BiExport className="admin-sidebar-button-icon"></BiExport>
          <div>Exports</div>
        </Link>
      ) : (
        <Link
          className="admin-sidebar-button"
          to="/6118131915162019/upload/exports"
        >
          <BiExport className="admin-sidebar-button-icon"></BiExport>
          <div>Exports</div>
        </Link>
      )}
      {props.value === "Partner" ? (
        <Link
          className="admin-sidebar-button admin-sidebar-button-selected"
          to="/6118131915162019/upload/partner"
        >
          <FaUserFriends className="admin-sidebar-button-icon"></FaUserFriends>
          <div>Partner</div>
        </Link>
      ) : (
        <Link
          className="admin-sidebar-button"
          to="/6118131915162019/upload/partner"
        >
          <FaUserFriends className="admin-sidebar-button-icon"></FaUserFriends>
          <div>Partner</div>
        </Link>
      )}
      {props.value === "About" ? (
        <Link
          className="admin-sidebar-button admin-sidebar-button-selected"
          to="/6118131915162019/upload/about"
        >
          <BsInfoCircleFill className="admin-sidebar-button-icon"></BsInfoCircleFill>
          <div>About</div>
        </Link>
      ) : (
        <Link
          className="admin-sidebar-button"
          to="/6118131915162019/upload/about"
        >
          <BsInfoCircleFill className="admin-sidebar-button-icon"></BsInfoCircleFill>
          <div>About</div>
        </Link>
      )}
      {props.value === "Videos" ? (
        <Link
          className="admin-sidebar-button admin-sidebar-button-selected"
          to="/6118131915162019/upload/videos"
        >
          <IoIosVideocam className="admin-sidebar-button-icon"></IoIosVideocam>
          <div>Videos</div>
        </Link>
      ) : (
        <Link
          className="admin-sidebar-button"
          to="/6118131915162019/upload/videos"
        >
          <IoIosVideocam className="admin-sidebar-button-icon"></IoIosVideocam>
          <div>Videos</div>
        </Link>
      )}
      {props.value === "Careers" ? (
        <Link
          className="admin-sidebar-button admin-sidebar-button-selected"
          to="/6118131915162019/upload/careers"
        >
          <FaUserTie className="admin-sidebar-button-icon"></FaUserTie>
          <div>Careers</div>
        </Link>
      ) : (
        <Link
          className="admin-sidebar-button"
          to="/6118131915162019/upload/careers"
        >
          <FaUserTie className="admin-sidebar-button-icon"></FaUserTie>
          <div>Careers</div>
        </Link>
      )}
      {props.value === "Help" ? (
        <Link
          className="admin-sidebar-button admin-sidebar-button-selected"
          to="/6118131915162019/upload/help"
        >
          <IoMdHelpCircle className="admin-sidebar-button-icon"></IoMdHelpCircle>
          <div>Help</div>
        </Link>
      ) : (
        <Link
          className="admin-sidebar-button"
          to="/6118131915162019/upload/help"
        >
          <IoMdHelpCircle className="admin-sidebar-button-icon"></IoMdHelpCircle>
          <div>Help</div>
        </Link>
      )}
      <Button
        className="admin-sidebar-delete-button"
        onClick={imagesDeleteHandler}
      >
        <FaTrash className="admin-sidebar-button-icon"></FaTrash>
        <div>Delete Extra Images</div>
      </Button>
    </div>
  );
}

export default withRouter(UploadSidebar);
