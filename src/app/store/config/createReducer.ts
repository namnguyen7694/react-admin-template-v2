import { Reducer } from "redux";
import { pureAction } from "./actionTypes";

export default function createReducer<S>(initialState: S, handlers: any): Reducer<S> {
 
  const r = (state: S = initialState, action: pureAction<S>): S => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };

  return r as Reducer<S>;
}
