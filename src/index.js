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

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} >
      <Route path='/' component={App}>
        <Route path='signin' component={Signin} />
        <Route path='signout' component={SignOut} />
        <Route path='signup' component={SignUp} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
