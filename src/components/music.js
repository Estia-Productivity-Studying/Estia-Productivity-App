import React from "react";
import "./css/music.css";

function YoutubeEmbed() {
  return (
    <iframe
      style={{ flex: "1" }}
      src={`https://www.youtube.com/embed/${
        localStorage.getItem("embedId") === null ||
        localStorage.getItem("embedId") === ""
          ? "5qap5aO4i9A"
          : localStorage.getItem("embedId")
      }`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  );
}

class MusicPage extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", height: "100%" }}>
        <YoutubeEmbed />
      </div>
    );
  }
}

export default MusicPage;
