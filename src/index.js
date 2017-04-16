import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';

import Signin from './components/auth/signin';
import SignOut from './components/auth/signout';
import SignUp from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/requireAuth';
import HomePage from './components/homePage';
import types from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//if token is available, consider the user logged 
if(token) {
  store.dispatch({ type: types.AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path='/' component={App}>
        <IndexRoute component={HomePage} />
        <Route path='signin' component={Signin} />
        <Route path='signout' component={SignOut} />
        <Route path='signup' component={SignUp} />
        <Route path='feature' component={ RequireAuth(Feature) } />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
