import React, { Component, Fragment } from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import tokbox from '../tokboxConfig'
import { Button } from 'semantic-ui-react'
import socket from '../socket'


const { apiKey } = tokbox

class VideoChat extends Component {
  state = {
    joinChat: false,
    myAudioOn: false,
    myVideoOn: true,
    allAudioOn: true,
  }

  joinVideo = () => {
    socket.emit('invite', {
      sessionId: this.props.sessionId,
      roomId: this.props.roomId
    })
    this.setState(prevState => ({
      joinChat: !prevState.joinChat,
      myAudioOn: !prevState.myAudioOn
    }))
  }

  toggleMyAudio = () => {
    this.setState(prevState => ({
      myAudioOn: !prevState.myAudioOn
    }))
  }

  toggleMyVideo = () => {
    this.setState(prevState => ({
      myVideoOn: !prevState.myVideoOn
    }))
  }

  toggleAllAudio = () => {
    this.setState(prevState => ({
      allAudioOn: !prevState.allAudioOn
    }))
  }

  // componentDidMount() {
  //   socket.on('invite', (data) => {
  //     console.log(data)
  //   })
  // }

  // componentWillUnmount() {
  //   console.log('componenet unmounting...')
  // }

  render() {
    return (
      <Fragment>
        {
          this.state.joinChat ?
            <div className="row">
              <div className="video-screen">
                <OTSession
                  apiKey={apiKey}
                  sessionId={this.props.sessionId}
                  token={this.props.token}
                  onError={(err) => console.log(err)}
                >
                  <div className="mute-btn-container">
                    <button
                      type="submit"
                      className={this.state.myVideoOn ? "unMute-btn" : "mute-btn"}
                      onClick={this.toggleMyVideo}
                    >
                      <img className="chat-icon" src={this.state.myVideoOn ? "/images/video-on.png" : "/images/video-off.png"}
                        alt="video" />
                    </button>
                    <button
                      type="submit"
                      className={this.state.myAudioOn ? "unMute-btn" : "mute-btn"}
                      onClick={this.toggleMyAudio}
                      alt="mute"
                    >
                      <img className="chat-icon" src={this.state.myAudioOn ? "/images/mic-on.png" : "/images/mic-off.png"}
                        alt="mic"
                      />
                    </button>
                    <button
                      type="submit"
                      className="unMute-btn"
                      onClick={this.toggleAllAudio}
                    >
                      <img className="chat-icon" src={this.state.allAudioOn ? "/images/audio-on.png" : "/images/no-audio.png"}
                        alt="audio"
                      />
                    </button>
                  </div>
                  <OTPublisher
                    properties={{
                      width: 100,
                      height: 100,
                      publishAudio: this.state.myAudioOn,
                      publishVideo: this.state.myVideoOn,
                      name: this.props.guestName,
                      showControls: false
                    }}
                  />
                  <OTStreams>
                    <OTSubscriber
                      properties={{
                        width: 400,
                        height: 400,
                        subscribeToAudio: this.state.allAudioOn,
                        subscribeToVideo: true,
                      }}
                    />
                  </OTStreams>
                </div>
              </div>
              <div>
                <Button
                  secondary
                  type="submit"
                  onClick={this.joinVideo}
                  content='Exit Video Chat' />
              </div>
            </Fragment>
            :
            <div>
              <Button primary
                type="submit"
                onClick={this.joinVideo}
                content='Join Video Chat' />
            </div>
        }
      </div>
    )
  }
}

export default VideoChat
