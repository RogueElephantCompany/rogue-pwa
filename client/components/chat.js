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
    token: '',
    blankVars: true
  }

  createVars = () => {
    let sessionId
    const opentok = new OpenTok(apiKey, secret)
    opentok.createSession({ mediaMode: "routed" }, (error, session) => {
      if (error) {
        console.log("Error creating session:", error)
      } else {
        sessionId = session.sessionId;
        console.log("Session ID: " + sessionId);
      }
      let token = opentok.generateToken(sessionId)
      this.setState({ token: token, sessionId: sessionId, blankVars: false })
      /*,() => console.log(this.state.sessionId, this.state.blankVars, this.state.token))*/
    })
  }

  render() {
    const { blankVars } = this.state
    return (
      <div>
        {
          blankVars ?
            (<div>
              {this.createVars()}
              <h3>Loading</h3>
            </div>)
            :
            (
              <div>
                <h1>Here is the VideoChat Component</h1>
                {/* <button onClick={this.createVars} type="submit" /> */}
                <VideoChat
                  createVars={this.createVars}
                  roomId={this.state.roomId}
                  guestName={this.state.name}
                  sessionId={this.state.sessionId}
                  token={this.state.token}
                />
              </div>
            )
        }
      </div>
    )
  }
}

export default Chat;
