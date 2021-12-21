import axios from 'axios';
import { EXPORTS_CREATE_FAIL, EXPORTS_CREATE_REQUEST, EXPORTS_CREATE_SUCCESS, 
    EXPORTS_EDIT_FAIL, EXPORTS_EDIT_REQUEST, EXPORTS_EDIT_SUCCESS, EXPORTS_LIST_FAIL, 
    EXPORTS_LIST_REQUEST, EXPORTS_LIST_SUCCESS, EXPORTS_CONTENT_ADD_FAIL, EXPORTS_CONTENT_ADD_REQUEST, EXPORTS_CONTENT_ADD_SUCCESS, EXPORTS_CONTENT_DELETE_FAIL, EXPORTS_CONTENT_DELETE_REQUEST, EXPORTS_CONTENT_DELETE_SUCCESS, EXPORTS_CONTENT_EDIT_FAIL, EXPORTS_CONTENT_EDIT_REQUEST, EXPORTS_CONTENT_EDIT_SUCCESS } from '../constants/exportsConstants';

const createExports = (Exports) => async (dispatch, getState) => {
    try {
        dispatch({type: EXPORTS_CREATE_REQUEST, payload: Exports});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.post('/api/Exports', Exports, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: EXPORTS_CREATE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: EXPORTS_CREATE_FAIL, payload: error.message});        
    }
}

const getExports = () => async (dispatch) => {
    try {
        dispatch({type: EXPORTS_LIST_REQUEST});
        const {data} = await axios.get('/api/Exports');
        dispatch({type: EXPORTS_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: EXPORTS_LIST_FAIL, payload: error.message});        
    }
}

const getEmployeeExports = () => async (dispatch, getState) => {
    try {
        const {employeeSignin:{employeeInfo}} = getState();
        dispatch({type: EXPORTS_LIST_REQUEST});
        const {data} = await axios.get('/api/Exports/employee-Exports', {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: EXPORTS_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: EXPORTS_LIST_FAIL, payload: error.message});        
    }
}

const editExports = (Exports) => async (dispatch, getState) => {
    try {
        dispatch({type: EXPORTS_EDIT_REQUEST, payload: Exports});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/Exports/edit/' + Exports._id, Exports, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: EXPORTS_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: EXPORTS_EDIT_FAIL, payload: error.message});        
    }
}

const addExportsContent = (Exports) => async (dispatch, getState) => {
    try {
        dispatch({type: EXPORTS_CONTENT_ADD_REQUEST, payload: Exports});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/Exports/add-Exports-content', Exports, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: EXPORTS_CONTENT_ADD_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: EXPORTS_CONTENT_ADD_FAIL, payload: error.message});        
    }
}

const editExportsContent = (Exports) => async (dispatch, getState) => {
    try {
        dispatch({type: EXPORTS_CONTENT_EDIT_REQUEST, payload: Exports});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/Exports/edit-Exports-content', Exports, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: EXPORTS_CONTENT_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: EXPORTS_CONTENT_EDIT_FAIL, payload: error.message});        
    }
}

const deleteExportsContent = (Exports) => async (dispatch, getState) => {
    try {
        dispatch({type: EXPORTS_CONTENT_DELETE_REQUEST, payload: Exports});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/Exports/delete-Exports-content', Exports, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: EXPORTS_CONTENT_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: EXPORTS_CONTENT_DELETE_FAIL, payload: error.message});        
    }
}

export {createExports, getExports, getEmployeeExports, editExports, addExportsContent, editExportsContent, deleteExportsContent}