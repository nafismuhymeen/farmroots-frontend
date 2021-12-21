import axios from 'axios';
import { SUGGEST_PRODUCT_CREATE_FAIL, SUGGEST_PRODUCT_CREATE_REQUEST, SUGGEST_PRODUCT_CREATE_SUCCESS, SUGGEST_PRODUCT_DELETE_FAIL, SUGGEST_PRODUCT_DELETE_REQUEST, SUGGEST_PRODUCT_DELETE_SUCCESS, SUGGEST_PRODUCT_LIST_FAIL, 
    SUGGEST_PRODUCT_LIST_REQUEST, SUGGEST_PRODUCT_LIST_SUCCESS } from '../constants/suggestProductConstants';

const createSuggestProduct = (suggestProduct) => async (dispatch, getState) => {
    try {
        dispatch({type: SUGGEST_PRODUCT_CREATE_REQUEST, payload: suggestProduct});
        const {data} = await axios.post('/api/suggestProduct', suggestProduct);
        dispatch({type: SUGGEST_PRODUCT_CREATE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: SUGGEST_PRODUCT_CREATE_FAIL, payload: error.message});        
    }
}

const listSuggestProduct = () => async (dispatch, getState) => {
    try {
        dispatch({type: SUGGEST_PRODUCT_LIST_REQUEST});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.get('/api/suggestProduct', {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: SUGGEST_PRODUCT_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: SUGGEST_PRODUCT_LIST_FAIL, payload: error.message});        
    }
}

const deleteSuggestProduct = (suggestProductId) => async (dispatch, getState) => {
    try {
        const {employeeSignin:{employeeInfo}} = getState();
        dispatch({type: SUGGEST_PRODUCT_DELETE_REQUEST, payload: suggestProductId});
        const {data} = await axios.delete("/api/suggestProduct/" + suggestProductId, {
            headers:{
                Authorization: 'Bearer ' + employeeInfo.token
            }
        });
        dispatch({type: SUGGEST_PRODUCT_DELETE_SUCCESS, payload: data, success: true});
    }
    catch (error) {
        dispatch({type: SUGGEST_PRODUCT_DELETE_FAIL, payload: error.message});
    }
}

export {createSuggestProduct, listSuggestProduct, deleteSuggestProduct}