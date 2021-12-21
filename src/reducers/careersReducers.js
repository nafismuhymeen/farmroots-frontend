import { CAREERS_JOB_OPENINGS_CONTENT_ADD_FAIL, CAREERS_JOB_OPENINGS_CONTENT_ADD_REQUEST, CAREERS_JOB_OPENINGS_CONTENT_ADD_SUCCESS, CAREERS_JOB_OPENINGS_CONTENT_DELETE_FAIL, CAREERS_JOB_OPENINGS_CONTENT_DELETE_REQUEST, CAREERS_JOB_OPENINGS_CONTENT_DELETE_SUCCESS, CAREERS_JOB_OPENINGS_CONTENT_EDIT_FAIL, CAREERS_JOB_OPENINGS_CONTENT_EDIT_REQUEST, CAREERS_JOB_OPENINGS_CONTENT_EDIT_SUCCESS, CAREERS_CREATE_FAIL, CAREERS_CREATE_REQUEST, CAREERS_CREATE_SUCCESS, CAREERS_EDIT_FAIL, 
    CAREERS_EDIT_REQUEST, CAREERS_EDIT_SUCCESS, CAREERS_HEALTH_TIPS_CONTENT_ADD_FAIL, CAREERS_HEALTH_TIPS_CONTENT_ADD_REQUEST, CAREERS_HEALTH_TIPS_CONTENT_ADD_SUCCESS, CAREERS_HEALTH_TIPS_CONTENT_DELETE_FAIL, CAREERS_HEALTH_TIPS_CONTENT_DELETE_REQUEST, CAREERS_HEALTH_TIPS_CONTENT_DELETE_SUCCESS, CAREERS_HEALTH_TIPS_CONTENT_EDIT_FAIL, CAREERS_HEALTH_TIPS_CONTENT_EDIT_REQUEST, CAREERS_HEALTH_TIPS_CONTENT_EDIT_SUCCESS, CAREERS_ARTICLES_CONTENT_ADD_FAIL, CAREERS_ARTICLES_CONTENT_ADD_REQUEST, CAREERS_ARTICLES_CONTENT_ADD_SUCCESS, CAREERS_ARTICLES_CONTENT_DELETE_FAIL, CAREERS_ARTICLES_CONTENT_DELETE_REQUEST, CAREERS_ARTICLES_CONTENT_DELETE_SUCCESS, CAREERS_ARTICLES_CONTENT_EDIT_FAIL, CAREERS_ARTICLES_CONTENT_EDIT_REQUEST, CAREERS_ARTICLES_CONTENT_EDIT_SUCCESS, CAREERS_LIST_FAIL, CAREERS_LIST_REQUEST, CAREERS_LIST_SUCCESS, CAREERS_EMPLOYEE_LIST_REQUEST, CAREERS_EMPLOYEE_LIST_SUCCESS, CAREERS_EMPLOYEE_LIST_FAIL } from "../constants/careersConstants";

function careersCreateReducer(state= {careers: {}}, action){
    switch (action.type){
        case CAREERS_CREATE_REQUEST:
            return {loading: true};
        case CAREERS_CREATE_SUCCESS:
            return {loading: false, success: true, careers: action.payload};
        case CAREERS_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function careersGetReducer(state= {careers: []}, action){
    switch (action.type){
        case CAREERS_LIST_REQUEST:
            return {loading: true, careers: []};
        case CAREERS_LIST_SUCCESS:
            return {loading: false, careers: action.payload};
        case CAREERS_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function careersEmployeeGetReducer(state= {careers: {}}, action){
    switch (action.type){
        case CAREERS_EMPLOYEE_LIST_REQUEST:
            return {loading: true};
        case CAREERS_EMPLOYEE_LIST_SUCCESS:
            return {loading: false, careers: action.payload};
        case CAREERS_EMPLOYEE_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function careersEditReducer(state= {careers: {}}, action){
    switch (action.type){
        case CAREERS_EDIT_REQUEST:
            return {loading: true};
        case CAREERS_EDIT_SUCCESS:
            return {loading: false, success: true, careers: action.payload};
        case CAREERS_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function careersJobOpeningsContentAddReducer(state= {careers: {}}, action){
    switch (action.type){
        case CAREERS_JOB_OPENINGS_CONTENT_ADD_REQUEST:
            return {loading: true};
        case CAREERS_JOB_OPENINGS_CONTENT_ADD_SUCCESS:
            return {loading: false, success: true, careers: action.payload};
        case CAREERS_JOB_OPENINGS_CONTENT_ADD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function careersJobOpeningsContentEditReducer(state= {careers: {}}, action){
    switch (action.type){
        case CAREERS_JOB_OPENINGS_CONTENT_EDIT_REQUEST:
            return {loading: true};
        case CAREERS_JOB_OPENINGS_CONTENT_EDIT_SUCCESS:
            return {loading: false, success: true, careers: action.payload};
        case CAREERS_JOB_OPENINGS_CONTENT_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function careersJobOpeningsContentDeleteReducer(state= {careers: {}}, action){
    switch (action.type){
        case CAREERS_JOB_OPENINGS_CONTENT_DELETE_REQUEST:
            return {loading: true};
        case CAREERS_JOB_OPENINGS_CONTENT_DELETE_SUCCESS:
            return {loading: false, success: true, careers: action.payload};
        case CAREERS_JOB_OPENINGS_CONTENT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function careersArticlesContentAddReducer(state= {careers: {}}, action){
    switch (action.type){
        case CAREERS_ARTICLES_CONTENT_ADD_REQUEST:
            return {loading: true};
        case CAREERS_ARTICLES_CONTENT_ADD_SUCCESS:
            return {loading: false, success: true, careers: action.payload};
        case CAREERS_ARTICLES_CONTENT_ADD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function careersArticlesContentEditReducer(state= {careers: {}}, action){
    switch (action.type){
        case CAREERS_ARTICLES_CONTENT_EDIT_REQUEST:
            return {loading: true};
        case CAREERS_ARTICLES_CONTENT_EDIT_SUCCESS:
            return {loading: false, success: true, careers: action.payload};
        case CAREERS_ARTICLES_CONTENT_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function careersArticlesContentDeleteReducer(state= {careers: {}}, action){
    switch (action.type){
        case CAREERS_ARTICLES_CONTENT_DELETE_REQUEST:
            return {loading: true};
        case CAREERS_ARTICLES_CONTENT_DELETE_SUCCESS:
            return {loading: false, success: true, careers: action.payload};
        case CAREERS_ARTICLES_CONTENT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {careersCreateReducer, careersGetReducer, careersEditReducer, careersJobOpeningsContentAddReducer, careersJobOpeningsContentEditReducer, 
careersJobOpeningsContentDeleteReducer, careersArticlesContentAddReducer, careersArticlesContentEditReducer, 
careersArticlesContentDeleteReducer, careersEmployeeGetReducer}