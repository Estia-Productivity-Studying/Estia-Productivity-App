import React from "react";
import ReactDOM from 'react-dom';
import "./css/mainMenu.css";
import events from './events'
import Link from "@material-ui/core/Link";
import Splash from "../Splash"


function handleClick(event) {
  ReactDOM.render(
    <React.StrictMode>
      <Splash />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

class Menu extends React.Component {

  render() {
    return(
      <div>
        <Link
          id="login-link"
          variant="body2"
          color="secondary"
          onClick={handleClick}
        >
          LOGOUT
        </Link>
        <div class="split right">
            <div class="centered">
            <h2>Mini Calendar</h2>
            <p>Only shows next week or 2</p>
            </div>
          </div> 
      </div>
    );
  }
}

function MainMenu() {
  return (
    <div id="mainMenu">
      <Menu />
    </div>
  );
}

export default MainMenu;