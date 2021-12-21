import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DETAILS_REQUEST, 
    PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS,
     PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_NAME_LIST_REQUEST, PRODUCT_NAME_LIST_SUCCESS, PRODUCT_NAME_LIST_FAIL, PRODUCT_GROCERY_NAME_LIST_REQUEST, PRODUCT_GROCERY_NAME_LIST_SUCCESS, PRODUCT_GROCERY_NAME_LIST_FAIL, PRODUCT_RECOMMENDED_LIST_REQUEST, PRODUCT_RECOMMENDED_LIST_SUCCESS, PRODUCT_RECOMMENDED_LIST_FAIL, PRODUCT_OUT_OF_STOCK_REQUEST, PRODUCT_OUT_OF_STOCK_SUCCESS, PRODUCT_OUT_OF_STOCK_FAIL, PRODUCT_CALL_CENTER_NAME_LIST_REQUEST, PRODUCT_CALL_CENTER_NAME_LIST_SUCCESS, PRODUCT_CALL_CENTER_NAME_LIST_FAIL, PRODUCT_UPLOAD_NAME_LIST_REQUEST, PRODUCT_UPLOAD_NAME_LIST_SUCCESS, PRODUCT_UPLOAD_NAME_LIST_FAIL} from "../constants/productConstants";

function productListReducer(state= {products: []}, action){
    switch (action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []};
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function productNameListReducer(state= {productNames: []}, action){
    switch (action.type){
        case PRODUCT_NAME_LIST_REQUEST:
            return {loading: true, productNames: []};
        case PRODUCT_NAME_LIST_SUCCESS:
            return {loading: false, productNames: action.payload};
        case PRODUCT_NAME_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function productCallCenterNameListReducer(state= {productCallCenterNames: []}, action){
    switch (action.type){
        case PRODUCT_CALL_CENTER_NAME_LIST_REQUEST:
            return {loading: true, productCallCenterNames: []};
        case PRODUCT_CALL_CENTER_NAME_LIST_SUCCESS:
            return {loading: false, productCallCenterNames: action.payload};
        case PRODUCT_CALL_CENTER_NAME_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function productUploadNameListReducer(state= {productUploadNames: []}, action){
    switch (action.type){
        case PRODUCT_UPLOAD_NAME_LIST_REQUEST:
            return {loading: true, productUploadNames: []};
        case PRODUCT_UPLOAD_NAME_LIST_SUCCESS:
            return {loading: false, productUploadNames: action.payload};
        case PRODUCT_UPLOAD_NAME_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function productRecommendedListReducer(state= {recommendedProducts: []}, action){
    switch (action.type){
        case PRODUCT_RECOMMENDED_LIST_REQUEST:
            return {loading: true, recommendedProducts: []};
        case PRODUCT_RECOMMENDED_LIST_SUCCESS:
            return {loading: false, recommendedProducts: action.payload};
        case PRODUCT_RECOMMENDED_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function productDetailsReducer(state= {product: {}}, action){
    switch (action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true};
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload};
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function productDeleteReducer(state= {product: {}}, action){
    switch (action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading: true};
        case PRODUCT_DELETE_SUCCESS:
            return {loading: false, product: action.payload, success: true};
        case PRODUCT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function productSaveReducer(state= {product: {}}, action){
    switch (action.type){
        case PRODUCT_SAVE_REQUEST:
            return {loading: true};
        case PRODUCT_SAVE_SUCCESS:
            return {loading: false, success: true, product: action.payload};
        case PRODUCT_SAVE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function productOutOfStockReducer(state= {product: {}}, action){
    switch (action.type){
        case PRODUCT_OUT_OF_STOCK_REQUEST:
            return {loading: true};
        case PRODUCT_OUT_OF_STOCK_SUCCESS:
            return {loading: false, success: true, product: action.payload};
        case PRODUCT_OUT_OF_STOCK_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer, productNameListReducer, 
    productRecommendedListReducer, productOutOfStockReducer, productCallCenterNameListReducer, productUploadNameListReducer}