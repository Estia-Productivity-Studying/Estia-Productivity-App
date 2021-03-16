import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

function handleClick(event) {
  console.info('You clicked a breadcrumb.');
}

function CalendarPage() {
  return (
    <button>calendar</button>
  );
}

export default CalendarPage;
