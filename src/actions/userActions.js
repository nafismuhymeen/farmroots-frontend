import axios from 'axios';
import Cookie from 'js-cookie';
import {
    USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL, USER_CHANGE_PASSWORD_REQUEST, USER_CHANGE_PASSWORD_SUCCESS, USER_CHANGE_PASSWORD_FAIL, RESET_TOAST_DATA,
    USER_FORGET_PASSWORD_REQUEST, USER_FORGET_PASSWORD_SUCCESS, USER_FORGET_PASSWORD_FAIL
} from "../constants/userConstants";

const signin = (email, password) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
    try {
        const { data } = await axios.post("/api/users/signin", { email, password });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        Cookie.set("userInfo", JSON.stringify(data), { expires: 365 });
    } catch (error) {
        dispatch({ type: USER_SIGNIN_FAIL, payload: error.response.data.message });
    }
}

const register = (name, email, password, countryCode, mobileNumber, image = "Nil") => async (dispatch) => {
    dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password, countryCode, mobileNumber, image } });
    try {
        const { data } = await axios.post("/api/users/register", { name, email, password, countryCode, mobileNumber, image });
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        Cookie.set("userInfo", JSON.stringify(data), { expires: 365 });
    } catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.response.data.message });
    }
}

const logout = () => (dispatch) => {
    Cookie.remove("userInfo");
    Cookie.remove("myCat");
    Cookie.remove("my1Cat");
    dispatch({ type: USER_LOGOUT })
}

const update = (user) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_UPDATE_REQUEST, payload: user });
    try {
        const { data } = await axios.put("/api/users/update", user,
            {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token
                }
            });
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        Cookie.set("userInfo", JSON.stringify(data), { expires: 365 });
        return data
    } catch (error) {
        dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
    }
}

const googleSignin = (socialId, name, email) => async (dispatch) => {
    try {
        const password = socialId + '1219821';
        const { data } = await axios.post("api/users/socialLogin", { email, socialId, name, platForm: "google" });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
        Cookie.set("userInfo", JSON.stringify(data), { expires: 365 });


    }
    catch (error) {
        console.log("Error in sign in");
    }
}

const facebookSignin = (socialId, name, email) => async (dispatch) => {
    try {
        const password = socialId + '1219821';
        const { data } = await axios.post("api/users/socialLogin", { email, socialId, name, platForm: "facebook" });
        Cookie.set("userInfo", JSON.stringify(data), { expires: 365 });
        dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

        // if(data.action === 'signin')
        // {
        //     dispatch(signin(email, password));
        // }
        // else if (data.action === 'register')
        // {
        //     dispatch(register(name, email, password));
        // }
    }
    catch (error) {
    }
}

const changePassword = (oldPassword, newPassword) => async (dispatch, getState) => {
    const { userSignin: { userInfo } } = getState();
    dispatch({ type: USER_CHANGE_PASSWORD_REQUEST, payload: { oldPassword, newPassword } });
    try {
        const { data } = await axios.put("/api/users/change-password", { oldPassword, newPassword },
            {
                headers: {
                    Authorization: 'Bearer ' + userInfo.token
                }
            });
        dispatch({ type: USER_CHANGE_PASSWORD_SUCCESS, payload: data });
        Cookie.set("userInfo", JSON.stringify(data), { expires: 365 });
        return data
    } catch (error) {
        dispatch({ type: USER_CHANGE_PASSWORD_FAIL, payload: error.response.data.message });
    }
}

const resetToastData = () => async (dispatch) => {
    dispatch({ type: RESET_TOAST_DATA });
}
// forget password
const forgetPassword = (email) => async (dispatch) => {
    dispatch({ type: USER_FORGET_PASSWORD_REQUEST, payload: { email } });
    try {
        const { data } = await axios.post("/api/users/forgotPassword", { email });
        dispatch({ type: USER_FORGET_PASSWORD_SUCCESS, payload: data });
        // Cookie.set("userInfo", JSON.stringify(data), { expires: 365 });
    } catch (error) {
        dispatch({ type: USER_FORGET_PASSWORD_FAIL, payload: error.response.data.message });
    }
}

export { signin, register, logout, update, googleSignin, facebookSignin, changePassword, resetToastData, forgetPassword }