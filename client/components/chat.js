import React, { Component } from 'react'
import VideoChat from './chat-video'
import tokbox from '../tokboxConfig'
// import OpenTok from 'opentok';

const { apiKey, secret } = tokbox;
// console.log(OpenTok)

class Chat extends Component {
  state = {
    roomId: '',
    name: '',
    sessionId: '',
    token: ''
  }

  render() {
    return (
      <div>
        <h1>Here is the VideoChat Component</h1>
        <VideoChat
          roomId={this.state.roomId}
          guestName={this.state.name}
          sessionId={this.state.sessionId}
          token={this.state.token} />
      </div>
    )
  }
}

export default Chat;
