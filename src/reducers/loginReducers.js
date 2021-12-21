import {
  HIDE_ALL_MODAL,
  SHOW_LOGIN_MODAL,
  SHOW_REGISTER_MODAL,
  SHOW_FORGET_PASSWORD_MODAL,
} from "../constants/loginConstants";

export const loginReducer = (
  state = {
    login: false,
    register: false,
    forgetPassword: false,
  },
  action
) => {
  switch (action.type) {
    case SHOW_LOGIN_MODAL:
      return { login: true, register: false, forgetPassword: false };
    case SHOW_REGISTER_MODAL:
      return { login: false, register: true, forgetPassword: false };
    case SHOW_FORGET_PASSWORD_MODAL:
      return { login: false, register: false, forgetPassword: true };
    case HIDE_ALL_MODAL:
      return { login: false, register: false, forgetPassword: false };
    default:
      return state;
  }
};
