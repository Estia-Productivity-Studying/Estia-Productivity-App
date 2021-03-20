import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

function handleClick(event) {
  console.info("You clicked a breadcrumb.");
}

class SettingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Get current settings from database
      studyTimerLength: 60,
      breakTimerLength: 15,
      addBlacklistedWebsiteID: "",
      addBlacklistedWebsiteURL: "",
      removeBlacklistedWebsite: "",
      youtubeLink: "",
      username: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    //Handles when the user wants to save all changes made to the settings.
    //Send all updated settings to the database
    alert("Timer Settings Saved");
    event.preventDefault();
  }

  handleAddWebsite(event) {
    //Add website info to database with addBlacklistedWebsiteID as the key for addBlacklistedWebsiteURL
    //Update display table
    alert("Website Added");
    event.preventDefault();
  }

  handleRemoveWebsite(event) {
    //Remove website info from database based on the id given in removeBlacklistedWebsite
    //Update display table
    alert("Website Removed");
    event.preventDefault();
  }

  handleDeleteAccount(event) {
    alert("Are you sure you want to delete your account?");
    //Create prompt to ensure they want to delete their account, if confirmed, delete all account information and remove from database
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Study Timer Settings:</h3>
        <label>
          Study Timer Length:
          <input
            name="studyTimerLength"
            type="number"
            value={this.state.studyTimerLength}
            onChange={this.handleInputChange}
            min="0"
          />
        </label>
        <br />
        <label>
          Break Timer Length:
          <input
            name="breakTimerLength"
            type="number"
            value={this.state.breakTimerLength}
            onChange={this.handleInputChange}
            min="0"
          />
        </label>
        <br />
        <h3>Blacklisted Website Settings:</h3>
        <label>
          Add Blacklisted Website:
          <br />
          <label>Website Name:</label>
          <input
            name="addBlacklistedWebsiteID"
            type="text"
            placeholder="Ex: Instagram"
            value={this.state.addBlacklistedWebsiteID}
            onChange={this.handleInputChange}
          />
          <br />
          <label>Website URL:</label>
          <input
            name="addBlacklistedWebsiteURL"
            type="url"
            placeholder="Ex: https://www.instagram.com/"
            value={this.state.addBlacklistedWebsiteURL}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <button type="button" onClick={this.handleAddWebsite}>
          Add Website
        </button>
        <br />
        <label>
          Remove Blacklisted Website:
          <br />
          <label>Website Name:</label>
          <input
            name="removeBlacklistedWebsite"
            type="text"
            placeholder="Ex: Instagram"
            value={this.state.removeBlacklistedWebsite}
            onChange={this.handleInputChange}
          />
          <br />
        </label>
        <button type="button" onClick={this.handleRemoveWebsite}>
          Remove Website
        </button>
        <h3>Music Stream Settings:</h3>
        <label>
          Youtube Music Stream Link:
          <input
            name="youtubeLink"
            type="url"
            placeholder="Ex: https://www.youtube.com"
            value={this.state.youtubeLink}
            onChange={this.handleInputChange}
          />
          <br />
        </label>
        <h3>Account Settings:</h3>
        <label>
          Change Username:
          <input
            name="username"
            type="text"
            placeholder="New Username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <br />
        </label>
        <label>
          Change Password:
          <input
            name="password"
            type="password"
            placeholder="New Password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <br />
        </label>
        <button type="button" onClick={this.handleDeleteAccount}>
          Delete Account
        </button>
        <br />
        <br />
        <input type="submit" value="Save Changes" />
      </form>
    );
  }
}

function SettingsPage() {
  return (
    <div>
      <Typography variant="h6" component="h6">
        Settings:
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
          Login
        </Link>
        <Link color="inherit" href="/landingpage" onClick={handleClick}>
          Main Menu
        </Link>
        <Link color="inherit" href="/timer" onClick={handleClick}>
          Timer
        </Link>
        <Link color="inherit" href="/browser" onClick={handleClick}>
          Browser
        </Link>
        <Link color="inherit" href="/notepad" onClick={handleClick}>
          Notepad
        </Link>
        <Link color="inherit" href="/calendar" onClick={handleClick}>
          Calendar
        </Link>
        <Link color="inherit" href="/music" onClick={handleClick}>
          Music
        </Link>
        <Link color="inherit" href="/settings" onClick={handleClick}>
          Settings
        </Link>
      </Breadcrumbs>
      <SettingsForm />
    </div>
  );
}

export default SettingsPage;
