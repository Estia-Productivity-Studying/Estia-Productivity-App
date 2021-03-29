import React from "react";
import "./css/mainMenu.css";

class Menu extends React.Component {
  render() {
    return(
      <div>
        <div class="split left">
          <div class="centered">
          <img src="../temporary_image/folders.jpg" alt="Folders"/>
          <h2>Folders side</h2>
          <p>Some text.</p>
          </div>
        </div>
    
        <div class="split right">
          <div class="centered">
          <img src="img_avatar.png" alt="MiniCalendar"/>
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