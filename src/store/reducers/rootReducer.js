// import uniqid from 'uniqid';
import tasksReducer from './tasksReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
