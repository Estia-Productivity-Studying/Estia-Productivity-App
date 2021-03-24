import React from "react";
import "./css/notepad.css";

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
      <div>
        <h1 id="header">Notepad</h1>
        <div id="wrap">
          <textarea id="inputTextToSave" cols="1000" rows="30"></textarea>
        </div>
        <h3 id="input-header">Filename to Save As: </h3>
        <input id="inputFileNameToSaveAs" />
        <br />
        <button id="button" onClick={this.saveTextAsFile}>
          Save Text to File
        </button>
        <br />
        <br />
        <h3 id="input-header">Select a File to Load: </h3>
        <input id="file-load" type="file" id="fileToLoad" />
        <br />
        <br />
        <button id="button" onClick={this.loadFileAsText}>
          Load Selected File
        </button>
      </div>
    );
  }
}

function NotepadPage() {
  return (
    <div id="notepad-page">
      <Notepad />
    </div>
  );
}

export default NotepadPage;
