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
    let idx

    this.setState((prevState) => ({ calls: prevState.calls.slice(1) }))
  }


  render() {
    const { calls } = this.state
    const { answerCall } = this.props
    console.log(this.state.calls)
    return (
      <div className="call-list">
        {
          calls.map((call, idx) => (
            <div key={call.sessionId}>
              <Notification
                sessionId={call.sessionId}
                answerCall={answerCall}
                removeCall={this.removeCall}
                callIndex={idx} />
            </div>
          ))
        }
      </div>
    )
  }
}

export default CallList;
