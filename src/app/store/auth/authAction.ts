import { ActionType } from "../config/actionTypes";

export const loginAction = (payload: { token: string }) => {
  return {
    type: ActionType.LOGIN_REQUEST,
    payload,
  };
};
export const logoutAction = () => {
  return {
    type: ActionType.LOGOUT_REQUEST,
  };
};

export const loadAuthAction = () => {
  return {
    type: ActionType.LOAD_AUTH_REQUEST,
  };
};
