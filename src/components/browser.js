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
import { withWidth } from '@material-ui/core';

// Function to handle clicks on breadcrumbs
function handleClick(event) {
    console.info('You clicked a breadcrumb.');
}

class BrowserWindow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //Get current settings from database
            //placeholder data, should get replaced by backend
            blacklist: ["twitter.com"]
        };
    }

    //getter to get blacklist
    getBlacklist() {
        return this.state.blacklist
    }
    
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
        //checks if key pressed is enter, if so checks for valid url that's not in blacklist
        //if everything looks goo then loads the url with webview
        if (event.key === 'Enter'){
            if (validator.isURL("http://" + event.target.value) && !this.getBlacklist().includes(event.target.value)){
                const webview = document.querySelector('webview')
                webview.loadURL("http://" + event.target.value)
                event.target.placeholder = ""
            }
            else if (validator.isURL(event.target.value) && !this.getBlacklist().includes(event.target.value)){
                const webview = document.querySelector('webview')
                webview.loadURL(event.target.value)
                event.target.placeholder = ""
            }
            else{
                event.target.value = ""
                event.target.placeholder = "invalid url"
            }
        }
    }

    render() {
        return (
        <div style={{ display: 'flex', flex: 9.5, flexFlow: 'column', }}>
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
                onKeyDown={this.load_url.bind(this)} 
                id="url" 
                label="url" 
                variant="outlined" />
            </div>
            {/* Build in browser, uses webview from Electron */}
            <webview id="foo" src="https://www.google.com/" style={{ flex: '9.9', width:"device-width", height:1000 }}></webview>
        </div>
        );
      }
    }


function BrowserPage() {
    return (
        <BrowserWindow />
    );
}

export default BrowserPage;
