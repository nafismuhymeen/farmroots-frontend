import axios from 'axios';
import { VIDEOS_COOKING_VIDEOS_CONTENT_ADD_FAIL, VIDEOS_COOKING_VIDEOS_CONTENT_ADD_REQUEST, VIDEOS_COOKING_VIDEOS_CONTENT_ADD_SUCCESS, VIDEOS_COOKING_VIDEOS_CONTENT_DELETE_FAIL, VIDEOS_COOKING_VIDEOS_CONTENT_DELETE_REQUEST, VIDEOS_COOKING_VIDEOS_CONTENT_DELETE_SUCCESS, VIDEOS_COOKING_VIDEOS_CONTENT_EDIT_FAIL, VIDEOS_COOKING_VIDEOS_CONTENT_EDIT_REQUEST, VIDEOS_COOKING_VIDEOS_CONTENT_EDIT_SUCCESS, VIDEOS_CREATE_FAIL, VIDEOS_CREATE_REQUEST, VIDEOS_CREATE_SUCCESS, 
    VIDEOS_EDIT_FAIL, VIDEOS_EDIT_REQUEST, VIDEOS_EDIT_SUCCESS, VIDEOS_EMPLOYEE_LIST_FAIL, VIDEOS_EMPLOYEE_LIST_REQUEST, VIDEOS_EMPLOYEE_LIST_SUCCESS, VIDEOS_HEALTH_TIPS_CONTENT_ADD_FAIL, VIDEOS_HEALTH_TIPS_CONTENT_ADD_REQUEST, VIDEOS_HEALTH_TIPS_CONTENT_ADD_SUCCESS, VIDEOS_HEALTH_TIPS_CONTENT_DELETE_FAIL, VIDEOS_HEALTH_TIPS_CONTENT_DELETE_REQUEST, VIDEOS_HEALTH_TIPS_CONTENT_DELETE_SUCCESS, VIDEOS_HEALTH_TIPS_CONTENT_EDIT_FAIL, VIDEOS_HEALTH_TIPS_CONTENT_EDIT_REQUEST, VIDEOS_HEALTH_TIPS_CONTENT_EDIT_SUCCESS, VIDEOS_KITCHEN_HACKS_CONTENT_ADD_FAIL, VIDEOS_KITCHEN_HACKS_CONTENT_ADD_REQUEST, VIDEOS_KITCHEN_HACKS_CONTENT_ADD_SUCCESS, VIDEOS_KITCHEN_HACKS_CONTENT_DELETE_FAIL, VIDEOS_KITCHEN_HACKS_CONTENT_DELETE_REQUEST, VIDEOS_KITCHEN_HACKS_CONTENT_DELETE_SUCCESS, VIDEOS_KITCHEN_HACKS_CONTENT_EDIT_FAIL, VIDEOS_KITCHEN_HACKS_CONTENT_EDIT_REQUEST, VIDEOS_KITCHEN_HACKS_CONTENT_EDIT_SUCCESS, VIDEOS_LIST_FAIL, 
    VIDEOS_LIST_REQUEST, VIDEOS_LIST_SUCCESS } from '../constants/videosConstants';

const createVideos = (videos) => async (dispatch, getState) => {
    try {
        dispatch({type: VIDEOS_CREATE_REQUEST, payload: videos});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.post('/api/videos', videos, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: VIDEOS_CREATE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: VIDEOS_CREATE_FAIL, payload: error.message});        
    }
}

const getVideos = () => async (dispatch) => {
    try {
        dispatch({type: VIDEOS_LIST_REQUEST});
        const {data} = await axios.get('/api/videos');
        dispatch({type: VIDEOS_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: VIDEOS_LIST_FAIL, payload: error.message});        
    }
}

const getEmployeeVideos = () => async (dispatch, getState) => {
    try {
        const {employeeSignin:{employeeInfo}} = getState();
        dispatch({type: VIDEOS_EMPLOYEE_LIST_REQUEST});
        const {data} = await axios.get('/api/videos/employee-videos', {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: VIDEOS_EMPLOYEE_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: VIDEOS_EMPLOYEE_LIST_FAIL, payload: error.message});        
    }
}

const editVideos = (videos) => async (dispatch, getState) => {
    try {
        dispatch({type: VIDEOS_EDIT_REQUEST, payload: videos});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/videos/edit/' + videos._id, videos, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: VIDEOS_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: VIDEOS_EDIT_FAIL, payload: error.message});        
    }
}

const addVideosCookingVideosContent = (cookingVideos) => async (dispatch, getState) => {
    try {
        dispatch({type: VIDEOS_COOKING_VIDEOS_CONTENT_ADD_REQUEST, payload: cookingVideos});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/videos/add-cooking-videos-content', cookingVideos, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: VIDEOS_COOKING_VIDEOS_CONTENT_ADD_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: VIDEOS_COOKING_VIDEOS_CONTENT_ADD_FAIL, payload: error.message});        
    }
}

const editVideosCookingVideosContent = (cookingVideos) => async (dispatch, getState) => {
    try {
        dispatch({type: VIDEOS_COOKING_VIDEOS_CONTENT_EDIT_REQUEST, payload: cookingVideos});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/videos/edit-cooking-videos-content', cookingVideos, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: VIDEOS_COOKING_VIDEOS_CONTENT_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: VIDEOS_COOKING_VIDEOS_CONTENT_EDIT_FAIL, payload: error.message});        
    }
}

const deleteVideosCookingVideosContent = (cookingVideos) => async (dispatch, getState) => {
    try {
        dispatch({type: VIDEOS_COOKING_VIDEOS_CONTENT_DELETE_REQUEST, payload: cookingVideos});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/videos/delete-cooking-videos-content', cookingVideos, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: VIDEOS_COOKING_VIDEOS_CONTENT_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: VIDEOS_COOKING_VIDEOS_CONTENT_DELETE_FAIL, payload: error.message});        
    }
}

const addVideosKitchenHacksContent = (kitchenHacks) => async (dispatch, getState) => {
    try {
        dispatch({type: VIDEOS_KITCHEN_HACKS_CONTENT_ADD_REQUEST, payload: kitchenHacks});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/videos/add-kitchen-hacks-content', kitchenHacks, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: VIDEOS_KITCHEN_HACKS_CONTENT_ADD_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: VIDEOS_KITCHEN_HACKS_CONTENT_ADD_FAIL, payload: error.message});        
    }
}

const editVideosKitchenHacksContent = (kitchenHacks) => async (dispatch, getState) => {
    try {
        dispatch({type: VIDEOS_KITCHEN_HACKS_CONTENT_EDIT_REQUEST, payload: kitchenHacks});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/videos/edit-kitchen-hacks-content', kitchenHacks, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: VIDEOS_KITCHEN_HACKS_CONTENT_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: VIDEOS_KITCHEN_HACKS_CONTENT_EDIT_FAIL, payload: error.message});        
    }
}

const deleteVideosKitchenHacksContent = (kitchenHacks) => async (dispatch, getState) => {
    try {
        dispatch({type: VIDEOS_KITCHEN_HACKS_CONTENT_DELETE_REQUEST, payload: kitchenHacks});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/videos/delete-kitchen-hacks-content', kitchenHacks, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: VIDEOS_KITCHEN_HACKS_CONTENT_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: VIDEOS_KITCHEN_HACKS_CONTENT_DELETE_FAIL, payload: error.message});        
    }
}

const addVideosHealthTipsContent = (healthTips) => async (dispatch, getState) => {
    try {
        dispatch({type: VIDEOS_HEALTH_TIPS_CONTENT_ADD_REQUEST, payload: healthTips});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/videos/add-health-tips-content', healthTips, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: VIDEOS_HEALTH_TIPS_CONTENT_ADD_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: VIDEOS_HEALTH_TIPS_CONTENT_ADD_FAIL, payload: error.message});        
    }
}

const editVideosHealthTipsContent = (healthTips) => async (dispatch, getState) => {
    try {
        dispatch({type: VIDEOS_HEALTH_TIPS_CONTENT_EDIT_REQUEST, payload: healthTips});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/videos/edit-health-tips-content', healthTips, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: VIDEOS_HEALTH_TIPS_CONTENT_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: VIDEOS_HEALTH_TIPS_CONTENT_EDIT_FAIL, payload: error.message});        
    }
}

const deleteVideosHealthTipsContent = (healthTips) => async (dispatch, getState) => {
    try {
        dispatch({type: VIDEOS_HEALTH_TIPS_CONTENT_DELETE_REQUEST, payload: healthTips});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/videos/delete-health-tips-content', healthTips, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: VIDEOS_HEALTH_TIPS_CONTENT_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: VIDEOS_HEALTH_TIPS_CONTENT_DELETE_FAIL, payload: error.message});        
    }
}

export {createVideos, getVideos, getEmployeeVideos, editVideos, addVideosCookingVideosContent, editVideosCookingVideosContent, 
    deleteVideosCookingVideosContent, addVideosKitchenHacksContent, editVideosKitchenHacksContent, 
    deleteVideosKitchenHacksContent, addVideosHealthTipsContent, editVideosHealthTipsContent, 
    deleteVideosHealthTipsContent}