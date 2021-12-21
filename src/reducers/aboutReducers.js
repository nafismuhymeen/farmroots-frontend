import { ABOUT_CREATE_FAIL, ABOUT_CREATE_REQUEST, ABOUT_CREATE_SUCCESS, ABOUT_EDIT_FAIL, 
    ABOUT_EDIT_REQUEST, ABOUT_EDIT_SUCCESS, ABOUT_EMPLOYEE_LIST_FAIL, ABOUT_EMPLOYEE_LIST_REQUEST, ABOUT_EMPLOYEE_LIST_SUCCESS, ABOUT_LIST_FAIL, ABOUT_LIST_REQUEST, ABOUT_LIST_SUCCESS, ABOUT_MANAGEMENT_CONTENT_ADD_FAIL, ABOUT_MANAGEMENT_CONTENT_ADD_REQUEST, ABOUT_MANAGEMENT_CONTENT_ADD_SUCCESS, ABOUT_MANAGEMENT_CONTENT_DELETE_FAIL, ABOUT_MANAGEMENT_CONTENT_DELETE_REQUEST, ABOUT_MANAGEMENT_CONTENT_DELETE_SUCCESS, ABOUT_MANAGEMENT_CONTENT_EDIT_FAIL, ABOUT_MANAGEMENT_CONTENT_EDIT_REQUEST, ABOUT_MANAGEMENT_CONTENT_EDIT_SUCCESS } from "../constants/aboutConstants";

function aboutCreateReducer(state= {about: {}}, action){
    switch (action.type){
        case ABOUT_CREATE_REQUEST:
            return {loading: true};
        case ABOUT_CREATE_SUCCESS:
            return {loading: false, success: true, about: action.payload};
        case ABOUT_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function aboutGetReducer(state= {about: []}, action){
    switch (action.type){
        case ABOUT_LIST_REQUEST:
            return {loading: true, about: []};
        case ABOUT_LIST_SUCCESS:
            return {loading: false, about: action.payload};
        case ABOUT_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function aboutEmployeeGetReducer(state= {about: {}}, action){
    switch (action.type){
        case ABOUT_EMPLOYEE_LIST_REQUEST:
            return {loading: true};
        case ABOUT_EMPLOYEE_LIST_SUCCESS:
            return {loading: false, about: action.payload};
        case ABOUT_EMPLOYEE_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function aboutEditReducer(state= {about: {}}, action){
    switch (action.type){
        case ABOUT_EDIT_REQUEST:
            return {loading: true};
        case ABOUT_EDIT_SUCCESS:
            return {loading: false, success: true, about: action.payload};
        case ABOUT_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function aboutManagementContentAddReducer(state= {about: {}}, action){
    switch (action.type){
        case ABOUT_MANAGEMENT_CONTENT_ADD_REQUEST:
            return {loading: true};
        case ABOUT_MANAGEMENT_CONTENT_ADD_SUCCESS:
            return {loading: false, success: true, about: action.payload};
        case ABOUT_MANAGEMENT_CONTENT_ADD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function aboutManagementContentEditReducer(state= {about: {}}, action){
    switch (action.type){
        case ABOUT_MANAGEMENT_CONTENT_EDIT_REQUEST:
            return {loading: true};
        case ABOUT_MANAGEMENT_CONTENT_EDIT_SUCCESS:
            return {loading: false, success: true, about: action.payload};
        case ABOUT_MANAGEMENT_CONTENT_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function aboutManagementContentDeleteReducer(state= {about: {}}, action){
    switch (action.type){
        case ABOUT_MANAGEMENT_CONTENT_DELETE_REQUEST:
            return {loading: true};
        case ABOUT_MANAGEMENT_CONTENT_DELETE_SUCCESS:
            return {loading: false, success: true, about: action.payload};
        case ABOUT_MANAGEMENT_CONTENT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {aboutCreateReducer, aboutGetReducer, aboutEditReducer, aboutManagementContentAddReducer, aboutManagementContentEditReducer, 
    aboutManagementContentDeleteReducer, aboutEmployeeGetReducer}