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
    sessionId: '1_MX40NjE1MjczMn5-MTUzMTUwOTIzNzg4OH5jbXg5ZDJuVlFIaTlKQk5XSUpUZWJOK05-fg',
    token: 'T1==cGFydG5lcl9pZD00NjE1MjczMiZzaWc9NGVmNmQ2NGJhNWZhYTI5ZWUyYTMyZWVhNTczZWQ2YTU4NDZlYTllNTpzZXNzaW9uX2lkPTFfTVg0ME5qRTFNamN6TW41LU1UVXpNVFV3T1RJek56ZzRPSDVqYlhnNVpESnVWbEZJYVRsS1FrNVhTVXBVWldKT0swNS1mZyZjcmVhdGVfdGltZT0xNTMxNTA5MjU4Jm5vbmNlPTAuMTk3MzgwOTg5MzE1OTY5MjYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUzMTUxMjg1OCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ=='
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
