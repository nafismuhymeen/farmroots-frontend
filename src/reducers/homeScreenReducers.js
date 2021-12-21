import { HOMESCREEN_CREATE_FAIL, HOMESCREEN_CREATE_REQUEST, HOMESCREEN_CREATE_SUCCESS, HOMESCREEN_EDIT_FAIL, 
    HOMESCREEN_EDIT_REQUEST, HOMESCREEN_EDIT_SUCCESS, HOMESCREEN_LIST_FAIL, HOMESCREEN_LIST_REQUEST, HOMESCREEN_LIST_SUCCESS } from "../constants/homeScreenConstants";

function homeScreenCreateReducer(state= {homeScreen: {}}, action){
    switch (action.type){
        case HOMESCREEN_CREATE_REQUEST:
            return {loading: true};
        case HOMESCREEN_CREATE_SUCCESS:
            return {loading: false, success: true, homeScreen: action.payload};
        case HOMESCREEN_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function homeScreenGetReducer(state= {homeScreen: {}}, action){
    switch (action.type){
        case HOMESCREEN_LIST_REQUEST:
            return {loading: true};
        case HOMESCREEN_LIST_SUCCESS:
            return {loading: false, homeScreen: action.payload};
        case HOMESCREEN_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function homeScreenEditReducer(state= {homeScreen: {}}, action){
    switch (action.type){
        case HOMESCREEN_EDIT_REQUEST:
            return {loading: true};
        case HOMESCREEN_EDIT_SUCCESS:
            return {loading: false, success: true, homeScreen: action.payload};
        case HOMESCREEN_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {homeScreenCreateReducer, homeScreenGetReducer, homeScreenEditReducer}