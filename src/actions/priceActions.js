import axios from 'axios';
import { PRICE_DELIVERY_CHARGES_ADD_FAIL, PRICE_DELIVERY_CHARGES_ADD_REQUEST, PRICE_DELIVERY_CHARGES_ADD_SUCCESS, PRICE_DELIVERY_CHARGES_DELETE_FAIL, PRICE_DELIVERY_CHARGES_DELETE_REQUEST, PRICE_DELIVERY_CHARGES_DELETE_SUCCESS, PRICE_DELIVERY_CHARGES_EDIT_FAIL, PRICE_DELIVERY_CHARGES_EDIT_REQUEST, PRICE_DELIVERY_CHARGES_EDIT_SUCCESS, PRICE_CREATE_FAIL, PRICE_CREATE_REQUEST, PRICE_CREATE_SUCCESS, 
    PRICE_EDIT_FAIL, PRICE_EDIT_REQUEST, PRICE_EDIT_SUCCESS, PRICE_USER_DISCOUNT_ADD_FAIL, PRICE_USER_DISCOUNT_ADD_REQUEST, PRICE_USER_DISCOUNT_ADD_SUCCESS, PRICE_USER_DISCOUNT_DELETE_FAIL, PRICE_USER_DISCOUNT_DELETE_REQUEST, PRICE_USER_DISCOUNT_DELETE_SUCCESS, PRICE_USER_DISCOUNT_EDIT_FAIL, PRICE_USER_DISCOUNT_EDIT_REQUEST, PRICE_USER_DISCOUNT_EDIT_SUCCESS, PRICE_PRODUCT_DISCOUNT_ADD_FAIL, PRICE_PRODUCT_DISCOUNT_ADD_REQUEST, PRICE_PRODUCT_DISCOUNT_ADD_SUCCESS, PRICE_PRODUCT_DISCOUNT_DELETE_FAIL, PRICE_PRODUCT_DISCOUNT_DELETE_REQUEST, PRICE_PRODUCT_DISCOUNT_DELETE_SUCCESS, PRICE_PRODUCT_DISCOUNT_EDIT_FAIL, PRICE_PRODUCT_DISCOUNT_EDIT_REQUEST, PRICE_PRODUCT_DISCOUNT_EDIT_SUCCESS, PRICE_LIST_FAIL, 
    PRICE_LIST_REQUEST, PRICE_LIST_SUCCESS } from '../constants/priceConstants';

const createPrice = (price) => async (dispatch, getState) => {
    try {
        dispatch({type: PRICE_CREATE_REQUEST, payload: price});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.post('/api/price', price, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRICE_CREATE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRICE_CREATE_FAIL, payload: error.message});        
    }
}

const getPrice = () => async (dispatch) => {
    try {
        dispatch({type: PRICE_LIST_REQUEST});
        const {data} = await axios.get('/api/price');
        dispatch({type: PRICE_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRICE_LIST_FAIL, payload: error.message});        
    }
}

const getEmployeePrice = () => async (dispatch, getState) => {
    try {
        const {employeeSignin:{employeeInfo}} = getState();
        dispatch({type: PRICE_LIST_REQUEST});
        const {data} = await axios.get('/api/price/employee-price', {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRICE_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRICE_LIST_FAIL, payload: error.message});        
    }
}

const editPrice = (price) => async (dispatch, getState) => {
    try {
        dispatch({type: PRICE_EDIT_REQUEST, payload: price});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/price/edit/' + price._id, price, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRICE_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRICE_EDIT_FAIL, payload: error.message});        
    }
}

const addDeliveryCharges = (DeliveryCharges) => async (dispatch, getState) => {
    try {
        dispatch({type: PRICE_DELIVERY_CHARGES_ADD_REQUEST, payload: DeliveryCharges});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/price/add-delivery-charges', DeliveryCharges, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRICE_DELIVERY_CHARGES_ADD_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRICE_DELIVERY_CHARGES_ADD_FAIL, payload: error.message});        
    }
}

const editDeliveryCharges = (DeliveryCharges) => async (dispatch, getState) => {
    try {
        dispatch({type: PRICE_DELIVERY_CHARGES_EDIT_REQUEST, payload: DeliveryCharges});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/price/edit-delivery-charges', DeliveryCharges, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRICE_DELIVERY_CHARGES_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRICE_DELIVERY_CHARGES_EDIT_FAIL, payload: error.message});        
    }
}

const deleteDeliveryCharges = (DeliveryCharges) => async (dispatch, getState) => {
    try {
        dispatch({type: PRICE_DELIVERY_CHARGES_DELETE_REQUEST, payload: DeliveryCharges});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/price/delete-delivery-charges', DeliveryCharges, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRICE_DELIVERY_CHARGES_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRICE_DELIVERY_CHARGES_DELETE_FAIL, payload: error.message});        
    }
}

const addProductDiscount = (productDiscount) => async (dispatch, getState) => {
    try {
        dispatch({type: PRICE_PRODUCT_DISCOUNT_ADD_REQUEST, payload: productDiscount});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/price/add-product-discount', productDiscount, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRICE_PRODUCT_DISCOUNT_ADD_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRICE_PRODUCT_DISCOUNT_ADD_FAIL, payload: error.message});        
    }
}

const editProductDiscount = (productDiscount) => async (dispatch, getState) => {
    try {
        dispatch({type: PRICE_PRODUCT_DISCOUNT_EDIT_REQUEST, payload: productDiscount});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/price/edit-product-discount', productDiscount, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRICE_PRODUCT_DISCOUNT_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRICE_PRODUCT_DISCOUNT_EDIT_FAIL, payload: error.message});        
    }
}

const deleteProductDiscount = (productDiscount) => async (dispatch, getState) => {
    try {
        dispatch({type: PRICE_PRODUCT_DISCOUNT_DELETE_REQUEST, payload: productDiscount});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/price/delete-product-discount', productDiscount, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRICE_PRODUCT_DISCOUNT_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRICE_PRODUCT_DISCOUNT_DELETE_FAIL, payload: error.message});        
    }
}

const addUserDiscount = (userDiscount) => async (dispatch, getState) => {
    try {
        dispatch({type: PRICE_USER_DISCOUNT_ADD_REQUEST, payload: userDiscount});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/price/add-user-discount', userDiscount, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRICE_USER_DISCOUNT_ADD_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRICE_USER_DISCOUNT_ADD_FAIL, payload: error.message});        
    }
}

const editUserDiscount = (userDiscount) => async (dispatch, getState) => {
    try {
        dispatch({type: PRICE_USER_DISCOUNT_EDIT_REQUEST, payload: userDiscount});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/price/edit-user-discount', userDiscount, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRICE_USER_DISCOUNT_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRICE_USER_DISCOUNT_EDIT_FAIL, payload: error.message});        
    }
}

const deleteUserDiscount = (userDiscount) => async (dispatch, getState) => {
    try {
        dispatch({type: PRICE_USER_DISCOUNT_DELETE_REQUEST, payload: userDiscount});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/price/delete-user-discount', userDiscount, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: PRICE_USER_DISCOUNT_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRICE_USER_DISCOUNT_DELETE_FAIL, payload: error.message});        
    }
}

export {createPrice, getPrice, getEmployeePrice, editPrice, addDeliveryCharges, editDeliveryCharges, 
    deleteDeliveryCharges, addProductDiscount, editProductDiscount, 
    deleteProductDiscount, addUserDiscount, editUserDiscount, 
    deleteUserDiscount}