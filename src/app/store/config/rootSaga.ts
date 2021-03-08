import { all } from "redux-saga/effects";

import customerSagas from "../customer/customerSaga";
import authSagas from "../auth/authSaga";

export default function* rootSaga() {
  yield all([...customerSagas, ...authSagas]);
}
