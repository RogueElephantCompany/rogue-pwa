import React, { Component, Fragment } from 'react'
import socket from '../../socket'
import OpenTok from 'opentok'
import tokbox from '../../tokboxConfig'
import VideoChat from './admin-video'
import CallList from './call-list'

const { apiKey, secret } = tokbox

class Admin extends Component {
  state = {
    token: '',
    sessionId: ''
  }

  answerCall = data => {
    const opentok = new OpenTok(apiKey, secret)
    let sessionId
    opentok.createSession({ mediaMode: 'routed' }, (error, session) => {
      if (error) {
        console.log('Error creating session:', error)
      } else {
        sessionId = data.sessionId
        console.log('Session ID: ' + sessionId)
      }
      let token = opentok.generateToken(sessionId)
      this.setState({ token: token, sessionId: sessionId }, () => {
        console.log(this.state.token, this.state.sessionId)
      })
    })
  }


  render() {
    return (
      <Fragment>
        <h1>Here is the admin page</h1>
        <CallList answerCall={this.answerCall} />
        <VideoChat sessionId={this.state.sessionId} token={this.state.token} />
      </Fragment>
    )
  }
}

export default Admin
