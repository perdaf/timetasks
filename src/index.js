import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import 'bootstrap';

// redux ------------------------------------------
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
// --------
import fbConfig from './config/fbConfig';
import thunk from 'redux-thunk';
import rootReducer from './store/reducers/rootReducer';
// ------------------------------------------------

// const devTools =
//   process.env.NODE_ENV === 'development'
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
//     : null;

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, {
      useFirestoreForProfile: true,
      userProfile: 'users',
      attachAuthIsReady: true,
    })
    // devTools
    // -- devTool --
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
