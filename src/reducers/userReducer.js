const { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_CHANGE_PASSWORD_REQUEST, 
    USER_CHANGE_PASSWORD_SUCCESS, USER_CHANGE_PASSWORD_FAIL, RESET_TOAST_DATA,
    USER_FORGET_PASSWORD_REQUEST,USER_FORGET_PASSWORD_SUCCESS,USER_FORGET_PASSWORD_FAIL } = require("../constants/userConstants");

function userSigninReducer(state={}, action){
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading:true, success: false, error: false};
        case USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload, success: true, error: false};
        case USER_SIGNIN_FAIL:
            return {loading: false, msg: action.payload, success: false, error: true};
        case USER_LOGOUT:
            return {};
        case USER_REGISTER_REQUEST:
            return {loading:true};
        case USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload, success: true, error: false};
        case USER_REGISTER_FAIL:
            return {loading: false, msg: action.payload, success: false, error: true};
        case USER_UPDATE_REQUEST:
            return {loading:true};
        case USER_UPDATE_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case USER_CHANGE_PASSWORD_REQUEST:
            return {loading:true};
        case USER_CHANGE_PASSWORD_SUCCESS:
            return {loading: false, userInfo: action.payload};
        case USER_CHANGE_PASSWORD_FAIL:
            return {loading: false, msg: action.payload, success: false, error: true };
        case RESET_TOAST_DATA:
            return {loading: false, msg: '', success: false, error: false};

            case USER_FORGET_PASSWORD_REQUEST:
                return {loading:true, success: false, error: false};
            case USER_FORGET_PASSWORD_SUCCESS:
                return {loading: false, userInfo: action.payload, success: true, error: false};
            case USER_FORGET_PASSWORD_FAIL:
                return {loading: false, msg: action.payload, success: false, error: true};
        default:
            return state;
    }
}

export {userSigninReducer}