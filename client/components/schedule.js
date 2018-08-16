import React, {Component} from 'react'
import Calendar from './calendar'
import {url} from '../../secrets'
// import {render} from 'react-dom'
// import moment from 'moment'

// import BigCalendar from 'react-big-calendar'
// a localizer for BigCalendar
// BigCalendar.momentLocalizer(moment)
// require('style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css')

class Schedule extends Component {
  state = {
    now: ''
  }

  render() {
    return (
      <div>
        <h1>Here is the schedule!</h1>
        <iframe
          src={url}
          style={{
            border: '0',
            width: '100vw',
            height: '800px',
            frameBorder: '0',
            scrolling: 'no'
          }}
        />
        {/* <BigCalendar style={{height: '420px'}} events={[]} /> */}
        {/* <Calendar /> */}
      </div>
    )
  }
}

export default Schedule
