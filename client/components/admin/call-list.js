import React, { Component } from 'react'
import Notification from './notification'

const sampleCalls = [{ sessionId: 123 }, { sessionId: 234 }, { sessionId: 456 }, { sessionId: 123 }, { sessionId: 234 }, { sessionId: 456 }, { sessionId: 123 }, { sessionId: 234 }, { sessionId: 456 }]

class CallList extends Component {
  state = {
    calls: /*[]*/ sampleCalls
  }

  newCall = (data) => {
    this.setState((prevState) => ({ calls: [...prevState.calls, data] }))
  }

  render() {
    const { calls } = this.state
    return (
      <div className="call-list">
        {
          calls.map(call => (
            <div key={call.sessionId}>
              <Notification />
            </div>
          ))
        }
      </div>
    )
  }
}

export default CallList;
