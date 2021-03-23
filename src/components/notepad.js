import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

function handleClick(event) {
  console.info("You clicked a breadcrumb.");
}

class Notepad extends React.Component {
  saveTextAsFile() {
    var textToSave = document.getElementById("inputTextToSave").value;
    var textToSaveAsBlob = new Blob([textToSave], { type: "text/plain" });
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs")
      .value;
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  loadFileAsText() {
    var fileToLoad = document.getElementById("fileToLoad").files[0];
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      var textFromFileLoaded = fileLoadedEvent.target.result;
      document.getElementById("inputTextToSave").value = textFromFileLoaded;
    };
    fileReader.readAsText(fileToLoad, "UTF-8");
  }

  render() {
    return (
      <table>
        <tr>
          <h3>Notepad:</h3>
        </tr>
        <tr>
          <td colspan="3">
            <textarea id="inputTextToSave" cols="80" rows="25"></textarea>
          </td>
        </tr>
        <tr>
          <td>Filename to Save As:</td>
          <td>
            <input id="inputFileNameToSaveAs"></input>
          </td>
          <td>
            <button onClick={this.saveTextAsFile}>Save Text to File</button>
          </td>
        </tr>
        <tr>
          <td>Select a File to Load:</td>
          <td>
            <input type="file" id="fileToLoad" />
          </td>
          <td>
            <button onClick={this.loadFileAsText}>Load Selected File</button>
          </td>
        </tr>
      </table>
    );
  }
}

function NotepadPage() {
  return (
    <div>
      <Typography variant="h6" component="h6">
        Notepad:
      </Typography>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/" onClick={handleClick}>
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
      <Notepad />
    </div>
  );
}

export default NotepadPage;
