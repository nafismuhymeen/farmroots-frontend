import { CALL_CENTER_GUYS_LIST_FAIL, CALL_CENTER_GUYS_LIST_REQUEST, CALL_CENTER_GUYS_LIST_SUCCESS, DELIVERY_GUYS_LIST_FAIL, DELIVERY_GUYS_LIST_REQUEST, DELIVERY_GUYS_LIST_SUCCESS, EMPLOYEE_REGISTER_FAIL, EMPLOYEE_REGISTER_REQUEST, EMPLOYEE_REGISTER_SUCCESS, EMPLOYEE_SIGNIN_FAIL, EMPLOYEE_SIGNIN_REQUEST, EMPLOYEE_SIGNIN_SUCCESS } from "../constants/employeeConstants";

function employeeSigninReducer(state={}, action){
    switch(action.type){
        case EMPLOYEE_SIGNIN_REQUEST:
            return {loading: true};
        case EMPLOYEE_SIGNIN_SUCCESS:
            return {loading: false, employeeInfo: action.payload, success: true};
        case EMPLOYEE_SIGNIN_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function employeeRegisterReducer(state={}, action){
    switch(action.type){
        case EMPLOYEE_REGISTER_REQUEST:
            return {loading: true};
        case EMPLOYEE_REGISTER_SUCCESS:
            return {loading: false, employeeInfo: action.payload, success: true};
        case EMPLOYEE_REGISTER_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function callCenterGuysListReducer(state = {callCenterGuys: []}, action){
    switch(action.type){
        case CALL_CENTER_GUYS_LIST_REQUEST:
            return {loading: true};
        case CALL_CENTER_GUYS_LIST_SUCCESS:
            return {loading: false, callCenterGuys: action.payload};
        case CALL_CENTER_GUYS_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function deliveryGuysListReducer(state = {deliveryGuys: []}, action){
    switch(action.type){
        case DELIVERY_GUYS_LIST_REQUEST:
            return {loading: true};
        case DELIVERY_GUYS_LIST_SUCCESS:
            return {loading: false, deliveryGuys: action.payload};
        case DELIVERY_GUYS_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

export {employeeSigninReducer, employeeRegisterReducer, callCenterGuysListReducer, deliveryGuysListReducer}