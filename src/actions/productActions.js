import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_NAME_LIST_REQUEST,
  PRODUCT_NAME_LIST_SUCCESS,
  PRODUCT_NAME_LIST_FAIL,
  PRODUCT_GROCERY_NAME_LIST_REQUEST,
  PRODUCT_GROCERY_NAME_LIST_SUCCESS,
  PRODUCT_GROCERY_NAME_LIST_FAIL,
  PRODUCT_RECOMMENDED_LIST_REQUEST,
  PRODUCT_RECOMMENDED_LIST_SUCCESS,
  PRODUCT_RECOMMENDED_LIST_FAIL,
  PRODUCT_OUT_OF_STOCK_REQUEST,
  PRODUCT_OUT_OF_STOCK_SUCCESS,
  PRODUCT_OUT_OF_STOCK_FAIL,
  PRODUCT_CALL_CENTER_NAME_LIST_REQUEST,
  PRODUCT_CALL_CENTER_NAME_LIST_SUCCESS,
  PRODUCT_CALL_CENTER_NAME_LIST_FAIL,
  PRODUCT_UPLOAD_NAME_LIST_REQUEST,
  PRODUCT_UPLOAD_NAME_LIST_SUCCESS,
  PRODUCT_UPLOAD_NAME_LIST_FAIL,
} from "../constants/productConstants";

const listProducts =
  (searchKeyword = "", sortOrder = "", category = "", subCategory = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(
        "/api/products?category=" +
          category +
          "&subCategory=" +
          subCategory +
          "&searchKeyword=" +
          searchKeyword +
          "&sortOrder=" +
          sortOrder
      );
      console.log("NAfis From Product");
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

const listSearchProducts =
  (
    searchKeyword = "",
    sortOrder = "",
    minPrice = 0,
    maxPrice = 0,
    rating = 0
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(
        "/api/products/user/search?searchKeyword=" +
          searchKeyword +
          "&sortOrder=" +
          sortOrder +
          "&minPrice=" +
          minPrice +
          "&maxPrice=" +
          maxPrice +
          "&rating=" +
          rating
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

const listEmployeeProducts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.get("/api/products/employee/products", {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    if (product.edit === false) {
      const { data } = await axios.post("/api/products/form", product, {
        headers: {
          Authorization: "Bearer " + employeeInfo.token,
        },
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    } else {
      console.log(product, "product");
      const { data } = await axios.put(
        "/api/products/edit/" + product.originalId,
        product,
        {
          headers: {
            Authorization: "Bearer " + employeeInfo.token,
          },
        }
      );
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

const saveProductFromCsv = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.post("/api/products/csv", product, {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    const { data } = await axios.get("/api/products/" + productId);
    console.log(data);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

const deleteProduct = (productId) => async (dispatch, getState) => {
  try {
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
    const { data } = await axios.delete("/api/products/" + productId, {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

const listProductNames =
  (category = "", subCategory = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_NAME_LIST_REQUEST });
      const { data } = await axios.get(
        "/api/products/user/product-names?category=" +
          category +
          "&subCategory=" +
          subCategory
      );
      dispatch({
        type: PRODUCT_NAME_LIST_SUCCESS,
        payload: data,
        success: true,
      });
    } catch (error) {
      dispatch({ type: PRODUCT_NAME_LIST_FAIL, payload: error.message });
    }
  };

const listCallCenterProductNames = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CALL_CENTER_NAME_LIST_REQUEST });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.get(
      "/api/products/call-center/product-names",
      {
        headers: {
          Authorization: "Bearer " + employeeInfo.token,
        },
      }
    );
    dispatch({
      type: PRODUCT_CALL_CENTER_NAME_LIST_SUCCESS,
      payload: data,
      success: true,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CALL_CENTER_NAME_LIST_FAIL,
      payload: error.message,
    });
  }
};

const listUploadProductNames = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_UPLOAD_NAME_LIST_REQUEST });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.get("/api/products/upload/product-names", {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({
      type: PRODUCT_UPLOAD_NAME_LIST_SUCCESS,
      payload: data,
      success: true,
    });
  } catch (error) {
    dispatch({ type: PRODUCT_UPLOAD_NAME_LIST_FAIL, payload: error.message });
  }
};

const listRecommendedProducts = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_RECOMMENDED_LIST_REQUEST });
    const { data } = await axios.get(
      `/api/products/${productId}/recommended-products`
    );
    dispatch({ type: PRODUCT_RECOMMENDED_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_RECOMMENDED_LIST_FAIL, payload: error.message });
  }
};

const outOfStockProduct = (productId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_OUT_OF_STOCK_REQUEST, payload: productId });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.put(
      "/api/products/outOfStock",
      { productId },
      {
        headers: {
          Authorization: "Bearer " + employeeInfo.token,
        },
      }
    );
    dispatch({ type: PRODUCT_OUT_OF_STOCK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_OUT_OF_STOCK_FAIL, payload: error.message });
  }
};

export {
  listProducts,
  detailsProduct,
  saveProduct,
  deleteProduct,
  listEmployeeProducts,
  listProductNames,
  listUploadProductNames,
  listSearchProducts,
  saveProductFromCsv,
  listRecommendedProducts,
  outOfStockProduct,
  listCallCenterProductNames,
};
