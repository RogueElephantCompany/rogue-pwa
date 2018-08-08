import React, {Component, Fragment} from 'react'
import {OTSession, OTPublisher, OTStreams, OTSubscriber} from 'opentok-react'
import tokbox from '../../tokboxConfig'
import {Button} from 'semantic-ui-react'
import socket from '../../socket'
import history from '../../history'
import {ChatButtons} from '../index'

const {apiKey} = tokbox

class VideoChat extends Component {
  state = {
    joinChat: false,
    myAudioOn: false,
    myVideoOn: true,
    allAudioOn: true,
    facingMode: 'environment'
  }

  startVideo = () => {
    socket.emit('invite', {
      sessionId: this.props.sessionId,
      roomId: this.props.roomId
    })
    this.setState({
      joinChat: true,
      myAudioOn: true
    })
  }

  endVideo = () => {
    socket.emit('end-call', {
      sessionId: this.props.sessionId,
      roomId: this.props.roomId
    })
    this.setState({
      joinChat: false,
      myAudioOn: false,
      myVideoOn: false,
      allAudioOn: false
    })
    history.push('/home')
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

  flipCamera = () => {
    const {facingMode} = this.state
    console.log(facingMode)
    if (facingMode === 'user') {
      this.setState({facingMode: 'environment'})
    } else {
      this.setState({facingMode: 'user'})
    }
  }

  componentWillUnmount() {
    socket.emit('end-call', {
      sessionId: this.props.sessionId,
      roomId: this.props.roomId
    })
  }

  render() {
    const {facingMode} = this.state
    return (
      <Fragment>
        {this.state.joinChat ? (
          <div className="row">
            {/* <button type="submit" onClick={() => this.flipCamera()}>
                {facingMode === 'environment' ? 'Back Camera' : 'Front Camera'}
              </button> */}
            <div>
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
                <div className="video-screen">
                  <OTPublisher
                    properties={{
                      width: 100,
                      height: 100,
                      publishAudio: this.state.myAudioOn,
                      publishVideo: this.state.myVideoOn,
                      name: this.props.guestName,
                      showControls: false,
                      facingMode: this.state.facingMode
                    }}
                    eventHandler={{
                      cycleVideo: this.flipCamera
                    }}
                  />
                </div>
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
              <Button secondary type="submit" onClick={this.endVideo} content="End Video Chat" />
            </div>
          </div>
        ) : (
          <div>
            {/* <button type="submit" onClick={() => this.flipCamera()}>
                  <OTPublisher
                    properties={{
                      width: 100,
                      height: 100,
                      publishAudio: this.state.myAudioOn,
                      publishVideo: this.state.myVideoOn,
                      name: this.props.guestName,
                      showControls: false,
                      facingMode: this.state.facingMode
                    }}
                    eventHandler={{
                      cycleVideo: this.flipCamera
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
              <div style={{ marginTop: '10px' }}>
                <Button
                  secondary
                  type="submit"
                  onClick={this.endVideo}
                  content='End Video Chat' />
              </div>
            </div>
            :
            <div className="row">
              {/* <button type="submit" onClick={() => this.flipCamera()}>
                {facingMode === 'environment' ? 'Back Camera' : 'Front Camera'}
              </button> */}
            <Button primary type="submit" onClick={this.startVideo} content="Start Video Chat" />
          </div>
        )}
      </Fragment>
    )
  }
}

export default VideoChat
