import axios from 'axios';
import Cookie from 'js-cookie';
import { CALL_CENTER_GUYS_LIST_FAIL, CALL_CENTER_GUYS_LIST_REQUEST, CALL_CENTER_GUYS_LIST_SUCCESS, DELIVERY_GUYS_LIST_FAIL, DELIVERY_GUYS_LIST_REQUEST, DELIVERY_GUYS_LIST_SUCCESS, EMPLOYEE_REGISTER_FAIL, EMPLOYEE_REGISTER_REQUEST, EMPLOYEE_REGISTER_SUCCESS, EMPLOYEE_SIGNIN_FAIL, EMPLOYEE_SIGNIN_REQUEST, EMPLOYEE_SIGNIN_SUCCESS } from '../constants/employeeConstants';

const signInEmployee = (username, password) => async (dispatch) => {
    dispatch({type: EMPLOYEE_SIGNIN_REQUEST, payload: {username, password}});
    try {
        const {data} = await axios.post("/api/employees/signin", {username, password});
        dispatch ({type: EMPLOYEE_SIGNIN_SUCCESS, payload: data});
        Cookie.set("employeeInfo", JSON.stringify(data));
    } catch (error) {
        dispatch ({type: EMPLOYEE_SIGNIN_FAIL, payload: error.message});        
    }
}

const registerEmployee = (username, password, type) => async (dispatch, getState) => {
    const {employeeSignin: {employeeInfo}} = getState();
    dispatch({type: EMPLOYEE_REGISTER_REQUEST, payload: {username, password, type}});
    try {
        const {data} = await axios.post("/api/employees/register", {username, password, type}, 
        {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }});
        dispatch ({type: EMPLOYEE_REGISTER_SUCCESS, payload: data});
    } catch (error) {
        dispatch ({type: EMPLOYEE_REGISTER_FAIL, payload: error.message});        
    }
}

const listCallCenterGuys = () => async (dispatch, getState) => {
    try {
        const {employeeSignin:{employeeInfo}} = getState();
        dispatch({type: CALL_CENTER_GUYS_LIST_REQUEST});
        const {data} = await axios.get('/api/employees/call-center-guys', {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: CALL_CENTER_GUYS_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CALL_CENTER_GUYS_LIST_FAIL, payload: error.message});        
    }
}

const listDeliveryGuys = () => async (dispatch, getState) => {
    try {
        const {employeeSignin:{employeeInfo}} = getState();
        dispatch({type: DELIVERY_GUYS_LIST_REQUEST});
        const {data} = await axios.get('/api/employees/delivery-guys', {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: DELIVERY_GUYS_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: DELIVERY_GUYS_LIST_FAIL, payload: error.message});        
    }
}

export {signInEmployee, registerEmployee, listCallCenterGuys, listDeliveryGuys}