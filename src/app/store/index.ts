import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import createSagaMiddleware from "redux-saga";
// import loggerMiddleware from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { rootReducer } from "./config/rootReducer";
import rootSaga from "./config/rootSaga";

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  let middlewares;
  if (process.env.NODE_ENV === "development") {
    middlewares = [thunkMiddleware, sagaMiddleware];
  } else if (process.env.NODE_ENV === "production") {
    middlewares = [thunkMiddleware, sagaMiddleware];
  }
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const store = createStore(rootReducer, composeWithDevTools(middlewareEnhancer));
  sagaMiddleware.run(rootSaga);
  return store;
}
