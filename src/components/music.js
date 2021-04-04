import React from "react";
import "./css/music.css";

//Get Embed id from database
const embedId = "5qap5aO4i9A";

const YoutubeEmbed = ({ embedId }) => (
    <iframe
      style={{ flex: '1' }}
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
);

function MusicPage() {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <YoutubeEmbed embedId={embedId} />
    </div>
  );
}

export default MusicPage;