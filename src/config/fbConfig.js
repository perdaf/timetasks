import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const DB_CONFIG = {
  apiKey: 'AIzaSyA9rsA1AAIlnx-IDgGaWFfC4uDUYiiBG_o',
  authDomain: 'tasktimer-8c816.firebaseapp.com',
  databaseURL: 'https://tasktimer-8c816.firebaseio.com',
  projectId: 'tasktimer-8c816',
  storageBucket: 'tasktimer-8c816.appspot.com',
  messagingSenderId: '216623393055',
};

firebase.initializeApp(DB_CONFIG);
firebase.firestore().setting({ timestampsInSnapshot: true });

export default firebase;
