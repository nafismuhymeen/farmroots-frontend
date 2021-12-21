import axios from 'axios';
import { PARTNER_CREATE_FAIL, PARTNER_CREATE_REQUEST, PARTNER_CREATE_SUCCESS, 
    PARTNER_EDIT_FAIL, PARTNER_EDIT_REQUEST, PARTNER_EDIT_SUCCESS, PARTNER_LIST_FAIL, 
    PARTNER_LIST_REQUEST, PARTNER_LIST_SUCCESS, PARTNER_CONTENT_ADD_FAIL, PARTNER_CONTENT_ADD_REQUEST, PARTNER_CONTENT_ADD_SUCCESS, PARTNER_CONTENT_DELETE_FAIL, PARTNER_CONTENT_DELETE_REQUEST, PARTNER_CONTENT_DELETE_SUCCESS, PARTNER_CONTENT_EDIT_FAIL, PARTNER_CONTENT_EDIT_REQUEST, PARTNER_CONTENT_EDIT_SUCCESS } from '../constants/partnerConstants';

const createPartner = (partner) => async (dispatch, getState) => {
    try {
        dispatch({type: PARTNER_CREATE_REQUEST, payload: partner});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.post('/api/partner', partner, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PARTNER_CREATE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PARTNER_CREATE_FAIL, payload: error.message});        
    }
}

const getPartner = () => async (dispatch) => {
    try {
        dispatch({type: PARTNER_LIST_REQUEST});
        const {data} = await axios.get('/api/partner');
        dispatch({type: PARTNER_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PARTNER_LIST_FAIL, payload: error.message});        
    }
}

const getEmployeePartner = () => async (dispatch, getState) => {
    try {
        const {employeeSignin:{employeeInfo}} = getState();
        dispatch({type: PARTNER_LIST_REQUEST});
        const {data} = await axios.get('/api/partner/employee-partner', {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PARTNER_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PARTNER_LIST_FAIL, payload: error.message});        
    }
}

const editPartner = (partner) => async (dispatch, getState) => {
    try {
        dispatch({type: PARTNER_EDIT_REQUEST, payload: partner});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/partner/edit/' + partner._id, partner, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PARTNER_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PARTNER_EDIT_FAIL, payload: error.message});        
    }
}

const addPartnerContent = (partner) => async (dispatch, getState) => {
    try {
        dispatch({type: PARTNER_CONTENT_ADD_REQUEST, payload: partner});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/partner/add-partner-content', partner, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PARTNER_CONTENT_ADD_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PARTNER_CONTENT_ADD_FAIL, payload: error.message});        
    }
}

const editPartnerContent = (partner) => async (dispatch, getState) => {
    try {
        dispatch({type: PARTNER_CONTENT_EDIT_REQUEST, payload: partner});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/partner/edit-partner-content', partner, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PARTNER_CONTENT_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PARTNER_CONTENT_EDIT_FAIL, payload: error.message});        
    }
}

const deletePartnerContent = (partner) => async (dispatch, getState) => {
    try {
        dispatch({type: PARTNER_CONTENT_DELETE_REQUEST, payload: partner});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/partner/delete-partner-content', partner, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PARTNER_CONTENT_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PARTNER_CONTENT_DELETE_FAIL, payload: error.message});        
    }
}

export {createPartner, getPartner, getEmployeePartner, editPartner, addPartnerContent, editPartnerContent, deletePartnerContent}