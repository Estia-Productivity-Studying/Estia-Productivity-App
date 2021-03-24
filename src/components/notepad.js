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
    if (document.getElementById("fileToLoad").files.length !== 0) {
      fileReader.onload = function (fileLoadedEvent) {
        var textFromFileLoaded = fileLoadedEvent.target.result;
        document.getElementById("inputTextToSave").value = textFromFileLoaded;
      };
      fileReader.readAsText(fileToLoad, "UTF-8");
    } else {
      alert("Please Select a File.");
    }
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
      <Notepad />
    </div>
  );
}

export default NotepadPage;
