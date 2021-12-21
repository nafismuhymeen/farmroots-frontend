import { PARTNER_CREATE_FAIL, PARTNER_CREATE_REQUEST, PARTNER_CREATE_SUCCESS, PARTNER_EDIT_FAIL, 
    PARTNER_EDIT_REQUEST, PARTNER_EDIT_SUCCESS, PARTNER_LIST_FAIL, PARTNER_LIST_REQUEST, PARTNER_LIST_SUCCESS, PARTNER_CONTENT_ADD_FAIL, PARTNER_CONTENT_ADD_REQUEST, PARTNER_CONTENT_ADD_SUCCESS, PARTNER_CONTENT_DELETE_FAIL, PARTNER_CONTENT_DELETE_REQUEST, PARTNER_CONTENT_DELETE_SUCCESS, PARTNER_CONTENT_EDIT_FAIL, PARTNER_CONTENT_EDIT_REQUEST, PARTNER_CONTENT_EDIT_SUCCESS } from "../constants/partnerConstants";

function partnerCreateReducer(state= {partner: {}}, action){
    switch (action.type){
        case PARTNER_CREATE_REQUEST:
            return {loading: true};
        case PARTNER_CREATE_SUCCESS:
            return {loading: false, success: true, partner: action.payload};
        case PARTNER_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function partnerGetReducer(state= {partner: {}}, action){
    switch (action.type){
        case PARTNER_LIST_REQUEST:
            return {loading: true};
        case PARTNER_LIST_SUCCESS:
            return {loading: false, partner: action.payload};
        case PARTNER_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function partnerEditReducer(state= {partner: {}}, action){
    switch (action.type){
        case PARTNER_EDIT_REQUEST:
            return {loading: true};
        case PARTNER_EDIT_SUCCESS:
            return {loading: false, success: true, partner: action.payload};
        case PARTNER_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function partnerContentAddReducer(state= {partner: {}}, action){
    switch (action.type){
        case PARTNER_CONTENT_ADD_REQUEST:
            return {loading: true};
        case PARTNER_CONTENT_ADD_SUCCESS:
            return {loading: false, success: true, partner: action.payload};
        case PARTNER_CONTENT_ADD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function partnerContentEditReducer(state= {partner: {}}, action){
    switch (action.type){
        case PARTNER_CONTENT_EDIT_REQUEST:
            return {loading: true};
        case PARTNER_CONTENT_EDIT_SUCCESS:
            return {loading: false, success: true, partner: action.payload};
        case PARTNER_CONTENT_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function partnerContentDeleteReducer(state= {partner: {}}, action){
    switch (action.type){
        case PARTNER_CONTENT_DELETE_REQUEST:
            return {loading: true};
        case PARTNER_CONTENT_DELETE_SUCCESS:
            return {loading: false, success: true, partner: action.payload};
        case PARTNER_CONTENT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {partnerCreateReducer, partnerGetReducer, partnerEditReducer, partnerContentAddReducer, partnerContentEditReducer, 
    partnerContentDeleteReducer}