import { PRODUCT_REVIEW_SAVE_REQUEST, PRODUCT_REVIEW_SAVE_SUCCESS, PRODUCT_REVIEW_SAVE_FAIL, 
    PRODUCT_REVIEW_LIST_REQUEST, PRODUCT_REVIEW_LIST_SUCCESS, PRODUCT_REVIEW_LIST_FAIL, PRODUCT_REVIEW_DELETE_REQUEST, 
    PRODUCT_REVIEW_DELETE_SUCCESS, PRODUCT_REVIEW_DELETE_FAIL, MY_REVIEW_LIST_REQUEST, MY_REVIEW_LIST_SUCCESS, 
    MY_REVIEW_LIST_FAIL, PRODUCT_REVIEW_EDIT_REQUEST, PRODUCT_REVIEW_EDIT_SUCCESS, PRODUCT_REVIEW_EDIT_FAIL, USER_REVIEW_LIST_REQUEST, USER_REVIEW_LIST_SUCCESS, USER_REVIEW_LIST_FAIL } from "../constants/reviewConstants";

function productReviewSaveReducer(state= {}, action) {
    switch(action.type){
        case PRODUCT_REVIEW_SAVE_REQUEST:
            return {loading: true};
        case PRODUCT_REVIEW_SAVE_SUCCESS:
            return {loading: false, review: action.payload, success: true}
        case PRODUCT_REVIEW_SAVE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

function productReviewListReducer(state= {
    reviews: []
}, action) {
    switch(action.type){
        case PRODUCT_REVIEW_LIST_REQUEST:
            return {loading: true};
        case PRODUCT_REVIEW_LIST_SUCCESS:
            return {loading: false, reviews: action.payload}
        case PRODUCT_REVIEW_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

function userReviewListReducer(state= {
    reviews: []
}, action) {
    switch(action.type){
        case USER_REVIEW_LIST_REQUEST:
            return {loading: true};
        case USER_REVIEW_LIST_SUCCESS:
            return {loading: false, reviews: action.payload}
        case USER_REVIEW_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

function productReviewEditReducer(state= {
    review: {}
}, action) {
    switch(action.type){
        case PRODUCT_REVIEW_EDIT_REQUEST:
            return {loading: true};
        case PRODUCT_REVIEW_EDIT_SUCCESS:
            return {loading: false, review: action.payload, success: true}
        case PRODUCT_REVIEW_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

function myReviewListReducer(state= {
    review: {}
}, action) {
    switch(action.type){
        case MY_REVIEW_LIST_REQUEST:
            return {loading: true};
        case MY_REVIEW_LIST_SUCCESS:
            return {loading: false, review: action.payload}
        case MY_REVIEW_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

function productReviewDeleteReducer(state= {
    review: {}
}, action) {
    switch(action.type){
        case PRODUCT_REVIEW_DELETE_REQUEST:
            return {loading: true};
        case PRODUCT_REVIEW_DELETE_SUCCESS:
            return {loading: false, success: true}
        case PRODUCT_REVIEW_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export {productReviewSaveReducer, productReviewListReducer, productReviewDeleteReducer, myReviewListReducer, productReviewEditReducer, userReviewListReducer}