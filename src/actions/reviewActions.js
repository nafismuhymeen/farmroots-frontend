import axios from 'axios';
import { PRODUCT_REVIEW_SAVE_REQUEST, PRODUCT_REVIEW_SAVE_SUCCESS, PRODUCT_REVIEW_SAVE_FAIL, 
    PRODUCT_REVIEW_LIST_REQUEST, PRODUCT_REVIEW_LIST_SUCCESS, PRODUCT_REVIEW_LIST_FAIL, 
    PRODUCT_REVIEW_DELETE_REQUEST, PRODUCT_REVIEW_DELETE_SUCCESS, PRODUCT_REVIEW_DELETE_FAIL, 
    MY_REVIEW_LIST_REQUEST, MY_REVIEW_LIST_SUCCESS, MY_REVIEW_LIST_FAIL, PRODUCT_REVIEW_EDIT_REQUEST, 
    PRODUCT_REVIEW_EDIT_SUCCESS, PRODUCT_REVIEW_EDIT_FAIL, USER_REVIEW_LIST_REQUEST, USER_REVIEW_LIST_SUCCESS, USER_REVIEW_LIST_FAIL } from '../constants/reviewConstants';

const saveProductReview = (productId, review) => async (dispatch, getState) =>{
    try {
        const {userSignin: {userInfo: {token}}} = getState();
        dispatch({type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review});
        const {data} = await axios.post('/api/reviews/' + productId, review, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        dispatch({type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_REVIEW_SAVE_FAIL, payload: error.message});        
    }
}

const editProductReview = ({productId, reviewId, rating, comment}) => async (dispatch, getState) =>{
    try {
        const {userSignin: {userInfo: {token}}} = getState();
        dispatch({type: PRODUCT_REVIEW_EDIT_REQUEST, payload: {reviewId, rating, comment}});
        const {data} = await axios.put('/api/reviews/' + productId, {reviewId, rating, comment}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        dispatch({type: PRODUCT_REVIEW_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_REVIEW_EDIT_FAIL, payload: error.message});        
    }
}

const listProductReviews = (productId, sortOrder = '', filter = '', searchKeyword = '') => async (dispatch) =>{
    try {
        dispatch({type: PRODUCT_REVIEW_LIST_REQUEST});
        const {data} = await axios.get('/api/reviews/' + productId + "?sortOrder=" + sortOrder + "&filter=" + filter 
        + "&searchKeyword=" + searchKeyword );
        dispatch({type: PRODUCT_REVIEW_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_REVIEW_LIST_FAIL, payload: error.message});        
    }
}


const listMyReview = (productId) => async (dispatch, getState) =>{
    try {
        const {userSignin: {userInfo: {token}}} = getState();
        dispatch({type: MY_REVIEW_LIST_REQUEST});
        const {data} = await axios.get(`/api/reviews/${productId}/mine`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        dispatch({type: MY_REVIEW_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: MY_REVIEW_LIST_FAIL, payload: error.message});        
    }
}

const listUserReviews = () => async (dispatch, getState) =>{
    try {
        const {userSignin: {userInfo: {token}}} = getState();
        dispatch({type: USER_REVIEW_LIST_REQUEST});
        const {data} = await axios.get(`/api/reviews/mine/user-reviews`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        dispatch({type: USER_REVIEW_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: USER_REVIEW_LIST_FAIL, payload: error.message});        
    }
}

const deleteProductReview = ({productId, reviewId}) => async (dispatch, getState) =>{
    try {
        const {userSignin: {userInfo: {token}}} = getState();
        dispatch({type: PRODUCT_REVIEW_DELETE_REQUEST, payload: {reviewId}});
        const {data} = await axios.put(`/api/reviews/${productId}/delete`, {reviewId}, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        dispatch({type: PRODUCT_REVIEW_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: PRODUCT_REVIEW_DELETE_FAIL, payload: error.message});        
    }
}

export {saveProductReview, listProductReviews, deleteProductReview, listMyReview, listUserReviews, editProductReview};