import { LOGO_CREATE_FAIL, LOGO_CREATE_REQUEST, LOGO_CREATE_SUCCESS, LOGO_EDIT_FAIL, 
    LOGO_EDIT_REQUEST, LOGO_EDIT_SUCCESS, LOGO_LIST_FAIL, LOGO_LIST_REQUEST, LOGO_LIST_SUCCESS } from "../constants/logoConstants";

function logoCreateReducer(state= {logo: {}}, action){
    switch (action.type){
        case LOGO_CREATE_REQUEST:
            return {loading: true};
        case LOGO_CREATE_SUCCESS:
            return {loading: false, success: true, logo: action.payload};
        case LOGO_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function logoGetReducer(state= {logo: {}}, action){
    switch (action.type){
        case LOGO_LIST_REQUEST:
            return {loading: true};
        case LOGO_LIST_SUCCESS:
            return {loading: false, logo: action.payload};
        case LOGO_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function logoEditReducer(state= {logo: {}}, action){
    switch (action.type){
        case LOGO_EDIT_REQUEST:
            return {loading: true};
        case LOGO_EDIT_SUCCESS:
            return {loading: false, success: true, logo: action.payload};
        case LOGO_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {logoCreateReducer, logoGetReducer, logoEditReducer}