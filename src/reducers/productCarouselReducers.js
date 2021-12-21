import { PRODUCT_CAROUSEL_CREATE_FAIL, PRODUCT_CAROUSEL_CREATE_REQUEST, PRODUCT_CAROUSEL_CREATE_SUCCESS, 
    PRODUCT_CAROUSEL_DELETE_FAIL, PRODUCT_CAROUSEL_DELETE_REQUEST, PRODUCT_CAROUSEL_DELETE_SUCCESS, PRODUCT_CAROUSEL_EDIT_FAIL, 
    PRODUCT_CAROUSEL_EDIT_REQUEST, PRODUCT_CAROUSEL_EDIT_SUCCESS, PRODUCT_CAROUSEL_LIST_FAIL, PRODUCT_CAROUSEL_LIST_REQUEST, 
    PRODUCT_CAROUSEL_LIST_SUCCESS } from "../constants/productCarouselConstants";

function productCarouselCreateReducer(state= {carousel: {}}, action){
    switch (action.type){
        case PRODUCT_CAROUSEL_CREATE_REQUEST:
            return {loading: true};
        case PRODUCT_CAROUSEL_CREATE_SUCCESS:
            return {loading: false, success: true, carousel: action.payload};
        case PRODUCT_CAROUSEL_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function productCarouselListReducer(state= {carousels: []}, action){
    switch (action.type){
        case PRODUCT_CAROUSEL_LIST_REQUEST:
            return {loading: true, carousels: []};
        case PRODUCT_CAROUSEL_LIST_SUCCESS:
            return {loading: false, carousels: action.payload};
        case PRODUCT_CAROUSEL_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function productCarouselEditReducer(state= {carousel: {}}, action){
    switch (action.type){
        case PRODUCT_CAROUSEL_EDIT_REQUEST:
            return {loading: true};
        case PRODUCT_CAROUSEL_EDIT_SUCCESS:
            return {loading: false, success: true, carousel: action.payload};
        case PRODUCT_CAROUSEL_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function productCarouselDeleteReducer(state= {carousel: {}}, action){
    switch (action.type){
        case PRODUCT_CAROUSEL_DELETE_REQUEST:
            return {loading: true};
        case PRODUCT_CAROUSEL_DELETE_SUCCESS:
            return {loading: false, success: true, carousel: action.payload};
        case PRODUCT_CAROUSEL_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {productCarouselCreateReducer, productCarouselListReducer, productCarouselEditReducer, productCarouselDeleteReducer}