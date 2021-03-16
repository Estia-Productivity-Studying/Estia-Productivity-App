import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

function handleClick(event) {
  console.info('You clicked a breadcrumb.');
}

function SettingsPage() {
    return (
        <div>
        <Typography variant="h6" component="h6">
            Settings:
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
        </div>
        );
}

export default SettingsPage;
