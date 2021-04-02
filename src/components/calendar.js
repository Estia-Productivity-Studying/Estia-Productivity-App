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
          onSelectEvent={event => this.delete_event(event)}
          onSelectSlot={this.handleSelect}
          style={{ height: 1000,width: '95%', 'background-color': 'white' }}
        />
      </>
    )
  }
}

CalendarPage.propTypes = propTypes

export default CalendarPage