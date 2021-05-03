import React from 'react'
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import events from './events'
import ExampleControlSlot from './ExampleControlSlot'
import moment from 'moment';
import axios from "axios";

import "../App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const headers = {
  Authorization: "Bearer " + localStorage.getItem("jwt"),
};

const smalltalk = require('smalltalk');

const propTypes = {}
const localizer = momentLocalizer(moment);

class CalendarPage extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = { events }
  }

  handleSelect = ({ start, end }) => {
    const title = " "
    smalltalk
      .prompt('Event Name?', '')
      .then((value) => {
        const title = value
        this.setState({
          events: [
            ...this.state.events,
            {
              start,
              end,
              title,
            },
          ],
        })
        axios
        .post(
          "http://localhost:8080/calendar/add",
          {
            studentId: localStorage.getItem("studentId"),
            title: title,
            timeStart: (start.valueOf()/1000).toString(),
            timeEnd: (end.valueOf()/1000).toString(),
          },
          { headers: headers }
        )
        .then(function (response) {
          console.log("Website Added");
        })
        .catch(function (error) {
          console.log(error);
        });
      })
      .catch(() => {
          console.log('error with smalltalk in calendar.js');
      });      
  }

  delete_event(event) {
    smalltalk
      .confirm('Question', "Would you like to remove this event?")
      .then(() => {
        this.setState((prevState, props) => {
          const events = [...prevState.events]
          const idx = events.indexOf(event)
          events.splice(idx, 1);
          return { events };
        });
      })
      .catch(() => {
          console.log('ERROR: smalltalk failed on deleting event');
      });
  }
  
  render() {
    return (
      <div
        style={{ display: 'flex', height: '100%' }}
      >
        <Calendar
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView={'month'}
          onSelectEvent={event => this.delete_event(event)}
          onSelectSlot={this.handleSelect}
          style={{ flex: '1', 'background-color': 'white' }}
        />
      </div>
    )
  }
}

CalendarPage.propTypes = propTypes

export default CalendarPage