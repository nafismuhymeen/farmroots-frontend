import axios from 'axios';
import { PRODUCT_CATEGORY_CREATE_FAIL, PRODUCT_CATEGORY_CREATE_REQUEST, PRODUCT_CATEGORY_CREATE_SUCCESS, 
    PRODUCT_CATEGORY_DELETE_FAIL, PRODUCT_CATEGORY_DELETE_REQUEST, PRODUCT_CATEGORY_DELETE_SUCCESS, 
    PRODUCT_CATEGORY_EDIT_FAIL, PRODUCT_CATEGORY_EDIT_REQUEST, PRODUCT_CATEGORY_EDIT_SUCCESS, PRODUCT_CATEGORY_LIST_FAIL, 
    PRODUCT_CATEGORY_LIST_REQUEST, PRODUCT_CATEGORY_LIST_SUCCESS, PRODUCT_POPULAR_CATEGORY_LIST_FAIL, PRODUCT_POPULAR_CATEGORY_LIST_REQUEST, PRODUCT_POPULAR_CATEGORY_LIST_SUCCESS } from '../constants/productCategoryConstants';

const createCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CATEGORY_CREATE_REQUEST, payload: category});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.post('/api/categories', category, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRODUCT_CATEGORY_CREATE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_CATEGORY_CREATE_FAIL, payload: error.message});        
    }
}

const listCategories = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_CATEGORY_LIST_REQUEST});
        const {data} = await axios.get('/api/categories');
        dispatch({type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message});        
    }
}

const listPopularCategories = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_POPULAR_CATEGORY_LIST_REQUEST});
        const {data} = await axios.get('/api/categories/popular');
        dispatch({type: PRODUCT_POPULAR_CATEGORY_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_POPULAR_CATEGORY_LIST_FAIL, payload: error.message});        
    }
}

const listEmployeeCategories = () => async (dispatch, getState) => {
    try {
        const {employeeSignin:{employeeInfo}} = getState();
        dispatch({type: PRODUCT_CATEGORY_LIST_REQUEST});
        const {data} = await axios.get('/api/categories/employee-categories', {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_CATEGORY_LIST_FAIL, payload: error.message});        
    }
}

const editCategory = (category) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CATEGORY_EDIT_REQUEST, payload: category});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/categories/' + category._id, category, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRODUCT_CATEGORY_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_CATEGORY_EDIT_FAIL, payload: error.message});        
    }
}

const deleteCategory = (categoryId) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CATEGORY_DELETE_REQUEST, payload: categoryId});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.delete('/api/categories/' + categoryId, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRODUCT_CATEGORY_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_CATEGORY_DELETE_FAIL, payload: error.message});        
    }
}

export {createCategory, listCategories, listEmployeeCategories, editCategory, deleteCategory, listPopularCategories}