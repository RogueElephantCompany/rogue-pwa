import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { states } from '../../constants'
import { createUserInfo, fetchUserInfo, changeUserInfo } from '../../store'

class UserInfo extends Component {
  state = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: 'AL',
    zip: '',
    phone: '',
    notLoaded: true
  }

  componentDidMount() {
    const { getUserInfo, user } = this.props
    getUserInfo(user.id)
  }

  changeTextbox = evt => {
    const { value, name } = evt.target
    this.setState({ [name]: value.toUpperCase() })
  }

  formatPhoneNumber = evt => {
    let str = evt.target.value
    str = str.replace(/\D/g, '')
    let prefix = str.slice(0, 3)
    let mid = str.slice(3, 6)
    let end = str.slice(6, 10)
    let formattedNumer = `(${prefix}) ${mid}-${end}`
    this.setState({ phone: formattedNumer })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const { createData, user } = this.props
    createData(this.state, user.id)
  }

  handleUpdate = (evt) => {
    evt.preventDefault()
    console.log(this.props.userInfo.length)
    const { updateUserData, user } = this.props
    updateUserData(this.state, user.id)
  }

  changeStateToUserInfo = userInfo => {
    const { firstName, lastName, address1, address2, city, state, zip, phone } = userInfo
    this.setState(
      {
        firstName: firstName,
        lastName: lastName,
        address1: address1,
        address2: address2,
        city: city,
        state: state,
        zip: zip,
        phone: phone,
        notLoaded: false
      })
  }

  /* eslint-disable complexity */
  render() {
    const userInfo = this.props.userInfo[0],
      { notLoaded } = this.state
    return (
      <Fragment>
        {
          userInfo || !this.props.userInfo.length ?
            <div>
              {userInfo && notLoaded ? this.changeStateToUserInfo(userInfo) : ''}
              <h2 style={{ textAlign: 'center' }}>Update Your Information Here</h2>
              <form onSubmit={this.props.userInfo.length === 0 ? this.handleSubmit : this.handleUpdate}>
                <div className="input-line">
                  <input
                    type="text"
                    placeholder={userInfo && userInfo.firstName !== '' ? userInfo.firstName : "First Name"}
                    name="firstName"
                    onChange={this.changeTextbox}
                  />
                </div>
                <div className="input-line">
                  <input
                    type="text"
                    placeholder={userInfo && userInfo.lastName !== '' ? userInfo.lastName : "Last Name"}
                    name="lastName"
                    onChange={this.changeTextbox}
                  />
                </div>
                <div className="input-line">
                  <input
                    type="text"
                    placeholder={userInfo && userInfo.address1 !== '' ? userInfo.address1 : "Address Line 1"}
                    name="address1"
                    onChange={this.changeTextbox}
                  />
                </div>
                <div className="input-line">
                  <input
                    type="text"
                    placeholder={userInfo && userInfo.address2 !== '' ? userInfo.address2 : "Address Line 2"}
                    name="address2"
                    onChange={this.changeTextbox}
                  />
                </div>
                <div className="input-line">
                  <input type="text"
                    placeholder={userInfo && userInfo.city !== '' ? userInfo.city : "City"}
                    name="city"
                    onChange={this.changeTextbox}
                  />
                </div>
                <div className="input-line" id="state-line">
                  <h5>STATE</h5>
                  <select name="state" onChange={this.changeTextbox}>
                    {states.map(state => (
                      <option key={state} value={state} default={this.state.state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-line">
                  <input type="text"
                    placeholder={userInfo && userInfo.zip !== '' ? userInfo.zip : "Zip Code"}
                    name="zip"
                    onChange={this.changeTextbox}
                  />
                </div>
                <div className="input-line">
                  <input
                    type="text"
                    placeholder={userInfo && userInfo.phone !== '' ? userInfo.phone : "Phone Number"}
                    name="phone"
                    onChange={this.formatPhoneNumber}
                    value={this.state.phone}
                  />
                </div>
                <div className="submit-div">
                  <input
                    type="submit"
                    value="Update"
                  />
                </div>
              </form>
            </div>

            : <h2>Loading</h2>
        }
      </Fragment>
    )
  }
}

const mapState = state => state
const mapDispatch = dispatch => ({
  createData: (data, userId) => dispatch(createUserInfo(data, userId)),
  getUserInfo: userId => dispatch(fetchUserInfo(userId)),
  updateUserData: (data, userId) => dispatch(changeUserInfo(data, userId))
})

export default connect(mapState, mapDispatch)(UserInfo)
