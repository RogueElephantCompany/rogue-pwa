import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_USER_INFO = 'GET_ALL_USER_INFO'
const GET_USER_INFO = 'GET_USER_INFO'
const ADD_USER_INFO = 'ADD_USER_INFO'
const UPDATE_USER_INFO = 'UPDATE_USER_INFO'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getAllUserInfo = data => ({ type: GET_ALL_USER_INFO, data })
const getUserInfo = user => ({ type: GET_USER_INFO, user })
const addUserInfo = info => ({ type: ADD_USER_INFO, info })
const updateUserInfo = data => ({ type: UPDATE_USER_INFO, data })

/**
 * THUNK CREATORS
 */

export const fetchAllUserInfo = () => async dispatch => {
  try {
    const res = await axios.get('/api/info')
    dispatch(getAllUserInfo(res.data))
  }
  catch (err) {
    console.error(err)
  }
}

export const fetchUserInfo = (userId) => async dispatch => {
  try {
    const res = await axios.get(`/api/info/${userId}`)
    dispatch(getUserInfo(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const createUserInfo = (info, userId) => dispatch => {
  console.log('here is the userId: ', userId)
  axios.post('/api/info', info, userId)
    .then(res => {
      console.log('createUserInfo res: ', res)
      dispatch(addUserInfo(res.data))
    })
    .catch(err => console.error(err))
}

export const changeUserInfo = (info, userId) => dispatch => {
  axios.put(`/api/info/${userId}`, info)
    .then(res => {
      console.log('put response: ', res)
      dispatch(updateUserInfo(res.data))
    })
    .then(history.push('/home'))
    .catch(err => console.error(err))
}

/**
 * REDUCER
 */
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_ALL_USER_INFO:
      return action.data
    case GET_USER_INFO:
      return action.user
    case ADD_USER_INFO:
      return action.info
    case UPDATE_USER_INFO:
      return action.data
    default:
      return state
  }
}
