import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_EMPTY,
  BUY_NOW_EMPTY,
  BUY_NOW_REMOVE_ITEM,
  BUY_NOW_ADD_ITEM,
  CART_LIST_ITEM,
} from "../constants/cartConstants";
import Cookie from "js-cookie";
import axios from "axios";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/api/products/" + productId);
    if (qty > data.stock) {
      qty = qty - 1;
    }

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data.id,
        name: data.name,
        image: data.image1,
        netWeight: data.netWeight,
        vegan: data.vegan,
        price: data.discountPrice,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems), { expires: 365 });
  } catch (error) {}
};

const listCartItems = (cartItemsData) => async (dispatch, getState) => {
  try {
    var cartItemsList = [];
    for (const item of cartItemsData) {
      const { data } = await axios.get("/api/products/" + item.product);
      if (data.outOfStock === false) {
        cartItemsList.push({
          product: data.id,
          name: data.name,
          image: data.image1,
          netWeight: data.netWeight,
          vegan: data.vegan,
          price: data.discountPrice,
          qty: item.qty,
        });
      }
    }
    dispatch({ type: CART_LIST_ITEM, payload: cartItemsList });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems), { expires: 365 });
  } catch (error) {}
};

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems), { expires: 365 });
};

const emptyCart = () => (dispatch, getState) => {
  dispatch({ type: CART_EMPTY });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems), { expires: 365 });
};

const addToBuyNow = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/api/products/" + productId);
    dispatch({
      type: BUY_NOW_ADD_ITEM,
      payload: {
        product: data.id,
        name: data.name,
        image: data.image1,
        netWeight: data.netWeight,
        vegan: data.vegan,
        price: data.discountPrice,
        qty,
      },
    });
    const {
      buyNow: { buyNowItems },
    } = getState();
    Cookie.set("buyNowItems", JSON.stringify(buyNowItems));
  } catch (error) {}
};

const removeFromBuyNow = (productId) => (dispatch, getState) => {
  dispatch({ type: BUY_NOW_REMOVE_ITEM, payload: productId });
  const {
    buyNow: { buyNowItems },
  } = getState();
  Cookie.set("buyNowItems", JSON.stringify(buyNowItems));
};

const emptyBuyNow = () => (dispatch, getState) => {
  dispatch({ type: BUY_NOW_EMPTY });
  const {
    buyNow: { buyNowItems },
  } = getState();
  Cookie.set("buyNowItems", JSON.stringify(buyNowItems));
};

export {
  addToCart,
  listCartItems,
  removeFromCart,
  emptyCart,
  addToBuyNow,
  removeFromBuyNow,
  emptyBuyNow,
};
