import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import history from '../history'
import {companyName} from '../constants'

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
    this.setState({roomId: roomId})
    history.push(`/chat/${timeStart}`)
  }

  render() {
    const {email} = this.props
    return (
      <Fragment>
        <h3>Welcome, {email}</h3>
        <button type="submit" onClick={this.launchCall}>{`Call ${companyName}`}</button>
      </Fragment>
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
