import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import PropTypes from 'prop-types'
import { auth } from '../store'
import { Input, Button, Form } from './common/ui'

const FormWrapper = styled.div`
  width: 100%;
  height: 100vh;
`

const LoginHeader = styled.h1`
  font-size: 3rem;
  margin: auto;
  margin-top: 20px;
  text-align: center;
  color: #dbdbdb;
`

/**
 * COMPONENT
 */
const AuthForm = ({ name, displayName, handleSubmit, error }) => (
  <FormWrapper>
    <LoginHeader>{displayName === 'Login' ? 'Login' : 'Sign Up'}</LoginHeader>
    <Form onSubmit={handleSubmit} name={name}>
      {/* <label htmlFor="email">
          <>Email</>
        </label> */}
      <Input name="email" color="#dbdbdb" type="email" placeholder="EMAIL" />
      {/* <label htmlFor="password">
          <>Password</>
        </label> */}
      <Input
        name="password"
        color="#dbdbdb"
        type="password"
        placeholder="PASSWORD"
      />
      <Button primary wide loose type="submit" content={displayName} />
      {error && error.response && <div> {error.response.data} </div>}
    </Form>
    {/* <a href="/auth/google">{displayName} with Google</a> */}
  </FormWrapper>
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
  error: state.user.error,
})

const mapSignup = state => ({
  name: 'signup',
  displayName: 'Sign Up',
  error: state.user.error,
})

const mapDispatch = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault()
    const formName = evt.target.name
    const email = evt.target.email.value
    const password = evt.target.password.value
    dispatch(auth(email, password, formName))
  },
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
  error: PropTypes.object,
}
