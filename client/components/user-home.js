import React, { Component } from 'react'
import { connect } from 'react-redux'
import history from '../history'
import { companyName } from '../constants'
// import tokbox from '../tokboxConfig'
// import OpenTok from 'opentok';

// const { apiKey, secret } = tokbox;

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

  // makeItRain = () => {
  //   let sessionId
  //   const opentok = new OpenTok(apiKey, secret)
  //   opentok.createSession({ mediaMode: "routed" }, async (error, session) => {
  //     if (error) {
  //       console.log("Error creating session:", error)
  //     } else {
  //       sessionId = session.sessionId;
  //       console.log("Session ID: " + sessionId);
  //     }
  //     let token = opentok.generateToken(sessionId)
  //     console.log(token)
  //     await this.setState({ token: token, sessionId: sessionId }, () => console.log(this.state.sessionId, this.state.token))
  //   })
  // }

  launchCall = (evt) => {
    console.log(evt)
    let timeStart = Date.now()
    let roomId = `/chat/${timeStart}`
    this.setState({ roomId: roomId })
    // this.makeItRain()
    // let sessionId
    // const opentok = new OpenTok(apiKey, secret)
    // opentok.createSession({ mediaMode: "routed" }, async (error, session) => {
    //   if (error) {
    //     console.log("Error creating session:", error)
    //   } else {
    //     sessionId = session.sessionId;
    //     console.log("Session ID: " + sessionId);
    //   }
    //   let token = opentok.generateToken(sessionId)
    //   console.log(token)
    //   await this.setState({ token: token, sessionId: sessionId }, () => console.log(this.state.sessionId, this.state.token))
    // })
    history.push(`/chat/${timeStart}`)
  }

  render() {
    console.log('render props: ', this.props)
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
  console.log('state in mapState', state)
  return {
    email: state.user.email,
    roomId: state.roomId,
    sessionId: state.sessionId,
    token: state.token
  }
}

export default connect(mapState)(UserHome)

