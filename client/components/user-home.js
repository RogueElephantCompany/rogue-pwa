import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../history'
import { companyName } from '../constants'

/**
 * COMPONENT
 */
class UserHome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //   roomId: '',
      //   name: '',
      //   sessionId: '',
      //   token: ''
    }
  }


  launchCall = () => {
    let timeStart = Date.now()
    let roomId = `/chat/${timeStart}`
    this.setState({ roomId: roomId })
    history.push(`/chat/${timeStart}`)
  }

  render() {
    const { email } = this.props
    return (
      <div>
        <h3>Welcome, {email}</h3>
        <button type="submit" onClick={this.launchCall}>{`Call ${companyName}`}</button>
      </div>
    )
  }

}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

