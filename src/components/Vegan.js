import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeLogo } from "../actions/logoActions";
export default function Vegan(props) {
  const logoGet = useSelector((state) => state.logoGet);
  const { logo } = logoGet;
  let a = logoGet.logo;
  let cc = "";
  let cd = "";
  if (a !== undefined) {
    cc = a.vegIcon;
    cd = a.nonVegIcon;
  }
  return (
    <div>
      {props.value && props.value.toLowerCase() === "true" && (
        <div className="vegan">
          <img
            className="vegan-icon"
            src={process.env.REACT_APP_IMG_BASEURL + cc}
            alt=" "
          ></img>
          <div className="vegan-text">Vegetarian</div>
        </div>
      )}
      {props.value && props.value.toLowerCase() === "false" && (
        <div className="vegan">
          <img
            className="vegan-icon"
            src={process.env.REACT_APP_IMG_BASEURL + cd}
            alt=" "
          ></img>
          <div className="vegan-text">Non Vegetarian</div>
        </div>
      )}
    </div>
  );
}
