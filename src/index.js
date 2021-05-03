import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Splash from "./Splash";
import reportWebVitals from "./reportWebVitals";

//Launches the splash screen "loginpage.js" when app starts
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

//Called by "splash.js" to leave the splash screen and start rendering the tabs (Main menu, browser etc)
// export const leaveSplash=()=>{
//   ReactDOM.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//     document.getElementById('root')
//   );
// }

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
