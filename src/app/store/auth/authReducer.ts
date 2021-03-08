import * as config from "constants/config.constant";
import { ErrorModel } from "models/common/error.model";
import tokenUtil from "utils/token.util";
import { ActionType, pureAction } from "../config/actionTypes";
import createReducer from "../config/createReducer";
import { AuthOutputModel, AuthReducerType, UserOutputModel } from "./authTypes";

const defaultState: AuthReducerType = {
  loading: false,
  error: {
    status: 0,
    data: undefined,
  },
  data: {
    token: tokenUtil.getToken(config.TOKEN_NAME),
    refreshToken: null,
    user: new UserOutputModel().deserialize!({}),
  },
};

export const authReducer = createReducer<AuthReducerType>(defaultState, {
  [ActionType.LOGIN_REQUEST](state: AuthReducerType, action: pureAction<undefined>) {
    return {
      ...state,
      loading: true,
    };
  },
  [ActionType.LOGOUT_REQUEST](state: AuthReducerType, action: pureAction<undefined>) {
    return {
      ...state,
      loading: true,
    };
  },
  [ActionType.LOAD_AUTH_REQUEST](state: AuthReducerType, action: pureAction<undefined>) {
    return {
      ...state,
      loading: true,
    };
  },

  [ActionType.LOGIN_ERROR](state: AuthReducerType, action: pureAction<ErrorModel>) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  [ActionType.LOGOUT_ERROR](state: AuthReducerType, action: pureAction<ErrorModel>) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  [ActionType.LOAD_AUTH_ERROR](state: AuthReducerType, action: pureAction<ErrorModel>) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.LOGIN_SUCCESS](state: AuthReducerType, action: pureAction<AuthOutputModel>) {
    return {
      ...state,
      loading: false,
      data: {
        ...state.data,
        token : action.payload.token,
        user : action.payload
      },
    };
  },
  [ActionType.LOGOUT_SUCCESS](state: AuthReducerType, action: pureAction<AuthOutputModel>) {
    return {
      ...defaultState,
      data: {
        ...defaultState.data,
        token: null,
        refreshToken: null,
      },
    };
  },
  [ActionType.LOAD_AUTH_SUCCESS](state: AuthReducerType, action: pureAction<AuthOutputModel>) {
    return {
      ...state,
      loading: false,
      data: {
        ...state.data,
        user: action.payload,
      },
    };
  },
});
