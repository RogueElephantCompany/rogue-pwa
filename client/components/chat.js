import React, { Component } from 'react'
import VideoChat from './chat-video'

class Chat extends Component {
  state = {}

  render() {
    return (
      <div>
        <h1>Here is the VideoChat Component</h1>
        <VideoChat />
      </div>
    )
  }
}

export default Chat;
