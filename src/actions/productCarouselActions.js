import axios from 'axios';
import { PRODUCT_CAROUSEL_CREATE_FAIL, PRODUCT_CAROUSEL_CREATE_REQUEST, PRODUCT_CAROUSEL_CREATE_SUCCESS, 
    PRODUCT_CAROUSEL_DELETE_FAIL, PRODUCT_CAROUSEL_DELETE_REQUEST, PRODUCT_CAROUSEL_DELETE_SUCCESS, 
    PRODUCT_CAROUSEL_EDIT_FAIL, PRODUCT_CAROUSEL_EDIT_REQUEST, PRODUCT_CAROUSEL_EDIT_SUCCESS, PRODUCT_CAROUSEL_LIST_FAIL, 
    PRODUCT_CAROUSEL_LIST_REQUEST, PRODUCT_CAROUSEL_LIST_SUCCESS } from '../constants/productCarouselConstants';

const createCarousel = (carousel) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CAROUSEL_CREATE_REQUEST, payload: carousel});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.post('/api/carousel', carousel, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRODUCT_CAROUSEL_CREATE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_CAROUSEL_CREATE_FAIL, payload: error.message});        
    }
}

const listCarousel = () => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_CAROUSEL_LIST_REQUEST});
        const {data} = await axios.get('/api/carousel');
        dispatch({type: PRODUCT_CAROUSEL_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_CAROUSEL_LIST_FAIL, payload: error.message});        
    }
}

const listEmployeeCarousel = () => async (dispatch, getState) => {
    try {
        const {employeeSignin:{employeeInfo}} = getState();
        dispatch({type: PRODUCT_CAROUSEL_LIST_REQUEST});
        const {data} = await axios.get('/api/carousel/employee-carousels', {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRODUCT_CAROUSEL_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_CAROUSEL_LIST_FAIL, payload: error.message});        
    }
}

const editCarousel = (carousel) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CAROUSEL_EDIT_REQUEST, payload: carousel});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/carousel/' + carousel._id, carousel, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRODUCT_CAROUSEL_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_CAROUSEL_EDIT_FAIL, payload: error.message});        
    }
}

const deleteCarousel = (carouselId) => async (dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_CAROUSEL_DELETE_REQUEST, payload: carouselId});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.delete('/api/carousel/' + carouselId, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRODUCT_CAROUSEL_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_CAROUSEL_DELETE_FAIL, payload: error.message});        
    }
}

export {createCarousel, listCarousel, listEmployeeCarousel, editCarousel, deleteCarousel}