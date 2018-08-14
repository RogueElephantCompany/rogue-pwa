import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserRepairs, fetchAllRepairs } from '../../store'

class AllRepairs extends Component {
  state = {
    searchBar: '',
    selected: '',
    year: '2018'
  }

  componentDidMount() {
    const { getAllRepairs } = this.props
    getAllRepairs()
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

  handleChange = evt => {
    const { value } = evt.target
    this.setState({ searchBar: value })
  }

  handleTextboxChange = evt => {
    let { name, value } = evt.target
    this.setState({ [name]: value })
  }

  render() {
    const { selected } = this.state
    const inputVaue = this.state.searchBar.toLowerCase()
    const { repairs } = this.props
    const filteredRepairs = repairs
      .slice()
      .reverse()
      .filter(
        repair => Number(repair.date.slice(-4)) === Number(this.state.year)
      )
      .filter(prev => {
        return (
          prev.user.email.toLowerCase().match(inputVaue) ||
          prev.problem.toLowerCase().match(inputVaue)
        )
      })
    return (
      <div>
        <h1 style={{ textAlign: 'center', color: 'rgb(21, 39, 155)' }}>
          Past Repairs{' '}
        </h1>
        <form id="search-component">
          Input Customer Data Filter
          <input
            type="text"
            placeholder="Search by Customer Email or Repair Description..."
            onChange={this.handleChange}
            id="searchbar"
          />
          <select
            name="year"
            onChange={this.handleTextboxChange}
            defaultValue="2018"
          >
            <option value={2017}>2017</option>
            <option value={2018}>2018</option>
            <option value={2019}>2019</option>
            <option value={2020}>2020</option>
          </select>
        </form>
        <div className="previous-component">
          <div className="column-heads">
            <h2 id="date-col">Date</h2>
            <h2 id="date-col">Customer</h2>
            <h2 id="repair-col">Repair</h2>
            <h2 id="cost-col">Cost</h2>
          </div>
          {filteredRepairs.map(appt => (
            <button
              key={appt.date}
              type="submit"
              className="prev-appt"
              onClick={() => this.seeDetails(appt.date)}
            >
              <h3 className="prev-date">{appt.date}</h3>
              <h3 className="prev-date">{appt.user.email}</h3>
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
            {filteredRepairs
              .filter(appt => {
                return appt.date === selected
              })
              .map(appt => (
                <div key={appt.date} className="previous-details">
                  <h1>Date: {appt.date}</h1>
                  <h1>Customer: {appt.user.email}</h1>
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
  getPreviousAppts: userId => dispatch(fetchUserRepairs(userId)),
  getAllRepairs: () => dispatch(fetchAllRepairs())
})

export default connect(mapState, mapDispatch)(AllRepairs)
