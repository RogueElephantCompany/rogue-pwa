import React, { Component } from 'react'
import VideoChat from './chat-video'
import tokbox from '../tokboxConfig'
import OpenTok from 'opentok';

const { apiKey, secret } = tokbox;


class Chat extends Component {
  state = {
    roomId: '',
    name: '',
    sessionId: '',
    token: ''
  }

  makeItRain = () => {
    let sessionId
    const opentok = new OpenTok(apiKey, secret)
    opentok.createSession({ mediaMode: "routed" }, async (error, session) => {
      if (error) {
        console.log("Error creating session:", error)
      } else {
        sessionId = session.sessionId;
        console.log("Session ID: " + sessionId);
      }
      let token = opentok.generateToken(sessionId)
      console.log(token)
      await this.setState({ token: token, sessionId: sessionId }, () => console.log(this.state.sessionId, this.state.token))
    })
  }

  render() {
    return (
      <div>
        <h1>Here is the VideoChat Component</h1>
        <button onClick={this.makeItRain} type="submit" />
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
