import { ErrorModel } from "models/common/error.model";
import PaginationOutputModel from "models/pagination.output.model";
import { ActionType, pureAction } from "../config/actionTypes";
import createReducer from "../config/createReducer";

import { CustomerListReducerType, CustomerOutputModel } from "./customerTypes";

const defaultState: CustomerListReducerType = {
  loading: false,
  error: {
    status: 0,
    data: undefined,
  },
  listing: {
    totalPages: 0,
    page_size: 20,
    page_number:  1,
    total: 0,
    data: [],
    keyword: undefined,
    start_date: undefined,
    end_date: undefined,
  },
};

export const customersReducer = createReducer<CustomerListReducerType>(defaultState, {
  [ActionType.GET_CUSTOMERS_REQUEST](state: CustomerListReducerType, action: pureAction<undefined>) {
    return {
      ...state,
      loading: true,
    };
  },

  [ActionType.GET_CUSTOMERS_ERROR](state: CustomerListReducerType, action: pureAction<ErrorModel>) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [ActionType.GET_CUSTOMERS_SUCCESS](
    state: CustomerListReducerType,
    action: pureAction<PaginationOutputModel<CustomerOutputModel[]>>
  ) {
    return {
      ...state,
      loading: false,
      listing: {
        ...action.payload,
      },
    };
  },
});
