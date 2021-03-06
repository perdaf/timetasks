// import uniqid from 'uniqid';
import tasksReducer from './tasksReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import projectReducer from './projectReducer';

import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  users: userReducer,
  projects: projectReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
