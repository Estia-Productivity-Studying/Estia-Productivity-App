import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

function handleClick(event) {
  console.info('You clicked a breadcrumb.');
}

function MusicPage() {
    return (
        <div>
        <Typography variant="h6" component="h6">
            Music:
        </Typography>
        </div>
        );
}

export default MusicPage;
