import React, { Component } from 'react'
import { connect } from 'react-redux'

const prevAppts = [
  { date: 'Fri Jan 06 2017', problem: 'Broken Heater', technician: 'Nick A', apptLength: '30 min', cost: '$139.19' },
  { date: 'Wed Apr 04 2018', problem: 'Drywall', technician: 'Bradley M', apptLength: '120 min', cost: '$85.42' },
  { date: 'Mon Aug 06 2018', problem: 'Leaky Faucet', technician: 'Bradley M', apptLength: '90 min', cost: '$35.01' },
]

const getPreviousAppts = () => {
  console.log('get old appsts now!')
}

class PreviousAppointments extends Component {
  state = {
    priorAppts: prevAppts,
    active: ''
  }

  componentDidMount() {
    console.log('Fetch Previous Appointments')
  }



  render() {
    const { priorAppts } = this.state;
    return (
      <div>
        <h1 style={{ 'text-align': 'center', color: 'rgb(21, 39, 155)' }}>Previous Repairs </h1>
        <div className="previous-component">
          <div className="column-heads">
            <h2 id="date-col">Date</h2>
            <h2 id="repair-col">Repair</h2>
            <h2 id="repair-col">Cost</h2>
          </div>
          {
            priorAppts.map(appt =>
              (
                <div key={appt.date} className="prev-appt">
                  <h3 className="prev-date">{appt.date}</h3>
                  <h3 className="prev-problem">{appt.problem}</h3>
                  {/* <h3 className="prev-tech">{appt.technician}</h3> */}
                  {/* <h3 className="prev-time">{appt.apptLength}</h3> */}
                  <h3 className="prev-cost">{appt.cost}</h3>
                </div>
              )
            )
          }
        </div>
      </div>
    )
  }
}

// export default PreviousAppointments

const mapState = state => ({
  priorAppts: state.priorAppts,
})

const mapDispatch = dispatch => ({
  fetchPreviousAppts: (userId) => dispatch(getPreviousAppts(userId))
})

export default connect(mapState, mapDispatch)(PreviousAppointments)

