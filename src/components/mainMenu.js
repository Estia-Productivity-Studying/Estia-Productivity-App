import React from "react";
import ReactDOM from "react-dom";
import "./css/mainMenu.css";
import events from "./events";
import Link from "@material-ui/core/Link";
import Splash from "../Splash";

function handleClick(props) {
  // ReactDOM.render(
  //   <React.StrictMode>
  //     <Splash />
  //   </React.StrictMode>,
  //   document.getElementById('root')
  // );
  props.data2ToMenu(false);
  localStorage.clear();
}

class Menu extends React.Component {
  render() {
    return (
      <div class="Menu-page">
        <div class="Menu-header">Welcome to Estia!</div>

        <button
          id="button"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => handleClick(this.props)}
        >
          LOGOUT
        </button>
        {/* <div class="split right">
          <div class="centered">
            <h2>Mini Calendar</h2>
            <p>Only shows next week or 2</p>
          </div>
        </div> */}
      </div>
    );
  }
}

function MainMenu(props) {
  return (
    <div id="mainMenu">
      <Menu dataToMenu={props.dataToMenu} data2ToMenu={props.data2ToMenu} />
    </div>
  );
}

export default MainMenu;
