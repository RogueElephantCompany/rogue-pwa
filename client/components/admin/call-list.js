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
    socket.on('invite', data => {
      this.newCall(data)
      // this.answerCall(data)
    })
    socket.on('end-call', data => {
      console.log(data)
    })
  }

  removeCall = (sessionId) => {
    const { calls } = this.state
    let copy = calls.slice(0)
    let idx
    for (let i = 0; i < copy.length; i++) {
      if (copy[i].sessionId === sessionId) {
        idx = i
        break
      }
    }
    copy.splice(idx, 1)
    this.setState(({ calls: copy }))
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
