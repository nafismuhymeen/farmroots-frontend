import { BLOG_CREATE_FAIL, BLOG_CREATE_REQUEST, BLOG_CREATE_SUCCESS, BLOG_EDIT_FAIL, 
    BLOG_EDIT_REQUEST, BLOG_EDIT_SUCCESS, BLOG_LIST_FAIL, BLOG_LIST_REQUEST, BLOG_LIST_SUCCESS, BLOG_CONTENT_ADD_FAIL, BLOG_CONTENT_ADD_REQUEST, BLOG_CONTENT_ADD_SUCCESS, BLOG_CONTENT_DELETE_FAIL, BLOG_CONTENT_DELETE_REQUEST, BLOG_CONTENT_DELETE_SUCCESS, BLOG_CONTENT_EDIT_FAIL, BLOG_CONTENT_EDIT_REQUEST, BLOG_CONTENT_EDIT_SUCCESS } from "../constants/blogConstants";

function blogCreateReducer(state= {blog: {}}, action){
    switch (action.type){
        case BLOG_CREATE_REQUEST:
            return {loading: true};
        case BLOG_CREATE_SUCCESS:
            return {loading: false, success: true, blog: action.payload};
        case BLOG_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function blogGetReducer(state= {blog: {}}, action){
    switch (action.type){
        case BLOG_LIST_REQUEST:
            return {loading: true};
        case BLOG_LIST_SUCCESS:
            return {loading: false, blog: action.payload};
        case BLOG_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function blogEditReducer(state= {blog: {}}, action){
    switch (action.type){
        case BLOG_EDIT_REQUEST:
            return {loading: true};
        case BLOG_EDIT_SUCCESS:
            return {loading: false, success: true, blog: action.payload};
        case BLOG_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function blogContentAddReducer(state= {blog: {}}, action){
    switch (action.type){
        case BLOG_CONTENT_ADD_REQUEST:
            return {loading: true};
        case BLOG_CONTENT_ADD_SUCCESS:
            return {loading: false, success: true, blog: action.payload};
        case BLOG_CONTENT_ADD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function blogContentEditReducer(state= {blog: {}}, action){
    switch (action.type){
        case BLOG_CONTENT_EDIT_REQUEST:
            return {loading: true};
        case BLOG_CONTENT_EDIT_SUCCESS:
            return {loading: false, success: true, blog: action.payload};
        case BLOG_CONTENT_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function blogContentDeleteReducer(state= {blog: {}}, action){
    switch (action.type){
        case BLOG_CONTENT_DELETE_REQUEST:
            return {loading: true};
        case BLOG_CONTENT_DELETE_SUCCESS:
            return {loading: false, success: true, blog: action.payload};
        case BLOG_CONTENT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {blogCreateReducer, blogGetReducer, blogEditReducer, blogContentAddReducer, blogContentEditReducer, 
    blogContentDeleteReducer}