import React, {Component} from 'react'
import Calendar from './calendar'
// import {render} from 'react-dom'
// import moment from 'moment'

// import BigCalendar from 'react-big-calendar'
// a localizer for BigCalendar
// BigCalendar.momentLocalizer(moment)
// require('style-loader!css-loader!react-big-calendar/lib/css/react-big-calendar.css')

const key = 'AIzaSyC2WyQfbYX2crwfplDh1GxmTGwhRey8k1k'
const id = 'ef489024f184ab14c70ae7653868e070ab592c32'

class Schedule extends Component {
  state = {
    now: ''
  }

  url = 'https://calendar.google.com/calendar/embed?src=fixiteddie.com_c431af3jv545tkdvc7sb22oc6g%40group.calendar.google.com&ctz=America%2FChicago'

  render() {
    return (
      <div>
        <h1>Here is the schedule!</h1>
        <iframe
          src={this.url}
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
