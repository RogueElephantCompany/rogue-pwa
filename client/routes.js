import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Login,
  Signup,
  UserHome,
  Chat,
  UserInfo,
  Admin,
  Schedule,
  PreviousAppointments,
  AllRepairs
} from './components'
import {me} from './store'

const PageWrapper = styled.div`
  height: calc(100vh - 60px);
  background-image: url('/images/loginbg.jpg');
  background-size: cover;
  overflow: auto;
`

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    return (
      <PageWrapper>
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/home" component={UserHome} />
              <Route path="/chat/:id" component={Chat} />
              <Route path="/info" component={UserInfo} />
              <Route path="/previous" component={PreviousAppointments} />
              <Route path="/schedule" component={Schedule} />
              {isAdmin && (
                <Switch>
                  <Route path="/admin" component={Admin} />
                  <Route path="/repairs" component={AllRepairs} />
                </Switch>
              )}
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={Login} />
        </Switch>
      </PageWrapper>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => ({
  // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
  // Otherwise, state.user will be an empty object, and state.user.id will be falsey
  isLoggedIn: !!state.user.id,
  isAdmin: state.user.isAdmin
})

const mapDispatch = dispatch => ({
  loadInitialData() {
    dispatch(me())
  }
})

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
