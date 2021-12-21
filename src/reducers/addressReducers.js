import { USER_ADDRESS_SAVE_REQUEST, USER_ADDRESS_SAVE_SUCCESS, USER_ADDRESS_SAVE_FAIL, USER_ADDRESS_EDIT_REQUEST, 
    USER_ADDRESS_EDIT_SUCCESS, USER_ADDRESS_EDIT_FAIL, USER_ADDRESS_DELETE_REQUEST, USER_ADDRESS_DELETE_SUCCESS, 
    USER_ADDRESS_DELETE_FAIL, USER_ADDRESS_LIST_REQUEST, USER_ADDRESS_LIST_SUCCESS, USER_ADDRESS_LIST_FAIL}  from "../constants/addressConstants";

function userAddressSaveReducer(state={}, action){
    switch(action.type){
        case USER_ADDRESS_SAVE_REQUEST:
            return {loading:true};
        case USER_ADDRESS_SAVE_SUCCESS:
            return {loading: false, address: action.payload, success: true};
        case USER_ADDRESS_SAVE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function userAddressEditReducer(state={
    address: {}
}, action){
    switch(action.type){
        case USER_ADDRESS_EDIT_REQUEST:
            return {loading:true};
        case USER_ADDRESS_EDIT_SUCCESS:
            return {loading: false, address: action.payload, success: true};
        case USER_ADDRESS_EDIT_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function userAddressDeleteReducer(state={
    address: {}
}, action){
    switch(action.type){
        case USER_ADDRESS_DELETE_REQUEST:
            return {loading:true};
        case USER_ADDRESS_DELETE_SUCCESS:
            return {loading: false, success: true};
        case USER_ADDRESS_DELETE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function userAddressListReducer(state={
    addresses: []
}, action){
    switch(action.type){
        case USER_ADDRESS_LIST_REQUEST:
            return {loading:true};
        case USER_ADDRESS_LIST_SUCCESS:
            return {loading: false, addresses: action.payload};
        case USER_ADDRESS_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export {userAddressSaveReducer, userAddressEditReducer, userAddressDeleteReducer, userAddressListReducer}