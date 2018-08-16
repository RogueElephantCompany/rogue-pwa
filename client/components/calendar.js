import React, {Component, Fragment} from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux'
import {dayList, timeList, blankTimes} from '../constants'

const fetchAppts = () => {
  console.log('I will find the appts')
  return {date: 'today', time: 'now', type: 'big'}
}

class Calendar extends Component {
  state = {
    apptList: [
      {day: 'Sun', date: 'Aug 12 2018', start: '8AM', end: '9AM', length: 1},
      {day: 'Sun', date: 'Aug 12 2018', start: '10AM', end: '12PM', length: 2},
      {day: 'Mon', date: 'Aug 13 2018', start: '9AM', end: '11AM', length: 2}
    ],
    viewWeek: ['', '4/12', '4/13', '4/14', '4/15', '4/16', '4/17', '4/18']
  }

  componentDidMount() {
    const {getAppts} = this.props
    console.log(getAppts())
    // getAppts()
  }

  fillInAppts = day => {
    console.log('has this many appts: ', day.length)
  }

  render() {
    const {apptList, viewWeek} = this.state
    const sunday = apptList.filter(day => day.day === 'Sun')
    this.fillInAppts(sunday)
    return (
      <Fragment>
        <div id="calendar">
          <h2 id="calendar-name">Repair Calendar</h2>
          <div id="calendar-header">
            {viewWeek.map(day => (
              <div className="day-name" key={day}>
                <h4>{day}</h4>
              </div>
            ))}
          </div>
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
            {/* <div className="calendar-col">
              {sunday.map(appt => (
                <div key={appt} className="appt-box">
                  <h4>{appt.start}</h4>
                </div>
              ))}
            </div> */}
            {/* Sunday */}
            <div className="calendar-col">
              {blankTimes.map(appt => (
                <div
                  key={appt}
                  className="half-box"
                  style={{backgroundColor: 'rgb(219, 58, 50)'}}
                >
                  <h4 />
                </div>
              ))}
            </div>
            {/* Monday */}
            <div className="calendar-col">
              {blankTimes.map(appt => (
                <div key={appt} className="half-box">
                  <h4 />
                </div>
              ))}
            </div>
            {/* Tuesday */}
            <div className="calendar-col">
              {blankTimes.map(appt => (
                <div key={appt} className="half-box">
                  <h4 />
                </div>
              ))}
            </div>
            {/* Wednesday */}
            <div className="calendar-col">
              {blankTimes.map(appt => (
                <div key={appt} className="half-box">
                  <h4 />
                </div>
              ))}
            </div>
            {/* Thursday */}
            <div className="calendar-col">
              {blankTimes.map(appt => (
                <div key={appt} className="half-box">
                  <h4 />
                </div>
              ))}
            </div>
            {/* Friday */}
            <div className="calendar-col">
              {blankTimes.map(appt => (
                <div key={appt} className="half-box">
                  <h4 />
                </div>
              ))}
            </div>
            {/* Saturday */}
            <div className="calendar-col">
              {blankTimes.map(appt => (
                <div key={appt} className="half-box">
                  <h4 />
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
  getAppts: () => dispatch(fetchAppts())
})

export default connect(mapState, mapDispatch)(Calendar)
// export default Calendar
