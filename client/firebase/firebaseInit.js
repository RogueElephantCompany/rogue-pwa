console.log('in firebase init')
import firebase from 'firebase'
console.log(firebase)
import firebaseConfig from './firebaseConfig'

if (!firebase.apps.length) {
  console.log('firebase.apps', firebase.apps)
  firebase.initializeApp(firebaseConfig);
}
else {
  console.log('no length?')
}

export default firebase
