import React, { Component } from 'react'
import Notification from './notification'
import socket from '../../socket'

const sampleCalls = [{ sessionId: 123 }, { sessionId: 234 }, { sessionId: 456 }]

class CallList extends Component {
  state = {
    calls: [] /*sampleCalls*/
  }

  newCall = data => {
    this.setState(prevState => ({ calls: [...prevState.calls, data] }))
  }

  componentDidMount() {
    socket.on('invite', data => {
      console.log(data)
      this.newCall(data)
    })
    socket.on('end-call', data => {
      this.removeCall(data.sessionId)
    })
  }

  removeCall = sessionId =>
    this.setState(s => ({ calls: s.calls.filter(call => call.sessionId !== sessionId) }))

  render() {
    const { calls } = this.state
    const { answerCall } = this.props
    return (
      <div className="call-list">
        {calls.map(({ sessionId, email, user }, idx) => (
          <div key={sessionId}>
            <Notification
              sessionId={sessionId}
              answerCall={answerCall}
              removeCall={this.removeCall}
              email={email}
              user={user}
              callIndex={idx}
            />
          </div>
        ))}
      </div>
    )
  }
}

export default CallList
