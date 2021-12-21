import axios from 'axios';
import {
    HELP_CREATE_FAIL, HELP_CREATE_REQUEST, HELP_CREATE_SUCCESS,
    HELP_DELETE_FAIL, HELP_DELETE_REQUEST, HELP_DELETE_SUCCESS,
    HELP_EDIT_FAIL, HELP_EDIT_REQUEST, HELP_EDIT_SUCCESS, HELP_EMPLOYEE_LIST_FAIL, HELP_EMPLOYEE_LIST_REQUEST, HELP_EMPLOYEE_LIST_SUCCESS, HELP_LIST_FAIL,
    HELP_LIST_REQUEST, HELP_LIST_SUCCESS
} from '../constants/helpConstants';

const createHelp = (help) => async (dispatch, getState) => {
    try {
        dispatch({ type: HELP_CREATE_REQUEST, payload: help });
        const { employeeSignin: { employeeInfo } } = getState();
        const { data } = await axios.post('/api/help', help, {
            headers: {
                Authorization: 'Bearer ' + employeeInfo.token
            }
        });
        dispatch({ type: HELP_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: HELP_CREATE_FAIL, payload: error.message });
    }
}

const listHelp = (type) => async (dispatch, getState) => {
    try {
        dispatch({ type: HELP_LIST_REQUEST });
        const { userSignin: { userInfo } } = getState();
        const { data } = await axios.get('/api/help?type=' + `${type}`);
        dispatch({ type: HELP_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: HELP_LIST_FAIL, payload: error.message });
    }
}

const listEmployeeHelp = () => async (dispatch, getState) => {
    try {
        dispatch({ type: HELP_EMPLOYEE_LIST_REQUEST });
        const { employeeSignin: { employeeInfo } } = getState();
        const { data } = await axios.get('/api/help/employee-help');
        dispatch({ type: HELP_EMPLOYEE_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: HELP_EMPLOYEE_LIST_FAIL, payload: error.message });
    }
}

const editHelp = (help) => async (dispatch, getState) => {
    try {
        dispatch({ type: HELP_EDIT_REQUEST, payload: help });
        const { employeeSignin: { employeeInfo } } = getState();
        const { data } = await axios.put('/api/help/' + help._id, help, {
            headers: {
                Authorization: 'Bearer ' + employeeInfo.token
            }
        });
        dispatch({ type: HELP_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: HELP_EDIT_FAIL, payload: error.message });
    }
}

const deleteHelp = (helpId) => async (dispatch, getState) => {
    try {
        dispatch({ type: HELP_DELETE_REQUEST, payload: helpId });
        const { employeeSignin: { employeeInfo } } = getState();
        const { data } = await axios.delete('/api/help/' + helpId, {
            headers: {
                Authorization: 'Bearer ' + employeeInfo.token
            }
        });
        dispatch({ type: HELP_DELETE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: HELP_DELETE_FAIL, payload: error.message });
    }
}

export { createHelp, listHelp, listEmployeeHelp, editHelp, deleteHelp }