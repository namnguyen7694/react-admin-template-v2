import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import configureStore from "./app/store/index";
import { Provider } from "react-redux";
import { Route, BrowserRouter } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";
/* styles */
import "./assets/styles/index.scss";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { firebaseConfig } from "constants/firebase";
const store = configureStore();

ReactDOM.render(
  <FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
    <Provider store={store}>
      <BrowserRouter>
        <Route path="/" component={App} />
      </BrowserRouter>
    </Provider>
  </FirebaseAuthProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
