import React, { Component } from 'react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react';
import tokbox from '../tokboxConfig'


const { apiKey } = tokbox;

class VideoChat extends Component {
  state = {
    joinChat: false,
    myAudioOn: false,
    myVideoOn: true,
    allAudioOn: true,
  }

  joinVideo = /*async*/ () => {
    // const { createVars } = this.props
    // await createVars()
    this.setState(prevState => ({
      joinChat: !prevState.joinChat
    }))
  }

  render() {
    return (
      <div>
        {
          this.state.joinChat ?
            <div className="row">
              <div>
                <button
                  type="submit"
                  className="btn"
                  onClick={this.joinVideo}
                >Exit Video Chat</button>
              </div>
              <div>
                <OTSession
                  apiKey={apiKey}
                  sessionId={this.props.sessionId}
                  token={this.props.token}
                  onError={(err) => console.log(err)}
                >
                  {/* <div className="mute-btn-container">
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
                  </div> */}
                  <OTPublisher
                    properties={{
                      width: 200,
                      height: 200,
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
                </OTSession>
              </div>
            </div>
            :
            <div>
              <button
                type="submit"
                className="btn"
                id="join-vid-chat-btn"
                onClick={this.joinVideo}
              >Join Video Chat</button>
            </div>
        }
      </div>
    )
  }
}

export default VideoChat
