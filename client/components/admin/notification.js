import React from 'react'
import history from '../../history'

const Notification = () => {

  const joinCall = () => {
    console.log('join the call')
    history.push('/')
  }

  const rejectCall = () => [
    console.log('reject the call')
  ]

  return (
    <div className="notification">
      <p>You have a video call</p>
      <button
        className="invite-button"
        type="submit"
        id="accept"
        onClick={joinCall}>
        Accept</button>
      <button
        className="invite-button"
        type="submit"
        id="reject"
        onClick={rejectCall}>
        Reject</button>
    </div>
  )
}

export default Notification

