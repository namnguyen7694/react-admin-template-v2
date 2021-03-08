import * as CustomerActions from "../customer/customerAction";
import * as AuthActions from "../auth/authAction";

export const sagaActions = Object.assign(
  {},
  {
    ...CustomerActions,
    ...AuthActions,
  }
);
