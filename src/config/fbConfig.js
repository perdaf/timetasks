import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const DB_CONFIG = {
  apiKey: 'AIzaSyDMW8uTA-pav1yYo9LuW_WEJrhrs8NGDs8',
  authDomain: 'tasktimer-4b80b.firebaseapp.com',
  databaseURL: 'https://tasktimer-4b80b.firebaseio.com',
  projectId: 'tasktimer-4b80b',
  storageBucket: 'tasktimer-4b80b.appspot.com',
  messagingSenderId: '381134595605',
};

firebase.initializeApp(DB_CONFIG);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
// export const db = firebase.firestore();
