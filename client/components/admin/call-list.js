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
    console.log('here is the sessionId in removeCall', sessionId)
    // let idx
    // for (let i = 0; i < this.state.calls.length; i++) {
    //   if (calls[i] === sessionId) {
    //     idx = i
    //     break
    //   }
    //   console.log('here is the index: ', idx)
    // }
    // this.setState((prevState) => ({ calls: prevState.calls.splice(/*idx*/0, 1) }))
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
