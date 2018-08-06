import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../history'
import { companyName } from '../constants'

/**
 * COMPONENT
 */
class UserHome extends Component {
  state = {
    roomId: ''
  }

  launchCall = () => {
    let timeStart = Date.now()
    let roomId = `/chat/${timeStart}`
    this.setState({ roomId: roomId })
    history.push(`/chat/${timeStart}`)
  }

  launchSchedule = () => {
    console.log('Go to Schedule')
    history.push('/schedule')
  }

  launchInfo = () => {
    console.log('Go to Info')
    history.push('/info')
  }

  launchPrevious = () => {
    console.log('Go to Previous')
    history.push('previous')
  }

  render() {
    const { email } = this.props
    return (
      <div className="user-home">
        <h3>Welcome, {email}</h3>
        <div className="home-row">
          <button
            className="home-button"
            type="submit"
            onClick={this.launchCall}>
            <img className="button-icon" src="/images/phone.png"
              alt="video" />
            <div className="centered">{`Call ${companyName}`}</div>
          </button>
          <button
            className="home-button"
            type="submit"
            onClick={this.launchPrevious}>
            <img className="button-icon" src="/images/van2.png"
              alt="video" />
            <div className="centered">Previous Repairs</div>
          </button>
        </div>
        <div className="home-row">
          <button
            className="home-button"
            type="submit"
            onClick={this.launchSchedule}>
            <img className="button-icon" src="/images/calendar.png"
              alt="video" />
            <div className="centered">Schedule Appointment</div>
          </button>
          <button
            className="home-button"
            id="info-button"
            type="submit"
            onClick={this.launchInfo}>
            <img className="button-icon" src="/images/profile.png"
              alt="video" />
            <div className="centered">Update Info</div>
          </button>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  email: state.user.email
})

export default connect(mapState)(UserHome)
