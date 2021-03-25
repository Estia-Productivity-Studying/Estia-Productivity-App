import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Calendar from 'react-calendar'
import { makeStyles } from '@material-ui/core/styles';
import 'react-calendar/dist/Calendar.css';



const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function CalendarPage() {
    const classes = useStyles();
    return (
        <div className={classes.paper}>
            <Typography variant="h6" component="h6">
                Calendar Page:
            </Typography>
            <Calendar/>
        </div>
    );
}
