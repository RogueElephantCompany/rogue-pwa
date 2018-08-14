import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserRepairs } from '../../store'

// const prevAppts = [
//   { date: 'Fri Jan 06 2017', problem: 'Broken Heater', technician: 'Nick A', apptLength: '30 min', cost: '$139.19' },
//   { date: 'Wed Apr 04 2018', problem: 'Drywall', technician: 'Bradley M', apptLength: '120 min', cost: '$85.42' },
//   { date: 'Mon Aug 06 2018', problem: 'Leaky Faucet', technician: 'Bradley M', apptLength: '90 min', cost: '$35.01' },
// ]

class PreviousAppointments extends Component {
  state = {
    // priorAppts: prevAppts,
    selected: ''
  }

  componentDidMount() {
    const { getPreviousAppts, user } = this.props
    getPreviousAppts(user.id)
  }

  seeDetails = date => {
    if (date === this.state.selected) {
      this.setState({ selected: '' })
    } else {
      this.setState({ selected: date })
    }
  }

  hideDetails = () => {
    this.setState({ selected: '' })
  }

  render() {
    const { /*priorAppts,*/ selected } = this.state
    const { repairs } = this.props
    return (
      <div>
        <h1 style={{ textAlign: 'center', color: 'rgb(21, 39, 155)' }}>
          Past Repairs{' '}
        </h1>
        <div className="previous-component">
          <div className="column-heads">
            <h2 id="date-col">Date</h2>
            <h2 id="repair-col">Repair</h2>
            <h2 id="cost-col">Cost</h2>
          </div>
          {repairs.map(appt => (
            <button
              key={appt.date}
              type="submit"
              className="prev-appt"
              onClick={() => this.seeDetails(appt.date)}
            >
              <h3 className="prev-date">{appt.date}</h3>
              <h3 className="prev-problem">{appt.problem}</h3>
              <h3 className="prev-cost">{appt.cost}</h3>
            </button>
          ))}
        </div>
        {selected !== '' ? (
          <div>
            <h1
              style={{
                textAlign: 'center',
                color: 'rgb(21, 39, 155)',
                marginTop: '10px'
              }}
            >
              {' '}
              Repair Details
            </h1>
            {repairs
              .filter(appt => {
                return appt.date === selected
              })
              .map(appt => (
                <div key={appt.date} className="previous-details">
                  <h1>Date: {appt.date}</h1>
                  <h1>Repair: {appt.problem}</h1>
                  <h1>Appt Length: {appt.apptLength}</h1>
                  <h1>Technician: {appt.technician}</h1>
                  <h1>Cost: {appt.cost}</h1>
                </div>
              ))}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button
                id="signin-button"
                type="submit"
                onClick={this.hideDetails}
              >
                Hide{' '}
              </button>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

const mapState = state => state

const mapDispatch = dispatch => ({
  getPreviousAppts: userId => dispatch(fetchUserRepairs(userId))
})

export default connect(mapState, mapDispatch)(PreviousAppointments)
