/* Browser - Tristan Lucero */
import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import RefreshIcon from "@material-ui/icons/Refresh";
import Input from "@material-ui/core/Input";
import validator from "validator";
import { withWidth } from "@material-ui/core";
import "./css/browser.css";

// Function to handle clicks on breadcrumbs
function handleClick(event) {
  console.info("You clicked a breadcrumb.");
}

class BrowserWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //blacklist, gets updated from database
      blacklist: [],
    };
  }

  //getter to get blacklist
  getBlacklist() {
    return this.state.blacklist;
  }

  // Functions to handle clicks for web pages, back, forward, and reload
  page_back(event) {
    const webview = document.querySelector("webview");
    webview.goBack();
  }

  page_forward(event) {
    const webview = document.querySelector("webview");
    webview.goForward();
  }

  page_reload(event) {
    const webview = document.querySelector("webview");
    webview.reload();
  }

  // function to handle you press enter on the search bar
  load_url(event) {
    this.updateBlacklist()
    console.log(event.target.value)
    console.log(this.getBlacklist())
    //checks if key pressed is enter, if so checks for valid url that's not in blacklist
    //if everything looks goo then loads the url with webview
    if (event.key === "Enter") {
      if (localStorage.getItem('timer') == "Break Timer" ||
        localStorage.getItem('timer') == "pause" &&
        validator.isURL("http://" + event.target.value)
        ) {
        const webview = document.querySelector("webview");
        webview.loadURL("http://" + event.target.value);
        event.target.placeholder = "";
      }
      else if (localStorage.getItem('timer') == "Study Timer"){
        if (
          validator.isURL("http://" + event.target.value) &&
          !this.getBlacklist().includes(event.target.value)
        ) {
          const webview = document.querySelector("webview");
          webview.loadURL("http://" + event.target.value);
          event.target.placeholder = "";
        } else if (
          validator.isURL(event.target.value) &&
          !this.getBlacklist().includes(event.target.value)
        ) {
          const webview = document.querySelector("webview");
          webview.loadURL(event.target.value);
          event.target.placeholder = "";
        } else {
          event.target.value = "";
          event.target.placeholder = "invalid url or blacklisted";
        }
      }
      else{  
        event.target.value = "";
        event.target.placeholder = "invalid url";
      }
    } 
  }

  updateBlacklist=()=>{
    this.setState({ blacklist: localStorage.getItem('blacklist') })
  }

  render() {
    return (
      <div style={{ display: 'flex', 'flex-direction': 'column', height: '100%' }}>
        {/* Div for browser control buttons */}
        <div style={{ flex: "0.1" }}>
          <IconButton variant="outlined" size="small" onClick={this.page_back}>
            <ArrowBackIosIcon style={{ color: "#3eb489" }}></ArrowBackIosIcon>
          </IconButton>
          <IconButton
            variant="outlined"
            size="small"
            onClick={this.page_forward}
          >
            <ArrowForwardIosIcon
              style={{ color: "#3eb489" }}
            ></ArrowForwardIosIcon>
          </IconButton>
          <IconButton
            variant="outlined"
            size="small"
            onClick={this.page_reload}
          >
            <RefreshIcon style={{ color: "#3eb489" }}></RefreshIcon>
          </IconButton>
          {/* This is for the browser search bar */}
          <Input
            onKeyDown={this.load_url.bind(this)}
            id="url"
            label="url"
            variant="outlined"
            type="search"
          />
        </div>
        {/* Build in browser, uses webview from Electron */}
        <webview
          id="foo"
          src="https://www.google.com/"
          style={{ flex: '9.9', 'background-color': 'black' }}
        ></webview>
      </div>
    );
  }
}

function BrowserPage() {
  return <BrowserWindow />;
}

export default BrowserPage;
