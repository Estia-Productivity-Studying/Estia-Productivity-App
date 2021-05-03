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
      <div>
        <Link
          id="login-link"
          variant="body2"
          color="secondary"
          onClick={() => handleClick(this.props)}
        >
          LOGOUT
        </Link>
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
