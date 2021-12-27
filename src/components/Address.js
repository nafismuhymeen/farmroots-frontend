import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { saveAddress } from "../actions/addressActions";
import { listDivision } from "../actions/orderDivisionActions";
import { toast } from "react-toastify";
import { MESSAGES } from "../contants";

function Address(props) {
  const [houseNo, setHouseNo] = useState("");
  const [roadNo, setRoadNo] = useState("");
  const [landmark, setLandmark] = useState("");
  const [zoneName, setZoneName] = useState("None");
  const [zoneNumber, setZoneNumber] = useState(0);
  const [area, setArea] = useState("");
  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const divisionList = useSelector((state) => state.divisionList);
  const { loading, divisions, error } = divisionList;
  const [areaDropdownArray, setAreaDropdownArray] = useState([]);
  const [districtDropdownArray, setDistrictDropdownArray] = useState([]);
  const [divisionDropdownArray, setDivisionDropdownArray] = useState([]);

  const dispatch = useDispatch();

  const closeAddress = () => {
    document.querySelector(".address-modal").classList.remove("open");
  };

  const addAddressHandler = (e) => {
    e.preventDefault();
    if (
      houseNo &&
      roadNo &&
      area &&
      // landmark &&
      district &&
      division &&
      // postalCode &&
      type
    ) {
      // if (mobileNumber.length < 10) {
      //   return toast.error('Mobile number should be 10 characters long');
      // }
      let selectedArea = divisions.filter((d) => {
        return area === d.area;
      });
      if (selectedArea.length < 1)
        return toast.error("Please select area/thana");
      let selectedDevision = divisions.filter((d) => {
        return division === d.name;
      });
      if (selectedDevision.length < 1)
        return toast.error("Please select devision");
      let selectedDistrict = divisions.filter((d) => {
        return district === d.district;
      });
      if (selectedDistrict.length < 1)
        return toast.error("Please select district");
      var editZoneName = zoneName || "None";
      var editZoneNumber = zoneNumber || 0;

      if (type === "") {
        dispatch(
          saveAddress({
            houseNo,
            roadNo,
            area,
            landmark,
            zoneName: editZoneName,
            zoneNumber: editZoneNumber,
            district,
            division,
            postalCode,
            type: "ADDRESS",
            name,
            mobileNumber,
          })
        );
      } else {
        dispatch(
          saveAddress({
            houseNo,
            roadNo,
            area,
            landmark,
            zoneName: editZoneName,
            zoneNumber: editZoneNumber,
            district,
            division,
            postalCode,
            type,
            name,
            mobileNumber,
          })
        );
      }
      closeAddress();
    } else {
      setErrorMessage(MESSAGES.REGISTER_FORM_MANDATARY_FIELDS);
    }
  };

  const setErrorMessage = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT,
      hideProgressBar: true,
      pauseOnHover: false,
      autoClose: 3500,
    });
  };

  useEffect(() => {
    dispatch(listDivision());
    setHouseNo("");
    setRoadNo("");
    setArea("");
    setDivision("");
    setDistrict("");
    setLandmark("");
    setPostalCode("");
    setName("");
    setMobileNumber("");
    setType("");
    return () => {
      //
    };
  }, []);

  const autoAreaHandler = (areaDropdownValue) => {
    setArea(areaDropdownValue);
    setAreaDropdownArray([]);
    for (const division of divisions) {
      if (division.area === areaDropdownValue) {
        setZoneName(division.zoneName);
        setZoneNumber(division.zoneNumber);
        setDistrict(division.district);
        setDivision(division.name);
        break;
      }
    }
    closeAreaDropdown();
  };

  const openAreaDropdown = () => {
    document.querySelector(".address-area-dropdown").classList.add("open");
  };

  const closeAreaDropdown = () => {
    document.querySelector(".address-area-dropdown").classList.remove("open");
  };

  const autoCompleteArea = (keyword) => {
    setArea(keyword);
    if (keyword === "") {
      closeAreaDropdown();
    } else {
      openAreaDropdown();
      let areaList = divisions.reduce((acc, val) => {
        if (
          val?.area.toLowerCase().indexOf(keyword.toLowerCase()) > -1 &&
          !acc.find((value) => value === val.area)
        ) {
          return [...acc, val.area];
        }
        return acc;
      }, []);
      setAreaDropdownArray(areaList);
    }
  };

  const autoDistrictHandler = (districtDropdownValue) => {
    setDistrict(districtDropdownValue);
    setDistrictDropdownArray([]);
    for (const division of divisions) {
      if (division.district === districtDropdownValue) {
        setDivision(division.name);
        break;
      }
    }
    closeDistrictDropdown();
  };

  const openDistrictDropdown = () => {
    document.querySelector(".address-district-dropdown").classList.add("open");
  };

  const closeDistrictDropdown = () => {
    document
      .querySelector(".address-district-dropdown")
      .classList.remove("open");
  };

  const autoCompleteDistrict = (keyword) => {
    setDistrict(keyword);
    if (keyword === "") {
      closeDistrictDropdown();
    } else {
      let distrintList = divisions.reduce((acc, val) => {
        if (
          val.district.toLowerCase().indexOf(keyword.toLowerCase()) > -1 &&
          !acc.find((value) => value === val.district)
        ) {
          return [...acc, val.district];
        }
        return acc;
      }, []);
      setDistrictDropdownArray(distrintList);
      openDistrictDropdown();
    }
  };

  const autoDivisionHandler = (divisionDropdownValue) => {
    setDivision(divisionDropdownValue);
    setDivisionDropdownArray([]);
    closeDivisionDropdown();
  };

  const openDivisionDropdown = () => {
    document.querySelector(".address-division-dropdown").classList.add("open");
  };

  const closeDivisionDropdown = () => {
    document
      .querySelector(".address-division-dropdown")
      .classList.remove("open");
  };

  const autoCompleteDivision = (keyword) => {
    setDivision(keyword);
    if (keyword === "") {
      closeDivisionDropdown();
    } else {
      let divisionList = divisions.reduce((acc, val) => {
        if (
          val.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1 &&
          !acc.find((value) => value === val.name)
        ) {
          return [...acc, val.name];
        }
        return acc;
      }, []);
      setDivisionDropdownArray(divisionList);
      openDivisionDropdown();
    }
  };

  return (
    <div>
      {/* {loading ? <div></div> : 
        error ? <div><h1>address2</h1></div> : ""} */}

      {loading ? (
        <div></div>
      ) : error ? (
        <div>{error.message}</div>
      ) : (
        <>
          {" "}
          <div class="address-modal">
            <div className="address">
              <div className="d-flex justify-content-end">
                <Button
                  className="btn-light address-close-button"
                  onClick={closeAddress}
                >
                  <MdClose></MdClose>
                </Button>
              </div>
              <div className="address-heading">Add new address</div>
              <form onSubmit={addAddressHandler} className="address-form">
                <div className="address-form-element">
                  <label className="address-form-label" htmlFor="houseNo">
                    Name
                  </label>
                  <input
                    autoComplete="off"
                    className="address-form-input"
                    placeholder="Eg. Faisal Kamal"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>{" "}
                <div className="address-form-element">
                  <label className="address-form-label" htmlFor="houseNo">
                    Contact Number
                  </label>
                  <input
                    autoComplete="off"
                    className="address-form-input"
                    placeholder="Eg. 1799999999"
                    name="mobileNumber"
                    value={mobileNumber}
                    // type="number"
                    // pattern=".{5,10}"
                    // max={11}
                    onChange={(e) => {
                      // onHandleTelephoneChange = (e) => {
                      let telephone = e.target.value;
                      if (telephone.length > 10) {
                        return;
                      }
                      if (
                        e.target.value.match(/^[1-9]\d*\.?\d*$/) ||
                        telephone === ""
                      ) {
                        telephone = telephone.replace(/\s/g, "");
                        setMobileNumber(telephone);
                      }
                    }}
                  ></input>
                </div>{" "}
                <div className="address-form-element">
                  <label className="address-form-label" htmlFor="houseNo">
                    House No / Flat No{" "}
                    <span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    className="address-form-input"
                    placeholder="Eg. Flat# 6B, House # 10"
                    name="houseNo"
                    onChange={(e) => setHouseNo(e.target.value)}
                  ></input>
                </div>
                <div className="address-form-element">
                  <label className="address-form-label" htmlFor="roadNo">
                    Road No / Road Name{" "}
                    <span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    className="address-form-input"
                    placeholder="Eg. Road# 10, Jashimuddin Road"
                    name="roadNo"
                    onChange={(e) => setRoadNo(e.target.value)}
                  ></input>
                </div>
                <div className="address-form-element">
                  <label className="address-form-label" htmlFor="landmark">
                    Detail Address/Nearby Landmark
                  </label>
                  <input
                    autoComplete="off"
                    className="address-form-input"
                    placeholder="Eg. Opposite of Brac Bank Dhanmondi Branch"
                    name="landmark"
                    onChange={(e) => setLandmark(e.target.value)}
                  ></input>
                </div>
                <div className="address-form-element">
                  <label className="address-form-label" htmlFor="area">
                    Area / Thana <span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    className="address-form-input"
                    value={area}
                    placeholder="Eg. Tejgaon"
                    name="area"
                    onChange={(e) => autoCompleteArea(e.target.value)}
                  ></input>
                  <div className="address-area-dropdown">
                    {areaDropdownArray.length === 0 ? (
                      <div className="address-dropdown-text">
                        No Results Found
                      </div>
                    ) : (
                      areaDropdownArray.map((areaDropdownValue) => (
                        <Button
                          onClick={() => autoAreaHandler(areaDropdownValue)}
                          className="address-dropdown-button"
                        >
                          {areaDropdownValue}
                        </Button>
                      ))
                    )}
                  </div>
                </div>
                <div className="address-form-element">
                  <label className="address-form-label" htmlFor="district">
                    District <span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    className="address-form-input"
                    value={district}
                    placeholder="Eg. Narayanganj"
                    name="district"
                    onChange={(e) => autoCompleteDistrict(e.target.value)}
                  ></input>
                  <div className="address-district-dropdown">
                    {districtDropdownArray.length === 0 ? (
                      <div className="address-dropdown-text">
                        No Results Found
                      </div>
                    ) : (
                      districtDropdownArray.map((districtDropdownValue) => (
                        <Button
                          onClick={() =>
                            autoDistrictHandler(districtDropdownValue)
                          }
                          className="address-dropdown-button"
                        >
                          {districtDropdownValue}
                        </Button>
                      ))
                    )}
                  </div>
                </div>
                <div className="address-form-element">
                  <label className="address-form-label" htmlFor="division">
                    Division <span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    className="address-form-input"
                    value={division}
                    placeholder="Eg. Dhaka"
                    name="division"
                    onChange={(e) => autoCompleteDivision(e.target.value)}
                  ></input>
                  <div className="address-division-dropdown">
                    {divisionDropdownArray.length === 0 ? (
                      <div className="address-dropdown-text">
                        No Results Found
                      </div>
                    ) : (
                      divisionDropdownArray.map((divisionDropdownValue) => (
                        <Button
                          onClick={() =>
                            autoDivisionHandler(divisionDropdownValue)
                          }
                          className="address-dropdown-button"
                        >
                          {divisionDropdownValue}
                        </Button>
                      ))
                    )}
                  </div>
                </div>
                <div className="address-form-element">
                  <label className="address-form-label" htmlFor="postalCode">
                    Zip / Postal Code
                  </label>
                  <input
                    autoComplete="off"
                    className="address-form-input"
                    placeholder="Eg. 2371 or Abdullahpur"
                    name="postalCode"
                    onChange={(e) => setPostalCode(e.target.value)}
                  ></input>
                </div>
                <div className="address-form-element">
                  <label className="address-form-label" htmlFor="type">
                    Save address as{" "}
                    <span className="asterisk-mandatory">*</span>
                  </label>
                  <input
                    autoComplete="off"
                    className="address-form-input"
                    placeholder="Eg. Home"
                    name="type"
                    onChange={(e) => setType(e.target.value.toUpperCase())}
                  ></input>
                </div>
                <div
                  className="d-flex justify-content-center"
                  style={{ width: "100%" }}
                >
                  <Button type="submit" className="address-form-submit">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default withRouter(Address);
