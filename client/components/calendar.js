import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { dayList, timeList } from '../constants'

const fetchAppts = () => {
  console.log('I will find the appts')
  return { date: 'today', time: 'now', type: 'big' }
}

class Calendar extends Component {
  state = {
    apptList: [
      { day: 'Sun', date: 'Aug 12 2018', start: '8AM', end: '9AM' },
      { day: 'Sun', date: 'Aug 12 2018', start: '10AM', end: '12PM' },
      { day: 'Mon', date: 'Aug 13 2018', start: '9AM', end: '11AM' },
    ],
  }

  componentDidMount() {
    const { getAppts } = this.props
    console.log(getAppts())
    // getAppts()
  }

  apptLength = appt => {
    let len = parseInt(appt.end, 10) - parseInt(appt.start, 10)
    return `${len} hr.`
  }

  fillInAppts = day => {
    console.log('has this many appts: ', day.length)
  }

  render() {
    const { apptList } = this.state
    const sunday = apptList.filter(day => day.day === 'Sun')
    this.fillInAppts(sunday)
    return (
      <Fragment>
        <div id="calendar">
          <h2>Repair Calendar</h2>
          <div id="calendar-header">
            {dayList.map(day => (
              <div className="day-name" key={day}>
                <h4>{day}</h4>
              </div>
            ))}
          </div>
          <div className="calendar-row">
            <div className="calendar-col">
              {timeList.map(time => (
                <div key={time} className="time-box">
                  <h4>{time}</h4>
                </div>
              ))}
            </div>
            <div className="calendar-col">
              {sunday.map(appt => (
                <div key={appt} className="appt-box">
                  <h4>{appt.start}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapState = state => state

const mapDispatch = dispatch => ({
  getAppts: () => dispatch(fetchAppts()),
})

export default connect(mapState, mapDispatch)(Calendar)
// export default Calendar
