import React from "react";
import "./css/settings.css";
import axios from "axios";
import { Paper } from "material-ui";
const smalltalk = require("smalltalk");

const headers = {
  Authorization: "Bearer " + localStorage.getItem("jwt"),
};

function youtube_parser(url) {
  if (url !== "") {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  } else {
    return "";
  }
}

class SettingsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Get current settings from database
      studyTimerLength: 60,
      breakTimerLength: 15,
      addBlacklistedWebsiteURL: "",
      removeBlacklistedWebsite: "",
      youtubeLink: "",
      username: "",
      password: "",
      blacklist: [],
    };
    this.count = 0;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddWebsite = this.handleAddWebsite.bind(this);
    this.handleRemoveWebsite = this.handleRemoveWebsite.bind(this);
    this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
    this.updateBlacklist = this.updateBlacklist.bind(this);
    this.createTableData = this.createTableData.bind(this);
  }

  updateBlacklist = () => {
    let blacklistArray = JSON.parse(localStorage.getItem("blacklist"));
    if (blacklistArray != null) {
      for (let i = 0; i < blacklistArray.length; i += 1) {
        this.state.blacklist.push(blacklistArray[i]);
      }
    } else {
      blacklistArray = ["empty", "empty"];
    }
  };

  createTableData() {
    this.updateBlacklist();
    if (this.count == 0) {
      let data = "<table><thead><td>ID</td><td>URL</td></thead>";
      for (let i = 0; i < this.state.blacklist.length; i += 2) {
        data += `<tr class="rows"><td>${this.state.blacklist[i]}</td>`;
        data += `<td>${this.state.blacklist[i + 1]}</td>`;
        data += "</tr>";
      }
      data += "</table>";
      if (document.getElementById("container") != null) {
        document.getElementById("container").innerHTML = data;
        this.count = 1;
      }
    }
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
    localStorage.setItem("studylength", this.state.studyTimerLength);
    localStorage.setItem("breaklength", this.state.breakTimerLength);
    let embedId = youtube_parser(this.state.youtubeLink);
    localStorage.setItem("embedId", embedId);
    this.setState({ youtubeLink: "" });
    smalltalk.alert("Success", "All Changes Submitted");
    event.preventDefault();
  }

  handleAddWebsite = (event) => {
    //Add website info to database with addBlacklistedWebsiteID as the key for addBlacklistedWebsiteURL
    //Update display table
    if (this.state.addBlacklistedWebsiteURL === "") {
      smalltalk.alert("", "Please Enter a URL");
    } else {
      axios
        .post(
          "http://localhost:8080/blacklist/add",
          {
            studentId: localStorage.getItem("studentId"),
            website: this.state.addBlacklistedWebsiteURL,
          },
          { headers: headers }
        )
        .then((response) => {
          this.setState({ addBlacklistedWebsiteURL: "" });
          smalltalk.alert("", "Website Added");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    event.preventDefault();
  };

  handleRemoveWebsite(event) {
    //Remove website info from database based on the id given in removeBlacklistedWebsite
    //Update display table
    if (this.state.removeBlacklistedWebsite === "") {
      smalltalk.alert("", "Please Enter a ID");
    } else {
      console.log(localStorage.getItem("studentId"));
      console.log(this.state.removeBlacklistedWebsite);
      axios
        .delete("http://localhost:8080/blacklist/delete", {
          headers: headers,
          data: {
            siteId: parseInt(this.state.removeBlacklistedWebsite),
            studentId: localStorage.getItem("studentId"),
          },
        })
        .then((response) => {
          this.setState({ removeBlacklistedWebsite: "" });
          smalltalk.alert("", "Website Removed");
          var databaseBlacklist = response.data.blacklistedSites;
          var blacklist = [];
          for (var i = 0; i < databaseBlacklist.length; i++) {
            blacklist.push(
              databaseBlacklist[i].id,
              databaseBlacklist[i].website
            );
          }
          localStorage.setItem("blacklist", JSON.stringify(blacklist));
          this.count = 0;
          this.createTableData();
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
        <h3 id="table-title">Blacklisted Websites:</h3>
        <div id="container"></div>
        {this.createTableData()}
        <h3>Blacklisted Website Settings:</h3>
        <label>
          Add Blacklisted Website:
          <br />
          {/* <label>Website Name:</label>
          <input
            id="settings-input"
            name="addBlacklistedWebsiteID"
            type="text"
            placeholder="Ex: Instagram"
            value={this.state.addBlacklistedWebsiteID}
            onChange={this.handleInputChange}
          />
          <br /> */}
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
          <label>Website ID:</label>
          <input
            id="settings-input"
            name="removeBlacklistedWebsite"
            type="text"
            placeholder="Ex: 3"
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
        {/* <h3>Account Settings:</h3>
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
        </button> */}
        <br />
        <br />
        <input
          id="button"
          type="button"
          value="Save Changes"
          onClick={this.handleSubmit}
        />
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
