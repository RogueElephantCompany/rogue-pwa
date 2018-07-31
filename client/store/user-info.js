import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER_INFO = 'GET_USER_INFO'
const UPDATE_USER_INFO = 'UPDATE_USER_INFO'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUserInfo = user => ({ type: GET_USER_INFO, user })
const updateUserInfo = data => ({ type: UPDATE_USER_INFO, data })

/**
 * THUNK CREATORS
 */
export const fetchUserInfo = (userId) => async dispatch => {
  try {
    const res = await axios.get(`/api/user/${userId}`)
    dispatch(getUserInfo(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}



/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER_INFO:
      return action.user
    case UPDATE_USER_INFO:
      return action.data
    default:
      return state
  }
}
