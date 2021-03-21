/* Browser - Tristan Lucero */
import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import RefreshIcon from '@material-ui/icons/Refresh';
import Input from '@material-ui/core/Input';
import validator from 'validator'

function handleClick(event) {
    console.info('You clicked a breadcrumb.');
}

class BrowserWindow extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        //Get current settings from database
        blacklist: [],
      };
    }
      // Function to handle clicks on breadcrumbs
    
    // Functions to handle clicks for web pages, back, forward, and reload
    page_back(event){
        const webview = document.querySelector('webview')
        webview.goBack()
    }
    
    page_forward(event){
        const webview = document.querySelector('webview')
        webview.goForward()
    }
    
    page_reload(event){
        const webview = document.querySelector('webview')
        webview.reload()
    }
    
    // function to handle you press enter on the search bar
    load_url(event){
        if (event.key === 'Enter'){
            if (validator.isURL("http://" + event.target.value)){
                const webview = document.querySelector('webview')
                webview.loadURL("http://" + event.target.value)
            }
            else if (validator.isURL(event.target.value)){
                const webview = document.querySelector('webview')
                webview.loadURL(event.target.value)
            }
        }
    }

    render() {
        return (
        <div style={{ display: 'flex', flex: 9.5, 'flex-flow': 'column' }}>
            {/* Div for browser control buttons */}
            <div style={{ flex: '0.1' }}>
            <IconButton variant="outlined" size="small" onClick={ this.page_back }>
                <ArrowBackIosIcon></ArrowBackIosIcon>
            </IconButton>
            <IconButton variant="outlined" size="small" onClick={ this.page_forward }>
                <ArrowForwardIosIcon></ArrowForwardIosIcon>
            </IconButton>
            <IconButton variant="outlined" size="small" onClick={ this.page_reload }>
                <RefreshIcon></RefreshIcon>
            </IconButton>
            {/* This is for the browser search bar */}
            <Input 
                onKeyDown={ this.load_url } 
                id="url" 
                label="url" 
                variant="outlined" />
            </div>
            {/* Build in browser, uses webview from Electron */}
            <webview id="foo" src="https://www.google.com/" style={{ flex: '9.9' }}></webview>
        </div>
        );
      }
    }


function BrowserPage() {
    return (
            <div class='browserDiv' style={{ display: 'flex', 'flex-direction': 'column'}}>
                {/* Breadcrumbs div for the header */}
                <div style={{ flex: 0.5 }}>
                    <Typography variant="h6" component="h6">
                        Browser:
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
                <BrowserWindow/>
            </div>
            
        );
}

export default BrowserPage;
