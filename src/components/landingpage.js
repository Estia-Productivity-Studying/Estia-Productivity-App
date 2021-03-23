import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

function handleClick(event) {
  console.info('You clicked a breadcrumb.');
}

function LandingPage() {
    return (
        <div>
          <Typography variant="h6" component="h6">
              Main Menu_Landing Page:
          </Typography>
        </div>
    );
}

export default LandingPage;
