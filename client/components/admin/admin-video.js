import React, { Component, Fragment } from 'react'
import { Button } from 'semantic-ui-react'
import { OTSession, OTPublisher, OTStreams, OTSubscriber } from 'opentok-react'
import tokbox from '../../tokboxConfig'
const { apiKey } = tokbox
import { ChatButtons } from '../index'

class Video extends Component {
  state = {
    joinChat: false,
    myAudioOn: false,
    myVideoOn: true,
    allAudioOn: true
  }

  joinVideo = () => {
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

  render() {
    return (
      <Fragment>
        {this.state.joinChat ? (
          <div className="row">
            <div className="video-screen">
              <OTSession
                apiKey={apiKey}
                sessionId={this.props.sessionId}
                token={this.props.token}
                onError={err => console.log(err)}
              >
                <ChatButtons
                  myAudioOn={this.state.myAudioOn}
                  myVideoOn={this.state.myVideoOn}
                  allAudioOn={this.state.allAudioOn}
                  toggleMyAudio={this.toggleMyAudio}
                  toggleMyVideo={this.toggleMyVideo}
                  toggleAllAudio={this.toggleAllAudio}
                />
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
                      subscribeToVideo: true
                    }}
                  />
                </OTStreams>
              </OTSession>
            </div>
            <div>
              <Button
                secondary
                type="submit"
                onClick={this.joinVideo}
                content="Exit Video Chat"
              />
            </div>
          </div>
        ) : (
          <div>
            <Button
              primary
              type="submit"
              onClick={this.joinVideo}
              content="Join Video Chat"
            />
          </div>
        )}
      </Fragment>
    )
  }
}

export default Video
