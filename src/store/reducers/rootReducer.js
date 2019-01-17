// import uniqid from 'uniqid';
import tasksReducer from './tasksReducer';
import authReducer from './authReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
