/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export { default as Navbar } from './navbar'
export { default as UserHome } from './user-home'
export { default as Chat } from './user'
export { default as UserInfo } from './user/user-info'
export { default as Admin } from './admin'
export { default as ChatButtons } from './chat-buttons'
export { default as Schedule } from './schedule'
export { default as PreviousAppointments } from './user/previous'
export { Login, Signup } from './auth-form'
