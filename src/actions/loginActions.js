import { 
    HIDE_ALL_MODAL, 
    SHOW_LOGIN_MODAL, 
    SHOW_REGISTER_MODAL, 
    SHOW_FORGET_PASSWORD_MODAL
} from '../constants/loginConstants';

export const showLoginModal = () => async dispatch => dispatch({type: SHOW_LOGIN_MODAL });

export const showRegisterModal = () => async dispatch => dispatch({type: SHOW_REGISTER_MODAL });

export const showForgetPasswordModal = () => async dispatch => dispatch({type: SHOW_FORGET_PASSWORD_MODAL });

export const hideAllModal = () => async dispatch => dispatch({type: HIDE_ALL_MODAL });

