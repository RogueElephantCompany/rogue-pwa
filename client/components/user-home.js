import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import history from '../history'
import { companyName } from '../constants'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const { email } = props

  const launchCall = (evt) => {
    console.log(evt)
    let timeStart = Date.now()
    history.push(`/chat/${timeStart}`)
  }

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <button type="submit" onClick={launchCall}>{`Call ${companyName}`}</button>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
