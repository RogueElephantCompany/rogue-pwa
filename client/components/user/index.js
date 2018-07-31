import React, { Component } from 'react'
import tokbox from '../../tokboxConfig'
import OpenTok from 'opentok'
import socket from '../../socket'
import VideoChat from './chat-video'
import Rejection from './rejection'

const { apiKey, secret } = tokbox

class Chat extends Component {
  state = {
    roomId: '',
    name: '',
    sessionId: '',
    token: '',
    blankVars: true,
    rejected: false,
  }

  componentDidMount() {
    socket.on('reject-call', data => {
      if (data.sessionId === this.state.sessionId) {
        this.setState({ rejected: true })
      }
    })
  }

  createVars = () => {
    // use react-router here
    let url = window.location.href
    let sessionId
    const opentok = new OpenTok(apiKey, secret)
    opentok.createSession({ mediaMode: 'routed' }, (error, session) => {
      if (error) {
        console.error('Error creating session:', error)
      } else {
        sessionId = session.sessionId
      }
      let token = opentok.generateToken(sessionId)
      this.setState({
        token: token,
        sessionId: sessionId,
        roomId: url,
        blankVars: false
      })
    })
  }

  render() {
    const { blankVars, rejected } = this.state
    return (
      <div className="chat-div">
        {blankVars ? (
          <div>
            {this.createVars()}
            <h3>Loading...</h3>
          </div>
        ) : (
            <VideoChat
              createVars={this.createVars}
              roomId={this.state.roomId}
              guestName={this.state.name}
              sessionId={this.state.sessionId}
              token={this.state.token}
            />
          )}
        {rejected ? (
          <Rejection />
        ) : (
            <div />
          )
        }
      </div>
    )
  }
}

export default Chat
