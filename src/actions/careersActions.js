import axios from 'axios';
import { CAREERS_JOB_OPENINGS_CONTENT_ADD_FAIL, CAREERS_JOB_OPENINGS_CONTENT_ADD_REQUEST, CAREERS_JOB_OPENINGS_CONTENT_ADD_SUCCESS, CAREERS_JOB_OPENINGS_CONTENT_DELETE_FAIL, CAREERS_JOB_OPENINGS_CONTENT_DELETE_REQUEST, CAREERS_JOB_OPENINGS_CONTENT_DELETE_SUCCESS, CAREERS_JOB_OPENINGS_CONTENT_EDIT_FAIL, CAREERS_JOB_OPENINGS_CONTENT_EDIT_REQUEST, CAREERS_JOB_OPENINGS_CONTENT_EDIT_SUCCESS, CAREERS_CREATE_FAIL, CAREERS_CREATE_REQUEST, CAREERS_CREATE_SUCCESS, 
    CAREERS_EDIT_FAIL, CAREERS_EDIT_REQUEST, CAREERS_EDIT_SUCCESS, CAREERS_ARTICLES_CONTENT_ADD_FAIL, CAREERS_ARTICLES_CONTENT_ADD_REQUEST, CAREERS_ARTICLES_CONTENT_ADD_SUCCESS, CAREERS_ARTICLES_CONTENT_DELETE_FAIL, CAREERS_ARTICLES_CONTENT_DELETE_REQUEST, CAREERS_ARTICLES_CONTENT_DELETE_SUCCESS, CAREERS_ARTICLES_CONTENT_EDIT_FAIL, CAREERS_ARTICLES_CONTENT_EDIT_REQUEST, CAREERS_ARTICLES_CONTENT_EDIT_SUCCESS, CAREERS_LIST_FAIL, 
    CAREERS_LIST_REQUEST, CAREERS_LIST_SUCCESS, CAREERS_EMPLOYEE_LIST_REQUEST, CAREERS_EMPLOYEE_LIST_SUCCESS, CAREERS_EMPLOYEE_LIST_FAIL } from '../constants/careersConstants';

const createCareers = (careers) => async (dispatch, getState) => {
    try {
        dispatch({type: CAREERS_CREATE_REQUEST, payload: careers});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.post('/api/careers', careers, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: CAREERS_CREATE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CAREERS_CREATE_FAIL, payload: error.message});        
    }
}

const getCareers = () => async (dispatch) => {
    try {
        dispatch({type: CAREERS_LIST_REQUEST});
        const {data} = await axios.get('/api/careers');
        dispatch({type: CAREERS_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CAREERS_LIST_FAIL, payload: error.message});        
    }
}

const getEmployeeCareers = () => async (dispatch, getState) => {
    try {
        const {employeeSignin:{employeeInfo}} = getState();
        dispatch({type: CAREERS_EMPLOYEE_LIST_REQUEST});
        const {data} = await axios.get('/api/careers/employee-careers', {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: CAREERS_EMPLOYEE_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CAREERS_EMPLOYEE_LIST_FAIL, payload: error.message});        
    }
}

const editCareers = (careers) => async (dispatch, getState) => {
    try {
        dispatch({type: CAREERS_EDIT_REQUEST, payload: careers});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/careers/edit/' + careers._id, careers, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: CAREERS_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CAREERS_EDIT_FAIL, payload: error.message});        
    }
}

const addCareersJobOpeningsContent = (jobOpenings) => async (dispatch, getState) => {
    try {
        dispatch({type: CAREERS_JOB_OPENINGS_CONTENT_ADD_REQUEST, payload: jobOpenings});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/careers/add-job-openings-content', jobOpenings, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: CAREERS_JOB_OPENINGS_CONTENT_ADD_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CAREERS_JOB_OPENINGS_CONTENT_ADD_FAIL, payload: error.message});        
    }
}

const editCareersJobOpeningsContent = (jobOpenings) => async (dispatch, getState) => {
    try {
        dispatch({type: CAREERS_JOB_OPENINGS_CONTENT_EDIT_REQUEST, payload: jobOpenings});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/careers/edit-job-openings-content', jobOpenings, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: CAREERS_JOB_OPENINGS_CONTENT_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CAREERS_JOB_OPENINGS_CONTENT_EDIT_FAIL, payload: error.message});        
    }
}

const deleteCareersJobOpeningsContent = (jobOpenings) => async (dispatch, getState) => {
    try {
        dispatch({type: CAREERS_JOB_OPENINGS_CONTENT_DELETE_REQUEST, payload: jobOpenings});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/careers/delete-job-openings-content', jobOpenings, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: CAREERS_JOB_OPENINGS_CONTENT_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CAREERS_JOB_OPENINGS_CONTENT_DELETE_FAIL, payload: error.message});        
    }
}

const addCareersArticlesContent = (articles) => async (dispatch, getState) => {
    try {
        dispatch({type: CAREERS_ARTICLES_CONTENT_ADD_REQUEST, payload: articles});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/careers/add-articles-content', articles, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: CAREERS_ARTICLES_CONTENT_ADD_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CAREERS_ARTICLES_CONTENT_ADD_FAIL, payload: error.message});        
    }
}

const editCareersArticlesContent = (articles) => async (dispatch, getState) => {
    try {
        dispatch({type: CAREERS_ARTICLES_CONTENT_EDIT_REQUEST, payload: articles});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/careers/edit-articles-content', articles, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: CAREERS_ARTICLES_CONTENT_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CAREERS_ARTICLES_CONTENT_EDIT_FAIL, payload: error.message});        
    }
}

const deleteCareersArticlesContent = (articles) => async (dispatch, getState) => {
    try {
        dispatch({type: CAREERS_ARTICLES_CONTENT_DELETE_REQUEST, payload: articles});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/careers/delete-articles-content', articles, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: CAREERS_ARTICLES_CONTENT_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: CAREERS_ARTICLES_CONTENT_DELETE_FAIL, payload: error.message});        
    }
}

export {createCareers, getCareers, getEmployeeCareers, editCareers, addCareersJobOpeningsContent, editCareersJobOpeningsContent, 
    deleteCareersJobOpeningsContent, addCareersArticlesContent, editCareersArticlesContent, 
    deleteCareersArticlesContent}