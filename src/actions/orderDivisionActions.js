import axios from 'axios';
import { ORDER_DIVISION_CREATE_FAIL, ORDER_DIVISION_CREATE_REQUEST, ORDER_DIVISION_CREATE_SUCCESS, 
    ORDER_DIVISION_DELETE_FAIL, ORDER_DIVISION_DELETE_REQUEST, ORDER_DIVISION_DELETE_SUCCESS, 
    ORDER_DIVISION_EDIT_FAIL, ORDER_DIVISION_EDIT_REQUEST, ORDER_DIVISION_EDIT_SUCCESS, ORDER_DIVISION_LIST_FAIL, 
    ORDER_DIVISION_LIST_REQUEST, ORDER_DIVISION_LIST_SUCCESS, ORDER_ZONES_LIST_FAIL, ORDER_ZONES_LIST_REQUEST, ORDER_ZONES_LIST_SUCCESS } from '../constants/orderDivisionConstants';

const createDivision = (division) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DIVISION_CREATE_REQUEST, payload: division});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.post('/api/division', division, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: ORDER_DIVISION_CREATE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ORDER_DIVISION_CREATE_FAIL, payload: error.message});        
    }
}

const listDivision = () => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DIVISION_LIST_REQUEST});
        const {userSignin:{userInfo}} = getState();
        const {data} = await axios.get('/api/division', {headers: {
            Authorization: 'Bearer ' + userInfo.token
        }
       
        });
        dispatch({type: ORDER_DIVISION_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ORDER_DIVISION_LIST_FAIL, payload: error.message});        
    }
}

const listEmployeeDivision = () => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DIVISION_LIST_REQUEST});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.get('/api/division/employee-divisions', {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: ORDER_DIVISION_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ORDER_DIVISION_LIST_FAIL, payload: error.message});        
    }
}

const listCallCenterDivision = () => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DIVISION_LIST_REQUEST});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.get('/api/division/call-center-divisions', {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: ORDER_DIVISION_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ORDER_DIVISION_LIST_FAIL, payload: error.message});        
    }
}

const listZones = () => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_ZONES_LIST_REQUEST});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.get('/api/division/zones', {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: ORDER_ZONES_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ORDER_ZONES_LIST_FAIL, payload: error.message});        
    }
}

const editDivision = (division) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DIVISION_EDIT_REQUEST, payload: division});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/division/' + division._id, division, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: ORDER_DIVISION_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ORDER_DIVISION_EDIT_FAIL, payload: error.message});        
    }
}

const deleteDivision = (divisionId) => async (dispatch, getState) => {
    try {
        dispatch({type: ORDER_DIVISION_DELETE_REQUEST, payload: divisionId});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.delete('/api/division/' + divisionId, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: ORDER_DIVISION_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ORDER_DIVISION_DELETE_FAIL, payload: error.message});        
    }
}

export {createDivision, listDivision, listEmployeeDivision, listCallCenterDivision, editDivision, deleteDivision, listZones}