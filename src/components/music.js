import React from "react";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

//Get Embed id from database
const embedId = "5qap5aO4i9A";

const YoutubeEmbed = ({ embedId }) => (
  <div className="video-responsive">
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

function handleClick(event) {
  console.info("You clicked a breadcrumb.");
}

function MusicPage() {
    return (
        <div>
          <Typography variant="h6" component="h6">
              Music:
          </Typography>
          <YoutubeEmbed embedId={embedId} />
        </div>
        );
}

export default MusicPage;
