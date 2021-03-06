import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import store from "./store";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import ServiceWorkerMessages from "./ServiceWorkerMessages";
import {
  successfulRegistration,
  updateAvailable,
} from "./slices/serviceWorkerRegistrationSlice";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ServiceWorkerMessages />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onSuccess: (registration) => {
    console.log("service worker registered");
    console.log("more logging");
    store.dispatch(successfulRegistration(registration));
  },
  onUpdate: (registration) => {
    console.log("service worker update");
    return store.dispatch(updateAvailable(registration));
  },
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
