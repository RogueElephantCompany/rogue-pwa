import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_REPAIRS = 'GET_ALL_REPAIRS'
const GET_USER_REPAIRS = 'GET_USER_REPAIRS'
const ADD_USER_REPAIR = 'ADD_USER_REPAIR'
const UPDATE_USER_REPAIR = 'UPDATE_USER_REPAIR'

/**
 * INITIAL STATE
 */
const defaultRepairs = []

/**
 * ACTION CREATORS
 */
const getAllRepairs = data => ({ type: GET_ALL_REPAIRS, data })
const getUserRepairs = user => ({ type: GET_USER_REPAIRS, user })
const addUserRepair = info => ({ type: ADD_USER_REPAIR, info })
const updateUserRepair = data => ({ type: UPDATE_USER_REPAIR, data })

/**
 * THUNK CREATORS
 */

export const fetchAllRepairs = () => async dispatch => {
  try {
    const res = await axios.get('/api/repairs')
    dispatch(getAllRepairs(res.data))
  }
  catch (err) {
    console.error(err)
  }
}

export const fetchUserRepairs = userId => async dispatch => {
  try {
    const res = await axios.get(`/api/repairs/${userId}`)
    dispatch(getUserRepairs(res.data || defaultRepairs))
  } catch (err) {
    console.error(err)
  }
}

export const createUserRepair = (info, userId) => async dispatch => {
  console.log('here is the userId: ', userId)
  try {
    const res = await axios.post('/api/repairs', info, userId)
    console.log('createUserInfo res: ', res)
    dispatch(addUserRepair(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const changeUserRepair = (info, userId) => async dispatch => {
  try {
    const res = await axios.put(`/api/repairs/${userId}`, info)
    dispatch(updateUserRepair(res.data))
      .then(history.push('/home'))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function (state = defaultRepairs, action) {
  switch (action.type) {
    case GET_ALL_REPAIRS:
      return action.data
    case GET_USER_REPAIRS:
      return action.user
    case ADD_USER_REPAIR:
      return [...state, action.info]
    case UPDATE_USER_REPAIR:
      return action.data
    default:
      return state
  }
}
