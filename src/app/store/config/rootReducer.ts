import { combineReducers } from "redux";
import { CustomerListReducerType } from "../customer/customerTypes";
import { customersReducer } from "../customer/customerReducer";
import { AuthReducerType } from "../auth/authTypes";
import { authReducer } from "../auth/authReducer";


export interface RootState {
  customerList: CustomerListReducerType;
  auth: AuthReducerType;
}

export const rootReducer = combineReducers<RootState>({
  customerList: customersReducer,
  auth: authReducer,
});
