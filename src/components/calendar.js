import React from 'react'
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import events from './events'
import ExampleControlSlot from './ExampleControlSlot'
import moment from 'moment';

import "../App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

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
      })
      .catch(() => {
          console.log('error with smalltalk in calendar.js');
      });      
  }

  render() {
    return (
      <>
        <ExampleControlSlot.Entry waitForOutlet>
          <strong>
            Click an event to see more info, or drag the mouse over the calendar
            to select a date/time range.
          </strong>
        </ExampleControlSlot.Entry>
        <Calendar
          selectable
          localizer={localizer}
          events={this.state.events}
          defaultView={'week'}
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
        />
      </>
    )
  }
}

CalendarPage.propTypes = propTypes

export default CalendarPage