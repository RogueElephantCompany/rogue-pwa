import React, { Component } from 'react'
import Notification from './notification'
import socket from '../../socket'

const sampleCalls = [{ sessionId: 123 }, { sessionId: 234 }, { sessionId: 456 }]

class CallList extends Component {
  state = {
    calls: [] /*sampleCalls*/,
  }

  newCall = (data) => {
    this.setState((prevState) => ({ calls: [...prevState.calls, data] }))
  }

  componentDidMount() {
    socket.on('invite', (data) => {
      this.newCall(data)
      // this.answerCall(data)
    })
  }

  removeCall = (sessionId) => {
    this.setState((prevState) => ({ calls: prevState.calls.slice(1) }))
  }

  render() {
    const { calls } = this.state
    const { answerCall } = this.props
    return (
      <div className="call-list">
        {
          calls.map(call => (
            <div key={call.sessionId}>
              <Notification answerCall={answerCall} removeCall={this.removeCall} />
            </div>
          ))
        }
      </div>
    )
  }
}

export default CallList;
