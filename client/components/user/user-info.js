import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { states } from '../../constants'
import { createUserInfo, fetchUserInfo } from '../../store'

class UserInfo extends Component {
  state = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: 'AL',
    zip: '',
    phone: ''
  }

  componentDidMount() {
    // console.log('need to go fetch User Info')
    const { getUserInfo, user } = this.props
    getUserInfo(user.id)
  }

  changeTextbox = evt => {
    const { value, name } = evt.target
    this.setState({ [name]: value.toUpperCase() })
  }

  formatPhoneNumber = str => {
    let prefix = str.slice(0, 3)
    let mid = str.slice(3, 6)
    let end = str.slice(6, 10)
    let formattedNumer = `(${prefix}) ${mid}-${end}`
    console.log(formattedNumer)
    this.setState({ phone: formattedNumer })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const { createData, user } = this.props
    console.log(user)
    // this.setState({ userId: user.id })
    createData(this.state, user.id)
  }

  render() {
    return (
      <Fragment>
        <h2 style={{ textAlign: 'center' }}>Update Your Information Here</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="input-line">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={this.changeTextbox}
            />
          </div>
          <div className="input-line">
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={this.changeTextbox}
            />
          </div>
          <div className="input-line">
            <input
              type="text"
              placeholder="Address Line 1"
              name="address1"
              onChange={this.changeTextbox}
            />
          </div>
          <div className="input-line">
            <input
              type="text"
              placeholder="Address Line 2"
              name="address2"
              onChange={this.changeTextbox}
            />
          </div>
          <div className="input-line">
            <input type="text" placeholder="City" name="city" onChange={this.changeTextbox} />
          </div>
          <div className="input-line" id="state-line">
            <h5>STATE</h5>
            <select name="state" onChange={this.changeTextbox}>
              {states.map(state => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="input-line">
            <input type="text" placeholder="Zip Code" name="zip" onChange={this.changeTextbox} />
          </div>
          <div className="input-line">
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              onChange={this.changeTextbox}
            />
          </div>
          <div className="submit-div">
            <input
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </Fragment>
    )
  }
}

const mapState = state => state
const mapDispatch = dispatch => ({
  createData: (data, userId) => dispatch(createUserInfo(data, userId)),
  getUserInfo: userId => dispatch(fetchUserInfo(userId))
})

export default connect(mapState, mapDispatch)(UserInfo)
