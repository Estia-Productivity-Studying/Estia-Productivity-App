import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { createStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { useMemo } from "react";

import LoginPage from "./components/loginpage";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: "#121212",
    height: "5px",
  },
  tabsWrapper: {
    background: "#3eb489",
  },
}));

const splashScreen=()=>{
    return (
      <Router>
      <Route exact path='/' component={LoginPage}/>
      </Router>
    )
  
  }

  export default splashScreen;