import React, {Component, Fragment} from 'react'
import {states} from '../constants'

class UserInfo extends Component {
  state = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  }

  componentDidMount() {
    console.log('need to go fetch User Info')
  }

  changeTextbox = evt => {
    const {value, name} = evt.target
    console.log(name, value)
    this.setState({[name]: value}, () => {
      console.log(name, this.state[name])
    })
  }

  formatPhoneNumber = str => {
    let prefix = str.slice(0, 3)
    let mid = str.slice(3, 6)
    let end = str.slice(6, 10)
    let formattedNumer = `(${prefix}) ${mid}-${end}`
    console.log(formattedNumer)
    this.setState({phone: formattedNumer})
  }

  render() {
    return (
      <Fragment>
        <form>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={this.changeTextbox}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={this.changeTextbox}
          />
          <input
            type="text"
            placeholder="Address Line 1"
            name="address1"
            onChange={this.changeTextbox}
          />
          <input
            type="text"
            placeholder="Address Line 2"
            name="address2"
            onChange={this.changeTextbox}
          />
          <input type="text" placeholder="City" name="city" onChange={this.changeTextbox} />
          <select name="state" onChange={this.changeTextbox}>
            {states.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <input type="text" placeholder="Zip Code" name="zip" onChange={this.changeTextbox} />
          <input
            type="text"
            placeholder="Phone Number"
            name="phone"
            onChange={this.changeTextbox}
          />
        </form>
      </Fragment>
    )
  }
}

export default UserInfo
