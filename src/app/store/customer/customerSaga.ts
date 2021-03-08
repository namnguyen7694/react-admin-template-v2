import { commonRequestFilter } from "models/requets.model";
import { put, takeLatest, fork } from "redux-saga/effects";
import { CustomerService } from "services";
import { getPagination } from "utils/other.util";

import { ActionType } from "../config/actionTypes";

function* getCustomersSaga({ payload }: { payload: commonRequestFilter }) {
  try {
    const response = yield CustomerService.getCustomers(payload!);
    if (response.status === 200) {
      yield put({
        type: ActionType.GET_CUSTOMERS_SUCCESS,
        payload: {
          ...response.data,
          ...getPagination(payload, response.data.total),
        },
      });
    } else {
      yield put({ type: ActionType.GET_CUSTOMERS_ERROR, payload: "error" });
    }
  } catch (error) {
    yield put({ type: ActionType.GET_CUSTOMERS_ERROR, payload: error });
  }
}
function* onGetCustomersWatcher() {
  yield takeLatest(ActionType.GET_CUSTOMERS_REQUEST as any, getCustomersSaga);
}

export default [fork(onGetCustomersWatcher)];
