import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { editAddress } from '../actions/addressActions';
import { listDivision } from '../actions/orderDivisionActions';
import { MESSAGES } from '../contants';
import { toast } from 'react-toastify';

function EditAddress(props) {
  const [houseNo, setHouseNo] = useState('');
  const [roadNo, setRoadNo] = useState('');
  const [landmark, setLandmark] = useState('');
  const [zoneName, setZoneName] = useState('None');
  const [zoneNumber, setZoneNumber] = useState(0);
  const [area, setArea] = useState('');
  const [division, setDivision] = useState('');
  const [district, setDistrict] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const divisionList = useSelector((state) => state.divisionList);
  const { loading, divisions, error } = divisionList;

  const dispatch = useDispatch();

  const [areaDropdownArray, setAreaDropdownArray] = useState([]);
  const [districtDropdownArray, setDistrictDropdownArray] = useState([]);
  const [divisionDropdownArray, setDivisionDropdownArray] = useState([]);

  const closeEditAddress = () => {
    document.querySelector('.address-edit-modal').classList.remove('open');
  };

  useEffect(() => {
    if (props.value) {
      setHouseNo(props.value.houseNo);
      setRoadNo(props.value.roadNo);
      setArea(props.value.area);
      setDivision(props.value.division);
      setDistrict(props.value.district);
      setLandmark(props.value.landmark);
      setPostalCode(props.value.postalCode);
      setType(props.value.type);
      setName(props.value.name);
      setMobileNumber(props.value.mobileNumber);
    }
    dispatch(listDivision());
  }, [props.value]);

  const editAddressHandler = (e) => {
    e.preventDefault();
    if (
      houseNo &&
      roadNo &&
      area &&
      landmark &&
      district &&
      division &&
      postalCode &&
      type
    ) {
      // if (mobileNumber.length < 10) {
      //   return toast.error('Mobile number should be 10 characters long');
      // }
      let selectedArea = divisions.filter((d) => {
        return area === d.area;
      });
      if (selectedArea.length < 1)
        return toast.error('Please select area/thana');
      let selectedDevision = divisions.filter((d) => {
        return division === d.name;
      });
      if (selectedDevision.length < 1)
        return toast.error('Please select devision');
      let selectedDistrict = divisions.filter((d) => {
        return district === d.district;
      });
      if (selectedDistrict.length < 1)
        return toast.error('Please select district');
      //  if (districtDropdownArray.length === 0) return toast.error("Please select destrict")
      var editZoneName = zoneName || 'None';
      var editZoneNumber = zoneNumber || 0;

      dispatch(
        editAddress({
          _id: props.value._id,
          houseNo,
          roadNo,
          area,
          zoneName: editZoneName,
          zoneNumber: editZoneNumber,
          division,
          district,
          landmark,
          postalCode,
          type,
          name,
          mobileNumber,
        })
      );
      closeEditAddress();
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
    document.querySelector('.address-area-edit-dropdown').classList.add('open');
  };

  const closeAreaDropdown = () => {
    document
      .querySelector('.address-area-edit-dropdown')
      .classList.remove('open');
  };

  const autoCompleteArea = (keyword) => {
    setArea(keyword);
    if (keyword === '') {
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

  const autoCompleteDistrict = (keyword) => {
    setDistrict(keyword);
    if (keyword === '') {
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

  const openDistrictDropdown = () => {
    document
      .querySelector('.address-district-edit-dropdown')
      .classList.add('open');
  };

  const closeDistrictDropdown = () => {
    document
      .querySelector('.address-district-edit-dropdown')
      .classList.remove('open');
  };

  const autoDivisionHandler = (divisionDropdownValue) => {
    setDivision(divisionDropdownValue);
    setDivisionDropdownArray([]);
    closeDivisionDropdown();
  };

  const openDivisionDropdown = () => {
    document
      .querySelector('.address-division-edit-dropdown')
      .classList.add('open');
  };

  const closeDivisionDropdown = () => {
    document
      .querySelector('.address-division-edit-dropdown')
      .classList.remove('open');
  };

  const autoCompleteDivision = (keyword) => {
    setDivision(keyword);
    if (keyword === '') {
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
      <div className="address-edit-modal">
        {loading ? (
          <div></div>
        ) : error ? (
          <div>{error.message}</div>
        ) : (
          <div className="address">
            <div className="d-flex justify-content-end">
              <Button
                className="btn-light address-close-button"
                onClick={closeEditAddress}
              >
                <MdClose></MdClose>
              </Button>
            </div>
            <div className="address-heading">Edit your address</div>
            <form onSubmit={editAddressHandler} className="address-form">
              <div className="address-form-element">
                <label className="address-form-label" htmlFor="houseNo">
                  Name
                </label>
                <input
                  autoComplete="off"
                  className="address-form-input"
                  placeholder="Eg. Faisal Kamal"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>{' '}
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
                  onChange={(e) => {
                    let telephone = e.target.value;
                    if (telephone.length > 10) {
                      return;
                    }
                    if (
                      e.target.value.match(/^[1-9]\d*\.?\d*$/) ||
                      telephone === ''
                    ) {
                      telephone = telephone.replace(/\s/g, '');
                      setMobileNumber(telephone);
                    }
                  }}
                ></input>
              </div>{' '}
              <div className="address-form-element">
                <label className="address-form-label" htmlFor="houseNo">
                  House No / Flat No{' '}
                  <span className="asterisk-mandatory">*</span>
                </label>
                <input
                  autoComplete="off"
                  className="address-form-input"
                  value={houseNo}
                  placeholder="Eg. Flat# 6B, House # 10"
                  name="houseNo"
                  onChange={(e) => setHouseNo(e.target.value)}
                ></input>
              </div>
              <div className="address-form-element">
                <label className="address-form-label" htmlFor="roadNo">
                  Road No / Road Name{' '}
                  <span className="asterisk-mandatory">*</span>
                </label>
                <input
                  autoComplete="off"
                  className="address-form-input"
                  value={roadNo}
                  placeholder="Eg. Road# 10, Jashimuddin Road"
                  name="roadNo"
                  onChange={(e) => setRoadNo(e.target.value)}
                ></input>
              </div>
              <div className="address-form-element">
                <label className="address-form-label" htmlFor="landmark">
                  Nearby Landmark <span className="asterisk-mandatory">*</span>
                </label>
                <input
                  autoComplete="off"
                  className="address-form-input"
                  value={landmark}
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
                <div className="address-area-edit-dropdown">
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
                <div className="address-district-edit-dropdown">
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
                <div className="address-division-edit-dropdown">
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
                  Zip / Postal Code{' '}
                  <span className="asterisk-mandatory">*</span>
                </label>
                <input
                  autoComplete="off"
                  className="address-form-input"
                  value={postalCode}
                  placeholder="Eg. 2371 or Abdullahpur"
                  name="postalCode"
                  onChange={(e) => setPostalCode(e.target.value)}
                ></input>
              </div>
              <div className="address-form-element">
                <label className="address-form-label" htmlFor="type">
                  Save address as <span className="asterisk-mandatory">*</span>
                </label>
                <input
                  autoComplete="off"
                  className="address-form-input"
                  value={type}
                  placeholder="Eg. Home"
                  name="type"
                  onChange={(e) => setType(e.target.value.toUpperCase())}
                ></input>
              </div>
              <div
                className="d-flex justify-content-center"
                style={{ width: '100%' }}
              >
                <Button type="submit" className="address-form-submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default withRouter(EditAddress);
