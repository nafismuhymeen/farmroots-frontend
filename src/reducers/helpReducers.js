import { HELP_CREATE_FAIL, HELP_CREATE_REQUEST, HELP_CREATE_SUCCESS, 
    HELP_DELETE_FAIL, HELP_DELETE_REQUEST, HELP_DELETE_SUCCESS, HELP_EDIT_FAIL, 
    HELP_EDIT_REQUEST, HELP_EDIT_SUCCESS, HELP_EMPLOYEE_LIST_FAIL, HELP_EMPLOYEE_LIST_REQUEST, HELP_EMPLOYEE_LIST_SUCCESS, HELP_LIST_FAIL, HELP_LIST_REQUEST, 
    HELP_LIST_SUCCESS } from "../constants/helpConstants";

function helpCreateReducer(state= {help: {}}, action){
    switch (action.type){
        case HELP_CREATE_REQUEST:
            return {loading: true};
        case HELP_CREATE_SUCCESS:
            return {loading: false, success: true, help: action.payload};
        case HELP_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function helpListReducer(state= {help: {}}, action){
    switch (action.type){
        case HELP_LIST_REQUEST:
            return {loading: true, help: {}};
        case HELP_LIST_SUCCESS:
            return {loading: false, help: action.payload};
        case HELP_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function helpEmployeeListReducer(state= {help: []}, action){
    switch (action.type){
        case HELP_EMPLOYEE_LIST_REQUEST:
            return {loading: true, help: []};
        case HELP_EMPLOYEE_LIST_SUCCESS:
            return {loading: false, help: action.payload};
        case HELP_EMPLOYEE_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function helpEditReducer(state= {help: {}}, action){
    switch (action.type){
        case HELP_EDIT_REQUEST:
            return {loading: true};
        case HELP_EDIT_SUCCESS:
            return {loading: false, success: true, help: action.payload};
        case HELP_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function helpDeleteReducer(state= {help: {}}, action){
    switch (action.type){
        case HELP_DELETE_REQUEST:
            return {loading: true};
        case HELP_DELETE_SUCCESS:
            return {loading: false, success: true, help: action.payload};
        case HELP_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {helpCreateReducer, helpListReducer, helpEditReducer, helpDeleteReducer, helpEmployeeListReducer}