import React, { Component } from 'react'
import { connect } from 'react-redux'
import isThisYear from 'date-fns/is_this_year'
import { fetchUserRepairs, fetchAllRepairs } from '../../store'

class AllRepairs extends Component {
  state = {
    searchBar: '',
    selected: ''
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
      .filter(repair => isThisYear(repair.date))
      .filter(
        ({ user: { email }, problem }) =>
          email.toLowerCase().match(inputVaue) || problem.toLowerCase().match(inputVaue)
      )
    return (
      <div>
        <h1 style={{ textAlign: 'center', color: 'rgb(21, 39, 155)' }}>Past Repairs </h1>
        <form id="search-component">
          <p>Input Customer Data Filter</p>
          <input
            type="text"
            placeholder="Search by Customer Email or Repair Description..."
            onChange={this.handleChange}
            id="searchbar"
          />
          <select name="year" onChange={this.handleTextboxChange} defaultValue="2018">
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
          {filteredRepairs.map(({ date, user: { email }, problem, cost }) => (
            <button
              key={date}
              type="submit"
              className="prev-appt"
              onClick={() => this.seeDetails(date)}
            >
              <h3 className="prev-date">{date}</h3>
              <h3 className="prev-date">{email}</h3>
              <h3 className="prev-problem">{problem}</h3>
              <h3 className="prev-cost">{cost}</h3>
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
              .filter(({ date }) => date === selected)
              .map(({ date, user: { email }, problem, apptLength, technician, cost }) => (
                <div key={date} className="previous-details">
                  <h1>Date: {date}</h1>
                  <h1>Customer: {email}</h1>
                  <h1>Repair: {problem}</h1>
                  <h1>Appt Length: {apptLength}</h1>
                  <h1>Technician: {technician}</h1>
                  <h1>Cost: {cost}</h1>
                </div>
              ))}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button id="signin-button" type="submit" onClick={this.hideDetails}>
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
