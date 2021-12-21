import axios from "axios";
import {
  HOMESCREEN_CREATE_FAIL,
  HOMESCREEN_CREATE_REQUEST,
  HOMESCREEN_CREATE_SUCCESS,
  HOMESCREEN_EDIT_FAIL,
  HOMESCREEN_EDIT_REQUEST,
  HOMESCREEN_EDIT_SUCCESS,
  HOMESCREEN_LIST_FAIL,
  HOMESCREEN_LIST_REQUEST,
  HOMESCREEN_LIST_SUCCESS,
} from "../constants/homeScreenConstants";

const createHomeScreen = (homeScreen) => async (dispatch, getState) => {
  try {
    dispatch({ type: HOMESCREEN_CREATE_REQUEST, payload: homeScreen });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.post("/api/homescreen", homeScreen, {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: HOMESCREEN_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HOMESCREEN_CREATE_FAIL, payload: error.message });
  }
};

const getHomeScreen = () => async (dispatch) => {
  try {
    dispatch({ type: HOMESCREEN_LIST_REQUEST });

    const { data } = await axios.get("/api/homescreen");

    dispatch({ type: HOMESCREEN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HOMESCREEN_LIST_FAIL, payload: error.message });
  }
};

const getEmployeeHomeScreen = () => async (dispatch, getState) => {
  try {
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    dispatch({ type: HOMESCREEN_LIST_REQUEST });
    const { data } = await axios.get("/api/homescreen/employee-homescreen", {
      headers: {
        Authorization: "Bearer " + employeeInfo.token,
      },
    });
    dispatch({ type: HOMESCREEN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HOMESCREEN_LIST_FAIL, payload: error.message });
  }
};

const editHomeScreen = (homeScreen) => async (dispatch, getState) => {
  try {
    dispatch({ type: HOMESCREEN_EDIT_REQUEST, payload: homeScreen });
    const {
      employeeSignin: { employeeInfo },
    } = getState();
    const { data } = await axios.put(
      "/api/homescreen/" + homeScreen._id,
      homeScreen,
      {
        headers: {
          Authorization: "Bearer " + employeeInfo.token,
        },
      }
    );
    dispatch({ type: HOMESCREEN_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HOMESCREEN_EDIT_FAIL, payload: error.message });
  }
};

export {
  createHomeScreen,
  getHomeScreen,
  getEmployeeHomeScreen,
  editHomeScreen,
};
