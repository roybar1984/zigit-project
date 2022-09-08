import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";
// import { createStore } from "redux";

// let store = createStore(reducer)

//ACTION HANDLE_CHANGE
// const handleChange = () => {
//   return {
//     type: "HANDLE_CHANGE",
//   };
// };

// //REDUCER

// const inputChange = (state = "", action) => {
//   switch(action.type) {
//     case "HANDLE_CHANGE":
//       return
//   }
// }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Provider> */}
      <App />
      {/* </Provider> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
