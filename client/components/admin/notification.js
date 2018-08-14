import React from 'react'
import socket from '../../socket'

const Notification = props => {
  const joinCall = sessionId => {
    props.answerCall(props)
    props.removeCall(sessionId)
  }

  const rejectCall = sessionId => {
    socket.emit('reject-call', { sessionId: sessionId })
    props.removeCall(sessionId)
  }

  return (
    <div className="notification">
      <p>You have a video call</p>
      <p>{`from ${props.email}`}</p>
      <button
        className="invite-button"
        type="submit"
        id="accept"
        onClick={() => joinCall(props.sessionId)}
      >
        Accept
      </button>
      <button
        className="invite-button"
        type="submit"
        id="reject"
        onClick={() => rejectCall(props.sessionId)}
      >
        Reject
      </button>
    </div>
  )
}

export default Notification
