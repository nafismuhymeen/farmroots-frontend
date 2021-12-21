import axios from 'axios';
import { ABOUT_CREATE_FAIL, ABOUT_CREATE_REQUEST, ABOUT_CREATE_SUCCESS, 
    ABOUT_EDIT_FAIL, ABOUT_EDIT_REQUEST, ABOUT_EDIT_SUCCESS, ABOUT_EMPLOYEE_LIST_FAIL, ABOUT_EMPLOYEE_LIST_REQUEST, ABOUT_EMPLOYEE_LIST_SUCCESS, ABOUT_LIST_FAIL, 
    ABOUT_LIST_REQUEST, ABOUT_LIST_SUCCESS, ABOUT_MANAGEMENT_CONTENT_ADD_FAIL, ABOUT_MANAGEMENT_CONTENT_ADD_REQUEST, ABOUT_MANAGEMENT_CONTENT_ADD_SUCCESS, ABOUT_MANAGEMENT_CONTENT_DELETE_FAIL, ABOUT_MANAGEMENT_CONTENT_DELETE_REQUEST, ABOUT_MANAGEMENT_CONTENT_DELETE_SUCCESS, ABOUT_MANAGEMENT_CONTENT_EDIT_FAIL, ABOUT_MANAGEMENT_CONTENT_EDIT_REQUEST, ABOUT_MANAGEMENT_CONTENT_EDIT_SUCCESS } from '../constants/aboutConstants';

const createAbout = (about) => async (dispatch, getState) => {
    try {
        dispatch({type: ABOUT_CREATE_REQUEST, payload: about});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.post('/api/about', about, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: ABOUT_CREATE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ABOUT_CREATE_FAIL, payload: error.message});        
    }
}

const getAbout = () => async (dispatch) => {
    try {
        dispatch({type: ABOUT_LIST_REQUEST});
        const {data} = await axios.get('/api/about');
        dispatch({type: ABOUT_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ABOUT_LIST_FAIL, payload: error.message});        
    }
}

const getEmployeeAbout = () => async (dispatch, getState) => {
    try {
        const {employeeSignin:{employeeInfo}} = getState();
        dispatch({type: ABOUT_EMPLOYEE_LIST_REQUEST});
        const {data} = await axios.get('/api/about/employee-about', {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: ABOUT_EMPLOYEE_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ABOUT_EMPLOYEE_LIST_FAIL, payload: error.message});        
    }
}

const editAbout = (about) => async (dispatch, getState) => {
    try {
        dispatch({type: ABOUT_EDIT_REQUEST, payload: about});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/about/edit/' + about._id, about, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: ABOUT_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ABOUT_EDIT_FAIL, payload: error.message});        
    }
}

const addAboutManagementContent = (management) => async (dispatch, getState) => {
    try {
        dispatch({type: ABOUT_MANAGEMENT_CONTENT_ADD_REQUEST, payload: management});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/about/add-management-content', management, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: ABOUT_MANAGEMENT_CONTENT_ADD_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ABOUT_MANAGEMENT_CONTENT_ADD_FAIL, payload: error.message});        
    }
}

const editAboutManagementContent = (management) => async (dispatch, getState) => {
    try {
        dispatch({type: ABOUT_MANAGEMENT_CONTENT_EDIT_REQUEST, payload: management});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/about/edit-management-content', management, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: ABOUT_MANAGEMENT_CONTENT_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ABOUT_MANAGEMENT_CONTENT_EDIT_FAIL, payload: error.message});        
    }
}

const deleteAboutManagementContent = (management) => async (dispatch, getState) => {
    try {
        dispatch({type: ABOUT_MANAGEMENT_CONTENT_DELETE_REQUEST, payload: management});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/about/delete-management-content', management, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: ABOUT_MANAGEMENT_CONTENT_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: ABOUT_MANAGEMENT_CONTENT_DELETE_FAIL, payload: error.message});        
    }
}

export {createAbout, getAbout, getEmployeeAbout, editAbout, addAboutManagementContent, editAboutManagementContent, deleteAboutManagementContent}