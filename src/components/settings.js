import React from "react";
import "./css/settings.css";

class BlacklistedTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blacklistedWebsites: [
        //Get blacklisted websites from database
        { id: "Instagram", URL: "http://instagram.com" },
        { id: "Twitter", URL: "http://twitter.com" },
        { id: "Youtube", URL: "http://youtube.com" },
      ],
    };
  }

  renderTableData() {
    return this.state.blacklistedWebsites.map((blacklistedWebsite, index) => {
      const { id, URL } = blacklistedWebsite; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{URL}</td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = Object.keys(this.state.blacklistedWebsites[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    return (
      <div>
        <h3 id="table-title">Blacklisted Websites:</h3>
        <table id="blacklisted-websites">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
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
    if (window.confirm("Are you sure you want to delete your account?")) {
      //Delete all account info from database and sign out.
    }
    event.preventDefault();
  }

  render() {
    return (
      <form id="settings-form" onSubmit={this.handleSubmit}>
        <h3>Study Timer Settings:</h3>
        <label>
          Study Timer Length:
          <input
            id="settings-input"
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
            id="settings-input"
            name="breakTimerLength"
            type="number"
            value={this.state.breakTimerLength}
            onChange={this.handleInputChange}
            min="0"
          />
        </label>
        <br />
        <BlacklistedTable />
        <h3>Blacklisted Website Settings:</h3>
        <label>
          Add Blacklisted Website:
          <br />
          <label>Website Name:</label>
          <input
            id="settings-input"
            name="addBlacklistedWebsiteID"
            type="text"
            placeholder="Ex: Instagram"
            value={this.state.addBlacklistedWebsiteID}
            onChange={this.handleInputChange}
          />
          <br />
          <label>Website URL:</label>
          <input
            id="settings-input"
            name="addBlacklistedWebsiteURL"
            type="url"
            placeholder="Ex: https://www.instagram.com/"
            value={this.state.addBlacklistedWebsiteURL}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <button id="button" type="button" onClick={this.handleAddWebsite}>
          Add Website
        </button>
        <br />
        <label>
          Remove Blacklisted Website:
          <br />
          <label>Website Name:</label>
          <input
            id="settings-input"
            name="removeBlacklistedWebsite"
            type="text"
            placeholder="Ex: Instagram"
            value={this.state.removeBlacklistedWebsite}
            onChange={this.handleInputChange}
          />
          <br />
        </label>
        <button id="button" type="button" onClick={this.handleRemoveWebsite}>
          Remove Website
        </button>
        <h3>Music Stream Settings:</h3>
        <label>
          Youtube Music Stream Link:
          <input
            id="settings-input"
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
            id="settings-input"
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
            id="settings-input"
            name="password"
            type="password"
            placeholder="New Password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <br />
        </label>
        <button id="button" type="button" onClick={this.handleDeleteAccount}>
          Delete Account
        </button>
        <br />
        <br />
        <input id="button" type="submit" value="Save Changes" />
      </form>
    );
  }
}

function SettingsPage() {
  return (
    <div>
      <SettingsForm />
    </div>
  );
}

export default SettingsPage;
