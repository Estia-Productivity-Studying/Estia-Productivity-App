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
        </div>
        );
}

export default MusicPage;
