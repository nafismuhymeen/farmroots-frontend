import axios from 'axios';
import {
    LOGO_CREATE_FAIL, LOGO_CREATE_REQUEST, LOGO_CREATE_SUCCESS,
    LOGO_EDIT_FAIL, LOGO_EDIT_REQUEST, LOGO_EDIT_SUCCESS, LOGO_LIST_FAIL,
    LOGO_LIST_REQUEST, LOGO_LIST_SUCCESS
} from '../constants/logoConstants';

const createLogo = (logo) => async (dispatch, getState) => {
    try {
        dispatch({ type: LOGO_CREATE_REQUEST, payload: logo });
        const { employeeSignin: { employeeInfo } } = getState();
        const { data } = await axios.post('/api/logo', logo, {
            headers: {
                Authorization: 'Bearer ' + employeeInfo.token
            }

        });

        dispatch({ type: LOGO_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LOGO_CREATE_FAIL, payload: error.message });
    }
}

const getEmployeeLogo = () => async (dispatch, getState) => {
    try {
        // const { employeeSignin: { employeeInfo } } = getState();
        // dispatch({ type: LOGO_LIST_REQUEST });
        const { data } = await axios.get('/api/logo/employee-logos',);
        dispatch({ type: LOGO_LIST_SUCCESS, payload: data });
    } catch (error) {
        console.log(error)
        dispatch({ type: LOGO_LIST_FAIL, payload: error.message });
    }
}

const editLogo = (logo) => async (dispatch, getState) => {
    try {
        dispatch({ type: LOGO_EDIT_REQUEST, payload: logo });
        const { employeeSignin: { employeeInfo } } = getState();
        const { data } = await axios.put('/api/logo/' + logo._id, logo, {
            headers: {
                Authorization: 'Bearer ' + employeeInfo.token
            }
        });
        dispatch({ type: LOGO_EDIT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: LOGO_EDIT_FAIL, payload: error.message });
    }
}

export { createLogo, getEmployeeLogo, editLogo }