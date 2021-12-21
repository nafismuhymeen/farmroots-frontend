import { PRICE_DELIVERY_CHARGES_ADD_FAIL, PRICE_DELIVERY_CHARGES_ADD_REQUEST, PRICE_DELIVERY_CHARGES_ADD_SUCCESS, PRICE_DELIVERY_CHARGES_DELETE_FAIL, PRICE_DELIVERY_CHARGES_DELETE_REQUEST, PRICE_DELIVERY_CHARGES_DELETE_SUCCESS, PRICE_DELIVERY_CHARGES_EDIT_FAIL, PRICE_DELIVERY_CHARGES_EDIT_REQUEST, PRICE_DELIVERY_CHARGES_EDIT_SUCCESS, PRICE_CREATE_FAIL, PRICE_CREATE_REQUEST, PRICE_CREATE_SUCCESS, PRICE_EDIT_FAIL, 
    PRICE_EDIT_REQUEST, PRICE_EDIT_SUCCESS, PRICE_USER_DISCOUNT_ADD_FAIL, PRICE_USER_DISCOUNT_ADD_REQUEST, PRICE_USER_DISCOUNT_ADD_SUCCESS, PRICE_USER_DISCOUNT_DELETE_FAIL, PRICE_USER_DISCOUNT_DELETE_REQUEST, PRICE_USER_DISCOUNT_DELETE_SUCCESS, PRICE_USER_DISCOUNT_EDIT_FAIL, PRICE_USER_DISCOUNT_EDIT_REQUEST, PRICE_USER_DISCOUNT_EDIT_SUCCESS, PRICE_PRODUCT_DISCOUNT_ADD_FAIL, PRICE_PRODUCT_DISCOUNT_ADD_REQUEST, PRICE_PRODUCT_DISCOUNT_ADD_SUCCESS, PRICE_PRODUCT_DISCOUNT_DELETE_FAIL, PRICE_PRODUCT_DISCOUNT_DELETE_REQUEST, PRICE_PRODUCT_DISCOUNT_DELETE_SUCCESS, PRICE_PRODUCT_DISCOUNT_EDIT_FAIL, PRICE_PRODUCT_DISCOUNT_EDIT_REQUEST, PRICE_PRODUCT_DISCOUNT_EDIT_SUCCESS, PRICE_LIST_FAIL, PRICE_LIST_REQUEST, PRICE_LIST_SUCCESS } from "../constants/priceConstants";

function priceCreateReducer(state= {price: {}}, action){
    switch (action.type){
        case PRICE_CREATE_REQUEST:
            return {loading: true};
        case PRICE_CREATE_SUCCESS:
            return {loading: false, success: true, price: action.payload};
        case PRICE_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function priceGetReducer(state= {price: {}}, action){
    switch (action.type){
        case PRICE_LIST_REQUEST:
            return {loading: true};
        case PRICE_LIST_SUCCESS:
            return {loading: false, price: action.payload};
        case PRICE_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function priceEditReducer(state= {price: {}}, action){
    switch (action.type){
        case PRICE_EDIT_REQUEST:
            return {loading: true};
        case PRICE_EDIT_SUCCESS:
            return {loading: false, success: true, price: action.payload};
        case PRICE_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function priceDeliveryChargesAddReducer(state= {price: {}}, action){
    switch (action.type){
        case PRICE_DELIVERY_CHARGES_ADD_REQUEST:
            return {loading: true};
        case PRICE_DELIVERY_CHARGES_ADD_SUCCESS:
            return {loading: false, success: true, price: action.payload};
        case PRICE_DELIVERY_CHARGES_ADD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function priceDeliveryChargesEditReducer(state= {price: {}}, action){
    switch (action.type){
        case PRICE_DELIVERY_CHARGES_EDIT_REQUEST:
            return {loading: true};
        case PRICE_DELIVERY_CHARGES_EDIT_SUCCESS:
            return {loading: false, success: true, price: action.payload};
        case PRICE_DELIVERY_CHARGES_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function priceDeliveryChargesDeleteReducer(state= {price: {}}, action){
    switch (action.type){
        case PRICE_DELIVERY_CHARGES_DELETE_REQUEST:
            return {loading: true};
        case PRICE_DELIVERY_CHARGES_DELETE_SUCCESS:
            return {loading: false, success: true, price: action.payload};
        case PRICE_DELIVERY_CHARGES_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function priceProductDiscountAddReducer(state= {price: {}}, action){
    switch (action.type){
        case PRICE_PRODUCT_DISCOUNT_ADD_REQUEST:
            return {loading: true};
        case PRICE_PRODUCT_DISCOUNT_ADD_SUCCESS:
            return {loading: false, success: true, price: action.payload};
        case PRICE_PRODUCT_DISCOUNT_ADD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function priceProductDiscountEditReducer(state= {price: {}}, action){
    switch (action.type){
        case PRICE_PRODUCT_DISCOUNT_EDIT_REQUEST:
            return {loading: true};
        case PRICE_PRODUCT_DISCOUNT_EDIT_SUCCESS:
            return {loading: false, success: true, price: action.payload};
        case PRICE_PRODUCT_DISCOUNT_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function priceProductDiscountDeleteReducer(state= {price: {}}, action){
    switch (action.type){
        case PRICE_PRODUCT_DISCOUNT_DELETE_REQUEST:
            return {loading: true};
        case PRICE_PRODUCT_DISCOUNT_DELETE_SUCCESS:
            return {loading: false, success: true, price: action.payload};
        case PRICE_PRODUCT_DISCOUNT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function priceUserDiscountAddReducer(state= {price: {}}, action){
    switch (action.type){
        case PRICE_USER_DISCOUNT_ADD_REQUEST:
            return {loading: true};
        case PRICE_USER_DISCOUNT_ADD_SUCCESS:
            return {loading: false, success: true, price: action.payload};
        case PRICE_USER_DISCOUNT_ADD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function priceUserDiscountEditReducer(state= {price: {}}, action){
    switch (action.type){
        case PRICE_USER_DISCOUNT_EDIT_REQUEST:
            return {loading: true};
        case PRICE_USER_DISCOUNT_EDIT_SUCCESS:
            return {loading: false, success: true, price: action.payload};
        case PRICE_USER_DISCOUNT_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function priceUserDiscountDeleteReducer(state= {price: {}}, action){
    switch (action.type){
        case PRICE_USER_DISCOUNT_DELETE_REQUEST:
            return {loading: true};
        case PRICE_USER_DISCOUNT_DELETE_SUCCESS:
            return {loading: false, success: true, price: action.payload};
        case PRICE_USER_DISCOUNT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {priceCreateReducer, priceGetReducer, priceEditReducer, priceDeliveryChargesAddReducer, priceDeliveryChargesEditReducer, 
priceDeliveryChargesDeleteReducer, priceProductDiscountAddReducer, priceProductDiscountEditReducer, 
priceProductDiscountDeleteReducer, priceUserDiscountAddReducer, priceUserDiscountEditReducer, priceUserDiscountDeleteReducer}