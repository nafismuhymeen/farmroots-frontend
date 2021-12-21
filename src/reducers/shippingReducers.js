import { SHIPPING_SAVE, SHIPPING_DELETE } from "../constants/shippingConstants";

function shippingReducer(state = {shipping: {}}, action){
    switch(action.type){
        case SHIPPING_SAVE:
            return{...state, shipping: action.payload}

        case SHIPPING_DELETE:
            return{...state, shipping: {}}

        default:
            return state
    }
}

export {shippingReducer}