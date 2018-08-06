import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

/**
 * COMPONENT
 */
const AuthForm = ({ name, displayName, handleSubmit, error }) => (
  <Fragment>
    {
      displayName === 'Login' ? (
        <div className="login-header">
          <h1>Login</h1>
        </div>
      ) : (
          <div className="login-header">
            <h1>Signup</h1>
          </div>
        )
    }
    <form onSubmit={handleSubmit} name={name}>
      <div className="login-line">
        {/* <label htmlFor="email">
          <>Email</>
        </label> */}
        <input name="email" type="text" placeholder="EMAIL" />
      </div>
      <div className="login-line">
        {/* <label htmlFor="password">
          <>Password</>
        </label> */}
        <input name="password" type="password" placeholder="PASSWORD" />
      </div>
      <div className="login-line">
        <button id="signin-button" type="submit">{displayName}</button>
      </div>
      {error && error.response && <div> {error.response.data} </div>}
    </form>
    {/* <a href="/auth/google">{displayName} with Google</a> */}
  </Fragment>
)

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => ({
  name: 'login',
  displayName: 'Login',
  error: state.user.error
})

const mapSignup = state => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.user.error
})

const mapDispatch = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const email = evt.target.email.value
    const password = evt.target.password.value
    dispatch(auth(email, password, formName))
  }
})

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
