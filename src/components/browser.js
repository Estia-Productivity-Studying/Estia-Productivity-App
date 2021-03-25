import React, { Fragment } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import RefreshIcon from "@material-ui/icons/Refresh";
import AddIcon from "@material-ui/icons/Add";
import Input from "@material-ui/core/Input";
import validator from "validator";
import { makeStyles, AppBar, Tabs, Tab, Paper, Box } from "@material-ui/core";
import { PostAdd } from "@material-ui/icons";
import "./css/browser.css";

// Function to handle clicks on breadcrumbs
function handleClick(event) {
  console.info("You clicked a breadcrumb.");
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
}));

let maxTabIndex = 0;
let currentTablIndex = 0;

function TabPanel(props) {
  const { children, tabId } = props;
  return (
    <Box
      value={maxTabIndex}
      index={maxTabIndex}
      hidden={tabId !== currentTablIndex}
      key={maxTabIndex}
    >
      {children}
    </Box>
  );
}

function Pipeline(props) {
  const classes = useStyles();

  // Handle Tab Button Click
  const [tabId, setTabId] = React.useState(0);
  const handleTabChange = (event, newTabId) => {
    if (newTabId === "tabProperties") {
      handleAddTab();
    } else {
      currentTablIndex = newTabId;
      setTabId(newTabId);
    }
  };

  // Handle Add Tab Button
  const [tabs, setAddTab] = React.useState([]);
  const handleAddTab = () => {
    maxTabIndex = maxTabIndex + 1;
    setAddTab([
      ...tabs,
      <Tab label={`New Tab ${maxTabIndex}`} key={maxTabIndex} />,
    ]);
    handleTabsContent();
  };

  // Handle Add Tab Content
  const [tabsContent, setTabsContent] = React.useState([<BrowserWindow />]);
  const handleTabsContent = () => {
    setTabsContent([<BrowserWindow />]);
  };

  return (
    <Paper className={classes.root}>
      <AppBar position="static" color="inherit">
        <Tabs
          value={tabId}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="on"
        >
          <Tab label="Default" />
          {tabs.map((child) => child)}
          <Tab icon={<PostAdd />} value="tabProperties" />
        </Tabs>
      </AppBar>
      <Box padding={2}>{tabsContent.map((child) => child)}</Box>
    </Paper>
  );
}

class BrowserWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Get current settings from database
      //placeholder data, should get replaced by backend
      blacklist: ["twitter.com"],
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
    //checks if key pressed is enter, if so checks for valid url that's not in blacklist
    //if everything looks goo then loads the url with webview
    if (event.key === "Enter") {
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
        event.target.placeholder = "invalid url";
      }
    }
  }

  render() {
    return (
      <div style={{ display: "flex", flex: 9.5, flexFlow: "column" }}>
        {/* Div for browser control buttons */}
        <div id="web-bar" style={{ flex: "0.1" }}>
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
          <IconButton
            variant="outlined"
            size="small"
            onClick={this.newTabHandler}
          >
            <AddIcon style={{ color: "#3eb489" }}></AddIcon>
          </IconButton>
        </div>
        {/* Build in browser, uses webview from Electron */}
        <webview
          id="foo"
          src="https://www.google.com/"
          style={{ flex: "9.9", width: "device-width", height: 1000 }}
        ></webview>
      </div>
    );
  }
}

function BrowserPage() {
  return (
    <div>
      <Pipeline />
    </div>
  );
}

export default BrowserPage;
