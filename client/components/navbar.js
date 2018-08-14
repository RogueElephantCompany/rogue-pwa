import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Nav = styled.nav`
  display: flex;
  height: 60px;
  width: 100%;
  > * {
    color: white;
    &:hover {
      color: #dbdbdb;
    }
  }
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.25);
  align-items: center;
  background: #1e77b4;
`
const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <Nav>
    {isLoggedIn ? (
      <Fragment>
        {/* The navbar will show these links after you log in */}
        <Link to="/home">Home</Link>
        <Link to="/info">Info</Link>
        {isAdmin ? (
          <Fragment>
            <Link to="/repairs">All Repairs</Link>
            <Link to="/admin">Dashboard</Link>
          </Fragment>
        ) : (
          ''
        )}
        <a href="#" onClick={handleClick}>
          Logout
        </a>
      </Fragment>
    ) : (
      <Fragment>
        {/* The navbar will show these links before you log in */}
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </Fragment>
    )}
  </Nav>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
