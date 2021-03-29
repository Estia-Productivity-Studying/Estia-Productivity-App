import React from "react";
import "./css/mainMenu.css";
import events from './events'

class Menu extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = { events }
  }

  render() {
    return(
      <div class="split right">
          <div class="centered">
          <h2>Mini Calendar</h2>
          <p>Only shows next week or 2</p>
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