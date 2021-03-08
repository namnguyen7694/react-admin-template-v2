import { commonRequestFilter } from "models/requets.model";
import { ActionType } from "../config/actionTypes";

export const getCustomersAction = (payload?: commonRequestFilter) => {
  return {
    type: ActionType.GET_CUSTOMERS_REQUEST,
    payload,
  };
};

