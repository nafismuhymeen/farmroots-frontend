import { SUGGEST_PRODUCT_CREATE_FAIL, SUGGEST_PRODUCT_CREATE_REQUEST, SUGGEST_PRODUCT_CREATE_SUCCESS, SUGGEST_PRODUCT_DELETE_FAIL, SUGGEST_PRODUCT_DELETE_REQUEST, SUGGEST_PRODUCT_DELETE_SUCCESS, SUGGEST_PRODUCT_LIST_FAIL, 
    SUGGEST_PRODUCT_LIST_REQUEST, SUGGEST_PRODUCT_LIST_SUCCESS } from "../constants/suggestProductConstants";

function suggestProductCreateReducer(state= {suggestProduct: {}}, action){
    switch (action.type){
        case SUGGEST_PRODUCT_CREATE_REQUEST:
            return {loading: true};
        case SUGGEST_PRODUCT_CREATE_SUCCESS:
            return {loading: false, success: true, suggestProduct: action.payload};
        case SUGGEST_PRODUCT_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function suggestProductListReducer(state= {suggestProduct: []}, action){
    switch (action.type){
        case SUGGEST_PRODUCT_LIST_REQUEST:
            return {loading: true, suggestProduct: []};
        case SUGGEST_PRODUCT_LIST_SUCCESS:
            return {loading: false, suggestProduct: action.payload};
        case SUGGEST_PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function suggestProductDeleteReducer(state= {suggestProduct: {}}, action){
    switch (action.type){
        case SUGGEST_PRODUCT_DELETE_REQUEST:
            return {loading: true};
        case SUGGEST_PRODUCT_DELETE_SUCCESS:
            return {loading: false, success: true, suggestProduct: action.payload};
        case SUGGEST_PRODUCT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {suggestProductCreateReducer, suggestProductListReducer, suggestProductDeleteReducer}