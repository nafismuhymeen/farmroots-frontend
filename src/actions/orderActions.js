import axios from "axios";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELETE_SUCCESS,
  ORDER_DELETE_FAIL,
  ORDER_CANCEL_REQUEST,
  ORDER_CANCEL_SUCCESS,
  ORDER_CANCEL_FAIL,
  ORDER_CALL_CENTER_LIST_REQUEST,
  ORDER_CALL_CENTER_LIST_SUCCESS,
  ORDER_CALL_CENTER_LIST_FAIL,
  ORDER_CALL_CENTER_ASSIGN_REQUEST,
  ORDER_CALL_CENTER_ASSIGN_SUCCESS,
  ORDER_CALL_CENTER_ASSIGN_FAIL,
  ORDER_AUTHORIZE_REQUEST,
  ORDER_AUTHORIZE_SUCCESS,
  ORDER_AUTHORIZE_FAIL,
  ORDER_DELIVERY_LIST_REQUEST,
  ORDER_DELIVERY_LIST_SUCCESS,
  ORDER_DELIVERY_LIST_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAIL,
  ORDER_ITEMS_EDIT_REQUEST,
  ORDER_ITEMS_EDIT_SUCCESS,
  ORDER_ITEMS_EDIT_FAIL,
  ORDER_EDIT_REQUEST,
  ORDER_EDIT_SUCCESS,
  ORDER_EDIT_FAIL,
  ORDER_SUPPLY_CHAIN_LIST_REQUEST,
  ORDER_SUPPLY_CHAIN_LIST_SUCCESS,
  ORDER_SUPPLY_CHAIN_LIST_FAIL,
  ORDER_PROCESS_REQUEST,
  ORDER_PROCESS_SUCCESS,
  ORDER_PROCESS_FAIL,
  ORDER_FEEDBACK_LIST_REQUEST,
  ORDER_FEEDBACK_LIST_SUCCESS,
  ORDER_FEEDBACK_LIST_FAIL,
  ORDER_CALL_CENTER_BOSS_LIST_REQUEST,
  ORDER_CALL_CENTER_BOSS_LIST_SUCCESS,
  ORDER_CALL_CENTER_BOSS_LIST_FAIL,
  ORDER_FEEDBACK_ASSIGN_REQUEST,
  ORDER_FEEDBACK_ASSIGN_SUCCESS,
  ORDER_FEEDBACK_ASSIGN_FAIL,
  ORDER_TAKE_FEEDBACK_REQUEST,
  ORDER_TAKE_FEEDBACK_SUCCESS,
  ORDER_TAKE_FEEDBACK_FAIL,
  ORDER_REASSIGN_LIST_REQUEST,
  ORDER_REASSIGN_LIST_SUCCESS,
  ORDER_REASSIGN_LIST_FAIL,
  ORDER_DELIVERY_GUY_ASSIGN_REQUEST,
  ORDER_DELIVERY_GUY_ASSIGN_SUCCESS,
  ORDER_DELIVERY_GUY_ASSIGN_FAIL,
  ORDER_COMPLETE_REQUEST,
  ORDER_COMPLETE_SUCCESS,
  ORDER_COMPLETE_FAIL,
  ORDER_PICKUP_REQUEST,
  ORDER_PICKUP_SUCCESS,
  ORDER_PICKUP_FAIL,
  ORDER_EMPLOYEE_CANCEL_REQUEST,
  ORDER_EMPLOYEE_CANCEL_SUCCESS,
  ORDER_EMPLOYEE_CANCEL_FAIL,
  ORDER_PRICE_EDIT_REQUEST,
  ORDER_PRICE_EDIT_SUCCESS,
  ORDER_PRICE_EDIT_FAIL,
  ORDER_SPLIT_ITEMS_EDIT_REQUEST,
  ORDER_SPLIT_ITEMS_EDIT_SUCCESS,
  ORDER_SPLIT_ITEMS_EDIT_FAIL,
  ORDER_PARTIAL_CREATE_REQUEST,
  ORDER_PARTIAL_CREATE_SUCCESS,
  ORDER_PARTIAL_CREATE_FAIL,
} from "../constants/orderConstants";

const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const {
      userSignin: { userInfo },
    } = getState();
    const {
      data: { data: newOrder },
    } = await axios.post("/api/orders", order, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};

const createOrderPayNow = (order) => async (dispatch, getState) => {
  console.log(order);
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const {
      userSignin: { userInfo },
    } = getState();
    const result = await axios.post("/api/ssl", order, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    window.location.href = result.data;
    // dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};

const detailsOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get("/api/orders/" + orderId, {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
};

const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: MY_ORDER_LIST_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.get("/api/orders/mine", {
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    });
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: error.message });
  }
};

const listCallCenterOrders = (status) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CALL_CENTER_LIST_REQUEST });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.post("/api/orders/call-center", status, {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: ORDER_CALL_CENTER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_CALL_CENTER_LIST_FAIL, payload: error.message });
  }
};

const listReassignOrders = (status) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_REASSIGN_LIST_REQUEST });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.post("/api/orders/re-assign", status, {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: ORDER_REASSIGN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_REASSIGN_LIST_FAIL, payload: error.message });
  }
};

const listCallCenterBossOrders = (status) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CALL_CENTER_BOSS_LIST_REQUEST });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.post("/api/orders/call-center-boss", status, {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: ORDER_CALL_CENTER_BOSS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_CALL_CENTER_BOSS_LIST_FAIL,
      payload: error.message,
    });
  }
};

const listFeedbackOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_FEEDBACK_LIST_REQUEST });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.get("/api/orders/feedback", {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: ORDER_FEEDBACK_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_FEEDBACK_LIST_FAIL, payload: error.message });
  }
};

const listSupplyChainOrders = (status) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_SUPPLY_CHAIN_LIST_REQUEST });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.post("/api/orders/supply-chain", status, {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: ORDER_SUPPLY_CHAIN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_SUPPLY_CHAIN_LIST_FAIL, payload: error.message });
  }
};

const listDeliveries = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERY_LIST_REQUEST });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.get("/api/orders/deliveries", {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: ORDER_DELIVERY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DELIVERY_LIST_FAIL, payload: error.message });
  }
};

const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.get("/api/orders", {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: error.message });
  }
};

const cancelOrderWithReason = (order) => async (dispatch, getState) => {
  let orderId = order.orderId;
  let cancellationReason = order.cancellationReason;
  try {
    dispatch({
      type: ORDER_CANCEL_REQUEST,
      payload: {
        orderId: order.orderId,
        cancellationReason: cancellationReason,
      },
    });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.put(
      "/api/orders/cancelWithReason",
      { orderId, cancellationReason },
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    dispatch({ type: ORDER_CANCEL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_CANCEL_FAIL, payload: error.message });
  }
};

const cancelOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CANCEL_REQUEST, payload: orderId });
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.put(
      "/api/orders/cancel",
      { orderId },
      {
        headers: {
          Authorization: "Bearer " + userInfo.token,
        },
      }
    );
    dispatch({ type: ORDER_CANCEL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_CANCEL_FAIL, payload: error.message });
  }
};

const employeeCancelOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_EMPLOYEE_CANCEL_REQUEST, payload: orderId });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.put(
      "/api/orders/employee-cancel",
      { orderId },
      {
        headers: {
          Authorization: "Bearer " + employeeInfo.token,
        },
      }
    );
    dispatch({ type: ORDER_EMPLOYEE_CANCEL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_EMPLOYEE_CANCEL_FAIL, payload: error.message });
  }
};

const assignCallCenterGuy =
  (orderId, callCenterGuy) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CALL_CENTER_ASSIGN_REQUEST, payload: orderId });
      const {
        employeeSignin: { employeeInfo },
      } = getState();
      const { data } = await axios.put(
        "/api/orders/call-center-assign",
        { orderId, callCenterGuy },
        {
          headers: {
            Authorization: "Bearer " + employeeInfo.token,
          },
        }
      );
      dispatch({ type: ORDER_CALL_CENTER_ASSIGN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ORDER_CALL_CENTER_ASSIGN_FAIL, payload: error.message });
    }
  };

const assignDeliveryGuy =
  (orderId, deliveryGuy) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DELIVERY_GUY_ASSIGN_REQUEST, payload: orderId });
      const {
        employeeSignin: { employeeInfo },
      } = getState();
      const { data } = await axios.put(
        "/api/orders/delivery-guy-assign",
        { orderId, deliveryGuy },
        {
          headers: {
            Authorization: "Bearer " + employeeInfo.token,
          },
        }
      );
      dispatch({ type: ORDER_DELIVERY_GUY_ASSIGN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ORDER_DELIVERY_GUY_ASSIGN_FAIL,
        payload: error.message,
      });
    }
  };

const assignFeedbackGuy =
  (orderId, feedbackGuy) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_FEEDBACK_ASSIGN_REQUEST, payload: orderId });
      const {
        employeeSignin: { employeeInfo },
      } = getState();
      const { data } = await axios.put(
        "/api/orders/feedback-assign",
        { orderId, feedbackGuy },
        {
          headers: {
            Authorization: "Bearer " + employeeInfo.token,
          },
        }
      );
      dispatch({ type: ORDER_FEEDBACK_ASSIGN_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ORDER_FEEDBACK_ASSIGN_FAIL, payload: error.message });
    }
  };

const takeFeedback =
  (orderId, rating, comment) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_TAKE_FEEDBACK_REQUEST, payload: orderId });
      const {
        employeeSignin: { employeeInfo },
      } = getState();
      const { data } = await axios.put(
        "/api/orders/take-feedback",
        { orderId, rating, comment },
        {
          headers: {
            Authorization: "Bearer " + employeeInfo.token,
          },
        }
      );
      dispatch({ type: ORDER_TAKE_FEEDBACK_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: ORDER_TAKE_FEEDBACK_FAIL, payload: error.message });
    }
  };

const authorizeOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_AUTHORIZE_REQUEST, payload: orderId });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.put(
      "/api/orders/authorize",
      { orderId },
      {
        headers: {
          Authorization: "Bearer " + employeeInfo.token,
        },
      }
    );
    dispatch({ type: ORDER_AUTHORIZE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_AUTHORIZE_FAIL, payload: error.message });
  }
};

const pickupOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PICKUP_REQUEST, payload: orderId });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.put(
      "/api/orders/pickup",
      { orderId },
      {
        headers: {
          Authorization: "Bearer " + employeeInfo.token,
        },
      }
    );
    dispatch({ type: ORDER_PICKUP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_PICKUP_FAIL, payload: error.message });
  }
};

const processOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PROCESS_REQUEST, payload: orderId });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.put(
      "/api/orders/process",
      { orderId },
      {
        headers: {
          Authorization: "Bearer " + employeeInfo.token,
        },
      }
    );
    dispatch({ type: ORDER_PROCESS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_PROCESS_FAIL, payload: error.message });
  }
};

const deliverOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERED_REQUEST, payload: orderId });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.put(
      "/api/orders/delivered",
      { orderId },
      {
        headers: {
          Authorization: "Bearer " + employeeInfo.token,
        },
      }
    );
    dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DELIVERED_FAIL, payload: error.message });
  }
};

const completeOrder = (orderId) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_COMPLETE_REQUEST, payload: orderId });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.put(
      "/api/orders/complete",
      { orderId },
      {
        headers: {
          Authorization: "Bearer " + employeeInfo.token,
        },
      }
    );
    dispatch({ type: ORDER_COMPLETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_COMPLETE_FAIL, payload: error.message });
  }
};

const editOrderItems = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_ITEMS_EDIT_REQUEST, payload: order });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.put("/api/orders/order-items", order, {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: ORDER_ITEMS_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_ITEMS_EDIT_FAIL, payload: error.message });
  }
};

const editSplitOrderItems = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_SPLIT_ITEMS_EDIT_REQUEST, payload: order });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.put("/api/orders/split-order-items", order, {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: ORDER_SPLIT_ITEMS_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_SPLIT_ITEMS_EDIT_FAIL, payload: error.message });
  }
};

const editOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_EDIT_REQUEST, payload: order });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.put("/api/orders/edit", order, {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: ORDER_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_EDIT_FAIL, payload: error.message });
  }
};

const editOrderPrice = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PRICE_EDIT_REQUEST, payload: order });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.put("/api/orders/price-edit", order, {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: ORDER_PRICE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_PRICE_EDIT_FAIL, payload: error.message });
  }
};

const createPartialOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PARTIAL_CREATE_REQUEST, payload: order });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const {
      data: { data: newOrder },
    } = await axios.post("/api/orders/partial", order, {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: ORDER_PARTIAL_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_PARTIAL_CREATE_FAIL, payload: error.message });
  }
};

export {
  createOrder,
  createOrderPayNow,
  detailsOrder,
  listMyOrders,
  listOrders,
  cancelOrder,
  listCallCenterOrders,
  listCallCenterBossOrders,
  assignCallCenterGuy,
  authorizeOrder,
  listDeliveries,
  deliverOrder,
  editOrderItems,
  editOrder,
  listSupplyChainOrders,
  pickupOrder,
  processOrder,
  listFeedbackOrders,
  assignFeedbackGuy,
  takeFeedback,
  listReassignOrders,
  assignDeliveryGuy,
  completeOrder,
  employeeCancelOrder,
  editOrderPrice,
  editSplitOrderItems,
  createPartialOrder,
  cancelOrderWithReason,
};
