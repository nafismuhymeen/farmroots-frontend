import { VIDEOS_COOKING_VIDEOS_CONTENT_ADD_FAIL, VIDEOS_COOKING_VIDEOS_CONTENT_ADD_REQUEST, VIDEOS_COOKING_VIDEOS_CONTENT_ADD_SUCCESS, VIDEOS_COOKING_VIDEOS_CONTENT_DELETE_FAIL, VIDEOS_COOKING_VIDEOS_CONTENT_DELETE_REQUEST, VIDEOS_COOKING_VIDEOS_CONTENT_DELETE_SUCCESS, VIDEOS_COOKING_VIDEOS_CONTENT_EDIT_FAIL, VIDEOS_COOKING_VIDEOS_CONTENT_EDIT_REQUEST, VIDEOS_COOKING_VIDEOS_CONTENT_EDIT_SUCCESS, VIDEOS_CREATE_FAIL, VIDEOS_CREATE_REQUEST, VIDEOS_CREATE_SUCCESS, VIDEOS_EDIT_FAIL, 
    VIDEOS_EDIT_REQUEST, VIDEOS_EDIT_SUCCESS, VIDEOS_EMPLOYEE_LIST_FAIL, VIDEOS_EMPLOYEE_LIST_REQUEST, VIDEOS_EMPLOYEE_LIST_SUCCESS, VIDEOS_HEALTH_TIPS_CONTENT_ADD_FAIL, VIDEOS_HEALTH_TIPS_CONTENT_ADD_REQUEST, VIDEOS_HEALTH_TIPS_CONTENT_ADD_SUCCESS, VIDEOS_HEALTH_TIPS_CONTENT_DELETE_FAIL, VIDEOS_HEALTH_TIPS_CONTENT_DELETE_REQUEST, VIDEOS_HEALTH_TIPS_CONTENT_DELETE_SUCCESS, VIDEOS_HEALTH_TIPS_CONTENT_EDIT_FAIL, VIDEOS_HEALTH_TIPS_CONTENT_EDIT_REQUEST, VIDEOS_HEALTH_TIPS_CONTENT_EDIT_SUCCESS, VIDEOS_KITCHEN_HACKS_CONTENT_ADD_FAIL, VIDEOS_KITCHEN_HACKS_CONTENT_ADD_REQUEST, VIDEOS_KITCHEN_HACKS_CONTENT_ADD_SUCCESS, VIDEOS_KITCHEN_HACKS_CONTENT_DELETE_FAIL, VIDEOS_KITCHEN_HACKS_CONTENT_DELETE_REQUEST, VIDEOS_KITCHEN_HACKS_CONTENT_DELETE_SUCCESS, VIDEOS_KITCHEN_HACKS_CONTENT_EDIT_FAIL, VIDEOS_KITCHEN_HACKS_CONTENT_EDIT_REQUEST, VIDEOS_KITCHEN_HACKS_CONTENT_EDIT_SUCCESS, VIDEOS_LIST_FAIL, VIDEOS_LIST_REQUEST, VIDEOS_LIST_SUCCESS } from "../constants/videosConstants";

function videosCreateReducer(state= {videos: {}}, action){
    switch (action.type){
        case VIDEOS_CREATE_REQUEST:
            return {loading: true};
        case VIDEOS_CREATE_SUCCESS:
            return {loading: false, success: true, videos: action.payload};
        case VIDEOS_CREATE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function videosGetReducer(state= {videos: []}, action){
    switch (action.type){
        case VIDEOS_LIST_REQUEST:
            return {loading: true, videos: []};
        case VIDEOS_LIST_SUCCESS:
            return {loading: false, videos: action.payload};
        case VIDEOS_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function videosEmployeeGetReducer(state= {videos: {}}, action){
    switch (action.type){
        case VIDEOS_EMPLOYEE_LIST_REQUEST:
            return {loading: true};
        case VIDEOS_EMPLOYEE_LIST_SUCCESS:
            return {loading: false, videos: action.payload};
        case VIDEOS_EMPLOYEE_LIST_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;
    }
}

function videosEditReducer(state= {videos: {}}, action){
    switch (action.type){
        case VIDEOS_EDIT_REQUEST:
            return {loading: true};
        case VIDEOS_EDIT_SUCCESS:
            return {loading: false, success: true, videos: action.payload};
        case VIDEOS_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function videosCookingVideosContentAddReducer(state= {videos: {}}, action){
    switch (action.type){
        case VIDEOS_COOKING_VIDEOS_CONTENT_ADD_REQUEST:
            return {loading: true};
        case VIDEOS_COOKING_VIDEOS_CONTENT_ADD_SUCCESS:
            return {loading: false, success: true, videos: action.payload};
        case VIDEOS_COOKING_VIDEOS_CONTENT_ADD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function videosCookingVideosContentEditReducer(state= {videos: {}}, action){
    switch (action.type){
        case VIDEOS_COOKING_VIDEOS_CONTENT_EDIT_REQUEST:
            return {loading: true};
        case VIDEOS_COOKING_VIDEOS_CONTENT_EDIT_SUCCESS:
            return {loading: false, success: true, videos: action.payload};
        case VIDEOS_COOKING_VIDEOS_CONTENT_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function videosCookingVideosContentDeleteReducer(state= {videos: {}}, action){
    switch (action.type){
        case VIDEOS_COOKING_VIDEOS_CONTENT_DELETE_REQUEST:
            return {loading: true};
        case VIDEOS_COOKING_VIDEOS_CONTENT_DELETE_SUCCESS:
            return {loading: false, success: true, videos: action.payload};
        case VIDEOS_COOKING_VIDEOS_CONTENT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function videosKitchenHacksContentAddReducer(state= {videos: {}}, action){
    switch (action.type){
        case VIDEOS_KITCHEN_HACKS_CONTENT_ADD_REQUEST:
            return {loading: true};
        case VIDEOS_KITCHEN_HACKS_CONTENT_ADD_SUCCESS:
            return {loading: false, success: true, videos: action.payload};
        case VIDEOS_KITCHEN_HACKS_CONTENT_ADD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function videosKitchenHacksContentEditReducer(state= {videos: {}}, action){
    switch (action.type){
        case VIDEOS_KITCHEN_HACKS_CONTENT_EDIT_REQUEST:
            return {loading: true};
        case VIDEOS_KITCHEN_HACKS_CONTENT_EDIT_SUCCESS:
            return {loading: false, success: true, videos: action.payload};
        case VIDEOS_KITCHEN_HACKS_CONTENT_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function videosKitchenHacksContentDeleteReducer(state= {videos: {}}, action){
    switch (action.type){
        case VIDEOS_KITCHEN_HACKS_CONTENT_DELETE_REQUEST:
            return {loading: true};
        case VIDEOS_KITCHEN_HACKS_CONTENT_DELETE_SUCCESS:
            return {loading: false, success: true, videos: action.payload};
        case VIDEOS_KITCHEN_HACKS_CONTENT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function videosHealthTipsContentAddReducer(state= {videos: {}}, action){
    switch (action.type){
        case VIDEOS_HEALTH_TIPS_CONTENT_ADD_REQUEST:
            return {loading: true};
        case VIDEOS_HEALTH_TIPS_CONTENT_ADD_SUCCESS:
            return {loading: false, success: true, videos: action.payload};
        case VIDEOS_HEALTH_TIPS_CONTENT_ADD_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function videosHealthTipsContentEditReducer(state= {videos: {}}, action){
    switch (action.type){
        case VIDEOS_HEALTH_TIPS_CONTENT_EDIT_REQUEST:
            return {loading: true};
        case VIDEOS_HEALTH_TIPS_CONTENT_EDIT_SUCCESS:
            return {loading: false, success: true, videos: action.payload};
        case VIDEOS_HEALTH_TIPS_CONTENT_EDIT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

function videosHealthTipsContentDeleteReducer(state= {videos: {}}, action){
    switch (action.type){
        case VIDEOS_HEALTH_TIPS_CONTENT_DELETE_REQUEST:
            return {loading: true};
        case VIDEOS_HEALTH_TIPS_CONTENT_DELETE_SUCCESS:
            return {loading: false, success: true, videos: action.payload};
        case VIDEOS_HEALTH_TIPS_CONTENT_DELETE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state;
    }
}

export {videosCreateReducer, videosGetReducer, videosEditReducer, videosCookingVideosContentAddReducer, videosCookingVideosContentEditReducer, 
videosCookingVideosContentDeleteReducer, videosKitchenHacksContentAddReducer, videosKitchenHacksContentEditReducer, videosEmployeeGetReducer,
videosKitchenHacksContentDeleteReducer, videosHealthTipsContentAddReducer, videosHealthTipsContentEditReducer, videosHealthTipsContentDeleteReducer}