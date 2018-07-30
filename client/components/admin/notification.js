import React from 'react'
// import history from '../../history'

const Notification = (props) => {

  const joinCall = (sessionId) => {
    // console.log('join the call')
    // history.push('/')
    props.answerCall(props)
    props.removeCall(sessionId)
  }

  const rejectCall = (sessionId) => {
    console.log('reject the call')
    props.removeCall(sessionId)
  }

  return (
    <div className="notification">
      <p>You have a video call</p>
      <button
        className="invite-button"
        type="submit"
        id="accept"
        onClick={() => joinCall(props.sessionId)}>
        Accept</button>
      <button
        className="invite-button"
        type="submit"
        id="reject"
        onClick={() => rejectCall(props.sessionId)}>
        Reject</button>
    </div>
  )
}

export default Notification

