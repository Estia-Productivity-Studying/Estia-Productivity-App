import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from "@material-ui/core/Checkbox";
import Link from '@material-ui/core/Link';
import {positions} from '@material-ui/system';
import {borders} from '@material-ui/system'
import { CenterFocusStrong } from '@material-ui/icons';

function handleClick(event) {
  console.info("You clicked a breadcrumb.");
}

const StyledSignButton = withStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 56,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  label: {
    textTransform: 'capitalize',
  },
  positions: {
    bottom: 10,
    right: 50,
  },
})(Button);

const UserNameBox =(TextField);

function LoginPage() {
  return (
    <div>
      <form className={UserNameBox} noValidate autoComplete="off">
        <TextField id="Username" label="Username" variant="filled"/>
        <TextField id="Password" label="Password" variant="filled"/>
      </form>

      <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
      />

      <StyledSignButton variant="contained" color="primary">
        Sign In
      </StyledSignButton>


      <StyledSignButton variant="contained" color="primary" href="/landingpage" onClick={handleClick}>
        (Login WIP) -Skip-
      </StyledSignButton>
      </div>
  );
}


export default LoginPage;