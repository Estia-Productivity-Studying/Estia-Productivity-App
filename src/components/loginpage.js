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
import {leaveSplash} from '../index';
import Estialogo from "../assets/Estialogo.png"

import axios from 'axios';

function handleClick(event) {
  console.info("You clicked a breadcrumb.");
}

function handleSkip(event) {
  leaveSplash();
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

export default function LoginPage() {
  const classes = useStyles();

  let login = () => {
    console.log("hey");
    // fetch("http://localhost:8080/login", {
    //   // credentials: 'include',
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: {
    //     "username": "ismael",
    //     "password": "ismael"
    //   }
    // })
    // .then(response => handleSkip)
    // .catch(error => handleSkip);

    let body = {'username': 'ismael', 'password': 'ismael'}
  
    axios.post('http://localhost:8080/student/login', body)
      .then(res => {console.log("login successful")})
      .catch(error => console.log("WTF:" + error));
    // axios.get("http://localhost:8080/student/test").then(res => console.log("success")).catch(error => console.log(error));
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
            />
            <FormControlLabel
              control={<CssCheckbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              id="button"
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={login}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link id="login-link" href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item xs>
                <Link id="login-link" href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>

              <Link
                id="login-link"
                variant="body2"
                color="secondary"
                onClick={handleSkip}
              >
                CLICK HERE TO SKIP
              </Link>
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