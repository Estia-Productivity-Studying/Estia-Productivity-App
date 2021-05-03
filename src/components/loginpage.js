import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Container from "@material-ui/core/Container";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import "./css/loginpage.css";

import { leaveSplash } from "../index";
import Estialogo from "../assets/Estialogo.png";
import { updateBlacklist } from "./browser";
const smalltalk = require('smalltalk');

import axios from "axios";

let username = "";
let password = "";
let jwt = "";

function handleClick(event) {
  console.info("You clicked a breadcrumb.");
}

function handleSkip(event) {
  // leaveSplash();
}

const CssCheckbox = withStyles({
  root: {
    color: "#3eb489",
    "&$checked": {
      color: "#3eb489",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const CssTextField = withStyles({
  root: {
    backgroundColor: "#303030",
    color: "#3eb489",
    "& label.Mui-focused": {
      color: "#3eb489",
    },
    "& label": {
      color: "#3eb489",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#3eb489",
        borderWidth: 3,
      },
      "&:hover fieldset": {
        borderColor: "#3eb489",
        borderWidth: 3,
      },
      "&.Mui-focused fieldset": {
        borderColor: "#3eb489",
        borderWidth: 3,
      },
    },
    "& .MuiInputBase-root": {
      color: "#3eb489",
    },
  },
})(TextField);

function Copyright() {
  return (
    <Typography variant="body2" color="#3eb489" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Estia
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#3eb489",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginPage(props) {
  const classes = useStyles();

  let signup = () => {
    axios
      .post("http://localhost:8080/student/signup", {
        username: username,
        password: password,
      })
      .then(function (response) {
        smalltalk
          .alert("Signup successful!", "Welcome " + username + "!")
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let signin = () => {
    axios
      .post("http://localhost:8080/student/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log(response.data.jwt);
        localStorage.setItem("jwt", response.data.jwt);
        props.data2ToLogin(true);
        localStorage.setItem("studentId", response.data.student.id);
        // if (response.data.student.blacklistedSites == "") {
        //   localStorage.setItem("blacklist", [
        //     { id: "Instagram", URL: "http://instagram.com" },
        //     { id: "Twitter", URL: "http://twitter.com" },
        //     { id: "Youtube", URL: "http://youtube.com" },
        //   ]);
        // } else {
        //   alert("not null");
        //   localStorage.setItem("blacklist", [
        //     response.data.student.blacklistedSites,
        //   ]);
        // }
        // leaveSplash();
        var databaseBlacklist = response.data.student.blacklistedSites
        var blacklist = []
        for (var i = 0; i < databaseBlacklist.length; i++) {
          blacklist.push(databaseBlacklist[i].id, databaseBlacklist[i].website);
        }
        localStorage.setItem("blacklist", JSON.stringify(blacklist))

        var databaseCalendar = response.data.student.calendarEvents
        var calendar = []
        for (var i = 0; i < databaseCalendar.length; i++) {
          calendar.push([]);
          calendar[i].push(databaseCalendar[i].id, 
                        databaseCalendar[i].title, 
                        databaseCalendar[i].timeStart, 
                        databaseCalendar[i].timeEnd,
                        databaseCalendar[i].note);
        }
        localStorage.setItem("calendar", JSON.stringify(calendar))

      })
      .catch(function (error) {
        console.log(error);
        smalltalk
          .alert("ERROR:", "Invalid Username or Password")
      });
  };

  function usernameChange(event) {
    username = event.target.value;
  }

  function passwordChange(event) {
    password = event.target.value;
  }

  return (
    <div id="login-page">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon style={{ color: "#121212" }} />
          </Avatar>
          <div id="login-header">Estia</div>
          <form className={classes.form} noValidate>
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username/TTU Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={usernameChange}
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={passwordChange}
            />
            <FormControlLabel
              control={<CssCheckbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              id="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={signin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Button id="login-link" href="#" variant="body2">
                  <text>Forgot Password?</text>
                </Button>
              </Grid>
              <Grid item xs>
                <Button id="login-link" variant="body2" onClick={signup}>
                  <text>Sign Up</text>
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
