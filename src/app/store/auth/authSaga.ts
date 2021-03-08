import { message } from "antd";
import { put, takeLatest, fork, delay } from "redux-saga/effects";
import { AuthService } from "services";
import tokenUtil from "utils/token.util";
import * as config from "constants/config.constant";

import { ActionType } from "../config/actionTypes";
import firebase from "firebase";

function* loginUserSaga({ payload }: { payload: { token } }) {
  try {
    const response = yield AuthService.login(payload.token);
    if (response.status === 200) {
      firebase
        .auth()
        .currentUser?.getIdToken(true)
        .then(() => {
          tokenUtil.setToken(config.TOKEN_NAME, response.data.token);
          message.success("Login success", 2);
        });
      yield delay(500);
      yield put({ type: ActionType.LOGIN_SUCCESS, payload: response.data });
    } else {
      yield put({ type: ActionType.LOGIN_ERROR, payload: response.data });
      message.error("Login fail", 2);
    }
  } catch (error) {
    yield put({ type: ActionType.LOGIN_ERROR, payload: error });
    message.error("Login fail", 2);
  }
}
function* onLoginWatcher() {
  yield takeLatest(ActionType.LOGIN_REQUEST as any, loginUserSaga);
}

function* logoutSaga() {
  tokenUtil.delToken(config.TOKEN_NAME);
  yield put({ type: ActionType.LOGOUT_SUCCESS });
  message.success("Logout success", 2);
}
function* onLogoutWatcher() {
  yield takeLatest(ActionType.LOGOUT_REQUEST as any, logoutSaga);
}

function* loadUserSaga() {
  try {
    const response = yield AuthService.getMe();
    if (response.status === 200) {
      yield put({ type: ActionType.LOAD_AUTH_SUCCESS, payload: response.data });
    } else {
      yield put({ type: ActionType.LOAD_AUTH_ERROR, payload: response.data });
    }
  } catch (error) {
    yield put({ type: ActionType.LOAD_AUTH_ERROR, payload: error });
  }
}
function* onLoadUserWatcher() {
  yield takeLatest(ActionType.LOAD_AUTH_REQUEST as any, loadUserSaga);
}

export default [fork(onLoginWatcher), fork(onLogoutWatcher), fork(onLoadUserWatcher)];
