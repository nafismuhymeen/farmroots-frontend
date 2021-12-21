import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_EMPTY, BUY_NOW_ADD_ITEM, BUY_NOW_REMOVE_ITEM, BUY_NOW_EMPTY, CART_LIST_ITEM } from "../constants/cartConstants";

function cartReducer(state = {cartItems: []}, action){
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x=> x.product === item.product);
            if(product){
                return {cartItems: state.cartItems.map(x=>x.product === product.product?item: x)};
            }
            return{cartItems: [...state.cartItems, item]}
        
        case CART_LIST_ITEM:
            return {cartItems: action.payload}

        case CART_REMOVE_ITEM:
            return {cartItems: state.cartItems.filter(x=>x.product !== action.payload)}

        case CART_EMPTY:
            return {cartItems: []}
        
        default:
            return state
    }
}

function buyNowReducer(state = {buyNowItems: []}, action){
    switch(action.type){
        case BUY_NOW_ADD_ITEM:
            const item = action.payload;
            const product = state.buyNowItems.find(x=> x.product === item.product);
            if(product){
                return {buyNowItems: state.buyNowItems.map(x=>x.product === product.product?item: x)};
            }
            return{buyNowItems: [...state.buyNowItems, item]}
        
        case BUY_NOW_REMOVE_ITEM:
            return {buyNowItems: state.buyNowItems.filter(x=>x.product !== action.payload)}

        case BUY_NOW_EMPTY:
            return {buyNowItems: []}
        
        default:
            return state
    }
}

export {cartReducer, buyNowReducer}