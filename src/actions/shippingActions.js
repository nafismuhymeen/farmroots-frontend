import { SHIPPING_SAVE, SHIPPING_DELETE } from "../constants/shippingConstants";
import Cookie from "js-cookie";

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: SHIPPING_SAVE, payload: data });
  // Cookie.set("shipping", JSON.stringify(data), { expires: 365 });
};

const deleteShipping = () => (dispatch) => {
  dispatch({ type: SHIPPING_DELETE });
  Cookie.remove("shipping");
};

export { saveShipping, deleteShipping };
