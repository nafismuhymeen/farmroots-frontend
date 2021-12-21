import { EXPORTS_CREATE_FAIL, EXPORTS_CREATE_REQUEST, EXPORTS_CREATE_SUCCESS, EXPORTS_EDIT_FAIL, 
    EXPORTS_EDIT_REQUEST, EXPORTS_EDIT_SUCCESS, EXPORTS_LIST_FAIL, EXPORTS_LIST_REQUEST, EXPORTS_LIST_SUCCESS, EXPORTS_CONTENT_ADD_FAIL, EXPORTS_CONTENT_ADD_REQUEST, EXPORTS_CONTENT_ADD_SUCCESS, EXPORTS_CONTENT_DELETE_FAIL, EXPORTS_CONTENT_DELETE_REQUEST, EXPORTS_CONTENT_DELETE_SUCCESS, EXPORTS_CONTENT_EDIT_FAIL, EXPORTS_CONTENT_EDIT_REQUEST, EXPORTS_CONTENT_EDIT_SUCCESS } from "../constants/exportsConstants";

function exportsCreateReducer(state= {exports: {}}, action){
    switch (action.type){
        case EXPORTS_CREATE_REQUEST:
            return {loading: true};
        case EXPORTS_CREATE_SUCCESS:
            return {loading: false, success: true, exports: action.payload};
        case EXPORTS_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function exportsGetReducer(state= {exports: {}}, action){
    switch (action.type){
        case EXPORTS_LIST_REQUEST:
            return {loading: true};
        case EXPORTS_LIST_SUCCESS:
            return {loading: false, exports: action.payload};
        case EXPORTS_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function exportsEditReducer(state= {exports: {}}, action){
    switch (action.type){
        case EXPORTS_EDIT_REQUEST:
            return {loading: true};
        case EXPORTS_EDIT_SUCCESS:
            return {loading: false, success: true, exports: action.payload};
        case EXPORTS_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function exportsContentAddReducer(state= {exports: {}}, action){
    switch (action.type){
        case EXPORTS_CONTENT_ADD_REQUEST:
            return {loading: true};
        case EXPORTS_CONTENT_ADD_SUCCESS:
            return {loading: false, success: true, exports: action.payload};
        case EXPORTS_CONTENT_ADD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function exportsContentEditReducer(state= {exports: {}}, action){
    switch (action.type){
        case EXPORTS_CONTENT_EDIT_REQUEST:
            return {loading: true};
        case EXPORTS_CONTENT_EDIT_SUCCESS:
            return {loading: false, success: true, exports: action.payload};
        case EXPORTS_CONTENT_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function exportsContentDeleteReducer(state= {exports: {}}, action){
    switch (action.type){
        case EXPORTS_CONTENT_DELETE_REQUEST:
            return {loading: true};
        case EXPORTS_CONTENT_DELETE_SUCCESS:
            return {loading: false, success: true, exports: action.payload};
        case EXPORTS_CONTENT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {exportsCreateReducer, exportsGetReducer, exportsEditReducer, exportsContentAddReducer, exportsContentEditReducer, 
    exportsContentDeleteReducer}