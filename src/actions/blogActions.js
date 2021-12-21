import axios from 'axios';
import { BLOG_CREATE_FAIL, BLOG_CREATE_REQUEST, BLOG_CREATE_SUCCESS, 
    BLOG_EDIT_FAIL, BLOG_EDIT_REQUEST, BLOG_EDIT_SUCCESS, BLOG_LIST_FAIL, 
    BLOG_LIST_REQUEST, BLOG_LIST_SUCCESS, BLOG_CONTENT_ADD_FAIL, BLOG_CONTENT_ADD_REQUEST, BLOG_CONTENT_ADD_SUCCESS, BLOG_CONTENT_DELETE_FAIL, BLOG_CONTENT_DELETE_REQUEST, BLOG_CONTENT_DELETE_SUCCESS, BLOG_CONTENT_EDIT_FAIL, BLOG_CONTENT_EDIT_REQUEST, BLOG_CONTENT_EDIT_SUCCESS } from '../constants/blogConstants';

const createBlog = (blog) => async (dispatch, getState) => {
    try {
        dispatch({type: BLOG_CREATE_REQUEST, payload: blog});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.post('/api/blog', blog, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: BLOG_CREATE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: BLOG_CREATE_FAIL, payload: error.message});        
    }
}

const getBlog = () => async (dispatch) => {
    try {
        dispatch({type: BLOG_LIST_REQUEST});
        const {data} = await axios.get('/api/blog');
        dispatch({type: BLOG_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: BLOG_LIST_FAIL, payload: error.message});        
    }
}

const getEmployeeBlog = () => async (dispatch, getState) => {
    try {
        const {employeeSignin:{employeeInfo}} = getState();
        dispatch({type: BLOG_LIST_REQUEST});
        const {data} = await axios.get('/api/blog/employee-blog', {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: BLOG_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: BLOG_LIST_FAIL, payload: error.message});        
    }
}

const editBlog = (blog) => async (dispatch, getState) => {
    try {
        dispatch({type: BLOG_EDIT_REQUEST, payload: blog});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/blog/edit/' + blog._id, blog, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: BLOG_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: BLOG_EDIT_FAIL, payload: error.message});        
    }
}

const addBlogContent = (blog) => async (dispatch, getState) => {
    try {
        dispatch({type: BLOG_CONTENT_ADD_REQUEST, payload: blog});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/blog/add-blog-content', blog, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: BLOG_CONTENT_ADD_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: BLOG_CONTENT_ADD_FAIL, payload: error.message});        
    }
}

const editBlogContent = (blog) => async (dispatch, getState) => {
    try {
        dispatch({type: BLOG_CONTENT_EDIT_REQUEST, payload: blog});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/blog/edit-blog-content', blog, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: BLOG_CONTENT_EDIT_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: BLOG_CONTENT_EDIT_FAIL, payload: error.message});        
    }
}

const deleteBlogContent = (blog) => async (dispatch, getState) => {
    try {
        dispatch({type: BLOG_CONTENT_DELETE_REQUEST, payload: blog});
        const {employeeSignin:{employeeInfo}} = getState();
        const {data} = await axios.put('/api/blog/delete-blog-content', blog, {headers: {
            Authorization: 'Bearer ' + employeeInfo.token
        }
        });
        dispatch({type: BLOG_CONTENT_DELETE_SUCCESS, payload: data});
    } catch (error) {
        dispatch({type: BLOG_CONTENT_DELETE_FAIL, payload: error.message});        
    }
}

export {createBlog, getBlog, getEmployeeBlog, editBlog, addBlogContent, editBlogContent, deleteBlogContent}