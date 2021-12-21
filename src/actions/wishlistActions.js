import axios from 'axios';
import { WISHLIST_ADD_FAIL, WISHLIST_ADD_REQUEST, WISHLIST_ADD_SUCCESS, WISHLIST_DELETE_FAIL, WISHLIST_DELETE_REQUEST, WISHLIST_DELETE_SUCCESS, WISHLIST_PRODUCT_LIST_FAIL, WISHLIST_PRODUCT_LIST_REQUEST, WISHLIST_PRODUCT_LIST_SUCCESS, WISHLIST_USER_LIST_FAIL, WISHLIST_USER_LIST_REQUEST, WISHLIST_USER_LIST_SUCCESS } from '../constants/wishlistConstants';

const addToWishlist = (productId) => async (dispatch, getState) => {
    try {
        const {userSignin: {userInfo: {token}}} = getState();
        dispatch({type: WISHLIST_ADD_REQUEST, payload: productId});
        const {data} = await axios.post('/api/wishlist', {productId}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        dispatch({type: WISHLIST_ADD_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: WISHLIST_ADD_FAIL, payload: error.message})
    }
}

const listUserWishlist = () => async (dispatch, getState) => {
    try {
        const {userSignin: {userInfo: {token}}} = getState();
        dispatch({type: WISHLIST_USER_LIST_REQUEST});
        const {data} = await axios.get('/api/wishlist/user', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        dispatch({type: WISHLIST_USER_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: WISHLIST_USER_LIST_FAIL, payload: error.message})
    }
}

const listProductWishlist = () => async (dispatch, getState) => {
    try {
        const {userSignin: {userInfo: {token}}} = getState();
        dispatch({type: WISHLIST_PRODUCT_LIST_REQUEST});
        const {data} = await axios.get('/api/wishlist/product', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        dispatch({type: WISHLIST_PRODUCT_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: WISHLIST_PRODUCT_LIST_FAIL, payload: error.message})
    }
}

const deleteFromWishlist = (productId) => async (dispatch, getState) => {
    try {
        const {userSignin: {userInfo: {token}}} = getState();
        dispatch({type: WISHLIST_DELETE_REQUEST, payload: productId});
        const {data} = await axios.delete('/api/wishlist/' + productId, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        dispatch({type: WISHLIST_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: WISHLIST_DELETE_FAIL, payload: error.message})
    }
}

export {addToWishlist, listUserWishlist, deleteFromWishlist, listProductWishlist};