import { WISHLIST_ADD_FAIL, WISHLIST_ADD_REQUEST, WISHLIST_ADD_SUCCESS, WISHLIST_DELETE_FAIL, WISHLIST_DELETE_REQUEST, WISHLIST_DELETE_SUCCESS, WISHLIST_PRODUCT_LIST_FAIL, WISHLIST_PRODUCT_LIST_REQUEST, WISHLIST_PRODUCT_LIST_SUCCESS, WISHLIST_USER_LIST_FAIL, WISHLIST_USER_LIST_REQUEST, WISHLIST_USER_LIST_SUCCESS } from "../constants/wishlistConstants";

function wishlistAddReducer(state= {}, action) {
    switch(action.type){
        case WISHLIST_ADD_REQUEST:
            return {loading: true};
        case WISHLIST_ADD_SUCCESS:
            return {loading: false, wishlist: action.payload, success: true}
        case WISHLIST_ADD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

function wishlistUserListReducer(state= {wishlist: []}, action) {
    switch(action.type){
        case WISHLIST_USER_LIST_REQUEST:
            return {loading: true};
        case WISHLIST_USER_LIST_SUCCESS:
            return {loading: false, wishlist: action.payload, success: true}
        case WISHLIST_USER_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

function wishlistProductListReducer(state= {wishlist: []}, action) {
    switch(action.type){
        case WISHLIST_PRODUCT_LIST_REQUEST:
            return {loading: true};
        case WISHLIST_PRODUCT_LIST_SUCCESS:
            return {loading: false, wishlist: action.payload, success: true}
        case WISHLIST_PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

function wishlistDeleteReducer(state= {}, action) {
    switch(action.type){
        case WISHLIST_DELETE_REQUEST:
            return {loading: true};
        case WISHLIST_DELETE_SUCCESS:
            return {loading: false, success: true}
        case WISHLIST_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

export {wishlistAddReducer, wishlistUserListReducer, wishlistDeleteReducer, wishlistProductListReducer};